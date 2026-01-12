/**
 * 02. ASYNC/AWAIT AND PROMISES
 * 
 * Handling asynchronous operations in TypeScript with proper typing.
 * Covers Promises, async/await, error handling, and best practices.
 */

// ============================================
// PROMISES BASICS
// ============================================

/**
 * Promise represents an eventual completion (or failure) of an async operation
 */

// Creating a Promise
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// Using Promise with then/catch
delay(1000)
    .then(() => console.log("Delayed execution"))
    .catch((error) => console.error("Error:", error));

/**
 * Promise with value
 */
function fetchUser(id: string): Promise<{ id: string; name: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === "1") {
                resolve({ id: "1", name: "John Doe" });
            } else {
                reject(new Error("User not found"));
            }
        }, 1000);
    });
}

// Using the promise
fetchUser("1")
    .then((user) => {
        console.log("User fetched:", user);
        return user.name;
    })
    .then((name) => {
        console.log("User name:", name);
    })
    .catch((error) => {
        console.error("Fetch error:", error.message);
    });

// ============================================
// ASYNC/AWAIT
// ============================================

/**
 * async/await provides cleaner syntax for working with Promises
 */

// Async function returns a Promise
async function getUserData(id: string): Promise<string> {
    try {
        const user = await fetchUser(id);
        console.log("Fetched user:", user);
        return user.name;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

/**
 * Multiple async operations
 */
async function fetchMultipleUsers(): Promise<void> {
    try {
        const user1 = await fetchUser("1");
        const user2 = await fetchUser("2");
        console.log("Users:", user1, user2);
    } catch (error) {
        console.error("Error:", error);
    }
}

/**
 * Parallel execution with Promise.all
 */
async function fetchUsersParallel(): Promise<void> {
    try {
        const [user1, user2] = await Promise.all([
            fetchUser("1"),
            fetchUser("2")
        ]);
        console.log("Users (parallel):", user1, user2);
    } catch (error) {
        console.error("Error:", error);
    }
}

// ============================================
// TYPED PROMISES
// ============================================

/**
 * Strongly typed Promise return values
 */
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    // Simulated API call
    return {
        data: {} as T,
        status: 200,
        message: "Success"
    };
}

// Usage with specific type
interface User {
    id: string;
    name: string;
    email: string;
}

async function getUser(id: string): Promise<User> {
    const response = await fetchData<User>(`/api/users/${id}`);
    return response.data;
}

/**
 * Promise with union types
 */
type Result<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

async function fetchWithResult<T>(url: string): Promise<Result<T>> {
    try {
        const response = await fetchData<T>(url);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Usage
async function handleFetch(): Promise<void> {
    const result = await fetchWithResult<User>("/api/users/1");
    
    if (result.success) {
        console.log("User data:", result.data);
    } else {
        console.error("Fetch failed:", result.error);
    }
}

// ============================================
// PROMISE UTILITIES
// ============================================

/**
 * Promise.all - Wait for all promises (fails if any fails)
 */
async function getAllUsers(): Promise<User[]> {
    const userPromises = ["1", "2", "3"].map(id => fetchUser(id));
    const users = await Promise.all(userPromises);
    return users;
}

/**
 * Promise.allSettled - Wait for all promises (never fails)
 */
async function getAllUsersSettled(): Promise<void> {
    const promises = ["1", "2", "invalid"].map(id => fetchUser(id));
    const results = await Promise.allSettled(promises);
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`User ${index}:`, result.value);
        } else {
            console.error(`User ${index} failed:`, result.reason);
        }
    });
}

/**
 * Promise.race - Returns first resolved/rejected promise
 */
async function fetchWithTimeout<T>(
    promise: Promise<T>,
    timeout: number
): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), timeout);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

// Usage
async function fetchUserWithTimeout(id: string): Promise<void> {
    try {
        const user = await fetchWithTimeout(fetchUser(id), 2000);
        console.log("User (with timeout):", user);
    } catch (error) {
        console.error("Fetch timeout or error:", error);
    }
}

/**
 * Promise.any - Returns first fulfilled promise
 */
async function fetchFromMultipleSources(): Promise<User> {
    const promises = [
        fetchUser("1"),
        fetchData<User>("/backup/users/1").then(r => r.data),
        fetchData<User>("/cache/users/1").then(r => r.data)
    ];
    
    // Returns the first successful result
    return Promise.any(promises);
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Custom error types for better error handling
 */
class NetworkError extends Error {
    constructor(
        message: string,
        public statusCode: number
    ) {
        super(message);
        this.name = "NetworkError";
    }
}

class ValidationError extends Error {
    constructor(
        message: string,
        public field: string
    ) {
        super(message);
        this.name = "ValidationError";
    }
}

/**
 * Typed error handling
 */
async function fetchUserSafe(id: string): Promise<User> {
    if (!id) {
        throw new ValidationError("ID is required", "id");
    }
    
    const response = await fetchData<User>(`/api/users/${id}`);
    
    if (response.status !== 200) {
        throw new NetworkError("Failed to fetch user", response.status);
    }
    
    return response.data;
}

/**
 * Handling different error types
 */
async function handleUserFetch(id: string): Promise<void> {
    try {
        const user = await fetchUserSafe(id);
        console.log("User:", user);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`Validation error in field ${error.field}:`, error.message);
        } else if (error instanceof NetworkError) {
            console.error(`Network error (${error.statusCode}):`, error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}

// ============================================
// ASYNC ITERATION
// ============================================

/**
 * Async generators
 */
async function* generateUsers(count: number): AsyncGenerator<User> {
    for (let i = 1; i <= count; i++) {
        const user = await fetchUser(i.toString());
        yield user;
    }
}

/**
 * Using async iteration
 */
async function processUsers(): Promise<void> {
    for await (const user of generateUsers(3)) {
        console.log("Processing user:", user);
    }
}

/**
 * Async iterable
 */
class UserStream {
    constructor(private ids: string[]) {}
    
    async *[Symbol.asyncIterator](): AsyncGenerator<User> {
        for (const id of this.ids) {
            yield await fetchUser(id);
        }
    }
}

async function streamUsers(): Promise<void> {
    const stream = new UserStream(["1", "2", "3"]);
    
    for await (const user of stream) {
        console.log("Streamed user:", user);
    }
}

// ============================================
// CANCELLATION
// ============================================

/**
 * Implementing cancellable operations with AbortController
 */
class CancellablePromise<T> {
    private aborted = false;
    
    constructor(
        private executor: (
            resolve: (value: T) => void,
            reject: (reason: any) => void,
            checkAborted: () => boolean
        ) => void
    ) {}
    
    abort(): void {
        this.aborted = true;
    }
    
    execute(): Promise<T> {
        return new Promise((resolve, reject) => {
            this.executor(
                resolve,
                reject,
                () => this.aborted
            );
        });
    }
}

// Usage
async function fetchCancellable(): Promise<void> {
    const cancellable = new CancellablePromise<string>((resolve, reject, checkAborted) => {
        setTimeout(() => {
            if (checkAborted()) {
                reject(new Error("Operation cancelled"));
            } else {
                resolve("Data fetched");
            }
        }, 2000);
    });
    
    // Cancel after 1 second
    setTimeout(() => cancellable.abort(), 1000);
    
    try {
        const result = await cancellable.execute();
        console.log("Result:", result);
    } catch (error) {
        console.error("Cancelled:", error);
    }
}

// ============================================
// RETRY LOGIC
// ============================================

/**
 * Retry failed operations with exponential backoff
 */
async function retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            console.log(`Attempt ${attempt} failed, retrying...`);
            
            if (attempt < maxRetries) {
                await new Promise(resolve => 
                    setTimeout(resolve, delay * Math.pow(2, attempt - 1))
                );
            }
        }
    }
    
    throw lastError!;
}

// Usage
async function fetchWithRetry(id: string): Promise<User> {
    return retry(() => fetchUser(id), 3, 500);
}

// ============================================
// DEBOUNCING AND THROTTLING
// ============================================

/**
 * Debounce async function calls
 */
function debounceAsync<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    delay: number
): (...args: T) => Promise<R> {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: T): Promise<R> => {
        return new Promise((resolve, reject) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args).then(resolve).catch(reject);
            }, delay);
        });
    };
}

// Usage
const debouncedFetch = debounceAsync(fetchUser, 500);

/**
 * Throttle async function calls
 */
function throttleAsync<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    limit: number
): (...args: T) => Promise<R | undefined> {
    let lastRun = 0;
    
    return async (...args: T): Promise<R | undefined> => {
        const now = Date.now();
        
        if (now - lastRun >= limit) {
            lastRun = now;
            return fn(...args);
        }
        
        return undefined;
    };
}

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Always use try-catch with async/await
 * 2. Use Promise.all for parallel operations
 * 3. Use Promise.allSettled when you need all results
 * 4. Implement proper error handling with custom error types
 * 5. Add timeouts to prevent hanging operations
 * 6. Use async generators for streaming data
 * 7. Implement retry logic for unreliable operations
 * 8. Type your Promises properly
 * 9. Avoid mixing callbacks with Promises
 * 10. Consider cancellation for long-running operations
 */

// Good: Well-structured async function
async function processUserData(userId: string): Promise<Result<User>> {
    try {
        // Validate input
        if (!userId) {
            return {
                success: false,
                error: "User ID is required"
            };
        }
        
        // Fetch with timeout and retry
        const user = await fetchWithTimeout(
            retry(() => fetchUser(userId), 3, 1000),
            5000
        );
        
        // Return success
        return {
            success: true,
            data: user
        };
    } catch (error) {
        // Handle errors gracefully
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Main execution
async function main(): Promise<void> {
    console.log("Starting async operations...");
    
    const result = await processUserData("1");
    
    if (result.success) {
        console.log("Successfully processed user:", result.data);
    } else {
        console.error("Failed to process user:", result.error);
    }
    
    console.log("Async operations completed");
}

// Run if this is the main module
if (require.main === module) {
    main().catch(console.error);
}
