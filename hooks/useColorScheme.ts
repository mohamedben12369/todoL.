import { useColorScheme as _useColorScheme } from 'react-native';

// Add type safety
export function useColorScheme(): 'light' | 'dark' | null {
  return _useColorScheme() as 'light' | 'dark' | null;
}
