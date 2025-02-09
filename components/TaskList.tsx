import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTask } from '../contexts/TaskContext';
import { useTheme } from '../contexts/ThemeContext';
import { Task } from '../types/task';
import { AddTaskButton } from './AddTaskButton';

export function TaskList() {
  const { tasks, toggleComplete, deleteTask } = useTask();
  const { colors } = useTheme();

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No tasks yet. Click the + button to add one!
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Task }) => (
    <View style={[styles.taskItem, { 
      backgroundColor: colors.surface,
      borderColor: colors.border 
    }]}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => toggleComplete(item.id)}
      >
        <View style={[styles.checkboxInner, { 
          borderColor: colors.primary,
          backgroundColor: item.completed ? colors.primary : 'transparent'
        }]} />
      </TouchableOpacity>
      
      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, { 
          color: colors.text,
          textDecorationLine: item.completed ? 'line-through' : 'none'
        }]}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={[styles.taskDescription, { color: colors.textSecondary }]}>
            {item.description}
          </Text>
        )}
      </View>

      <TouchableOpacity 
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={[styles.deleteText, { color: colors.error }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={renderEmptyList}
      />
      <AddTaskButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 4,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteButton: {
    marginLeft: 12,
  },
  deleteText: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 