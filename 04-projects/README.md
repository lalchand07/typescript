# TypeScript Projects

This folder contains complete, practical TypeScript projects demonstrating real-world applications.

## Projects Overview

### 1. Todo App
**File:** `todo-app.ts`

A fully-featured todo application with:
- **Complete CRUD operations** (Create, Read, Update, Delete)
- **Priority levels** (Low, Medium, High, Urgent)
- **Status tracking** (Pending, In Progress, Completed, Archived)
- **Filtering and search** capabilities
- **Sorting** by multiple fields
- **Statistics and analytics**
- **Import/Export** functionality
- **Tag system** for organization
- **Due dates** and overdue tracking

**Key Features:**
- Type-safe data management
- Enum usage for constants
- Generic filtering system
- Date handling
- Map-based storage
- Export to JSON format

**Usage:**
```bash
ts-node 04-projects/todo-app.ts
```

**Example Code:**
```typescript
const manager = new TodoManager();

const todo = manager.create({
    title: "Learn TypeScript",
    description: "Complete tutorials",
    priority: Priority.High,
    status: TodoStatus.InProgress,
    tags: ["learning"],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});

// Filter todos
const pending = manager.filter({ status: TodoStatus.Pending });

// Get statistics
const stats = manager.getStats();
```

### 2. API Integration
**File:** `api-integration.ts`

A production-ready API client demonstrating:
- **Type-safe HTTP requests** with generics
- **Error handling** with custom error types
- **Retry logic** with exponential backoff
- **Request caching** with TTL
- **Timeout handling**
- **Service layer architecture**
- **RESTful operations** (GET, POST, PUT, PATCH, DELETE)

**Key Features:**
- Generic ApiClient class
- Typed responses
- Automatic retries
- Cache management
- Abort controller for timeouts
- Service-based organization
- Real API integration (JSONPlaceholder)

**Usage:**
```bash
ts-node 04-projects/api-integration.ts
```

**Example Code:**
```typescript
const client = new ApiClient("https://api.example.com");

// Type-safe requests
const users = await client.get<User[]>("/users");
const user = await client.get<User>("/users/1");

// With caching
const cachedUsers = await client.get<User[]>("/users", {}, 60000);

// POST request
const newPost = await client.post<Post, CreatePostInput>("/posts", {
    userId: 1,
    title: "New Post",
    body: "Content here"
});
```

## Concepts Demonstrated

### Type Safety
- **Interface definitions** for all data models
- **Type parameters** for generic operations
- **Union types** for status/priority
- **Utility types** (Omit, Partial, Record)
- **Type narrowing** with guards

### Object-Oriented Programming
- **Class-based architecture**
- **Private/public members**
- **Method organization**
- **Single responsibility principle**
- **Encapsulation of logic**

### Error Handling
- **Custom error classes**
- **Try-catch patterns**
- **Error propagation**
- **Graceful degradation**
- **User-friendly messages**

### Async Programming
- **Promise-based APIs**
- **Async/await syntax**
- **Parallel requests** with Promise.all
- **Timeout handling**
- **Retry mechanisms**

### Data Management
- **CRUD operations**
- **Filtering algorithms**
- **Sorting implementations**
- **Data persistence**
- **Cache strategies**

## Running the Projects

### Prerequisites
```bash
# Install TypeScript (if not already installed)
npm install -g typescript ts-node

# Or use project dependencies
npm install
```

### Compilation
```bash
# Compile a specific project
tsc 04-projects/todo-app.ts

# Run compiled JavaScript
node 04-projects/todo-app.js

# Or use ts-node for direct execution
ts-node 04-projects/todo-app.ts
```

### Development
```bash
# Watch mode for auto-compilation
tsc --watch

# Run with ts-node
ts-node 04-projects/api-integration.ts
```

## Learning Objectives

### From Todo App Learn:
1. How to structure a complete application
2. Enum usage for type-safe constants
3. Filtering and sorting algorithms
4. Data validation and constraints
5. Statistics and aggregations
6. Import/export functionality
7. Map-based data storage

### From API Integration Learn:
1. Building reusable API clients
2. Generic typing for flexibility
3. Error handling strategies
4. Retry and timeout patterns
5. Caching implementations
6. Service layer architecture
7. Real-world API integration

## Extension Ideas

### Todo App Extensions
1. **Persistence**: Add file system or database storage
2. **CLI Interface**: Build command-line interface
3. **Web UI**: Create React/Vue frontend
4. **Collaboration**: Add multi-user support
5. **Notifications**: Implement due date reminders
6. **Subtasks**: Add nested todo items
7. **Categories**: Organize todos into projects

### API Integration Extensions
1. **Authentication**: Add OAuth/JWT support
2. **Rate Limiting**: Implement request throttling
3. **Pagination**: Handle paginated responses
4. **WebSocket**: Add real-time updates
5. **GraphQL**: Support GraphQL queries
6. **Offline Mode**: Queue requests when offline
7. **Request Interception**: Add middleware system

## Best Practices Demonstrated

### Code Organization
- Clear file structure
- Logical grouping of functionality
- Separation of concerns
- Reusable components

### Type Safety
- Comprehensive type coverage
- No implicit `any`
- Explicit return types
- Type guards where needed

### Error Handling
- Custom error types
- Proper error propagation
- User-friendly messages
- Graceful failure modes

### Documentation
- JSDoc comments
- Type annotations
- Usage examples
- Clear naming

### Performance
- Efficient algorithms
- Caching strategies
- Lazy evaluation
- Resource cleanup

## Testing Ideas

Both projects are ready for testing:

```typescript
// Example test for TodoManager
describe("TodoManager", () => {
    it("should create a todo", () => {
        const manager = new TodoManager();
        const todo = manager.create({...});
        expect(todo.id).toBeDefined();
    });
    
    it("should filter by status", () => {
        const manager = new TodoManager();
        // ... create todos
        const pending = manager.filter({ status: TodoStatus.Pending });
        expect(pending).toHaveLength(2);
    });
});

// Example test for ApiClient
describe("ApiClient", () => {
    it("should make GET request", async () => {
        const client = new ApiClient("https://api.test.com");
        const data = await client.get<User[]>("/users");
        expect(data).toBeInstanceOf(Array);
    });
    
    it("should retry on failure", async () => {
        // Test retry logic
    });
});
```

## Next Steps

After working with these projects:

1. **Modify and Extend**: Add new features to understand the codebase
2. **Build Your Own**: Create similar projects from scratch
3. **Add Tests**: Write unit and integration tests
4. **Deploy**: Package and deploy to production
5. **Contribute**: Share your improvements

## Additional Resources

- TypeScript Documentation
- REST API Best Practices
- Design Patterns in TypeScript
- Testing with Jest/Mocha
- Building CLIs with TypeScript

## Tips for Learning

1. **Run the code**: Execute and observe the output
2. **Modify examples**: Change parameters and see results
3. **Break things**: Intentionally introduce errors to understand types
4. **Add features**: Implement new functionality
5. **Refactor**: Improve code structure and types
6. **Test thoroughly**: Write tests for edge cases
7. **Review patterns**: Study the architectural decisions

---

These projects demonstrate professional TypeScript development practices and serve as templates for your own applications.
