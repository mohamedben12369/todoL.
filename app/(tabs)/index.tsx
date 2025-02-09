import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useTask } from '../../context/TaskContext';
import { HabitCard } from '../../components/HabitCard';
import { AddHabitModal } from '../../components/AddHabitModal';
import { StatsView } from '../../components/StatsView';
import { theme } from '../../styles/theme';

export default function TabOneScreen() {
  const { habits } = useTask();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStats, setShowStats] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Habits</Text>
        <TouchableOpacity 
          style={styles.statsButton}
          onPress={() => setShowStats(true)}
        >
          <Text style={styles.statsButtonText}>📊 Stats</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.habitList}>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <AddHabitModal 
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <StatsView
        visible={showStats}
        onClose={() => setShowStats(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary + '20',
  },
  statsButtonText: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  habitList: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 32,
    color: 'white',
  },
});
