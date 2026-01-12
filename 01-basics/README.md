# TypeScript Basics

This folder contains fundamental TypeScript concepts that every developer should know.

## Contents

### 1. Installation and Setup
**File:** `01-installation.ts`

Learn how to:
- Install TypeScript
- Set up a TypeScript project
- Compile TypeScript files
- Run TypeScript code
- Configure your development environment

### 2. Variables and Data Types
**File:** `02-variables-and-types.ts`

Covers:
- Primitive types (string, number, boolean, null, undefined)
- Special types (any, unknown, void, never, symbol, bigint)
- Variable declarations (let, const, var)
- Type inference
- Type assertions
- Best practices for typing variables

### 3. Functions
**File:** `03-functions.ts`

Topics include:
- Function declarations and expressions
- Arrow functions
- Optional and default parameters
- Rest parameters
- Function overloading
- Function types and callbacks
- Higher-order functions
- Generic functions
- Async functions

### 4. Arrays and Tuples
**File:** `04-arrays-and-tuples.ts`

Learn about:
- Array declaration and operations
- Array iteration methods (map, filter, reduce, etc.)
- Multi-dimensional arrays
- Readonly arrays
- Tuples and their uses
- Optional and rest elements in tuples
- Real-world examples

### 5. Objects and Interfaces
**File:** `05-objects-and-interfaces.ts`

Covers:
- Object type annotations
- Interface basics
- Optional and readonly properties
- Method signatures
- Extending interfaces
- Index signatures
- Generic interfaces
- Class implementation of interfaces

### 6. Enums
**File:** `06-enums.ts`

Topics include:
- Numeric enums
- String enums
- Const enums
- Reverse mapping
- Computed and constant members
- Practical enum examples
- Enums vs union types

## How to Use

1. **Read in order**: Start with file 01 and progress sequentially
2. **Run the code**: Compile and execute each file to see examples in action
3. **Experiment**: Modify the examples to deepen your understanding
4. **Take notes**: Each file contains detailed comments explaining concepts

## Running the Examples

### Option 1: Compile and Run
```bash
# Compile TypeScript to JavaScript
tsc 01-basics/01-installation.ts

# Run the compiled JavaScript
node 01-basics/01-installation.js
```

### Option 2: Use ts-node (Direct Execution)
```bash
# Install ts-node globally
npm install -g ts-node

# Run TypeScript directly
ts-node 01-basics/01-installation.ts
```

### Option 3: Compile All Files
```bash
# From the project root
tsc
```

## Next Steps

After completing the basics, move on to:
- **02-intermediate**: Classes, generics, advanced types
- **03-advanced**: Type manipulation, design patterns
- **04-projects**: Practical applications

## Tips for Learning

- **Practice regularly**: Write code daily to reinforce concepts
- **Build small projects**: Apply what you learn immediately
- **Read error messages**: TypeScript's compiler provides helpful feedback
- **Use an IDE**: VS Code provides excellent TypeScript support
- **Experiment**: Try breaking things to understand how they work
