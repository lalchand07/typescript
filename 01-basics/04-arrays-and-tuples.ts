/**
 * 04. ARRAYS AND TUPLES
 * 
 * Arrays and tuples are used to store collections of values.
 * Arrays hold multiple values of the same type.
 * Tuples hold a fixed number of values with specific types.
 */

// ============================================
// ARRAYS
// ============================================

/**
 * ARRAY DECLARATION
 * Two ways to declare arrays in TypeScript
 */

// Syntax 1: Type followed by []
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: boolean[] = [true, false, true];

// Syntax 2: Generic array type
let scores: Array<number> = [95, 87, 92, 78];
let cities: Array<string> = ["New York", "London", "Tokyo"];

console.log("Number array:", numbers);
console.log("String array:", names);

/**
 * ARRAY OPERATIONS
 */

// Push - add element to end
numbers.push(6);
console.log("After push:", numbers);

// Pop - remove and return last element
const lastNumber = numbers.pop();
console.log("Popped:", lastNumber, "Array:", numbers);

// Unshift - add element to beginning
numbers.unshift(0);
console.log("After unshift:", numbers);

// Shift - remove and return first element
const firstNumber = numbers.shift();
console.log("Shifted:", firstNumber, "Array:", numbers);

// Slice - return portion of array (doesn't modify original)
const sliced = numbers.slice(1, 4);
console.log("Sliced (1-4):", sliced, "Original:", numbers);

// Splice - remove/replace elements (modifies original)
const removed = numbers.splice(2, 2); // Remove 2 elements at index 2
console.log("Removed:", removed, "Array:", numbers);

// Concat - combine arrays
const moreNumbers = [10, 11, 12];
const combined = numbers.concat(moreNumbers);
console.log("Combined:", combined);

/**
 * ARRAY ITERATION METHODS
 */

const testArray = [1, 2, 3, 4, 5];

// forEach - execute function for each element
console.log("\nforEach:");
testArray.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// map - transform each element and return new array
const doubled = testArray.map(num => num * 2);
console.log("Mapped (doubled):", doubled);

// filter - return elements that pass test
const evens = testArray.filter(num => num % 2 === 0);
console.log("Filtered (evens):", evens);

// reduce - reduce array to single value
const sum = testArray.reduce((total, num) => total + num, 0);
console.log("Reduced (sum):", sum);

// find - return first element that passes test
const found = testArray.find(num => num > 3);
console.log("Found (first > 3):", found);

// findIndex - return index of first element that passes test
const foundIndex = testArray.findIndex(num => num > 3);
console.log("Found index (first > 3):", foundIndex);

// every - check if all elements pass test
const allPositive = testArray.every(num => num > 0);
console.log("Every element positive?", allPositive);

// some - check if at least one element passes test
const hasLargeNumber = testArray.some(num => num > 10);
console.log("Has number > 10?", hasLargeNumber);

// sort - sort array in place
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
unsorted.sort((a, b) => a - b); // Ascending order
console.log("Sorted:", unsorted);

/**
 * MULTI-DIMENSIONAL ARRAYS
 */
const matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("\nMatrix:");
console.log("Element at [1][2]:", matrix[1][2]); // 6

// Iterate through 2D array
matrix.forEach((row, i) => {
    row.forEach((value, j) => {
        console.log(`matrix[${i}][${j}] = ${value}`);
    });
});

/**
 * READONLY ARRAYS
 * Arrays that cannot be modified after creation
 */
const readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4); // Error: Property 'push' does not exist

const readonlyArray: ReadonlyArray<string> = ["a", "b", "c"];
// readonlyArray[0] = "x"; // Error: Index signature is readonly

console.log("Readonly array:", readonlyArray);

/**
 * ARRAY WITH MIXED TYPES (Union Types)
 */
const mixed: (string | number)[] = ["hello", 42, "world", 99];
console.log("Mixed array:", mixed);

// ============================================
// TUPLES
// ============================================

/**
 * TUPLE BASICS
 * Fixed-length arrays with known types at each position
 */

// Basic tuple - [string, number]
let person: [string, number] = ["Alice", 30];
console.log("\nTuple - Name:", person[0], "Age:", person[1]);

// Accessing tuple elements
const name = person[0];  // Type: string
const age = person[1];   // Type: number

/**
 * TUPLE WITH MULTIPLE TYPES
 */
let contact: [string, string, number, boolean] = [
    "John Doe",
    "john@example.com",
    25,
    true
];

const [fullName, email, userAge, isActive] = contact; // Destructuring
console.log("Contact:", { fullName, email, userAge, isActive });

/**
 * OPTIONAL TUPLE ELEMENTS
 */
let optionalTuple: [string, number?] = ["Hello"];
optionalTuple = ["Hello", 42];
console.log("Optional tuple:", optionalTuple);

/**
 * REST ELEMENTS IN TUPLES
 */
let restTuple: [string, ...number[]] = ["Numbers:", 1, 2, 3, 4, 5];
console.log("Tuple with rest:", restTuple);

/**
 * READONLY TUPLES
 */
const readonlyTuple: readonly [string, number] = ["Fixed", 100];
// readonlyTuple[0] = "Changed"; // Error: Cannot assign to readonly

console.log("Readonly tuple:", readonlyTuple);

/**
 * LABELED TUPLES (TypeScript 4.0+)
 * Add labels for better readability
 */
type Point = [x: number, y: number];
type NamedRange = [start: number, end: number];

const point: Point = [10, 20];
const range: NamedRange = [0, 100];

console.log("Point:", point);
console.log("Range:", range);

/**
 * TUPLE METHODS
 * Tuples have the same methods as arrays
 */
const coords: [number, number] = [5, 10];

// But be careful - methods can break tuple structure
coords.push(15); // This compiles but breaks the tuple contract!
console.log("Coords after push:", coords);

/**
 * REAL-WORLD TUPLE EXAMPLES
 */

// 1. Function returning multiple values
function getMinMax(numbers: number[]): [min: number, max: number] {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    return [min, max];
}

const [min, max] = getMinMax([3, 1, 4, 1, 5, 9, 2, 6]);
console.log("Min:", min, "Max:", max);

// 2. Key-value pairs
type KeyValue = [string, any];
const setting: KeyValue = ["theme", "dark"];
const config: KeyValue = ["maxUsers", 100];

console.log("Settings:", setting, config);

// 3. State management (like React useState)
type State<T> = [T, (newState: T) => void];

function createState<T>(initialValue: T): State<T> {
    let value = initialValue;
    const setValue = (newValue: T) => {
        value = newValue;
    };
    return [value, setValue];
}

const [count, setCount] = createState(0);
console.log("State value:", count);

// ============================================
// BEST PRACTICES
// ============================================

/**
 * ARRAYS:
 * 1. Use typed arrays for homogeneous collections
 * 2. Prefer array methods (map, filter, reduce) over loops
 * 3. Use readonly arrays when data shouldn't be modified
 * 4. Consider using Set for unique values
 * 5. Be careful with array methods that mutate (push, splice, etc.)
 * 
 * TUPLES:
 * 1. Use tuples for fixed-length, heterogeneous collections
 * 2. Use labeled tuples for clarity
 * 3. Prefer readonly tuples when possible
 * 4. Use destructuring for cleaner access
 * 5. Consider objects for complex structures (more than 3-4 elements)
 */

// Good: Array with consistent type
const userIds: number[] = [101, 102, 103];

// Good: Tuple for fixed structure
type User = [id: number, name: string, isAdmin: boolean];
const admin: User = [1, "Admin User", true];

// Better: Object for complex structure
interface UserObject {
    id: number;
    name: string;
    isAdmin: boolean;
    email: string;
    createdAt: Date;
}

const userObj: UserObject = {
    id: 1,
    name: "Admin User",
    isAdmin: true,
    email: "admin@example.com",
    createdAt: new Date()
};

console.log("User object:", userObj);
