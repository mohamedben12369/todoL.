import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { animate } from '../utils/animate';
import { animations } from '../styles/animations';
import { theme, baseStyles } from '../styles/theme';

interface Props {
  onPress?: () => void;
  children: React.ReactNode;
  index?: number;
}

export function AnimatedTask({ onPress, children, index = 0 }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    animate.stagger([
      animate.fade(fadeAnim, 1, { delay: index * 100 }),
      animate.spring(scaleAnim, 1)
    ]).start();
  }, []);

  const handlePress = () => {
    animate.sequence([
      animate.spring(scaleAnim, 0.95),
      animate.spring(scaleAnim, 1)
    ]).start();
    onPress?.();
  };

  return (
    <Animated.View
      style={[
        baseStyles.card,
        baseStyles.shadow,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}
    >
      <TouchableOpacity onPress={handlePress}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
} 