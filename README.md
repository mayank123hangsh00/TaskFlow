# TaskFlow ✦ — Advanced Task Manager

A premium React Task Manager app with drag-and-drop, dark/light theming, animated transitions, Context API, custom hooks, and full local storage persistence.

## 🚀 Features

### Core Functionality
- ✅ **Add tasks** — type and press Enter or click + Add Task
- ✅ **Mark tasks as completed** — checkbox with strikethrough animation
- ✅ **Delete tasks** — trash button with fade-out collapse animation
- ✅ **Filter tasks** — All / Pending / Completed with live count badges
- ✅ **Local Storage persistence** — tasks and theme survive page refresh

### React Architecture
- ✅ **Custom Hook `useLocalStorage`** — handles all read/write to localStorage with error handling and cross-tab sync
- ✅ **Custom Hook `useTheme`** — persists dark/light mode preference
- ✅ **Context API** — `TaskContext` provides all state and actions; zero prop drilling
- ✅ **`React.memo`** — applied to `TaskItem`, `TaskList`, `FilterBar`, `ThemeToggle`, `EmptyState`
- ✅ **`useCallback`** — all action handlers memoized (`addTask`, `toggleTask`, `deleteTask`, `reorderTasks`, `onDragEnd`)
- ✅ **`useMemo`** — filtered task list, counts, completion rate, context value object
- ✅ **Form Validation** — prevents empty tasks, enforces min 3 chars, shows animated inline error

### UI & Design
- ✅ **Dark / Light Mode** — CSS custom properties toggled via `data-theme` on `<html>`, persisted in localStorage
- ✅ **Animations** — `slideInDown` on add, `fadeOutCollapse` on delete, `shake` on error, `floatIcon` on empty state
- ✅ **Responsive Design** — mobile-first layout with `clamp()` font sizes, flex-wrap, stacked input on small screens
- ✅ **Drag and Drop** — `react-beautiful-dnd` with drag handles, drop zone highlight, tilt animation on drag

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React 18 |
| Styling | Vanilla CSS (CSS custom properties) |
| Fonts | Google Fonts — Inter & Outfit |
| Drag & Drop | react-beautiful-dnd |
| Unique IDs | uuid |
| State | React Context API + useReducer-style callbacks |
| Persistence | Custom `useLocalStorage` hook |

---

## 📁 Project Structure

```
src/
├── context/
│   └── TaskContext.jsx       # Global state — tasks, filter, all actions
├── hooks/
│   ├── useLocalStorage.js    # Custom hook for localStorage with cross-tab sync
│   └── useTheme.js           # Dark/light mode with localStorage persistence
├── components/
│   ├── TaskInput.jsx         # Validated form input
│   ├── FilterBar.jsx         # All / Pending / Completed filters
│   ├── TaskList.jsx          # Droppable container
│   ├── TaskItem.jsx          # Draggable task card (React.memo)
│   ├── ThemeToggle.jsx       # Sun/moon toggle button
│   └── EmptyState.jsx        # Contextual empty state UI
├── App.jsx                   # Root — DragDropContext + stats + layout
├── main.jsx
└── index.css                 # Full design system with CSS variables & animations
```

---

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📝 Notes

- Drag and drop reordering works in the **All** filter view. In Pending/Completed filtered views, dragging is visually possible but reordering is locked (with a tooltip) because indices in filtered views don't map 1:1 to the underlying task array — this prevents silent data corruption.
- The project uses `--legacy-peer-deps` during install because `react-beautiful-dnd` declares peer dependency on React ≤18, but works correctly with React 19.
