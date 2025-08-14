// src/components/AnimatedGradient.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function AnimatedGradient() {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 10000, 
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const firstColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      '#1E3A8A', // Primary Color
      '#2DD4BF', // Secondary Color
      '#1E3A8A', // Back to Primary
    ],
  });

  const secondColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      '#2DD4BF', // Secondary Color
      '#105B51', // A darker shade for more contrast
      '#2DD4BF', // Back to Secondary
    ],
  });

  return (
    <AnimatedLinearGradient
      colors={[firstColor, secondColor]}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 1, y: 0.8 }}
    />
  );
}