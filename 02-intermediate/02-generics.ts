/**
 * 02. GENERICS
 * 
 * Generics provide a way to create reusable components that work with multiple types
 * while maintaining type safety. They allow you to write flexible, type-safe code.
 */

// ============================================
// BASIC GENERICS
// ============================================

/**
 * Generic function - works with any type
 * T is a type parameter (placeholder for actual type)
 */
function identity<T>(arg: T): T {
    return arg;
}

// Usage with explicit type
const stringResult = identity<string>("Hello");
const numberResult = identity<number>(42);

// Type inference - TypeScript figures out the type
const inferred = identity("TypeScript"); // Type: string

console.log("Generic identity:", stringResult, numberResult, inferred);

/**
 * Generic function with array
 */
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]); // Type: number | undefined
const firstName = getFirstElement(["Alice", "Bob"]); // Type: string | undefined

console.log("First elements:", firstNumber, firstName);

/**
 * Generic function with multiple type parameters
 */
function makePair<K, V>(key: K, value: V): { key: K; value: V } {
    return { key, value };
}

const stringNumberPair = makePair("age", 30);
const numberBoolPair = makePair(1, true);

console.log("Pairs:", stringNumberPair, numberBoolPair);

// ============================================
// GENERIC INTERFACES
// ============================================

/**
 * Interface with generic type parameter
 */
interface Box<T> {
    value: T;
}

const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 42 };
const boolBox: Box<boolean> = { value: true };

console.log("Boxes:", stringBox, numberBox, boolBox);

/**
 * Generic interface with methods
 */
interface Repository<T> {
    getById(id: string): T | undefined;
    getAll(): T[];
    add(item: T): void;
    delete(id: string): boolean;
}

// Implementation for a specific type
interface User {
    id: string;
    name: string;
    email: string;
}

class UserRepository implements Repository<User> {
    private users: Map<string, User> = new Map();

    getById(id: string): User | undefined {
        return this.users.get(id);
    }

    getAll(): User[] {
        return Array.from(this.users.values());
    }

    add(user: User): void {
        this.users.set(user.id, user);
    }

    delete(id: string): boolean {
        return this.users.delete(id);
    }
}

const userRepo = new UserRepository();
userRepo.add({ id: "1", name: "Alice", email: "alice@example.com" });
userRepo.add({ id: "2", name: "Bob", email: "bob@example.com" });

console.log("All users:", userRepo.getAll());
console.log("User 1:", userRepo.getById("1"));

// ============================================
// GENERIC CLASSES
// ============================================

/**
 * Class with generic type parameter
 */
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log("Stack size:", numberStack.size());
console.log("Top element:", numberStack.peek());
console.log("Popped:", numberStack.pop());

const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log("String stack:", stringStack.pop());

/**
 * Generic class with multiple type parameters
 */
class KeyValuePair<K, V> {
    constructor(
        public key: K,
        public value: V
    ) {}

    display(): void {
        console.log(`Key: ${this.key}, Value: ${this.value}`);
    }
}

const pair1 = new KeyValuePair<string, number>("age", 30);
const pair2 = new KeyValuePair<number, string>(1, "First");

pair1.display();
pair2.display();

// ============================================
// GENERIC CONSTRAINTS
// ============================================

/**
 * Constraining generic types to specific shapes
 */

// Constraint: T must have a length property
function logLength<T extends { length: number }>(item: T): void {
    console.log(`Length: ${item.length}`);
}

logLength("Hello");           // string has length
logLength([1, 2, 3]);        // array has length
logLength({ length: 10 });   // object with length property
// logLength(123);            // Error: number doesn't have length

/**
 * Extending specific types
 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Alice", age: 30, city: "NYC" };
const personName = getProperty(person, "name");  // Type: string
const personAge = getProperty(person, "age");    // Type: number
// const invalid = getProperty(person, "invalid"); // Error: invalid key

console.log("Person properties:", personName, personAge);

/**
 * Generic constraint with interface
 */
interface HasId {
    id: string | number;
}

function findById<T extends HasId>(items: T[], id: string | number): T | undefined {
    return items.find(item => item.id === id);
}

const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 29 },
    { id: 3, name: "Keyboard", price: 79 }
];

const product = findById(products, 2);
console.log("Found product:", product);

// ============================================
// GENERIC TYPE ALIASES
// ============================================

/**
 * Creating reusable generic types
 */
type Result<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

function fetchUser(id: string): Result<User> {
    // Simulating API call
    if (id === "1") {
        return {
            success: true,
            data: { id: "1", name: "Alice", email: "alice@example.com" }
        };
    }
    return {
        success: false,
        error: "User not found"
    };
}

const userResult = fetchUser("1");
if (userResult.success && userResult.data) {
    console.log("Fetched user:", userResult.data);
}

/**
 * Generic type with union
 */
type Response<T> = T | { error: string };

function processData<T>(data: T): Response<T> {
    // Validation logic
    if (data === null || data === undefined) {
        return { error: "Invalid data" };
    }
    return data;
}

const validData = processData({ value: 42 });
const invalidData = processData(null);

console.log("Processed data:", validData);
console.log("Invalid data:", invalidData);

// ============================================
// GENERIC DEFAULT PARAMETERS
// ============================================

/**
 * Providing default types for generics
 */
interface Config<T = string> {
    name: string;
    value: T;
}

const stringConfig: Config = { name: "theme", value: "dark" }; // T defaults to string
const numberConfig: Config<number> = { name: "maxUsers", value: 100 };

console.log("Configs:", stringConfig, numberConfig);

// ============================================
// GENERIC UTILITY FUNCTIONS
// ============================================

/**
 * Swap elements in an array
 */
function swap<T>(arr: T[], i: number, j: number): T[] {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

const numbers = [1, 2, 3, 4, 5];
swap(numbers, 0, 4);
console.log("Swapped array:", numbers);

/**
 * Merge two objects
 */
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30, city: "NYC" });
console.log("Merged object:", merged);

/**
 * Filter array by predicate
 */
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    return arr.filter(predicate);
}

const evenNumbers = filterArray([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
const longStrings = filterArray(["a", "abc", "ab", "abcd"], s => s.length > 2);

console.log("Filtered:", evenNumbers, longStrings);

// ============================================
// GENERIC MAPPED TYPES
// ============================================

/**
 * Creating new types by transforming existing ones
 */
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

interface Product {
    id: number;
    name: string;
    price: number;
}

// All properties can now be null
const nullableProduct: Nullable<Product> = {
    id: 1,
    name: null,
    price: 99.99
};

console.log("Nullable product:", nullableProduct);

// ============================================
// CONDITIONAL TYPES WITH GENERICS
// ============================================

/**
 * Types that depend on conditions
 */
type IsArray<T> = T extends any[] ? "yes" : "no";

type Test1 = IsArray<string>;    // "no"
type Test2 = IsArray<number[]>;  // "yes"

// Extract return type from function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getNumber(): number {
    return 42;
}

type NumberType = ReturnType<typeof getNumber>; // number

// ============================================
// REAL-WORLD EXAMPLE: GENERIC API CLIENT
// ============================================

/**
 * Type-safe API client
 */
interface ApiResponse<T> {
    status: number;
    data: T;
    message: string;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        // Simulating API call
        return {
            status: 200,
            data: {} as T,
            message: "Success"
        };
    }

    async post<T, U>(endpoint: string, body: U): Promise<ApiResponse<T>> {
        // Simulating API call
        return {
            status: 201,
            data: {} as T,
            message: "Created"
        };
    }

    async put<T, U>(endpoint: string, body: U): Promise<ApiResponse<T>> {
        // Simulating API call
        return {
            status: 200,
            data: {} as T,
            message: "Updated"
        };
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        // Simulating API call
        return {
            status: 200,
            data: {} as T,
            message: "Deleted"
        };
    }
}

const api = new ApiClient("https://api.example.com");

// Type-safe API calls
interface Post {
    id: number;
    title: string;
    content: string;
}

// Usage example (would be async in real code)
async function exampleUsage() {
    const posts = await api.get<Post[]>("/posts");
    const newPost = await api.post<Post, Omit<Post, "id">>("/posts", {
        title: "New Post",
        content: "Content here"
    });
}

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use meaningful generic parameter names (T, K, V for simple cases)
 * 2. Add constraints when necessary to ensure type safety
 * 3. Use default type parameters for common cases
 * 4. Keep generic functions simple and focused
 * 5. Document generic types and their constraints
 * 6. Use type inference when possible
 * 7. Avoid excessive generic parameters (max 2-3)
 * 8. Consider using utility types instead of custom generics
 */

// Good: Clear generic usage with constraints
function sortBy<T, K extends keyof T>(items: T[], key: K): T[] {
    return items.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

const users = [
    { id: 3, name: "Charlie" },
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

const sortedByName = sortBy(users, "name");
const sortedById = sortBy(users, "id");

console.log("Sorted by name:", sortedByName);
console.log("Sorted by id:", sortedById);
