/**
 * 06. ENUMS
 * 
 * Enums (Enumerations) are a way to define a set of named constants.
 * They make code more readable and maintainable by giving meaningful names to values.
 */

// ============================================
// NUMERIC ENUMS
// ============================================

/**
 * BASIC NUMERIC ENUM
 * By default, enums start at 0 and increment by 1
 */
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

let playerDirection: Direction = Direction.Up;
console.log("Direction.Up =", Direction.Up);         // 0
console.log("Direction.Down =", Direction.Down);     // 1
console.log("Player direction:", playerDirection);    // 0

/**
 * CUSTOM NUMERIC VALUES
 * You can initialize the first value or all values
 */
enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}

function getStatusMessage(status: HttpStatus): string {
    switch (status) {
        case HttpStatus.OK:
            return "Request successful";
        case HttpStatus.NotFound:
            return "Resource not found";
        case HttpStatus.InternalServerError:
            return "Server error";
        default:
            return "Unknown status";
    }
}

console.log("HTTP 200:", getStatusMessage(HttpStatus.OK));
console.log("HTTP 404:", getStatusMessage(HttpStatus.NotFound));

/**
 * AUTO-INCREMENT FROM CUSTOM START
 */
enum Level {
    Low = 1,     // 1
    Medium,      // 2 (auto-incremented)
    High,        // 3 (auto-incremented)
    Critical     // 4 (auto-incremented)
}

console.log("Levels:", Level.Low, Level.Medium, Level.High, Level.Critical);

/**
 * MIXED INITIALIZATION
 */
enum FileAccess {
    None,           // 0
    Read = 1 << 0,  // 1
    Write = 1 << 1, // 2
    ReadWrite = Read | Write, // 3
    Execute = 1 << 2 // 4
}

console.log("File access flags:", FileAccess);

// ============================================
// STRING ENUMS
// ============================================

/**
 * String enums require explicit initialization
 * More readable in runtime and debugging
 */
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE",
    Yellow = "YELLOW"
}

let favoriteColor: Color = Color.Blue;
console.log("Favorite color:", favoriteColor); // "BLUE"

/**
 * PRACTICAL STRING ENUM EXAMPLE
 */
enum OrderStatus {
    Pending = "PENDING",
    Processing = "PROCESSING",
    Shipped = "SHIPPED",
    Delivered = "DELIVERED",
    Cancelled = "CANCELLED"
}

interface Order {
    id: string;
    status: OrderStatus;
    total: number;
}

const order: Order = {
    id: "ORD-001",
    status: OrderStatus.Pending,
    total: 99.99
};

console.log("Order:", order);

function updateOrderStatus(orderId: string, newStatus: OrderStatus): void {
    console.log(`Order ${orderId} status changed to ${newStatus}`);
}

updateOrderStatus(order.id, OrderStatus.Shipped);

/**
 * API ENDPOINTS ENUM
 */
enum ApiEndpoint {
    Users = "/api/users",
    Posts = "/api/posts",
    Comments = "/api/comments",
    Auth = "/api/auth"
}

console.log("Fetching from:", ApiEndpoint.Users);

// ============================================
// HETEROGENEOUS ENUMS
// ============================================

/**
 * Mixing string and numeric values (not recommended)
 */
enum Mixed {
    No = 0,
    Yes = "YES"
}

console.log("Mixed enum:", Mixed.No, Mixed.Yes);

// ============================================
// COMPUTED AND CONSTANT MEMBERS
// ============================================

/**
 * Enum members can be constant or computed
 */
enum FileFlags {
    None = 0,
    Read = 1 << 0,           // Constant member
    Write = 1 << 1,          // Constant member
    ReadWrite = Read | Write // Computed member
}

console.log("File flags:", FileFlags);

/**
 * Using expressions with enums
 */
enum MathConstants {
    E = 2.71828,
    PI = 3.14159,
    TwoPI = PI * 2  // Computed at compile time
}

console.log("Math constants:", MathConstants);

// ============================================
// CONST ENUMS
// ============================================

/**
 * Const enums are removed during compilation
 * Used for performance optimization
 * Values are inlined at use sites
 */
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

// At runtime, this becomes: let move = 0 (inlined)
let move = Directions.Up;
console.log("Move direction:", move);

/**
 * CONST STRING ENUM
 */
const enum LogLevel {
    Debug = "DEBUG",
    Info = "INFO",
    Warning = "WARNING",
    Error = "ERROR"
}

function log(level: LogLevel, message: string): void {
    console.log(`[${level}] ${message}`);
}

log(LogLevel.Info, "Application started");
log(LogLevel.Error, "Something went wrong");

// ============================================
// REVERSE MAPPING
// ============================================

/**
 * Numeric enums have reverse mapping (value to name)
 * String enums do NOT have reverse mapping
 */
enum Status {
    Active,
    Inactive,
    Pending
}

console.log("\nReverse mapping:");
console.log("Status.Active =", Status.Active);        // 0
console.log("Status[0] =", Status[0]);                // "Active"
console.log("Status.Inactive =", Status.Inactive);    // 1
console.log("Status[1] =", Status[1]);                // "Inactive"

// String enums don't have reverse mapping
enum Theme {
    Light = "LIGHT",
    Dark = "DARK"
}

console.log("Theme.Light =", Theme.Light);            // "LIGHT"
// console.log(Theme["LIGHT"]); // undefined (no reverse mapping)

// ============================================
// ENUMS AT RUNTIME
// ============================================

/**
 * Enums exist as real objects at runtime
 */
console.log("\nEnum as object:");
console.log("Direction enum object:", Direction);

// Iterate over enum values
for (const key in Direction) {
    if (isNaN(Number(key))) {
        console.log(`Direction.${key} = ${Direction[key as keyof typeof Direction]}`);
    }
}

// ============================================
// ENUMS WITH FUNCTIONS
// ============================================

/**
 * Using enums in functions for type safety
 */
enum Priority {
    Low = 1,
    Medium = 2,
    High = 3,
    Urgent = 4
}

interface Task {
    id: number;
    title: string;
    priority: Priority;
}

function createTask(title: string, priority: Priority): Task {
    return {
        id: Math.floor(Math.random() * 1000),
        title,
        priority
    };
}

const task1 = createTask("Fix bug", Priority.High);
const task2 = createTask("Code review", Priority.Medium);

console.log("\nTasks:", task1, task2);

function getPriorityLabel(priority: Priority): string {
    switch (priority) {
        case Priority.Low:
            return "⬇️ Low Priority";
        case Priority.Medium:
            return "➡️ Medium Priority";
        case Priority.High:
            return "⬆️ High Priority";
        case Priority.Urgent:
            return "🔥 Urgent";
    }
}

console.log("Task 1 priority:", getPriorityLabel(task1.priority));

// ============================================
// AMBIENT ENUMS
// ============================================

/**
 * Ambient enums describe existing enum shapes
 * Declared with 'declare' keyword
 * Used for type checking only
 */
declare enum ExternalEnum {
    Value1,
    Value2,
    Value3
}

// Can use for types but values don't exist at runtime
let external: ExternalEnum;
// console.log(external); // Would be undefined if not defined elsewhere

// ============================================
// UNION TYPES AS ENUM ALTERNATIVE
// ============================================

/**
 * For simple cases, you can use union types instead of enums
 */

// Using union type (alternative to enum)
type UserRole = "admin" | "user" | "guest";

function checkPermission(role: UserRole): boolean {
    return role === "admin";
}

console.log("\nPermission check:", checkPermission("admin")); // true
console.log("Permission check:", checkPermission("user"));   // false

// Enum version
enum UserRoleEnum {
    Admin = "admin",
    User = "user",
    Guest = "guest"
}

function checkPermissionEnum(role: UserRoleEnum): boolean {
    return role === UserRoleEnum.Admin;
}

console.log("Permission (enum):", checkPermissionEnum(UserRoleEnum.Admin));

// ============================================
// BEST PRACTICES
// ============================================

/**
 * 1. Use string enums for better debugging and readability
 * 2. Use const enums for performance when values won't change
 * 3. Prefer enums over magic numbers/strings
 * 4. Use UPPER_CASE or PascalCase for enum names
 * 5. Consider union types for simple string literals
 * 6. Document enum purpose and values
 * 7. Keep enum values immutable
 * 8. Use enums for fixed sets of constants
 */

// Good: Clear, type-safe enum usage
enum PaymentMethod {
    CreditCard = "CREDIT_CARD",
    DebitCard = "DEBIT_CARD",
    PayPal = "PAYPAL",
    BankTransfer = "BANK_TRANSFER",
    Cash = "CASH"
}

interface Payment {
    amount: number;
    method: PaymentMethod;
    timestamp: Date;
}

function processPayment(payment: Payment): void {
    console.log(`Processing ${payment.method} payment of $${payment.amount}`);
    
    switch (payment.method) {
        case PaymentMethod.CreditCard:
        case PaymentMethod.DebitCard:
            console.log("Processing card payment...");
            break;
        case PaymentMethod.PayPal:
            console.log("Redirecting to PayPal...");
            break;
        case PaymentMethod.BankTransfer:
            console.log("Initiating bank transfer...");
            break;
        case PaymentMethod.Cash:
            console.log("Cash payment recorded");
            break;
    }
}

const payment: Payment = {
    amount: 150.00,
    method: PaymentMethod.CreditCard,
    timestamp: new Date()
};

processPayment(payment);
