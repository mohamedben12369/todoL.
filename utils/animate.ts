import { Animated, Easing } from 'react-native';

interface AnimationConfig {
  duration?: number;
  easing?: (value: number) => number;
  delay?: number;
  useNativeDriver?: boolean;
}

export const animate = {
  fade: (
    value: Animated.Value,
    toValue: number,
    config?: AnimationConfig
  ) => {
    return Animated.timing(value, {
      toValue,
      duration: config?.duration || 300,
      easing: config?.easing || Easing.ease,
      delay: config?.delay || 0,
      useNativeDriver: config?.useNativeDriver ?? true,
    });
  },

  spring: (
    value: Animated.Value,
    toValue: number,
    config?: Animated.SpringAnimationConfig
  ) => {
    return Animated.spring(value, {
      toValue,
      damping: config?.damping || 10,
      mass: config?.mass || 1,
      stiffness: config?.stiffness || 100,
      useNativeDriver: config?.useNativeDriver ?? true,
    });
  },

  sequence: (animations: Animated.CompositeAnimation[]) => {
    return Animated.sequence(animations);
  },

  parallel: (animations: Animated.CompositeAnimation[]) => {
    return Animated.parallel(animations);
  },

  stagger: (
    animations: Animated.CompositeAnimation[],
    staggerDuration: number = 100
  ) => {
    return Animated.stagger(staggerDuration, animations);
  },
}; 