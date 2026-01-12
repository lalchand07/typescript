/**
 * 05. UTILITY TYPES
 * 
 * TypeScript provides several built-in utility types that facilitate
 * common type transformations. These are powerful tools for type manipulation.
 */

// ============================================
// PARTIAL<T>
// ============================================

/**
 * Makes all properties of T optional
 * Useful for updates where you don't need all properties
 */
interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

// All properties are optional
type PartialUser = Partial<User>;

function updateUser(id: string, updates: Partial<User>): void {
    console.log(`Updating user ${id} with:`, updates);
    // Can pass any combination of User properties
}

updateUser("123", { name: "John Doe" });
updateUser("456", { age: 30, email: "john@example.com" });
updateUser("789", { name: "Jane", age: 25, email: "jane@example.com" });

// ============================================
// REQUIRED<T>
// ============================================

/**
 * Makes all properties of T required
 * Opposite of Partial
 */
interface Config {
    host?: string;
    port?: number;
    timeout?: number;
}

// All properties must be provided
type RequiredConfig = Required<Config>;

const config: RequiredConfig = {
    host: "localhost",
    port: 3000,
    timeout: 5000
    // All properties are required
};

console.log("Required config:", config);

// ============================================
// READONLY<T>
// ============================================

/**
 * Makes all properties of T readonly
 * Prevents modification after creation
 */
interface Point {
    x: number;
    y: number;
}

type ReadonlyPoint = Readonly<Point>;

const point: ReadonlyPoint = { x: 10, y: 20 };
console.log("Point:", point);
// point.x = 30; // Error: Cannot assign to 'x' because it is read-only

/**
 * Readonly arrays
 */
const numbers: ReadonlyArray<number> = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);
// numbers.push(6); // Error: Property 'push' does not exist
// numbers[0] = 10; // Error: Index signature is readonly

// ============================================
// RECORD<K, T>
// ============================================

/**
 * Constructs an object type with keys of type K and values of type T
 * Great for creating dictionaries/maps
 */
type UserRole = "admin" | "user" | "guest";

type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};

console.log("Permissions:", permissions);

/**
 * Record with string keys
 */
type PageContent = Record<string, string>;

const pages: PageContent = {
    home: "Welcome to our site",
    about: "About us",
    contact: "Contact information"
};

console.log("Pages:", pages);

/**
 * Record for mapping
 */
type HttpStatusCode = 200 | 400 | 404 | 500;
type StatusMessage = Record<HttpStatusCode, string>;

const statusMessages: StatusMessage = {
    200: "OK",
    400: "Bad Request",
    404: "Not Found",
    500: "Internal Server Error"
};

console.log("Status 404:", statusMessages[404]);

// ============================================
// PICK<T, K>
// ============================================

/**
 * Creates a type by picking specific properties from T
 */
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

// Pick only id and name
type ProductPreview = Pick<Product, "id" | "name" | "price">;

const preview: ProductPreview = {
    id: 1,
    name: "Laptop",
    price: 999
    // Other properties not needed
};

console.log("Product preview:", preview);

// ============================================
// OMIT<T, K>
// ============================================

/**
 * Creates a type by omitting specific properties from T
 * Opposite of Pick
 */

// Omit id (useful for creating new records)
type ProductInput = Omit<Product, "id">;

function createProduct(input: ProductInput): Product {
    return {
        id: Math.random(), // Generate ID
        ...input
    };
}

const newProduct = createProduct({
    name: "Mouse",
    description: "Wireless mouse",
    price: 29,
    category: "Accessories",
    stock: 100
});

console.log("New product:", newProduct);

/**
 * Omit multiple properties
 */
type PublicProduct = Omit<Product, "stock" | "category">;

const publicProduct: PublicProduct = {
    id: 1,
    name: "Keyboard",
    description: "Mechanical keyboard",
    price: 79
};

console.log("Public product:", publicProduct);

// ============================================
// EXCLUDE<T, U>
// ============================================

/**
 * Excludes from T those types that are assignable to U
 * Works with union types
 */
type AllTypes = string | number | boolean | null | undefined;

// Exclude null and undefined
type NonNullable = Exclude<AllTypes, null | undefined>;

let value: NonNullable;
value = "string";  // OK
value = 42;        // OK
value = true;      // OK
// value = null;   // Error

/**
 * Exclude specific string literals
 */
type Status = "idle" | "loading" | "success" | "error";
type ActiveStatus = Exclude<Status, "idle">;

let status: ActiveStatus;
status = "loading";  // OK
status = "success";  // OK
// status = "idle";  // Error

console.log("Active status:", status);

// ============================================
// EXTRACT<T, U>
// ============================================

/**
 * Extracts from T those types that are assignable to U
 * Opposite of Exclude
 */
type MixedType = string | number | boolean | (() => void);

// Extract only function types
type FunctionType = Extract<MixedType, Function>;

const fn: FunctionType = () => console.log("Hello");

/**
 * Extract specific union members
 */
type Shape = "circle" | "square" | "rectangle" | "triangle";
type RectangularShapes = Extract<Shape, "square" | "rectangle">;

let rectShape: RectangularShapes;
rectShape = "square";     // OK
rectShape = "rectangle";  // OK
// rectShape = "circle";  // Error

console.log("Rectangular shape:", rectShape);

// ============================================
// NONNULLABLE<T>
// ============================================

/**
 * Removes null and undefined from T
 */
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;

let str: DefinitelyString;
str = "hello";  // OK
// str = null;  // Error
// str = undefined; // Error

console.log("Non-nullable string:", str);

// ============================================
// RETURNTYPE<T>
// ============================================

/**
 * Obtains the return type of a function type
 */
function getUser() {
    return {
        id: "123",
        name: "John",
        email: "john@example.com"
    };
}

type UserType = ReturnType<typeof getUser>;

const user: UserType = {
    id: "456",
    name: "Jane",
    email: "jane@example.com"
};

console.log("User from return type:", user);

/**
 * With function type
 */
type FetchFunction = () => Promise<{ data: string }>;
type FetchReturn = ReturnType<FetchFunction>;

// FetchReturn is Promise<{ data: string }>

// ============================================
// PARAMETERS<T>
// ============================================

/**
 * Obtains the parameter types of a function type as a tuple
 */
function createUser(name: string, age: number, email: string): User {
    return { id: "123", name, email, age };
}

type CreateUserParams = Parameters<typeof createUser>;
// CreateUserParams is [string, number, string]

function logUserCreation(...args: CreateUserParams): void {
    console.log("Creating user with params:", args);
}

logUserCreation("Alice", 30, "alice@example.com");

// ============================================
// CONSTRUCTORPARAMETERS<T>
// ============================================

/**
 * Obtains the parameter types of a constructor function
 */
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// PersonParams is [string, number]

function createPerson(...args: PersonParams): Person {
    return new Person(...args);
}

const person = createPerson("Bob", 25);
console.log("Person:", person);

// ============================================
// INSTANCETYPE<T>
// ============================================

/**
 * Obtains the instance type of a constructor function
 */
class Database {
    connect() {
        console.log("Connected to database");
    }
}

type DB = InstanceType<typeof Database>;

function useDatabase(db: DB): void {
    db.connect();
}

useDatabase(new Database());

// ============================================
// AWAITED<T>
// ============================================

/**
 * Unwraps Promise types
 */
type PromiseString = Promise<string>;
type UnwrappedString = Awaited<PromiseString>; // string

type NestedPromise = Promise<Promise<number>>;
type UnwrappedNumber = Awaited<NestedPromise>; // number

async function fetchData(): Promise<{ data: string }> {
    return { data: "Hello" };
}

type FetchedData = Awaited<ReturnType<typeof fetchData>>;
// FetchedData is { data: string }

// ============================================
// COMBINING UTILITY TYPES
// ============================================

/**
 * You can combine utility types for powerful transformations
 */

// Partial Pick
type PartialProductPreview = Partial<Pick<Product, "name" | "price">>;

const partialPreview: PartialProductPreview = {
    name: "Keyboard"
    // price is optional
};

// Required with Omit
type RequiredProductInput = Required<Omit<Product, "id" | "stock">>;

// Readonly Record
type ReadonlyPermissions = Readonly<Record<UserRole, string[]>>;

const readonlyPermissions: ReadonlyPermissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};

// readonlyPermissions.admin = []; // Error: readonly

// ============================================
// CUSTOM UTILITY TYPES
// ============================================

/**
 * Creating your own utility types
 */

// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = PartialBy<User, "email" | "age">;

const userPartial: UserWithOptionalEmail = {
    id: "123",
    name: "John"
    // email and age are optional
};

// Make specific properties required
type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Deep partial (makes nested properties optional too)
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedConfig {
    database: {
        host: string;
        port: number;
    };
    cache: {
        ttl: number;
        maxSize: number;
    };
}

type PartialNestedConfig = DeepPartial<NestedConfig>;

const nestedConfig: PartialNestedConfig = {
    database: {
        host: "localhost"
        // port is optional
    }
    // cache is completely optional
};

console.log("Nested config:", nestedConfig);

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use Partial for update operations
 * 2. Use Required when you need all properties
 * 3. Use Readonly for immutable data
 * 4. Use Record for dictionaries/maps
 * 5. Use Pick/Omit to create derived types
 * 6. Use ReturnType for inferring function returns
 * 7. Use Parameters for function parameter types
 * 8. Combine utility types for complex transformations
 * 9. Create custom utility types for recurring patterns
 * 10. Document complex utility type combinations
 */

// Good: Clear usage of utility types
interface Article {
    id: string;
    title: string;
    content: string;
    author: string;
    publishedAt: Date;
    updatedAt: Date;
}

// For creating new articles (omit generated fields)
type CreateArticle = Omit<Article, "id" | "publishedAt" | "updatedAt">;

// For updating articles (only some fields changeable)
type UpdateArticle = Partial<Pick<Article, "title" | "content">>;

// For public display (omit internal fields)
type PublicArticle = Readonly<Omit<Article, "updatedAt">>;

function createArticle(data: CreateArticle): Article {
    return {
        id: Math.random().toString(),
        ...data,
        publishedAt: new Date(),
        updatedAt: new Date()
    };
}

function updateArticle(id: string, updates: UpdateArticle): void {
    console.log(`Updating article ${id}:`, updates);
}

const article = createArticle({
    title: "TypeScript Utility Types",
    content: "Learn about utility types...",
    author: "John Doe"
});

console.log("Created article:", article);
updateArticle(article.id, { title: "Updated Title" });
