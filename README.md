# TypeScript Learning Tutorials

Welcome to the comprehensive TypeScript learning resource! This repository contains structured tutorials from basics to advanced concepts, complete with examples, explanations, and practical projects.

## 📚 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Learning Path](#learning-path)
- [Repository Structure](#repository-structure)
- [Quick Reference](#quick-reference)
- [Projects](#projects)
- [Contributing](#contributing)
- [Resources](#resources)

## 🎯 Overview

This repository provides a complete learning path for TypeScript, covering:

- **Fundamentals**: Variables, types, functions, arrays, objects
- **Intermediate Concepts**: Classes, generics, unions, type guards
- **Advanced Topics**: Mapped types, conditional types, async patterns
- **Real Projects**: Todo app, API integration, and more

Whether you're a beginner or looking to deepen your TypeScript knowledge, this resource has something for everyone.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- A code editor (VS Code recommended for best TypeScript support)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/lalchand07/typescript.git
cd typescript
```

2. **Install dependencies:**
```bash
npm install
```

3. **Compile TypeScript:**
```bash
npm run build
```

4. **Run examples:**
```bash
# Using ts-node (direct execution)
npx ts-node 01-basics/01-installation.ts

# Or compile and run
tsc 01-basics/01-installation.ts
node 01-basics/01-installation.js
```

### Project Setup

The repository includes:
- `package.json` - Project configuration and scripts
- `tsconfig.json` - TypeScript compiler configuration
- `.gitignore` - Git ignore patterns

### Available Scripts

```bash
npm run build    # Compile all TypeScript files
npm run watch    # Watch mode for development
npm start        # Run compiled code
```

## 📖 Learning Path

### For Beginners

Start here if you're new to TypeScript:

1. **01-basics/01-installation.ts** - Setup and first program
2. **01-basics/02-variables-and-types.ts** - Type system basics
3. **01-basics/03-functions.ts** - Functions and parameters
4. **01-basics/04-arrays-and-tuples.ts** - Collections
5. **01-basics/05-objects-and-interfaces.ts** - Object types
6. **01-basics/06-enums.ts** - Enumerations

### For Intermediate Learners

Continue with these concepts:

1. **02-intermediate/01-classes-and-oop.ts** - Object-oriented programming
2. **02-intermediate/02-generics.ts** - Generic types
3. **02-intermediate/03-union-intersection-types.ts** - Type combinations
4. **02-intermediate/04-type-guards.ts** - Runtime type checking
5. **02-intermediate/05-utility-types.ts** - Built-in utilities

### For Advanced Users

Deep dive into advanced features:

1. **03-advanced/01-advanced-types.ts** - Mapped, conditional types
2. **03-advanced/02-async-await.ts** - Asynchronous programming

### Practical Application

Apply your knowledge:

1. **04-projects/todo-app.ts** - Complete todo application
2. **04-projects/api-integration.ts** - API client with best practices

## 📁 Repository Structure

```
typescript/
├── 01-basics/                 # Fundamental concepts
│   ├── 01-installation.ts     # Setup and hello world
│   ├── 02-variables-and-types.ts
│   ├── 03-functions.ts
│   ├── 04-arrays-and-tuples.ts
│   ├── 05-objects-and-interfaces.ts
│   ├── 06-enums.ts
│   └── README.md              # Basics guide
│
├── 02-intermediate/           # Intermediate concepts
│   ├── 01-classes-and-oop.ts
│   ├── 02-generics.ts
│   ├── 03-union-intersection-types.ts
│   ├── 04-type-guards.ts
│   ├── 05-utility-types.ts
│   └── README.md              # Intermediate guide
│
├── 03-advanced/               # Advanced topics
│   ├── 01-advanced-types.ts
│   ├── 02-async-await.ts
│   └── README.md              # Advanced guide
│
├── 04-projects/               # Real-world projects
│   ├── todo-app.ts           # Complete todo application
│   ├── api-integration.ts    # API client example
│   └── README.md             # Projects guide
│
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 🔍 Quick Reference

### Basic Types

```typescript
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Arrays and Tuples

```typescript
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];
```

### Functions

```typescript
function add(a: number, b: number): number {
    return a + b;
}

const multiply = (a: number, b: number): number => a * b;
```

### Interfaces

```typescript
interface User {
    id: string;
    name: string;
    email: string;
    age?: number;  // Optional property
}
```

### Classes

```typescript
class Person {
    constructor(
        public name: string,
        private age: number
    ) {}
    
    introduce(): void {
        console.log(`Hi, I'm ${this.name}`);
    }
}
```

### Generics

```typescript
function identity<T>(arg: T): T {
    return arg;
}

interface Box<T> {
    value: T;
}
```

### Union Types

```typescript
type Status = "idle" | "loading" | "success" | "error";
type StringOrNumber = string | number;
```

### Type Guards

```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}
```

### Utility Types

```typescript
type Partial<T> = { [P in keyof T]?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Pick<T, K> = { [P in K]: T[P] };
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
```

## 💡 Projects

### Todo App
A complete task management application featuring:
- CRUD operations
- Filtering and sorting
- Priority levels and status tracking
- Statistics and analytics
- Import/export functionality

**Run:**
```bash
ts-node 04-projects/todo-app.ts
```

### API Integration
A production-ready API client with:
- Type-safe requests
- Error handling and retries
- Caching system
- Timeout management
- Service layer architecture

**Run:**
```bash
ts-node 04-projects/api-integration.ts
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs or issues
- Suggest new features or improvements
- Add more examples or projects
- Improve documentation
- Fix typos or errors

## 📚 Resources

### Official Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

### Learning Resources
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Execute Program - TypeScript](https://www.executeprogram.com/courses/typescript)

### Community
- [TypeScript GitHub](https://github.com/microsoft/TypeScript)
- [TypeScript Discord](https://discord.gg/typescript)
- [Stack Overflow - TypeScript](https://stackoverflow.com/questions/tagged/typescript)

### Tools
- [Visual Studio Code](https://code.visualstudio.com/)
- [ts-node](https://typestrong.org/ts-node/)
- [ESLint for TypeScript](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/)

## 📝 Notes

- All examples include detailed comments explaining concepts
- Each section has its own README with specific guidance
- Code follows TypeScript best practices
- Examples are self-contained and runnable

## 🎓 Learning Tips

1. **Practice Regularly**: Write code daily to reinforce concepts
2. **Experiment**: Modify examples to see how things work
3. **Build Projects**: Apply knowledge to real applications
4. **Read Errors**: TypeScript errors are informative - learn from them
5. **Use IDE Features**: Hover over types, use autocomplete
6. **Join Community**: Ask questions, share knowledge
7. **Stay Updated**: Follow TypeScript releases and features

## 📧 Contact

For questions, suggestions, or feedback:
- Open an issue on GitHub
- Contact: [Your contact information]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Learning! 🚀**

Start your TypeScript journey today and build amazing type-safe applications!
