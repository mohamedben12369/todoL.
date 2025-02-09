import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { useTask } from '../context/TaskContext';
import { theme } from '../styles/theme';

interface StatsViewProps {
  visible: boolean;
  onClose: () => void;
}

export function StatsView({ visible, onClose }: StatsViewProps) {
  const { habits } = useTask();

  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => 
    habit.completedDates.includes(new Date().toISOString().split('T')[0])
  ).length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Statistics</Text>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalHabits}</Text>
            <Text style={styles.statLabel}>Total Habits</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completedToday}</Text>
            <Text style={styles.statLabel}>Completed Today</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 