import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Habit, useTask } from '../context/TaskContext';
import { theme } from '../styles/theme';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { completeHabit } = useTask();
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  const streak = habit.completedDates.length;

  return (
    <Animated.View style={[styles.card, { borderLeftColor: habit.color || theme.colors.primary }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{habit.title}</Text>
        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}
        <View style={styles.stats}>
          <Text style={styles.streak}>🔥 {streak} day streak</Text>
          <Text style={styles.frequency}>📅 {habit.frequency}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          isCompletedToday && styles.checkedButton
        ]}
        onPress={() => completeHabit(habit.id)}
      >
        <Text style={styles.checkText}>
          {isCompletedToday ? '✓' : ''}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  streak: {
    fontSize: 12,
    color: theme.colors.primary,
    marginRight: 12,
  },
  frequency: {
    fontSize: 12,
    color: '#666',
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 12,
  },
  checkedButton: {
    backgroundColor: theme.colors.primary,
  },
  checkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 