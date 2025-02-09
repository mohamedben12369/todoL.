import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { ThemeToggle } from './components/ThemeToggle';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ThemeToggle />
      {!user && <LoginForm />}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 