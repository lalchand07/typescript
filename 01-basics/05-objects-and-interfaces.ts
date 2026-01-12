/**
 * 05. OBJECTS AND INTERFACES
 * 
 * Objects are collections of key-value pairs.
 * Interfaces define the structure (shape) of objects.
 * They provide type-checking and serve as contracts for object structure.
 */

// ============================================
// BASIC OBJECTS
// ============================================

/**
 * Object with inline type annotation
 */
let user: { name: string; age: number; email: string } = {
    name: "John Doe",
    age: 30,
    email: "john@example.com"
};

console.log("User object:", user);
console.log("User name:", user.name);

/**
 * Object with type alias
 */
type Person = {
    name: string;
    age: number;
    email: string;
};

const person: Person = {
    name: "Alice Smith",
    age: 28,
    email: "alice@example.com"
};

console.log("Person:", person);

// ============================================
// INTERFACES
// ============================================

/**
 * BASIC INTERFACE
 * Interfaces define the structure of an object
 */
interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
}

const employee: Employee = {
    id: 101,
    name: "Bob Johnson",
    department: "Engineering",
    salary: 75000
};

console.log("Employee:", employee);

/**
 * OPTIONAL PROPERTIES
 * Properties that may or may not exist
 */
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;  // Optional property
    category?: string;
}

const product1: Product = {
    id: 1,
    name: "Laptop",
    price: 999.99
};

const product2: Product = {
    id: 2,
    name: "Mouse",
    price: 29.99,
    description: "Wireless gaming mouse",
    category: "Accessories"
};

console.log("Products:", product1, product2);

/**
 * READONLY PROPERTIES
 * Properties that cannot be changed after creation
 */
interface Config {
    readonly apiUrl: string;
    readonly apiKey: string;
    timeout: number;
}

const config: Config = {
    apiUrl: "https://api.example.com",
    apiKey: "secret-key-123",
    timeout: 5000
};

config.timeout = 10000; // OK
// config.apiUrl = "https://newurl.com"; // Error: readonly property

console.log("Config:", config);

/**
 * METHOD SIGNATURES
 * Interfaces can define methods
 */
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const calculator: Calculator = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    }
};

console.log("Calculator: 5 + 3 =", calculator.add(5, 3));
console.log("Calculator: 5 - 3 =", calculator.subtract(5, 3));

/**
 * FUNCTION TYPE PROPERTIES
 */
interface Validator {
    isValid: (value: string) => boolean;
}

const emailValidator: Validator = {
    isValid: (value) => value.includes("@")
};

console.log("Email validation:", emailValidator.isValid("test@example.com"));

// ============================================
// EXTENDING INTERFACES
// ============================================

/**
 * Interfaces can extend other interfaces
 */
interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

const myDog: Dog = {
    name: "Buddy",
    age: 5,
    breed: "Golden Retriever",
    bark() {
        console.log("Woof! Woof!");
    }
};

console.log("Dog:", myDog);
myDog.bark();

/**
 * EXTENDING MULTIPLE INTERFACES
 */
interface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

interface Document extends Printable, Loggable {
    title: string;
    content: string;
}

const document: Document = {
    title: "My Document",
    content: "Document content here",
    print() {
        console.log(`Printing: ${this.title}`);
    },
    log() {
        console.log(`Logging: ${this.title} - ${this.content}`);
    }
};

document.print();
document.log();

// ============================================
// INDEX SIGNATURES
// ============================================

/**
 * For objects with dynamic property names
 */
interface StringMap {
    [key: string]: string;
}

const translations: StringMap = {
    hello: "Hola",
    goodbye: "Adiós",
    thanks: "Gracias"
};

console.log("Translation:", translations["hello"]);
console.log("Translation:", translations.goodbye);

/**
 * INDEX SIGNATURE WITH SPECIFIC TYPES
 */
interface ScoreBoard {
    [playerName: string]: number;
}

const scores: ScoreBoard = {
    Alice: 95,
    Bob: 87,
    Charlie: 92
};

console.log("Scores:", scores);

/**
 * COMBINING INDEX SIGNATURE WITH DEFINED PROPERTIES
 */
interface Dictionary {
    [key: string]: string | number;
    count: number;  // Specific property
}

const dict: Dictionary = {
    count: 3,
    word1: "hello",
    word2: "world",
    number: 42
};

console.log("Dictionary:", dict);

// ============================================
// INTERFACE VS TYPE ALIAS
// ============================================

/**
 * Interfaces are better for object shapes and can be extended
 * Type aliases are more flexible (unions, intersections, primitives)
 */

// Interface - good for objects
interface UserInterface {
    id: number;
    name: string;
}

// Type alias - more flexible
type UserType = {
    id: number;
    name: string;
};

type ID = string | number; // Type alias can represent unions
type Point = [number, number]; // Type alias can represent tuples

// Interfaces can be merged (declaration merging)
interface Window {
    title: string;
}

interface Window {
    open: boolean;
}

// Both declarations merge into one
const window: Window = {
    title: "My Window",
    open: true
};

console.log("Window:", window);

// ============================================
// INTERSECTION TYPES
// ============================================

/**
 * Combine multiple types into one
 */
interface BusinessPartner {
    name: string;
    credit: number;
}

interface ContactDetails {
    email: string;
    phone: string;
}

type Customer = BusinessPartner & ContactDetails;

const customer: Customer = {
    name: "Tech Corp",
    credit: 50000,
    email: "contact@techcorp.com",
    phone: "555-0123"
};

console.log("Customer:", customer);

// ============================================
// NESTED OBJECTS
// ============================================

/**
 * Objects can contain other objects
 */
interface Address {
    street: string;
    city: string;
    country: string;
    zipCode: string;
}

interface Company {
    name: string;
    address: Address;
    employees: number;
}

const company: Company = {
    name: "TechStart Inc",
    address: {
        street: "123 Tech Street",
        city: "San Francisco",
        country: "USA",
        zipCode: "94102"
    },
    employees: 150
};

console.log("Company:", company);
console.log("City:", company.address.city);

// ============================================
// GENERIC INTERFACES
// ============================================

/**
 * Interfaces can use generics for flexibility
 */
interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

const numberContainer: Container<number> = {
    value: 42,
    getValue() {
        return this.value;
    },
    setValue(newValue) {
        this.value = newValue;
    }
};

console.log("Container value:", numberContainer.getValue());
numberContainer.setValue(100);
console.log("Updated value:", numberContainer.getValue());

/**
 * GENERIC INTERFACE WITH MULTIPLE TYPE PARAMETERS
 */
interface Pair<K, V> {
    key: K;
    value: V;
}

const stringNumberPair: Pair<string, number> = {
    key: "age",
    value: 30
};

console.log("Pair:", stringNumberPair);

// ============================================
// CLASS IMPLEMENTING INTERFACE
// ============================================

/**
 * Classes can implement interfaces as contracts
 */
interface Vehicle {
    brand: string;
    speed: number;
    accelerate(): void;
    brake(): void;
}

class Car implements Vehicle {
    brand: string;
    speed: number;

    constructor(brand: string) {
        this.brand = brand;
        this.speed = 0;
    }

    accelerate(): void {
        this.speed += 10;
        console.log(`${this.brand} accelerating. Speed: ${this.speed}`);
    }

    brake(): void {
        this.speed = Math.max(0, this.speed - 10);
        console.log(`${this.brand} braking. Speed: ${this.speed}`);
    }
}

const myCar = new Car("Tesla");
myCar.accelerate();
myCar.accelerate();
myCar.brake();

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use interfaces for object shapes and public APIs
 * 2. Use type aliases for unions, intersections, and complex types
 * 3. Prefer interfaces for extensibility (they can be extended)
 * 4. Use readonly for immutable properties
 * 5. Use optional properties (?) for flexibility
 * 6. Keep interfaces focused and cohesive
 * 7. Use descriptive property names
 * 8. Document complex interfaces with comments
 */

// Good: Clear, focused interface
interface UserProfile {
    readonly id: string;
    username: string;
    email: string;
    createdAt: Date;
    lastLogin?: Date;
}

// Good: Composable interfaces
interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
}

interface Identifiable {
    readonly id: string;
}

interface BlogPost extends Identifiable, Timestamped {
    title: string;
    content: string;
    author: string;
}

const post: BlogPost = {
    id: "post-123",
    title: "TypeScript Interfaces",
    content: "Learn about interfaces...",
    author: "John Doe",
    createdAt: new Date(),
    updatedAt: new Date()
};

console.log("Blog post:", post);
