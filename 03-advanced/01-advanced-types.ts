/**
 * 01. ADVANCED TYPES
 * 
 * Advanced type features including mapped types, conditional types,
 * template literal types, and more sophisticated type manipulations.
 */

// ============================================
// MAPPED TYPES
// ============================================

/**
 * Transform properties of existing types
 * Syntax: { [P in K]: T }
 */

// Make all properties readonly
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface User {
    id: string;
    name: string;
    email: string;
}

type ReadonlyUser = MyReadonly<User>;

const user: ReadonlyUser = {
    id: "123",
    name: "John",
    email: "john@example.com"
};

// user.name = "Jane"; // Error: readonly

/**
 * Make all properties optional
 */
type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

type PartialUser = MyPartial<User>;

const partialUser: PartialUser = {
    name: "Jane"
    // id and email are optional
};

/**
 * Make all properties nullable
 */
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;

const nullableUser: NullableUser = {
    id: "456",
    name: null,
    email: "jane@example.com"
};

console.log("Nullable user:", nullableUser);

/**
 * Map to boolean flags
 */
type Flags<T> = {
    [P in keyof T]: boolean;
};

type UserFlags = Flags<User>;

const userFlags: UserFlags = {
    id: true,
    name: false,
    email: true
};

console.log("User flags:", userFlags);

// ============================================
// CONDITIONAL TYPES
// ============================================

/**
 * Types that depend on conditions
 * Syntax: T extends U ? X : Y
 */

// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false

/**
 * Extract array element type
 */
type ArrayElementType<T> = T extends (infer E)[] ? E : T;

type StringArray = ArrayElementType<string[]>;  // string
type NumberType = ArrayElementType<number>;     // number

/**
 * Flatten nested arrays
 */
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>;     // string
type Num = Flatten<number[][]>;   // number[]

/**
 * Extract function return type
 */
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getNumber(): number {
    return 42;
}

type NumberType2 = MyReturnType<typeof getNumber>; // number

/**
 * Conditional types with unions (distributive)
 */
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// Distributes to: string[] | number[]

/**
 * Non-distributive conditional type
 */
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Combined = ToArrayNonDist<string | number>;
// Results in: (string | number)[]

// ============================================
// TEMPLATE LITERAL TYPES
// ============================================

/**
 * String manipulation at the type level
 */

// Basic template literal type
type Greeting = `Hello ${string}`;

const greeting1: Greeting = "Hello World";
const greeting2: Greeting = "Hello TypeScript";
// const invalid: Greeting = "Hi there"; // Error

/**
 * Combining string literals
 */
type Direction = "up" | "down" | "left" | "right";
type DirectionCommand = `move-${Direction}`;

const command: DirectionCommand = "move-up";
// const invalid2: DirectionCommand = "move-forward"; // Error

/**
 * Multiple interpolations
 */
type EventName = "click" | "focus" | "blur";
type ElementType = "button" | "input" | "div";
type ElementEvent = `${ElementType}-${EventName}`;

const event: ElementEvent = "button-click";

/**
 * Uppercase, Lowercase, Capitalize, Uncapitalize
 */
type UppercaseGreeting = Uppercase<"hello">;  // "HELLO"
type LowercaseGreeting = Lowercase<"HELLO">;  // "hello"
type CapitalizedGreeting = Capitalize<"hello">; // "Hello"
type UncapitalizedGreeting = Uncapitalize<"Hello">; // "hello"

/**
 * Practical example: HTTP methods
 */
type HttpMethod = "get" | "post" | "put" | "delete";
type ApiRoute = "/users" | "/posts" | "/comments";
type ApiEndpoint = `${Uppercase<HttpMethod>} ${ApiRoute}`;

const endpoint: ApiEndpoint = "GET /users";

console.log("API endpoint:", endpoint);

/**
 * Generate getter/setter names
 */
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//     getId: () => string;
//     getName: () => string;
//     getEmail: () => string;
// }

// ============================================
// KEY REMAPPING IN MAPPED TYPES
// ============================================

/**
 * Remap keys while creating mapped types
 */

// Remove specific prefix
type RemovePrefix<S extends string> = S extends `_${infer T}` ? T : S;

type InternalFields = {
    _id: string;
    _name: string;
    _email: string;
};

type PublicFields = {
    [K in keyof InternalFields as RemovePrefix<K>]: InternalFields[K];
};
// { id: string; name: string; email: string; }

/**
 * Filter properties
 */
type OnlyStrings<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Mixed {
    name: string;
    age: number;
    email: string;
    active: boolean;
}

type StringFields = OnlyStrings<Mixed>;
// { name: string; email: string; }

/**
 * Add prefix to keys
 */
type Prefixed<T, P extends string> = {
    [K in keyof T as `${P}${string & K}`]: T[K];
};

type PrefixedUser = Prefixed<User, "user_">;
// { user_id: string; user_name: string; user_email: string; }

// ============================================
// INDEX ACCESSED TYPES
// ============================================

/**
 * Access property types using index
 */
interface Product {
    id: number;
    name: string;
    price: number;
    tags: string[];
}

type ProductId = Product["id"];        // number
type ProductName = Product["name"];    // string
type ProductTag = Product["tags"][number]; // string (array element type)

/**
 * Get all value types
 */
type ProductValues = Product[keyof Product];
// number | string | string[]

/**
 * Nested access
 */
interface Order {
    id: string;
    customer: {
        name: string;
        address: {
            street: string;
            city: string;
        };
    };
}

type CustomerAddress = Order["customer"]["address"];
// { street: string; city: string; }

type City = Order["customer"]["address"]["city"];
// string

// ============================================
// RECURSIVE TYPES
// ============================================

/**
 * Types that reference themselves
 */

// JSON value type
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

const jsonData: JSONValue = {
    name: "John",
    age: 30,
    active: true,
    tags: ["typescript", "javascript"],
    address: {
        city: "NYC",
        country: "USA"
    }
};

console.log("JSON data:", jsonData);

/**
 * Tree structure
 */
interface TreeNode<T> {
    value: T;
    children?: TreeNode<T>[];
}

const tree: TreeNode<number> = {
    value: 1,
    children: [
        { value: 2 },
        {
            value: 3,
            children: [
                { value: 4 },
                { value: 5 }
            ]
        }
    ]
};

console.log("Tree structure:", tree);

/**
 * Deep readonly
 */
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object
        ? DeepReadonly<T[P]>
        : T[P];
};

interface NestedConfig {
    database: {
        host: string;
        port: number;
    };
}

type ReadonlyConfig = DeepReadonly<NestedConfig>;

const config: ReadonlyConfig = {
    database: {
        host: "localhost",
        port: 5432
    }
};

// config.database.host = "remote"; // Error: readonly

// ============================================
// INFER KEYWORD
// ============================================

/**
 * Extract types within conditional types
 */

// Extract promise value type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type StringPromise = UnwrapPromise<Promise<string>>;  // string
type NumberType3 = UnwrapPromise<number>;             // number

/**
 * Extract function parameters
 */
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

function example(a: string, b: number, c: boolean): void {}

type ExampleParams = MyParameters<typeof example>;
// [string, number, boolean]

/**
 * Extract array element type
 */
type ElementType<T> = T extends (infer E)[] ? E : never;

type Numbers = ElementType<number[]>;  // number

/**
 * Extract constructor parameter types
 */
type ConstructorParams<T> = T extends new (...args: infer P) => any ? P : never;

class Example {
    constructor(name: string, age: number) {}
}

type ExampleConstructorParams = ConstructorParams<typeof Example>;
// [string, number]

// ============================================
// VARIANCE ANNOTATIONS
// ============================================

/**
 * in/out modifiers for variance (TypeScript 4.7+)
 */

// Covariant (out) - can only be in output positions
type ReadOnlyBox<out T> = {
    get(): T;
};

// Contravariant (in) - can only be in input positions
type WriteOnlyBox<in T> = {
    set(value: T): void;
};

// Invariant (in out) - can be in both positions
type Box<in out T> = {
    get(): T;
    set(value: T): void;
};

// ============================================
// SATISFIES OPERATOR
// ============================================

/**
 * Check that a value matches a type without changing its type
 */
type Color = "red" | "green" | "blue" | { r: number; g: number; b: number };

// Using satisfies - preserves literal types
const color1 = "red" satisfies Color;
// Type: "red" (not Color)

const color2 = { r: 255, g: 0, b: 0 } satisfies Color;
// Type: { r: number; g: number; b: number }

// Without satisfies - widens to Color type
const color3: Color = "red";
// Type: Color

console.log("Colors:", color1, color2, color3);

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use mapped types for transforming object structures
 * 2. Use conditional types for type-level logic
 * 3. Use template literal types for string manipulation
 * 4. Use key remapping for filtering/transforming properties
 * 5. Keep recursive types simple to avoid infinite loops
 * 6. Use infer carefully - only when necessary
 * 7. Document complex type transformations
 * 8. Test edge cases with your type utilities
 * 9. Consider performance with very complex types
 * 10. Use satisfies for type checking without widening
 */

// Good: Well-documented advanced type utility
/**
 * Creates a type with all properties from T that are functions
 */
type FunctionProperties<T> = {
    [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

interface UserService {
    name: string;
    age: number;
    login(): void;
    logout(): void;
    updateProfile(data: any): void;
}

type UserServiceMethods = FunctionProperties<UserService>;
// { login: () => void; logout: () => void; updateProfile: (data: any) => void; }

console.log("Advanced types examples completed");
