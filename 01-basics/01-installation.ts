/**
 * 01. INSTALLATION AND SETUP
 * 
 * Welcome to TypeScript! This guide will help you get started.
 * 
 * WHAT IS TYPESCRIPT?
 * TypeScript is a strongly typed programming language that builds on JavaScript.
 * It adds static typing to JavaScript, helping catch errors at compile-time rather than runtime.
 * 
 * WHY USE TYPESCRIPT?
 * - Catch errors early during development
 * - Better IDE support with autocomplete and IntelliSense
 * - Improved code maintainability
 * - Enhanced code documentation through types
 * - Better refactoring capabilities
 * 
 * INSTALLATION STEPS:
 * 
 * 1. Install Node.js (if not already installed)
 *    Download from: https://nodejs.org/
 * 
 * 2. Install TypeScript globally:
 *    npm install -g typescript
 * 
 * 3. Verify installation:
 *    tsc --version
 * 
 * 4. Create a TypeScript file (e.g., hello.ts):
 *    Write your TypeScript code
 * 
 * 5. Compile TypeScript to JavaScript:
 *    tsc hello.ts
 * 
 * 6. Run the compiled JavaScript:
 *    node hello.js
 * 
 * PROJECT SETUP:
 * 
 * 1. Initialize a new project:
 *    npm init -y
 * 
 * 2. Install TypeScript locally:
 *    npm install --save-dev typescript
 * 
 * 3. Create tsconfig.json:
 *    tsc --init
 * 
 * 4. Configure tsconfig.json according to your needs
 * 
 * 5. Compile your project:
 *    npx tsc
 * 
 * USEFUL COMMANDS:
 * - tsc filename.ts         : Compile a single file
 * - tsc                     : Compile all files in project
 * - tsc --watch             : Watch mode (auto-compile on changes)
 * - tsc --noEmit            : Check for errors without compiling
 */

// Your first TypeScript program
console.log("Hello, TypeScript! 🚀");

// TypeScript adds type safety to JavaScript
const greeting: string = "Welcome to TypeScript Learning";
const year: number = 2024;
const isAwesome: boolean = true;

console.log(`${greeting} - ${year}`);
console.log(`Is TypeScript awesome? ${isAwesome}`);

/**
 * TO RUN THIS FILE:
 * 1. Compile: tsc 01-installation.ts
 * 2. Run: node 01-installation.js
 * 
 * OR use ts-node for direct execution:
 * npm install -g ts-node
 * ts-node 01-installation.ts
 */
