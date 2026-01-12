/**
 * API INTEGRATION EXAMPLE
 * 
 * Demonstrates how to build a type-safe API client in TypeScript.
 * Includes error handling, retries, caching, and best practices.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * HTTP Methods
 */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * API Response wrapper
 */
interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

/**
 * API Error
 */
class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: any
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Request configuration
 */
interface RequestConfig {
    method: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
}

/**
 * Cache entry
 */
interface CacheEntry<T> {
    data: T;
    timestamp: number;
    expiresAt: number;
}

// ============================================
// EXAMPLE DATA TYPES
// ============================================

/**
 * User model
 */
interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
    };
}

/**
 * Post model
 */
interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

/**
 * Comment model
 */
interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

/**
 * Create post input
 */
interface CreatePostInput {
    userId: number;
    title: string;
    body: string;
}

// ============================================
// API CLIENT CLASS
// ============================================

/**
 * Generic API client with type safety
 */
class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;
    private cache: Map<string, CacheEntry<any>>;
    private defaultTimeout: number;

    constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
        this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...defaultHeaders
        };
        this.cache = new Map();
        this.defaultTimeout = 30000; // 30 seconds
    }

    /**
     * Make HTTP request
     */
    private async request<T>(
        endpoint: string,
        config: RequestConfig
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;
        const timeout = config.timeout || this.defaultTimeout;

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            // Prepare request options
            const options: RequestInit = {
                method: config.method,
                headers: {
                    ...this.defaultHeaders,
                    ...config.headers
                },
                signal: controller.signal
            };

            // Add body for non-GET requests
            if (config.body && config.method !== "GET") {
                options.body = JSON.stringify(config.body);
            }

            // Make request with retry logic
            const response = await this.fetchWithRetry(
                url,
                options,
                config.retries || 0,
                config.retryDelay || 1000
            );

            clearTimeout(timeoutId);

            // Parse response
            const data = await response.json();

            // Check for HTTP errors
            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    data
                );
            }

            // Return formatted response
            return {
                data,
                status: response.status,
                statusText: response.statusText,
                headers: this.parseHeaders(response.headers)
            };
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if ((error as Error).name === "AbortError") {
                throw new ApiError("Request timeout", 408);
            }

            throw new ApiError(
                error instanceof Error ? error.message : "Unknown error",
                0
            );
        }
    }

    /**
     * Fetch with retry logic
     */
    private async fetchWithRetry(
        url: string,
        options: RequestInit,
        retries: number,
        delay: number
    ): Promise<Response> {
        try {
            return await fetch(url, options);
        } catch (error) {
            if (retries > 0) {
                console.log(`Retrying request (${retries} attempts left)...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.fetchWithRetry(url, options, retries - 1, delay * 2);
            }
            throw error;
        }
    }

    /**
     * Parse response headers
     */
    private parseHeaders(headers: Headers): Record<string, string> {
        const result: Record<string, string> = {};
        headers.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }

    /**
     * Generate cache key
     */
    private getCacheKey(endpoint: string, config: RequestConfig): string {
        return `${config.method}:${endpoint}:${JSON.stringify(config.body || {})}`;
    }

    /**
     * Get from cache
     */
    private getFromCache<T>(key: string): T | null {
        const entry = this.cache.get(key);
        
        if (!entry) {
            return null;
        }

        // Check if cache entry is expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        console.log(`✓ Cache hit: ${key}`);
        return entry.data;
    }

    /**
     * Save to cache
     */
    private saveToCache<T>(key: string, data: T, ttl: number = 60000): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            expiresAt: Date.now() + ttl
        });
        console.log(`✓ Cached: ${key} (TTL: ${ttl}ms)`);
    }

    /**
     * Clear cache
     */
    clearCache(): void {
        this.cache.clear();
        console.log("✓ Cache cleared");
    }

    // ============================================
    // HTTP METHOD HELPERS
    // ============================================

    /**
     * GET request with optional caching
     */
    async get<T>(endpoint: string, config: Partial<RequestConfig> = {}, cacheTtl?: number): Promise<T> {
        const fullConfig: RequestConfig = {
            method: "GET",
            ...config
        };

        // Check cache
        if (cacheTtl) {
            const cacheKey = this.getCacheKey(endpoint, fullConfig);
            const cached = this.getFromCache<T>(cacheKey);
            
            if (cached) {
                return cached;
            }

            // Make request and cache
            const response = await this.request<T>(endpoint, fullConfig);
            this.saveToCache(cacheKey, response.data, cacheTtl);
            return response.data;
        }

        const response = await this.request<T>(endpoint, fullConfig);
        return response.data;
    }

    /**
     * POST request
     */
    async post<T, B = any>(endpoint: string, body: B, config: Partial<RequestConfig> = {}): Promise<T> {
        const response = await this.request<T>(endpoint, {
            method: "POST",
            body,
            ...config
        });
        return response.data;
    }

    /**
     * PUT request
     */
    async put<T, B = any>(endpoint: string, body: B, config: Partial<RequestConfig> = {}): Promise<T> {
        const response = await this.request<T>(endpoint, {
            method: "PUT",
            body,
            ...config
        });
        return response.data;
    }

    /**
     * PATCH request
     */
    async patch<T, B = any>(endpoint: string, body: Partial<B>, config: Partial<RequestConfig> = {}): Promise<T> {
        const response = await this.request<T>(endpoint, {
            method: "PATCH",
            body,
            ...config
        });
        return response.data;
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string, config: Partial<RequestConfig> = {}): Promise<T> {
        const response = await this.request<T>(endpoint, {
            method: "DELETE",
            ...config
        });
        return response.data;
    }
}

// ============================================
// API SERVICE LAYER
// ============================================

/**
 * Service for user-related operations
 */
class UserService {
    constructor(private client: ApiClient) {}

    /**
     * Get all users (with caching)
     */
    async getUsers(): Promise<User[]> {
        return this.client.get<User[]>("/users", {}, 60000); // Cache for 1 minute
    }

    /**
     * Get user by ID
     */
    async getUser(id: number): Promise<User> {
        return this.client.get<User>(`/users/${id}`);
    }

    /**
     * Get user's posts
     */
    async getUserPosts(userId: number): Promise<Post[]> {
        return this.client.get<Post[]>(`/users/${userId}/posts`);
    }
}

/**
 * Service for post-related operations
 */
class PostService {
    constructor(private client: ApiClient) {}

    /**
     * Get all posts
     */
    async getPosts(): Promise<Post[]> {
        return this.client.get<Post[]>("/posts");
    }

    /**
     * Get post by ID
     */
    async getPost(id: number): Promise<Post> {
        return this.client.get<Post>(`/posts/${id}`);
    }

    /**
     * Create new post
     */
    async createPost(input: CreatePostInput): Promise<Post> {
        return this.client.post<Post, CreatePostInput>("/posts", input);
    }

    /**
     * Update post
     */
    async updatePost(id: number, updates: Partial<Post>): Promise<Post> {
        return this.client.patch<Post, Post>(`/posts/${id}`, updates);
    }

    /**
     * Delete post
     */
    async deletePost(id: number): Promise<void> {
        await this.client.delete(`/posts/${id}`);
    }

    /**
     * Get post comments
     */
    async getPostComments(postId: number): Promise<Comment[]> {
        return this.client.get<Comment[]>(`/posts/${postId}/comments`);
    }
}

// ============================================
// EXAMPLE USAGE
// ============================================

async function main(): Promise<void> {
    console.log("=== API Integration Demo ===\n");

    // Initialize API client
    const apiClient = new ApiClient("https://jsonplaceholder.typicode.com");
    
    // Initialize services
    const userService = new UserService(apiClient);
    const postService = new PostService(apiClient);

    try {
        // Get users
        console.log("--- Fetching Users ---");
        const users = await userService.getUsers();
        console.log(`✓ Fetched ${users.length} users`);
        console.log(`First user: ${users[0].name} (${users[0].email})`);

        // Get specific user
        console.log("\n--- Fetching User #1 ---");
        const user = await userService.getUser(1);
        console.log(`✓ User: ${user.name}`);
        console.log(`  Company: ${user.company.name}`);

        // Get user's posts
        console.log("\n--- Fetching User's Posts ---");
        const userPosts = await userService.getUserPosts(1);
        console.log(`✓ User has ${userPosts.length} posts`);
        console.log(`  First post: "${userPosts[0].title}"`);

        // Get posts
        console.log("\n--- Fetching Posts ---");
        const posts = await postService.getPosts();
        console.log(`✓ Fetched ${posts.length} posts`);

        // Create new post
        console.log("\n--- Creating New Post ---");
        const newPost = await postService.createPost({
            userId: 1,
            title: "Learning TypeScript",
            body: "TypeScript is great for building type-safe applications!"
        });
        console.log(`✓ Created post #${newPost.id}: "${newPost.title}"`);

        // Update post
        console.log("\n--- Updating Post ---");
        const updatedPost = await postService.updatePost(1, {
            title: "Updated Title"
        });
        console.log(`✓ Updated post #${updatedPost.id}`);

        // Get post comments
        console.log("\n--- Fetching Post Comments ---");
        const comments = await postService.getPostComments(1);
        console.log(`✓ Post has ${comments.length} comments`);
        console.log(`  First comment by: ${comments[0].email}`);

        // Test caching
        console.log("\n--- Testing Cache ---");
        console.log("First request (no cache):");
        await userService.getUsers();
        console.log("Second request (from cache):");
        await userService.getUsers();

        console.log("\n=== Demo Complete ===");

    } catch (error) {
        if (error instanceof ApiError) {
            console.error(`\n✗ API Error (${error.status}): ${error.message}`);
            if (error.response) {
                console.error("Response:", error.response);
            }
        } else {
            console.error("\n✗ Unexpected error:", error);
        }
    }
}

// Run the demo
if (require.main === module) {
    main().catch(console.error);
}

// Export for use in other modules
export {
    ApiClient,
    ApiError,
    ApiResponse,
    RequestConfig,
    UserService,
    PostService,
    User,
    Post,
    Comment,
    CreatePostInput
};
