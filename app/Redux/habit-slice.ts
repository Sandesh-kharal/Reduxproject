
import { createSlice } from '@reduxjs/toolkit'
import  type { PayloadAction } from '@reduxjs/toolkit'


export interface Habit {
    id: string;
    name: string;
    description: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    startDate: string;
    completedDate: string[];
    progress: number; // percentage of completion
}

interface HabitState {
    habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
    name: 'habits',
    initialState,
      
    reducers: {
        addhabit: (
            state, 
            action: PayloadAction<{ name: string; frequency: 'daily' | 'weekly' | 'monthly' }>
        ) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                description: '',
                frequency: action.payload.frequency,
                startDate: new Date().toISOString(),
                completedDate: [],
                progress: 0,
            };
            state.habits.push(newHabit);
        },

        toggleHabit: (state, action: PayloadAction<{ id: string ; date: string }>) => {
            const habit = state.habits.find(h => h.id === action.payload.id);
            if (habit) {
                const dateIndex = habit.completedDate.indexOf(action.payload.date);
                if (dateIndex > -1) {
                    habit.completedDate.splice(dateIndex, 1);
                } else {
                    habit.completedDate.push(action.payload.date);
                }
            }
        },
    
    removehabit: (state, action: PayloadAction<{ id: string }>) => {
      // Delete the entire habit object
      state.habits = state.habits.filter(h => h.id !== action.payload.id);
    }, 
    },
})

export const { addhabit , toggleHabit, removehabit} = habitSlice.actions
export default habitSlice.reducer