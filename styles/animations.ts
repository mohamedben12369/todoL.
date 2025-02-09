import { StyleSheet } from 'react-native';

export const animations = StyleSheet.create({
  fadeIn: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  fadeOut: {
    opacity: 0,
    transform: [{ translateY: 20 }],
  },
  scaleIn: {
    transform: [{ scale: 1 }],
  },
  scaleOut: {
    transform: [{ scale: 0.95 }],
  },
  slideInRight: {
    transform: [{ translateX: 0 }],
  },
  slideOutRight: {
    transform: [{ translateX: 100 }],
  },
  slideInLeft: {
    transform: [{ translateX: 0 }],
  },
  slideOutLeft: {
    transform: [{ translateX: -100 }],
  },
  bounceIn: {
    transform: [{ scale: 1 }],
  },
  bounceOut: {
    transform: [{ scale: 0.3 }],
  },
  rotateIn: {
    transform: [{ rotate: '0deg' }],
  },
  rotateOut: {
    transform: [{ rotate: '180deg' }],
  },
}); 