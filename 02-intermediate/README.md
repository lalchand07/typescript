# TypeScript Intermediate Concepts

This folder contains intermediate TypeScript concepts that build upon the basics.

## Contents

### 1. Classes and Object-Oriented Programming (OOP)
**File:** `01-classes-and-oop.ts`

Topics covered:
- Basic class syntax and constructors
- Access modifiers (public, private, protected)
- Readonly properties and parameter properties
- Getters and setters
- Static members
- Inheritance and method overriding
- Abstract classes
- Implementing interfaces
- Singleton pattern
- Best practices for OOP in TypeScript

### 2. Generics
**File:** `02-generics.ts`

Learn about:
- Generic functions and type parameters
- Generic interfaces
- Generic classes
- Generic constraints
- Type inference with generics
- Generic utility functions
- Mapped types with generics
- Conditional types
- Real-world examples (API client, repository pattern)

### 3. Union and Intersection Types
**File:** `03-union-intersection-types.ts`

Covers:
- Union types (OR types)
- Intersection types (AND types)
- Discriminated unions (tagged unions)
- Type narrowing with unions
- Combining union and intersection types
- Practical examples (payment processing, API responses)

### 4. Type Guards and Type Narrowing
**File:** `04-type-guards.ts`

Topics include:
- typeof type guards
- instanceof type guards
- in operator type guards
- Custom type guards (user-defined)
- Discriminated unions
- Truthiness and equality narrowing
- Control flow analysis
- Assertion functions
- Never type for exhaustiveness
- Best practices for type safety

### 5. Utility Types
**File:** `05-utility-types.ts`

Comprehensive coverage of:
- Partial<T> - Make properties optional
- Required<T> - Make properties required
- Readonly<T> - Make properties readonly
- Record<K, T> - Create object types
- Pick<T, K> - Select specific properties
- Omit<T, K> - Exclude specific properties
- Exclude<T, U> - Remove types from union
- Extract<T, U> - Extract types from union
- NonNullable<T> - Remove null/undefined
- ReturnType<T> - Get function return type
- Parameters<T> - Get function parameters
- Awaited<T> - Unwrap Promise types
- Creating custom utility types

## How to Use

### Sequential Learning
1. Start with Classes and OOP if you're familiar with object-oriented concepts
2. Move to Generics for type flexibility
3. Study Union/Intersection types for complex type compositions
4. Master Type Guards for runtime type safety
5. Explore Utility Types for practical type transformations

### Running Examples

```bash
# Compile and run a specific file
tsc 02-intermediate/01-classes-and-oop.ts
node 02-intermediate/01-classes-and-oop.js

# Or use ts-node
ts-node 02-intermediate/01-classes-and-oop.ts

# Compile all intermediate files
tsc
```

## Key Concepts

### Object-Oriented Programming
- **Encapsulation**: Hide internal state using private/protected
- **Inheritance**: Extend classes to reuse and specialize behavior
- **Polymorphism**: Override methods for specific implementations
- **Abstraction**: Use abstract classes and interfaces

### Type Safety
- **Generics**: Write reusable, type-safe code
- **Type Guards**: Narrow types at runtime
- **Utility Types**: Transform types without repeating code

### Best Practices
1. **Use access modifiers appropriately**
   - Private for internal state
   - Protected for inherited classes
   - Public for APIs

2. **Leverage generics for reusability**
   - Avoid using `any`
   - Add constraints when needed
   - Keep generic parameters simple

3. **Use discriminated unions for complex types**
   - Add a discriminant property
   - Use switch statements for exhaustiveness

4. **Apply utility types to reduce code duplication**
   - Use Partial for updates
   - Use Pick/Omit for derived types
   - Create custom utilities for patterns

## Common Patterns

### Repository Pattern with Generics
```typescript
interface Repository<T> {
    getById(id: string): T | undefined;
    getAll(): T[];
    add(item: T): void;
    delete(id: string): boolean;
}
```

### Discriminated Unions for State Management
```typescript
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: any };
type ErrorState = { status: "error"; error: string };
type State = LoadingState | SuccessState | ErrorState;
```

### Type-Safe Event Handlers
```typescript
type EventMap = {
    click: MouseEvent;
    keypress: KeyboardEvent;
    custom: CustomEvent;
};

function on<K extends keyof EventMap>(
    event: K,
    handler: (e: EventMap[K]) => void
): void {
    // Implementation
}
```

## Prerequisites

Before studying this section, you should understand:
- Basic TypeScript syntax
- Variables and types
- Functions
- Objects and interfaces
- Arrays and tuples

## Next Steps

After mastering intermediate concepts, proceed to:
- **03-advanced**: Advanced type manipulation, patterns
- **04-projects**: Apply your knowledge to real projects

## Practice Exercises

1. **Create a generic Stack class** with push, pop, and peek methods
2. **Build a type-safe event emitter** using discriminated unions
3. **Implement a type-safe API client** with generics
4. **Design a state management system** with union types
5. **Create custom utility types** for common transformations

## Resources

- TypeScript Handbook: Generics
- TypeScript Handbook: Classes
- TypeScript Handbook: Utility Types
- Advanced TypeScript Patterns
- Type Challenges (GitHub)

## Tips

- **Experiment**: Modify examples to see how types behave
- **Use IDE features**: Hover over types to see inferred types
- **Read errors carefully**: TypeScript errors are descriptive
- **Practice regularly**: Type systems require hands-on experience
- **Build projects**: Apply concepts to real-world scenarios
