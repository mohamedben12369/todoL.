import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Habit {
  color: string;
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completedDates: string[];
  createdAt: Date;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string) => void;
  getStreak: (id: string) => number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (isReady) {
      saveTasks();
    }
  }, [tasks, isReady]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
      setIsReady(true);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setIsReady(true);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!isReady) return;
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    if (!isReady) return;
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    if (!isReady) return;
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    if (!isReady) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      ...habitData,
      createdAt: new Date(),
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    if (!isReady) return;
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    if (!isReady) return;
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completeHabit = (id: string) => {
    if (!isReady) return;
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: true } : habit
    ));
  };

  const getStreak = (id: string) => {
    if (!isReady) return 0;
    const habit = habits.find(h => h.id === id);
    if (!habit) return 0;
    const today = new Date().toISOString().split('T')[0];
    const completedDates = habit.completedDates || [];
    const streak = completedDates.filter(date => date === today).length;
    return streak;
  };

  if (!isReady) {
    return null;
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      habits,
      addHabit,
      updateHabit,
      deleteHabit,
      completeHabit,
      getStreak,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
} 