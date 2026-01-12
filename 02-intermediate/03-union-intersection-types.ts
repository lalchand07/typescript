/**
 * 03. UNION AND INTERSECTION TYPES
 * 
 * Union types allow a value to be one of several types.
 * Intersection types combine multiple types into one.
 */

// ============================================
// UNION TYPES
// ============================================

/**
 * Basic union type - value can be one of multiple types
 */
type StringOrNumber = string | number;

let value: StringOrNumber;
value = "Hello";    // OK
value = 42;         // OK
// value = true;    // Error: boolean is not assignable

console.log("Union value:", value);

/**
 * Function with union type parameter
 */
function formatId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();
    } else {
        return `ID-${id.toString().padStart(5, "0")}`;
    }
}

console.log("Format ID (string):", formatId("abc123"));
console.log("Format ID (number):", formatId(42));

/**
 * Union with multiple types
 */
type Status = "success" | "error" | "loading" | "idle";

function handleStatus(status: Status): void {
    switch (status) {
        case "success":
            console.log("✓ Operation successful");
            break;
        case "error":
            console.log("✗ Operation failed");
            break;
        case "loading":
            console.log("⏳ Loading...");
            break;
        case "idle":
            console.log("⚊ Idle");
            break;
    }
}

handleStatus("success");
handleStatus("loading");
// handleStatus("pending"); // Error: not assignable to type Status

/**
 * Union with object types
 */
interface Dog {
    type: "dog";
    bark(): void;
}

interface Cat {
    type: "cat";
    meow(): void;
}

type Pet = Dog | Cat;

function handlePet(pet: Pet): void {
    // Discriminated union - using 'type' property
    if (pet.type === "dog") {
        pet.bark(); // TypeScript knows it's a Dog
    } else {
        pet.meow(); // TypeScript knows it's a Cat
    }
}

const myDog: Dog = {
    type: "dog",
    bark() {
        console.log("Woof!");
    }
};

const myCat: Cat = {
    type: "cat",
    meow() {
        console.log("Meow!");
    }
};

handlePet(myDog);
handlePet(myCat);

/**
 * Union with null/undefined
 */
type MaybeString = string | null | undefined;

function getLength(str: MaybeString): number {
    // Need to check for null/undefined
    if (str === null || str === undefined) {
        return 0;
    }
    return str.length;
}

console.log("Length:", getLength("Hello"));
console.log("Length (null):", getLength(null));
console.log("Length (undefined):", getLength(undefined));

/**
 * Array with union types
 */
type MixedArray = (string | number | boolean)[];

const mixed: MixedArray = ["hello", 42, true, "world", 99];
console.log("Mixed array:", mixed);

// ============================================
// INTERSECTION TYPES
// ============================================

/**
 * Intersection type - combines multiple types
 */
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: string;
    department: string;
}

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: "John Doe",
    age: 30,
    employeeId: "EMP-001",
    department: "Engineering"
};

console.log("Employee:", employee);

/**
 * Intersection with multiple types
 */
interface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

interface Serializable {
    serialize(): string;
}

type FullyFeatured = Printable & Loggable & Serializable;

const document: FullyFeatured = {
    print() {
        console.log("Printing document...");
    },
    log() {
        console.log("Logging document...");
    },
    serialize() {
        return JSON.stringify({ content: "data" });
    }
};

document.print();
document.log();
console.log("Serialized:", document.serialize());

/**
 * Intersection for extending types
 */
type WithTimestamp = {
    createdAt: Date;
    updatedAt: Date;
};

type User = {
    id: string;
    name: string;
    email: string;
};

type UserWithTimestamp = User & WithTimestamp;

const user: UserWithTimestamp = {
    id: "USR-001",
    name: "Alice",
    email: "alice@example.com",
    createdAt: new Date(),
    updatedAt: new Date()
};

console.log("User with timestamp:", user);

// ============================================
// DISCRIMINATED UNIONS (TAGGED UNIONS)
// ============================================

/**
 * Pattern for type-safe union handling
 * Each type has a common property (discriminant/tag)
 */
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

type Shape = Circle | Square | Rectangle;

function calculateArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "rectangle":
            return shape.width * shape.height;
        default:
            // Exhaustiveness check
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}

const circle: Circle = { kind: "circle", radius: 5 };
const square: Square = { kind: "square", sideLength: 10 };
const rectangle: Rectangle = { kind: "rectangle", width: 10, height: 5 };

console.log("Circle area:", calculateArea(circle));
console.log("Square area:", calculateArea(square));
console.log("Rectangle area:", calculateArea(rectangle));

/**
 * Discriminated union for API responses
 */
interface SuccessResponse {
    status: "success";
    data: any;
}

interface ErrorResponse {
    status: "error";
    message: string;
    code: number;
}

interface LoadingResponse {
    status: "loading";
}

type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse;

function handleResponse(response: ApiResponse): void {
    switch (response.status) {
        case "success":
            console.log("Data:", response.data);
            break;
        case "error":
            console.log(`Error ${response.code}: ${response.message}`);
            break;
        case "loading":
            console.log("Loading...");
            break;
    }
}

handleResponse({ status: "success", data: { user: "Alice" } });
handleResponse({ status: "error", message: "Not found", code: 404 });
handleResponse({ status: "loading" });

// ============================================
// TYPE NARROWING WITH UNIONS
// ============================================

/**
 * Using typeof for type narrowing
 */
function process(value: string | number): string {
    if (typeof value === "string") {
        // TypeScript knows value is string here
        return value.toUpperCase();
    } else {
        // TypeScript knows value is number here
        return value.toFixed(2);
    }
}

console.log("Process string:", process("hello"));
console.log("Process number:", process(42.123));

/**
 * Using instanceof for type narrowing
 */
class NetworkError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

function handleError(error: Error | NetworkError): void {
    if (error instanceof NetworkError) {
        console.log(`Network error ${error.code}: ${error.message}`);
    } else {
        console.log(`Error: ${error.message}`);
    }
}

handleError(new Error("Generic error"));
handleError(new NetworkError("Connection failed", 500));

/**
 * Using 'in' operator for type narrowing
 */
interface Fish {
    swim(): void;
}

interface Bird {
    fly(): void;
}

function move(animal: Fish | Bird): void {
    if ("swim" in animal) {
        animal.swim();
    } else {
        animal.fly();
    }
}

const fish: Fish = {
    swim() {
        console.log("Swimming 🐟");
    }
};

const bird: Bird = {
    fly() {
        console.log("Flying 🐦");
    }
};

move(fish);
move(bird);

// ============================================
// INTERSECTION WITH UTILITY TYPES
// ============================================

/**
 * Combining intersection with built-in utility types
 */
type PartialPerson = Partial<Person> & { id: string };

const partialPerson: PartialPerson = {
    id: "123",
    name: "John"
    // age is optional due to Partial
};

console.log("Partial person:", partialPerson);

/**
 * Intersection for adding metadata
 */
type WithMetadata<T> = T & {
    metadata: {
        version: string;
        lastModified: Date;
    };
};

type UserWithMetadata = WithMetadata<User>;

const userWithMeta: UserWithMetadata = {
    id: "USR-002",
    name: "Bob",
    email: "bob@example.com",
    metadata: {
        version: "1.0",
        lastModified: new Date()
    }
};

console.log("User with metadata:", userWithMeta);

// ============================================
// UNION AND INTERSECTION TOGETHER
// ============================================

/**
 * Combining union and intersection for complex types
 */
type A = { a: string };
type B = { b: number };
type C = { c: boolean };

// Union of intersections
type UnionOfIntersections = (A & B) | (B & C);

const example1: UnionOfIntersections = { a: "test", b: 42 };
const example2: UnionOfIntersections = { b: 42, c: true };

console.log("Examples:", example1, example2);

// Intersection of unions
type IntersectionOfUnions = (A | B) & (B | C);
// This simplifies to: B (the common type)

// ============================================
// PRACTICAL EXAMPLES
// ============================================

/**
 * Example 1: Form validation
 */
type ValidationResult = 
    | { isValid: true; value: string }
    | { isValid: false; errors: string[] };

function validateEmail(email: string): ValidationResult {
    if (!email.includes("@")) {
        return {
            isValid: false,
            errors: ["Email must contain @"]
        };
    }
    if (email.length < 5) {
        return {
            isValid: false,
            errors: ["Email too short"]
        };
    }
    return {
        isValid: true,
        value: email
    };
}

const result1 = validateEmail("test@example.com");
const result2 = validateEmail("invalid");

if (result1.isValid) {
    console.log("Valid email:", result1.value);
}

if (!result2.isValid) {
    console.log("Validation errors:", result2.errors);
}

/**
 * Example 2: Payment processing
 */
interface CreditCard {
    type: "credit_card";
    cardNumber: string;
    cvv: string;
}

interface PayPal {
    type: "paypal";
    email: string;
}

interface BankTransfer {
    type: "bank_transfer";
    accountNumber: string;
    routingNumber: string;
}

type PaymentMethod = CreditCard | PayPal | BankTransfer;

function processPayment(method: PaymentMethod, amount: number): void {
    switch (method.type) {
        case "credit_card":
            console.log(`Processing $${amount} via credit card ending in ${method.cardNumber.slice(-4)}`);
            break;
        case "paypal":
            console.log(`Processing $${amount} via PayPal (${method.email})`);
            break;
        case "bank_transfer":
            console.log(`Processing $${amount} via bank transfer to ${method.accountNumber}`);
            break;
    }
}

processPayment({ type: "credit_card", cardNumber: "1234567890123456", cvv: "123" }, 99.99);
processPayment({ type: "paypal", email: "user@example.com" }, 49.99);

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use union types for values that can be one of several types
 * 2. Use intersection types to combine multiple type requirements
 * 3. Prefer discriminated unions for complex union types
 * 4. Use type narrowing to work safely with unions
 * 5. Keep union types simple and focused
 * 6. Document complex union/intersection types
 * 7. Use never type for exhaustiveness checks
 * 8. Prefer interfaces for object shapes, types for unions/intersections
 */

// Good: Clear discriminated union with exhaustive checking
type Action =
    | { type: "add"; payload: { text: string } }
    | { type: "delete"; payload: { id: number } }
    | { type: "update"; payload: { id: number; text: string } }
    | { type: "clear" };

function reducer(state: any[], action: Action): any[] {
    switch (action.type) {
        case "add":
            return [...state, { text: action.payload.text }];
        case "delete":
            return state.filter(item => item.id !== action.payload.id);
        case "update":
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, text: action.payload.text }
                    : item
            );
        case "clear":
            return [];
        default:
            // Exhaustiveness check
            const _exhaustive: never = action;
            return state;
    }
}

console.log("Reducer example completed");
