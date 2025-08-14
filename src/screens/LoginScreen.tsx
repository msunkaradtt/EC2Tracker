// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { saveCredentials } from '../services/credentials';
import AnimatedGradient from '../components/AnimatedGradient';

export default function LoginScreen({ onConnect, onShowInstructions }: { onConnect: () => void; onShowInstructions: () => void; }) {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();

  const handleConnect = async () => {
    if (accessKeyId && secretAccessKey) {
      await saveCredentials(accessKeyId, secretAccessKey);
      onConnect();
    } else {
      alert('Please enter both Access Key ID and Secret Access Key.');
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedGradient />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.contentContainer}
      >
        <Text variant="headlineLarge" style={[styles.title, { color: '#FFF' }]}>
          EC2 Tracker
        </Text>
        <Text variant="bodyMedium" style={[styles.subtitle, { color: '#DDD' }]}>
          Connect to your AWS account
        </Text>
        <TextInput
          label="AWS Access Key ID"
          value={accessKeyId}
          onChangeText={setAccessKeyId}
          style={[styles.input, { backgroundColor: theme.colors.elevation.level2 }]}
          mode="flat"
          autoCapitalize="none"
        />
        <TextInput
          label="AWS Secret Access Key"
          value={secretAccessKey}
          onChangeText={setSecretAccessKey}
          style={[styles.input, { backgroundColor: theme.colors.elevation.level2 }]}
          mode="flat"
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? "eye-off" : "eye"}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              color={theme.colors.onSurfaceVariant}
            />
          }
        />
        <Button
            mode="contained"
            onPress={handleConnect}
            style={styles.button}
            buttonColor={theme.colors.secondaryContainer}
            textColor={theme.colors.onSecondaryContainer}
        >
          Connect
        </Button>
        <Button
          mode="text"
          onPress={onShowInstructions}
          style={styles.button}
          labelStyle={{ color: '#DDD' }}
        >
          How to Use
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  }
});