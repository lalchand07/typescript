/**
 * 03. FUNCTIONS
 * 
 * Functions are the building blocks of readable, maintainable, and reusable code.
 * TypeScript adds type annotations to parameters and return values.
 */

// ============================================
// FUNCTION DECLARATIONS
// ============================================

/**
 * Basic function with typed parameters and return type
 */
function add(a: number, b: number): number {
    return a + b;
}

console.log("Add function:", add(5, 3)); // Output: 8

/**
 * Function with no return value (void)
 */
function greet(name: string): void {
    console.log(`Hello, ${name}!`);
}

greet("Alice");

// ============================================
// FUNCTION EXPRESSIONS
// ============================================

/**
 * Anonymous function assigned to a variable
 */
const multiply = function(x: number, y: number): number {
    return x * y;
};

console.log("Multiply:", multiply(4, 5)); // Output: 20

/**
 * Arrow function (ES6+)
 * Concise syntax for function expressions
 */
const subtract = (a: number, b: number): number => {
    return a - b;
};

// Even more concise (implicit return for single expressions)
const divide = (a: number, b: number): number => a / b;

console.log("Subtract:", subtract(10, 3)); // Output: 7
console.log("Divide:", divide(20, 4));     // Output: 5

// ============================================
// OPTIONAL PARAMETERS
// ============================================

/**
 * Optional parameters are marked with '?'
 * They must come after required parameters
 */
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName} ${lastName}`;
    }
    return firstName;
}

console.log("Name 1:", buildName("John"));           // "John"
console.log("Name 2:", buildName("John", "Doe"));    // "John Doe"

// ============================================
// DEFAULT PARAMETERS
// ============================================

/**
 * Parameters can have default values
 */
function calculatePrice(price: number, tax: number = 0.1): number {
    return price + (price * tax);
}

console.log("Price with default tax:", calculatePrice(100));     // 110
console.log("Price with custom tax:", calculatePrice(100, 0.2)); // 120

// ============================================
// REST PARAMETERS
// ============================================

/**
 * Collect multiple arguments into an array
 * Must be the last parameter
 */
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log("Sum of numbers:", sum(1, 2, 3, 4, 5)); // Output: 15

function introduce(greeting: string, ...names: string[]): string {
    return `${greeting} ${names.join(", ")}!`;
}

console.log("Greeting:", introduce("Hello", "Alice", "Bob", "Charlie"));

// ============================================
// FUNCTION OVERLOADING
// ============================================

/**
 * Define multiple function signatures for the same function
 * Useful when a function can accept different parameter types
 */

// Overload signatures
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

// Implementation signature
function format(value: string | number | boolean): string {
    if (typeof value === "string") {
        return `String: ${value}`;
    } else if (typeof value === "number") {
        return `Number: ${value.toFixed(2)}`;
    } else {
        return `Boolean: ${value}`;
    }
}

console.log("Format overloads:");
console.log(format("Hello"));   // String: Hello
console.log(format(42.5));      // Number: 42.50
console.log(format(true));      // Boolean: true

// ============================================
// FUNCTION TYPES
// ============================================

/**
 * You can define types for functions themselves
 */
type MathOperation = (a: number, b: number) => number;

const add2: MathOperation = (a, b) => a + b;
const multiply2: MathOperation = (a, b) => a * b;

console.log("Using function type:", add2(10, 5), multiply2(10, 5));

// ============================================
// CALLBACK FUNCTIONS
// ============================================

/**
 * Functions can accept other functions as parameters
 */
function processArray(arr: number[], callback: (num: number) => number): number[] {
    return arr.map(callback);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (n) => n * 2);
const squared = processArray(numbers, (n) => n * n);

console.log("Original:", numbers);
console.log("Doubled:", doubled);
console.log("Squared:", squared);

// ============================================
// HIGHER-ORDER FUNCTIONS
// ============================================

/**
 * Functions that return other functions
 */
function multiplier(factor: number): (num: number) => number {
    return (num: number) => num * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log("Double 5:", double(5));  // 10
console.log("Triple 5:", triple(5));  // 15

// ============================================
// THIS PARAMETER
// ============================================

/**
 * Explicitly type the 'this' context
 */
interface User {
    name: string;
    age: number;
}

function getUserInfo(this: User): string {
    return `${this.name} is ${this.age} years old`;
}

const user: User = { name: "Bob", age: 30 };
console.log("User info:", getUserInfo.call(user));

// ============================================
// GENERIC FUNCTIONS
// ============================================

/**
 * Functions that work with multiple types
 * Type parameter is defined in angle brackets
 */
function identity<T>(arg: T): T {
    return arg;
}

const stringId = identity<string>("hello");  // Type: string
const numberId = identity<number>(42);       // Type: number
const autoInferred = identity("inferred");   // Type inferred as string

console.log("Generic function:", stringId, numberId, autoInferred);

/**
 * Generic function with type constraints
 */
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

console.log("Length of array:", getLength([1, 2, 3]));      // 3
console.log("Length of string:", getLength("hello"));       // 5
// console.log(getLength(123)); // Error: number doesn't have length

// ============================================
// ASYNC FUNCTIONS
// ============================================

/**
 * Functions that return Promises
 * Use async/await for cleaner asynchronous code
 */
async function fetchData(url: string): Promise<string> {
    // Simulating API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

// Using async function
async function getData(): Promise<void> {
    console.log("Fetching data...");
    const data = await fetchData("https://api.example.com");
    console.log("Received:", data);
}

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Always add type annotations to function parameters
 * 2. Explicitly type return values for public APIs
 * 3. Use arrow functions for callbacks and short functions
 * 4. Prefer const for function expressions
 * 5. Use optional parameters instead of undefined
 * 6. Keep functions small and focused (single responsibility)
 * 7. Use meaningful parameter and function names
 */

// Good example: clear types and purpose
function calculateDiscount(
    originalPrice: number,
    discountPercent: number = 0
): number {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error("Discount must be between 0 and 100");
    }
    return originalPrice * (1 - discountPercent / 100);
}

console.log("Discounted price:", calculateDiscount(100, 20)); // 80
