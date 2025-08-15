// src/components/Footer.tsx
import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

// The component now accepts an optional 'lightText' prop
export default function Footer({ lightText }: { lightText?: boolean }) {
  const theme = useTheme();

  const handlePress = () => {
    Linking.openURL('https://msunkara.de/').catch(err => 
      console.error("Couldn't load page", err)
    );
  };

  // Conditionally set colors based on the lightText prop
  const baseTextColor = lightText ? '#CCC' : theme.colors.onSurfaceDisabled;
  const linkColor = lightText ? '#FFF' : theme.colors.primary;

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={{ color: baseTextColor }}>
        Powered by{' '}
        <Text
          variant="bodySmall"
          style={[styles.link, { color: linkColor }]}
          onPress={handlePress}
        >
          MSunkara
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontWeight: 'bold',
  },
});