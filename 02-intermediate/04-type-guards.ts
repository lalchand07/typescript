/**
 * 04. TYPE GUARDS AND TYPE NARROWING
 * 
 * Type guards are runtime checks that narrow down types within conditional blocks.
 * They help TypeScript understand which specific type you're working with.
 */

// ============================================
// TYPEOF TYPE GUARDS
// ============================================

/**
 * Using typeof for primitive types
 */
function processValue(value: string | number | boolean): string {
    if (typeof value === "string") {
        // value is string here
        return value.toUpperCase();
    } else if (typeof value === "number") {
        // value is number here
        return value.toFixed(2);
    } else {
        // value is boolean here
        return value ? "YES" : "NO";
    }
}

console.log("Process string:", processValue("hello"));
console.log("Process number:", processValue(42.567));
console.log("Process boolean:", processValue(true));

/**
 * typeof returns specific string literals
 * "string", "number", "boolean", "symbol", "undefined", "object", "function", "bigint"
 */
function checkType(value: unknown): string {
    const type = typeof value;
    console.log(`Type of ${value} is:`, type);
    return type;
}

checkType("text");
checkType(123);
checkType(true);
checkType(undefined);
checkType({});
checkType(() => {});

// ============================================
// INSTANCEOF TYPE GUARDS
// ============================================

/**
 * Using instanceof for class instances
 */
class Dog {
    bark(): void {
        console.log("Woof!");
    }
}

class Cat {
    meow(): void {
        console.log("Meow!");
    }
}

function makeSound(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark(); // TypeScript knows it's a Dog
    } else {
        animal.meow(); // TypeScript knows it's a Cat
    }
}

makeSound(new Dog());
makeSound(new Cat());

/**
 * instanceof with built-in classes
 */
function handleError(error: unknown): void {
    if (error instanceof Error) {
        console.log("Error message:", error.message);
        console.log("Stack trace:", error.stack);
    } else if (error instanceof String) {
        console.log("String error:", error);
    } else {
        console.log("Unknown error:", error);
    }
}

handleError(new Error("Something went wrong"));
handleError("String error");
handleError({ custom: "error" });

// ============================================
// IN OPERATOR TYPE GUARDS
// ============================================

/**
 * Using 'in' to check property existence
 */
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape): number {
    if ("width" in shape) {
        // shape is Rectangle
        return shape.width * shape.height;
    } else {
        // shape is Square
        return shape.size * shape.size;
    }
}

console.log("Square area:", calculateArea({ kind: "square", size: 5 }));
console.log("Rectangle area:", calculateArea({ kind: "rectangle", width: 10, height: 5 }));

/**
 * 'in' with optional properties
 */
interface Car {
    drive(): void;
    wheels: number;
}

interface Boat {
    sail(): void;
    propellers?: number;
}

function operate(vehicle: Car | Boat): void {
    if ("wheels" in vehicle) {
        vehicle.drive();
        console.log(`Driving with ${vehicle.wheels} wheels`);
    } else {
        vehicle.sail();
        if ("propellers" in vehicle && vehicle.propellers) {
            console.log(`Sailing with ${vehicle.propellers} propellers`);
        }
    }
}

operate({ drive() { console.log("Driving"); }, wheels: 4 });
operate({ sail() { console.log("Sailing"); } });

// ============================================
// CUSTOM TYPE GUARDS (USER-DEFINED)
// ============================================

/**
 * Type predicate: parameterName is Type
 */
interface Fish {
    swim(): void;
}

interface Bird {
    fly(): void;
}

// Custom type guard function
function isFish(animal: Fish | Bird): animal is Fish {
    return (animal as Fish).swim !== undefined;
}

function move(animal: Fish | Bird): void {
    if (isFish(animal)) {
        animal.swim(); // TypeScript knows it's Fish
    } else {
        animal.fly(); // TypeScript knows it's Bird
    }
}

const fish: Fish = { swim() { console.log("Swimming"); } };
const bird: Bird = { fly() { console.log("Flying"); } };

move(fish);
move(bird);

/**
 * Type guard with complex logic
 */
interface Admin {
    role: "admin";
    permissions: string[];
}

interface User {
    role: "user";
    username: string;
}

function isAdmin(user: Admin | User): user is Admin {
    return user.role === "admin" && "permissions" in user;
}

function checkAccess(user: Admin | User): void {
    if (isAdmin(user)) {
        console.log("Admin permissions:", user.permissions);
    } else {
        console.log("Regular user:", user.username);
    }
}

checkAccess({ role: "admin", permissions: ["read", "write", "delete"] });
checkAccess({ role: "user", username: "john_doe" });

/**
 * Type guard for null/undefined checks
 */
function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

function processArray(arr: (string | null | undefined)[]): string[] {
    return arr.filter(isDefined); // Returns only defined strings
}

const mixedArray = ["hello", null, "world", undefined, "typescript"];
const cleanArray = processArray(mixedArray);
console.log("Clean array:", cleanArray);

// ============================================
// DISCRIMINATED UNIONS TYPE GUARDS
// ============================================

/**
 * Using discriminant property for type narrowing
 */
interface NetworkLoadingState {
    state: "loading";
}

interface NetworkFailedState {
    state: "failed";
    error: string;
}

interface NetworkSuccessState {
    state: "success";
    data: string;
}

type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState;

function handleNetworkState(state: NetworkState): string {
    // Type guard using discriminant property
    switch (state.state) {
        case "loading":
            return "Loading...";
        case "failed":
            return `Error: ${state.error}`;
        case "success":
            return `Data: ${state.data}`;
    }
}

console.log(handleNetworkState({ state: "loading" }));
console.log(handleNetworkState({ state: "failed", error: "Network error" }));
console.log(handleNetworkState({ state: "success", data: "User data" }));

// ============================================
// TRUTHINESS NARROWING
// ============================================

/**
 * Using truthiness to narrow types
 */
function printLength(str: string | null | undefined): void {
    // Truthiness check
    if (str) {
        // str is string here (not null or undefined)
        console.log("Length:", str.length);
    } else {
        console.log("No string provided");
    }
}

printLength("Hello");
printLength(null);
printLength(undefined);

/**
 * Caution with truthiness
 */
function printValue(value: string | number | null): void {
    if (value) {
        console.log("Value:", value);
    } else {
        // This catches null, 0, and ""
        console.log("No value (or 0 or empty string)");
    }
}

printValue("test");
printValue(42);
printValue(0);  // Caught as falsy!
printValue(""); // Caught as falsy!
printValue(null);

// ============================================
// EQUALITY NARROWING
// ============================================

/**
 * Using === and !== for type narrowing
 */
function compare(x: string | number, y: string | boolean): void {
    if (x === y) {
        // x and y are both strings here (only common type)
        console.log("Both are strings:", x.toUpperCase(), y.toUpperCase());
    } else {
        console.log("Different types or values:", x, y);
    }
}

compare("hello", "hello");
compare("hello", true);
compare(42, true);

/**
 * null and undefined checks
 */
function processNullable(value: string | null | undefined): string {
    if (value === null) {
        return "Value is null";
    }
    if (value === undefined) {
        return "Value is undefined";
    }
    // value is string here
    return value.toUpperCase();
}

console.log(processNullable("test"));
console.log(processNullable(null));
console.log(processNullable(undefined));

// ============================================
// CONTROL FLOW ANALYSIS
// ============================================

/**
 * TypeScript analyzes control flow to narrow types
 */
function example1(x: string | number): void {
    if (typeof x === "string") {
        console.log(x.toUpperCase());
        return; // Early return
    }
    // x is number here automatically
    console.log(x.toFixed(2));
}

example1("hello");
example1(42.567);

/**
 * Control flow with throw
 */
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error("Not a string!");
    }
}

function processUnknown(value: unknown): void {
    assertIsString(value);
    // value is string here after assertion
    console.log("String value:", value.toUpperCase());
}

processUnknown("test");
// processUnknown(123); // Throws error

// ============================================
// ASSERTION FUNCTIONS
// ============================================

/**
 * Functions that assert a condition is true
 */
function assert(condition: unknown, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

function processValue2(value: string | null): void {
    assert(value !== null, "Value must not be null");
    // value is string here
    console.log("Processing:", value.toUpperCase());
}

processValue2("hello");
// processValue2(null); // Throws error

/**
 * Type assertion function
 */
function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number") {
        throw new Error("Not a number!");
    }
}

function calculate(input: unknown): number {
    assertIsNumber(input);
    // input is number here
    return input * 2;
}

console.log("Calculate:", calculate(21));

// ============================================
// ARRAY METHODS WITH TYPE GUARDS
// ============================================

/**
 * Using type guards with array methods
 */
interface Product {
    id: number;
    name: string;
    price?: number;
}

const products: Product[] = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse" },
    { id: 3, name: "Keyboard", price: 79 }
];

// Filter products with prices
const productsWithPrices = products.filter((p): p is Product & { price: number } => {
    return p.price !== undefined;
});

// Now all products in this array have price defined
productsWithPrices.forEach(p => {
    console.log(`${p.name}: $${p.price.toFixed(2)}`);
});

// ============================================
// NEVER TYPE FOR EXHAUSTIVENESS
// ============================================

/**
 * Using never to ensure all cases are handled
 */
type Status = "idle" | "loading" | "success" | "error";

function getStatusMessage(status: Status): string {
    switch (status) {
        case "idle":
            return "Ready";
        case "loading":
            return "Loading...";
        case "success":
            return "Complete";
        case "error":
            return "Failed";
        default:
            // If we add a new status and forget to handle it,
            // TypeScript will show an error here
            const exhaustiveCheck: never = status;
            return exhaustiveCheck;
    }
}

console.log("Status messages:", getStatusMessage("idle"));

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use typeof for primitive types
 * 2. Use instanceof for class instances
 * 3. Use 'in' operator for property checks
 * 4. Create custom type guards for complex types
 * 5. Use discriminated unions with discriminant properties
 * 6. Be careful with truthiness checks (0 and "" are falsy)
 * 7. Use assertion functions for validation
 * 8. Use never type for exhaustiveness checking
 * 9. Let TypeScript's control flow analysis do the work
 * 10. Prefer specific checks over general ones
 */

// Good: Clear type guard with specific checks
interface ApiSuccessResponse {
    status: 200;
    data: any;
}

interface ApiErrorResponse {
    status: 400 | 404 | 500;
    error: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

function isSuccessResponse(response: ApiResponse): response is ApiSuccessResponse {
    return response.status === 200;
}

function handleApiResponse(response: ApiResponse): void {
    if (isSuccessResponse(response)) {
        console.log("Success! Data:", response.data);
    } else {
        console.log(`Error ${response.status}: ${response.error}`);
    }
}

handleApiResponse({ status: 200, data: { user: "Alice" } });
handleApiResponse({ status: 404, error: "Not found" });
