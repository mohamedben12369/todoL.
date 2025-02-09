import React, { createContext, useContext, useState } from 'react';
import { Task, CreateTaskInput, Category } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (task: CreateTaskInput) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleComplete: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories] = useState<Category[]>([
    { id: 1, name: 'Work', color: '#FF453A', userId: 1 },
    { id: 2, name: 'Personal', color: '#32D74B', userId: 1 },
  ]);

  const addTask = async (input: CreateTaskInput) => {
    const newTask: Task = {
      id: Date.now(),
      ...input,
      completed: false,
      userId: 1,
      priority: input.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
    ));
  };

  const deleteTask = async (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = async (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date() } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      categories, 
      addTask, 
      updateTask, 
      deleteTask, 
      toggleComplete 
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
} 