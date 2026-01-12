# TypeScript Advanced Concepts

This folder contains advanced TypeScript features and patterns for experienced developers.

## Contents

### 1. Advanced Types
**File:** `01-advanced-types.ts`

Master-level type features:
- Mapped types and property transformations
- Conditional types with complex logic
- Template literal types for string manipulation
- Key remapping in mapped types
- Index accessed types
- Recursive type definitions
- The `infer` keyword for type extraction
- Variance annotations (in/out)
- The `satisfies` operator
- Advanced type utilities

### 2. Async/Await and Promises
**File:** `02-async-await.ts`

Comprehensive async programming:
- Promise basics and creation
- async/await syntax and patterns
- Typed Promises with generics
- Promise utilities (all, allSettled, race, any)
- Custom error types and handling
- Async generators and iteration
- Cancellable operations
- Retry logic with exponential backoff
- Debouncing and throttling
- Best practices for async code

## Key Advanced Concepts

### Mapped Types
Transform existing types systematically:
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

### Conditional Types
Type-level if/else logic:
```typescript
type Extract<T, U> = T extends U ? T : never;
```

### Template Literal Types
String manipulation at compile time:
```typescript
type EventName = `on${Capitalize<string>}`;
```

### Recursive Types
Types that reference themselves:
```typescript
type JSONValue = 
    | string
    | number
    | JSONValue[]
    | { [key: string]: JSONValue };
```

### The `infer` Keyword
Extract types from within conditional types:
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## Advanced Patterns

### Type-Safe Event Emitter
```typescript
type EventMap = {
    click: MouseEvent;
    keypress: KeyboardEvent;
};

class TypedEventEmitter<T extends Record<string, any>> {
    on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
        // Implementation
    }
}
```

### Builder Pattern with Fluent API
```typescript
class QueryBuilder<T> {
    where<K extends keyof T>(field: K, value: T[K]): this {
        return this;
    }
    
    orderBy<K extends keyof T>(field: K): this {
        return this;
    }
}
```

### Type-Safe API Client
```typescript
interface ApiEndpoints {
    '/users': { GET: User[]; POST: User };
    '/posts': { GET: Post[]; POST: Post };
}

class ApiClient<T extends ApiEndpoints> {
    async request<
        Path extends keyof T,
        Method extends keyof T[Path]
    >(
        path: Path,
        method: Method
    ): Promise<T[Path][Method]> {
        // Implementation
    }
}
```

## Async Programming Patterns

### Result Type Pattern
```typescript
type Result<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

async function fetchData<T>(url: string): Promise<Result<T>> {
    try {
        const data = await fetch(url);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

### Retry with Exponential Backoff
```typescript
async function retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt < maxRetries) {
                await new Promise(resolve => 
                    setTimeout(resolve, delay * Math.pow(2, attempt - 1))
                );
            } else {
                throw error;
            }
        }
    }
}
```

### Parallel Execution with Limits
```typescript
async function parallelLimit<T>(
    tasks: (() => Promise<T>)[],
    limit: number
): Promise<T[]> {
    const results: T[] = [];
    const executing: Promise<void>[] = [];
    
    for (const task of tasks) {
        const promise = task().then(result => {
            results.push(result);
        });
        executing.push(promise);
        
        if (executing.length >= limit) {
            await Promise.race(executing);
        }
    }
    
    await Promise.all(executing);
    return results;
}
```

## Prerequisites

Before tackling advanced concepts, ensure you understand:
- All basic TypeScript features
- Intermediate concepts (generics, classes, utility types)
- JavaScript async patterns
- Object-oriented programming
- Functional programming basics

## Learning Path

1. **Study Advanced Types**
   - Start with mapped types
   - Progress to conditional types
   - Master template literal types
   - Practice with recursive types

2. **Master Async Programming**
   - Understand Promise internals
   - Practice async/await patterns
   - Implement error handling strategies
   - Build async utilities

3. **Apply to Real Projects**
   - Build type-safe libraries
   - Create complex async workflows
   - Implement design patterns
   - Optimize performance

## Common Use Cases

### Type-Safe State Management
```typescript
type State<T> = {
    data: T;
    loading: boolean;
    error?: string;
};

type Action<T> =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: T }
    | { type: 'FETCH_ERROR'; error: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { data: action.payload, loading: false };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.error };
    }
}
```

### Type-Safe Form Validation
```typescript
type Validator<T> = (value: T) => string | undefined;

type FormValidators<T> = {
    [K in keyof T]?: Validator<T[K]>;
};

function validate<T>(data: T, validators: FormValidators<T>): Record<keyof T, string> {
    // Implementation
}
```

## Performance Considerations

1. **Complex types can slow compilation**
   - Keep type complexity reasonable
   - Use type aliases for readability
   - Consider splitting large type definitions

2. **Async operations need optimization**
   - Use Promise.all for parallel ops
   - Implement caching where appropriate
   - Add timeouts to prevent hanging

3. **Recursive types have limits**
   - TypeScript has recursion depth limits
   - Simplify deeply nested structures
   - Consider iterative approaches

## Best Practices

1. **Type Safety**
   - Use strict mode
   - Avoid `any` - use `unknown` instead
   - Leverage type narrowing
   - Document complex types

2. **Async Patterns**
   - Always handle errors
   - Implement timeouts
   - Use cancellation when needed
   - Consider retry logic

3. **Code Organization**
   - Separate type definitions
   - Create reusable utilities
   - Document edge cases
   - Write tests for complex types

4. **Performance**
   - Profile type-checking time
   - Optimize hot paths
   - Use incremental compilation
   - Consider code splitting

## Resources

- TypeScript Handbook: Advanced Topics
- Type Challenges (GitHub)
- DefinitelyTyped repository
- TypeScript Deep Dive (book)
- TypeScript official blog

## Practice Exercises

1. **Create a type-safe ORM**
   - Define table schemas with types
   - Implement query builder
   - Add type-safe migrations

2. **Build an async task queue**
   - Implement priority queue
   - Add concurrency limits
   - Handle retries and failures

3. **Design a plugin system**
   - Type-safe plugin registration
   - Event system with typed events
   - Dependency injection

4. **Implement a state machine**
   - Type-safe state transitions
   - Guard conditions
   - Side effects handling

## Next Steps

After mastering advanced concepts:
- **04-projects**: Apply knowledge to real applications
- Contribute to open source TypeScript projects
- Build your own type-safe libraries
- Share knowledge through blog posts

## Tips for Advanced Learning

- **Read source code**: Study well-typed libraries
- **Experiment**: Push TypeScript's limits
- **Ask questions**: Join TypeScript community
- **Build projects**: Apply concepts practically
- **Stay updated**: Follow TypeScript releases
