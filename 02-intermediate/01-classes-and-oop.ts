/**
 * 01. CLASSES AND OBJECT-ORIENTED PROGRAMMING (OOP)
 * 
 * Classes are blueprints for creating objects with specific properties and methods.
 * TypeScript adds type safety and additional features to JavaScript classes.
 */

// ============================================
// BASIC CLASS
// ============================================

/**
 * Simple class definition
 */
class Person {
    // Properties
    name: string;
    age: number;

    // Constructor - called when creating a new instance
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Method
    introduce(): void {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }
}

// Creating instances
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

person1.introduce();
person2.introduce();

// ============================================
// ACCESS MODIFIERS
// ============================================

/**
 * public: Accessible anywhere (default)
 * private: Only accessible within the class
 * protected: Accessible within the class and subclasses
 */
class BankAccount {
    public accountNumber: string;      // Accessible everywhere
    private balance: number;           // Only within this class
    protected accountType: string;     // Within this class and subclasses

    constructor(accountNumber: string, initialBalance: number, accountType: string) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.accountType = accountType;
    }

    // Public method to access private property
    public getBalance(): number {
        return this.balance;
    }

    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.balance}`);
        }
    }

    public withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
            return true;
        }
        console.log("Insufficient funds");
        return false;
    }
}

const account = new BankAccount("ACC-001", 1000, "Savings");
console.log("Account number:", account.accountNumber);
console.log("Balance:", account.getBalance());
// console.log(account.balance); // Error: 'balance' is private
account.deposit(500);
account.withdraw(200);

// ============================================
// READONLY PROPERTIES
// ============================================

/**
 * Readonly properties can only be assigned in the constructor
 */
class User {
    readonly id: string;
    name: string;
    readonly createdAt: Date;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.createdAt = new Date();
    }

    updateName(newName: string): void {
        this.name = newName; // OK
        // this.id = "new-id"; // Error: Cannot assign to 'id'
    }
}

const user = new User("USR-001", "John");
console.log("User:", user);
user.updateName("John Doe");
console.log("Updated user:", user);

// ============================================
// PARAMETER PROPERTIES
// ============================================

/**
 * Shorthand for declaring and initializing properties in constructor
 */
class Product {
    // All declared and initialized in constructor parameter list
    constructor(
        public id: number,
        public name: string,
        private price: number,
        readonly category: string
    ) {}

    getPrice(): number {
        return this.price;
    }

    setPrice(newPrice: number): void {
        if (newPrice > 0) {
            this.price = newPrice;
        }
    }
}

const product = new Product(1, "Laptop", 999.99, "Electronics");
console.log("Product:", product.name, product.category);
console.log("Price:", product.getPrice());

// ============================================
// GETTERS AND SETTERS
// ============================================

/**
 * Accessors for controlled property access
 */
class Employee {
    private _salary: number;

    constructor(
        public name: string,
        salary: number
    ) {
        this._salary = salary;
    }

    // Getter
    get salary(): number {
        return this._salary;
    }

    // Setter with validation
    set salary(value: number) {
        if (value < 0) {
            throw new Error("Salary cannot be negative");
        }
        this._salary = value;
    }

    // Computed property
    get annualSalary(): number {
        return this._salary * 12;
    }
}

const employee = new Employee("Alice", 5000);
console.log("Monthly salary:", employee.salary);
console.log("Annual salary:", employee.annualSalary);
employee.salary = 5500; // Using setter
console.log("Updated salary:", employee.salary);

// ============================================
// STATIC MEMBERS
// ============================================

/**
 * Static properties and methods belong to the class itself
 * Not to instances
 */
class MathHelper {
    static PI: number = 3.14159;
    static E: number = 2.71828;

    static circleArea(radius: number): number {
        return this.PI * radius * radius;
    }

    static circleCircumference(radius: number): number {
        return 2 * this.PI * radius;
    }
}

// Access static members through the class
console.log("PI:", MathHelper.PI);
console.log("Circle area (r=5):", MathHelper.circleArea(5));
console.log("Circle circumference (r=5):", MathHelper.circleCircumference(5));

// ============================================
// INHERITANCE
// ============================================

/**
 * Classes can extend other classes (inheritance)
 */
class Animal {
    constructor(public name: string) {}

    move(distance: number = 0): void {
        console.log(`${this.name} moved ${distance} meters`);
    }

    makeSound(): void {
        console.log("Some generic animal sound");
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name); // Call parent constructor
    }

    // Override parent method
    makeSound(): void {
        console.log("Woof! Woof!");
    }

    // Additional method specific to Dog
    fetch(): void {
        console.log(`${this.name} is fetching the ball`);
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    // Override parent method
    makeSound(): void {
        console.log("Meow!");
    }

    // Additional method specific to Cat
    climb(): void {
        console.log(`${this.name} is climbing a tree`);
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");

dog.move(10);
dog.makeSound();
dog.fetch();

cat.move(5);
cat.makeSound();
cat.climb();

// ============================================
// ABSTRACT CLASSES
// ============================================

/**
 * Abstract classes cannot be instantiated directly
 * They serve as base classes for other classes
 */
abstract class Shape {
    constructor(public color: string) {}

    // Abstract method - must be implemented by subclasses
    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;

    // Concrete method - can be used by all subclasses
    describe(): void {
        console.log(`This is a ${this.color} shape`);
    }
}

class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(color: string, public width: number, public height: number) {
        super(color);
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 10, 5);

circle.describe();
console.log("Circle area:", circle.calculateArea());
console.log("Circle perimeter:", circle.calculatePerimeter());

rectangle.describe();
console.log("Rectangle area:", rectangle.calculateArea());
console.log("Rectangle perimeter:", rectangle.calculatePerimeter());

// ============================================
// IMPLEMENTING INTERFACES
// ============================================

/**
 * Classes can implement one or more interfaces
 */
interface Drivable {
    speed: number;
    drive(): void;
    stop(): void;
}

interface Refuelable {
    fuelLevel: number;
    refuel(amount: number): void;
}

class Car implements Drivable, Refuelable {
    speed: number = 0;
    fuelLevel: number = 50;

    constructor(public model: string) {}

    drive(): void {
        if (this.fuelLevel > 0) {
            this.speed = 60;
            this.fuelLevel -= 10;
            console.log(`${this.model} is driving at ${this.speed} km/h`);
        } else {
            console.log("Out of fuel!");
        }
    }

    stop(): void {
        this.speed = 0;
        console.log(`${this.model} has stopped`);
    }

    refuel(amount: number): void {
        this.fuelLevel = Math.min(100, this.fuelLevel + amount);
        console.log(`Refueled. Current fuel level: ${this.fuelLevel}%`);
    }
}

const car = new Car("Tesla Model 3");
car.drive();
car.stop();
car.refuel(30);
car.drive();

// ============================================
// CLASS EXPRESSIONS
// ============================================

/**
 * Classes can be defined as expressions
 */
const Point = class {
    constructor(public x: number, public y: number) {}

    distance(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
};

const point = new Point(3, 4);
console.log("Distance from origin:", point.distance());

// ============================================
// SINGLETON PATTERN
// ============================================

/**
 * Ensuring only one instance of a class exists
 */
class Database {
    private static instance: Database;
    private constructor() {
        console.log("Database instance created");
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    query(sql: string): void {
        console.log(`Executing query: ${sql}`);
    }
}

// const db1 = new Database(); // Error: Constructor is private
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log("Same instance?", db1 === db2); // true

db1.query("SELECT * FROM users");

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use access modifiers appropriately (private for internal state)
 * 2. Prefer composition over inheritance when possible
 * 3. Keep classes focused (Single Responsibility Principle)
 * 4. Use abstract classes for shared behavior with variations
 * 5. Use interfaces for contracts and type checking
 * 6. Make properties readonly when they shouldn't change
 * 7. Use parameter properties for concise code
 * 8. Document complex classes and methods
 */

// Good example: Well-structured class
class Order {
    private items: Map<string, number> = new Map();

    constructor(
        public readonly orderId: string,
        private customerId: string
    ) {}

    addItem(productId: string, quantity: number): void {
        const currentQty = this.items.get(productId) || 0;
        this.items.set(productId, currentQty + quantity);
    }

    removeItem(productId: string): void {
        this.items.delete(productId);
    }

    getTotal(): number {
        // Simplified calculation
        let total = 0;
        this.items.forEach(qty => total += qty * 10);
        return total;
    }

    getItemCount(): number {
        return this.items.size;
    }
}

const order = new Order("ORD-001", "CUST-123");
order.addItem("PROD-1", 2);
order.addItem("PROD-2", 1);
console.log("Order total:", order.getTotal());
console.log("Item count:", order.getItemCount());
