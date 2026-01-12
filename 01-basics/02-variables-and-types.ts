/**
 * 02. VARIABLES AND DATA TYPES
 * 
 * TypeScript supports all JavaScript data types plus additional ones.
 * Type annotations help specify what kind of data a variable can hold.
 * 
 * SYNTAX: let variableName: type = value;
 */

// ============================================
// PRIMITIVE TYPES
// ============================================

/**
 * 1. STRING
 * Represents textual data enclosed in quotes
 */
let userName: string = "John Doe";
let message: string = 'Hello, TypeScript!';
let template: string = `User: ${userName}`; // Template literal

console.log("String examples:", userName, message, template);

/**
 * 2. NUMBER
 * All numbers in TypeScript are floating point values
 * Supports decimal, hex, binary, and octal literals
 */
let decimal: number = 42;
let float: number = 3.14;
let hex: number = 0xf00d;      // Hexadecimal
let binary: number = 0b1010;   // Binary
let octal: number = 0o744;     // Octal

console.log("Number examples:", decimal, float, hex, binary, octal);

/**
 * 3. BOOLEAN
 * Represents true or false values
 */
let isActive: boolean = true;
let isCompleted: boolean = false;
let hasPermission: boolean = 1 > 0; // Result of comparison

console.log("Boolean examples:", isActive, isCompleted, hasPermission);

/**
 * 4. NULL and UNDEFINED
 * Represent absence of value
 */
let nothing: null = null;           // Intentional absence of value
let notDefined: undefined = undefined; // Variable declared but not assigned

console.log("Null/Undefined:", nothing, notDefined);

/**
 * 5. ANY
 * Opt-out of type checking (use sparingly!)
 * Can hold any type of value
 */
let dynamic: any = "string";
dynamic = 42;           // OK
dynamic = true;         // OK
dynamic = { key: "value" }; // OK

console.log("Any type:", dynamic);

/**
 * 6. UNKNOWN
 * Type-safe counterpart of any
 * Must narrow the type before using
 */
let uncertain: unknown = "might be anything";

// Type checking required before use
if (typeof uncertain === "string") {
    console.log("Unknown narrowed to string:", uncertain.toUpperCase());
}

/**
 * 7. VOID
 * Represents absence of any type (commonly used for functions that don't return)
 */
function logMessage(msg: string): void {
    console.log(msg);
    // No return statement
}

/**
 * 8. NEVER
 * Represents values that never occur
 * Used for functions that never return (throw errors or infinite loops)
 */
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // Never exits
    }
}

/**
 * 9. SYMBOL
 * Unique and immutable primitive value
 */
const uniqueId: symbol = Symbol("id");
const anotherId: symbol = Symbol("id");
console.log("Symbols are unique:", uniqueId === anotherId); // false

/**
 * 10. BIGINT
 * For integers larger than Number.MAX_SAFE_INTEGER
 */
let bigNumber: bigint = 9007199254740991n;
let anotherBig: bigint = BigInt(9007199254740991);

console.log("BigInt:", bigNumber);

// ============================================
// VARIABLE DECLARATIONS
// ============================================

/**
 * LET - Block-scoped variable (can be reassigned)
 */
let count: number = 10;
count = 20; // OK

/**
 * CONST - Block-scoped constant (cannot be reassigned)
 */
const PI: number = 3.14159;
// PI = 3.14; // Error: Cannot assign to 'PI' because it is a constant

/**
 * VAR - Function-scoped (avoid using, use let/const instead)
 */
var oldStyle: string = "avoid using var";

// ============================================
// TYPE INFERENCE
// ============================================

/**
 * TypeScript can automatically infer types
 */
let inferredString = "TypeScript is smart"; // Type: string
let inferredNumber = 100;                    // Type: number
let inferredBoolean = true;                  // Type: boolean

// These work just like explicitly typed variables
// inferredString = 123; // Error: Type 'number' is not assignable to type 'string'

console.log("Type inference:", typeof inferredString, typeof inferredNumber);

// ============================================
// TYPE ASSERTIONS
// ============================================

/**
 * Tell TypeScript to treat a value as a specific type
 * Two syntaxes: angle-bracket and 'as' syntax
 */
let someValue: any = "this is a string";

// Angle-bracket syntax (not available in JSX)
let strLength1: number = (<string>someValue).length;

// 'as' syntax (preferred)
let strLength2: number = (someValue as string).length;

console.log("String length:", strLength2);

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Always use explicit types for function parameters and return values
 * 2. Let TypeScript infer types for simple variable assignments
 * 3. Avoid using 'any' - use 'unknown' if you're unsure
 * 4. Use 'const' by default, 'let' when reassignment is needed
 * 5. Never use 'var' in modern TypeScript/JavaScript
 */

// Good example
function addNumbers(a: number, b: number): number {
    return a + b;
}

const result = addNumbers(5, 10); // Type inferred as number
console.log("Addition result:", result);
