import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [{
        id: 1,
        title: "Project Kickoff",
        description: "Initial meeting with team",
        dueDate: "2024-02-15",
        completed: false
      },
      {
        id: 2,
        title: "Design Review",
        description: "Review UI/UX designs",
        dueDate: "2024-01-20",
        completed: false
      }],
    filter: 'all'
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },

        editTask: (state, action) => {
            console.log("Hey!!");
            const { id, updatedTask } = action.payload;
            state.tasks = state.tasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            );
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },

        toggleCompletion: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) task.completed = !task.completed;
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    }
})

export const selectFilteredTasks = (state) => {
    const { tasks, filter } = state.tasks;
    const currentDate = new Date();
  
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      case 'overdue':
        return tasks.filter(
          (task) => new Date(task.dueDate) < currentDate && !task.completed
        );
      default:
        return tasks;
    }
  };

export const { addTask, editTask, deleteTask, toggleCompletion, setFilter } = taskSlice.actions;
export default taskSlice.reducer;