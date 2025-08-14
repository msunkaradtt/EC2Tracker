// src/components/InstanceStatus.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function InstanceStatus({ state }: { state: string }) {
  // Running is green, Stopped is red, other states are yellow
  const lightColor = state === 'running' ? '#2ecc71' : state === 'stopped' ? '#e74c3c' : '#f1c40f'; // Green, Red, Yellow

  return <View style={[styles.light, { backgroundColor: lightColor }]} />;
}

const styles = StyleSheet.create({
  light: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
});