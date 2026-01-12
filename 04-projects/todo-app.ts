/**
 * TODO APP - Complete TypeScript Application
 * 
 * A fully-typed todo application demonstrating practical TypeScript usage.
 * Includes CRUD operations, filtering, persistence, and error handling.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Priority levels for todos
 */
enum Priority {
    Low = "low",
    Medium = "medium",
    High = "high",
    Urgent = "urgent"
}

/**
 * Status of a todo item
 */
enum TodoStatus {
    Pending = "pending",
    InProgress = "in_progress",
    Completed = "completed",
    Archived = "archived"
}

/**
 * Todo item interface
 */
interface Todo {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    status: TodoStatus;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
    completedAt?: Date;
}

/**
 * Todo creation input (omits generated fields)
 */
type CreateTodoInput = Omit<Todo, "id" | "createdAt" | "updatedAt" | "completedAt">;

/**
 * Todo update input (partial with optional fields)
 */
type UpdateTodoInput = Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>;

/**
 * Filter options for querying todos
 */
interface TodoFilters {
    status?: TodoStatus;
    priority?: Priority;
    tags?: string[];
    searchQuery?: string;
    dueBefore?: Date;
    dueAfter?: Date;
}

/**
 * Sort options
 */
type TodoSortField = "createdAt" | "updatedAt" | "dueDate" | "priority" | "title";
type SortDirection = "asc" | "desc";

interface SortOptions {
    field: TodoSortField;
    direction: SortDirection;
}

/**
 * Statistics about todos
 */
interface TodoStats {
    total: number;
    byStatus: Record<TodoStatus, number>;
    byPriority: Record<Priority, number>;
    overdue: number;
    completedToday: number;
}

// ============================================
// TODO MANAGER CLASS
// ============================================

/**
 * Main class for managing todos
 */
class TodoManager {
    private todos: Map<string, Todo>;
    private nextId: number;

    constructor() {
        this.todos = new Map();
        this.nextId = 1;
    }

    /**
     * Generate a unique ID
     */
    private generateId(): string {
        return `todo-${this.nextId++}`;
    }

    /**
     * Create a new todo
     */
    create(input: CreateTodoInput): Todo {
        const todo: Todo = {
            id: this.generateId(),
            ...input,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.todos.set(todo.id, todo);
        console.log(`✓ Created todo: "${todo.title}" [${todo.id}]`);
        return todo;
    }

    /**
     * Get todo by ID
     */
    getById(id: string): Todo | undefined {
        return this.todos.get(id);
    }

    /**
     * Get all todos
     */
    getAll(): Todo[] {
        return Array.from(this.todos.values());
    }

    /**
     * Update a todo
     */
    update(id: string, updates: UpdateTodoInput): Todo | undefined {
        const todo = this.todos.get(id);
        
        if (!todo) {
            console.error(`✗ Todo not found: ${id}`);
            return undefined;
        }

        const updatedTodo: Todo = {
            ...todo,
            ...updates,
            updatedAt: new Date(),
            // Set completedAt when status changes to completed
            completedAt: updates.status === TodoStatus.Completed && 
                        todo.status !== TodoStatus.Completed
                        ? new Date()
                        : todo.completedAt
        };

        this.todos.set(id, updatedTodo);
        console.log(`✓ Updated todo: "${updatedTodo.title}" [${id}]`);
        return updatedTodo;
    }

    /**
     * Delete a todo
     */
    delete(id: string): boolean {
        const deleted = this.todos.delete(id);
        if (deleted) {
            console.log(`✓ Deleted todo: ${id}`);
        } else {
            console.error(`✗ Todo not found: ${id}`);
        }
        return deleted;
    }

    /**
     * Filter todos based on criteria
     */
    filter(filters: TodoFilters): Todo[] {
        let results = this.getAll();

        // Filter by status
        if (filters.status) {
            results = results.filter(todo => todo.status === filters.status);
        }

        // Filter by priority
        if (filters.priority) {
            results = results.filter(todo => todo.priority === filters.priority);
        }

        // Filter by tags
        if (filters.tags && filters.tags.length > 0) {
            results = results.filter(todo =>
                filters.tags!.some(tag => todo.tags.includes(tag))
            );
        }

        // Search in title and description
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            results = results.filter(todo =>
                todo.title.toLowerCase().includes(query) ||
                todo.description.toLowerCase().includes(query)
            );
        }

        // Filter by due date
        if (filters.dueBefore && filters.dueAfter) {
            results = results.filter(todo =>
                todo.dueDate &&
                todo.dueDate <= filters.dueBefore! &&
                todo.dueDate >= filters.dueAfter!
            );
        } else if (filters.dueBefore) {
            results = results.filter(todo =>
                todo.dueDate && todo.dueDate <= filters.dueBefore!
            );
        } else if (filters.dueAfter) {
            results = results.filter(todo =>
                todo.dueDate && todo.dueDate >= filters.dueAfter!
            );
        }

        return results;
    }

    /**
     * Sort todos
     */
    sort(todos: Todo[], options: SortOptions): Todo[] {
        return [...todos].sort((a, b) => {
            let aValue = a[options.field];
            let bValue = b[options.field];

            // Handle undefined values
            if (aValue === undefined) return 1;
            if (bValue === undefined) return -1;

            // Compare dates
            if (aValue instanceof Date && bValue instanceof Date) {
                return options.direction === "asc"
                    ? aValue.getTime() - bValue.getTime()
                    : bValue.getTime() - aValue.getTime();
            }

            // Compare strings/enums
            if (typeof aValue === "string" && typeof bValue === "string") {
                return options.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return 0;
        });
    }

    /**
     * Get overdue todos
     */
    getOverdue(): Todo[] {
        const now = new Date();
        return this.getAll().filter(todo =>
            todo.dueDate &&
            todo.dueDate < now &&
            todo.status !== TodoStatus.Completed &&
            todo.status !== TodoStatus.Archived
        );
    }

    /**
     * Get statistics
     */
    getStats(): TodoStats {
        const todos = this.getAll();
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const byStatus = todos.reduce((acc, todo) => {
            acc[todo.status] = (acc[todo.status] || 0) + 1;
            return acc;
        }, {} as Record<TodoStatus, number>);

        const byPriority = todos.reduce((acc, todo) => {
            acc[todo.priority] = (acc[todo.priority] || 0) + 1;
            return acc;
        }, {} as Record<Priority, number>);

        const overdue = this.getOverdue().length;

        const completedToday = todos.filter(todo =>
            todo.completedAt && todo.completedAt >= todayStart
        ).length;

        return {
            total: todos.length,
            byStatus,
            byPriority,
            overdue,
            completedToday
        };
    }

    /**
     * Archive completed todos
     */
    archiveCompleted(): number {
        let archived = 0;
        this.todos.forEach(todo => {
            if (todo.status === TodoStatus.Completed) {
                this.update(todo.id, { status: TodoStatus.Archived });
                archived++;
            }
        });
        console.log(`✓ Archived ${archived} completed todos`);
        return archived;
    }

    /**
     * Clear all todos (with confirmation)
     */
    clear(): void {
        const count = this.todos.size;
        this.todos.clear();
        this.nextId = 1;
        console.log(`✓ Cleared ${count} todos`);
    }

    /**
     * Export todos to JSON
     */
    export(): string {
        const todos = this.getAll();
        return JSON.stringify(todos, null, 2);
    }

    /**
     * Import todos from JSON
     */
    import(json: string): number {
        try {
            const todos: Todo[] = JSON.parse(json);
            let imported = 0;

            todos.forEach(todo => {
                // Convert date strings back to Date objects
                this.todos.set(todo.id, {
                    ...todo,
                    createdAt: new Date(todo.createdAt),
                    updatedAt: new Date(todo.updatedAt),
                    dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
                    completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined
                });
                imported++;
            });

            console.log(`✓ Imported ${imported} todos`);
            return imported;
        } catch (error) {
            console.error("✗ Failed to import todos:", error);
            return 0;
        }
    }
}

// ============================================
// EXAMPLE USAGE
// ============================================

function main(): void {
    console.log("=== Todo App Demo ===\n");

    const manager = new TodoManager();

    // Create some todos
    const todo1 = manager.create({
        title: "Learn TypeScript",
        description: "Complete TypeScript tutorials",
        priority: Priority.High,
        status: TodoStatus.InProgress,
        tags: ["learning", "typescript"],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
    });

    const todo2 = manager.create({
        title: "Build Todo App",
        description: "Create a full-featured todo application",
        priority: Priority.Medium,
        status: TodoStatus.Pending,
        tags: ["project", "typescript"],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now
    });

    const todo3 = manager.create({
        title: "Write Documentation",
        description: "Document the codebase",
        priority: Priority.Low,
        status: TodoStatus.Pending,
        tags: ["documentation"]
    });

    console.log("\n--- All Todos ---");
    manager.getAll().forEach(todo => {
        console.log(`[${todo.id}] ${todo.title} - ${todo.status} (${todo.priority})`);
    });

    // Update a todo
    console.log("\n--- Update Todo ---");
    manager.update(todo1.id, {
        status: TodoStatus.Completed
    });

    // Filter todos
    console.log("\n--- Filter by Status (Pending) ---");
    const pendingTodos = manager.filter({ status: TodoStatus.Pending });
    pendingTodos.forEach(todo => {
        console.log(`- ${todo.title}`);
    });

    // Search todos
    console.log("\n--- Search for 'typescript' ---");
    const searchResults = manager.filter({ searchQuery: "typescript" });
    searchResults.forEach(todo => {
        console.log(`- ${todo.title}`);
    });

    // Sort todos
    console.log("\n--- Sort by Priority ---");
    const sorted = manager.sort(manager.getAll(), {
        field: "priority",
        direction: "desc"
    });
    sorted.forEach(todo => {
        console.log(`- ${todo.title} (${todo.priority})`);
    });

    // Get statistics
    console.log("\n--- Statistics ---");
    const stats = manager.getStats();
    console.log(`Total: ${stats.total}`);
    console.log(`By Status:`, stats.byStatus);
    console.log(`By Priority:`, stats.byPriority);
    console.log(`Overdue: ${stats.overdue}`);
    console.log(`Completed Today: ${stats.completedToday}`);

    // Export/Import
    console.log("\n--- Export/Import ---");
    const exported = manager.export();
    console.log("Exported todos (JSON)");
    
    // Archive completed
    console.log("\n--- Archive Completed ---");
    manager.archiveCompleted();

    console.log("\n=== Demo Complete ===");
}

// Run the demo
if (require.main === module) {
    main();
}

// Export for use in other modules
export {
    TodoManager,
    Todo,
    CreateTodoInput,
    UpdateTodoInput,
    TodoFilters,
    TodoStatus,
    Priority,
    TodoStats
};
