__Modular and Scalable To-Do List App__

__Structure:__

- __App.tsx:__ The entry point, having the primary component `AppMain`.
- __src/:__ Contains the app's core logic (`AppMain.tsx`) and other components.

__AppMain (src/AppMain.tsx):__

- Manages app state with React's `useState`:

  - Tasks (list of tasks)
  - Task input (current task being entered)
  - Filters ("All", "Done", "Not Done")
  - Dark/light mode toggle

- Handles tasks:

  - `addTask` (adds a new task)
  - `deleteTask` (removes a task)
  - `toggleTaskCompletion` (marks tasks as done/undone)
  - `startEditing` (initiates task editing)
  - `saveTask` (saves edits)
  - `cancelEditing` (discards edits)

- Renders UI elements:
  - Header
  - Task input field
  - Action buttons
  - Task filters
  - `TaskList` component

__Components (src/components/):__

- __TaskList (TaskList.tsx):__
  - Renders a `FlatList` of tasks, mapping each to a `TaskItem`.
  - Manages task actions (edit, delete, toggle completion).
- __TaskItem (TaskItem.tsx):__
  - Represents a single task.
  - Enables task editing, completion toggling, and deletion.
- __Filters (Filters.tsx):__
  - Provides filter options ("All", "Done", "Not Done") for task filtering.

__Testing (tests/):__

- Unit tests for components (e.g., `AppMain.test.tsx`, `TaskItem.test.tsx`) using `@testing-library/react-native`.
- Covers component rendering and user interactions (adding tasks, toggling completion).

__Key Decisions:__

1. __State Management:__ Used `useState` for component-level state, for reactivity and efficient changes.
2. __Modularity:__ Components (AppMain, TaskList, TaskItem, Filters) are modular for reusability and maintainability, alignings with React's component-based architecture.
3. __UI/UX Design:__ Implements a straightforward and user-friendly interface with dark mode support, enhancing user experience and accessibility.
4. __Animation:__ Employs `LayoutAnimation` for smooth transitions during task operations (adding, deleting, editing), creating a polished user interface.
5. __Testing:__ Includes unit tests to guarantee component functionality and user interactions work flawlessly, upholding code quality and reliability.

__Overall, the application prioritizes:__

- __Modular Design:__ Components are separate and reusable, facilitating maintenance and future expansion.
- __Efficient State Management:__ `useState` simplifies state handling within components for optimal performance.
- __User-Centric Design:__ The interface is clear and intuitive, with dark mode for better accessibility.
- __Interactive Experience:__ `LayoutAnimation` provides smooth animations, enhancing user engagement.
- __Reliable Testing:__ Unit tests ensure the application's robustness and responsiveness.

This structure offers a well-organized and scalable foundation for a to-do list app, prioritizing clean code, user experience, and maintainability.
