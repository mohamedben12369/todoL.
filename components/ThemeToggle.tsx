import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Current theme: {colorScheme}
      </Text>
      <Switch
        value={colorScheme === 'dark'}
        onValueChange={toggleColorScheme}
        trackColor={{ false: colors.border, true: colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
}); 