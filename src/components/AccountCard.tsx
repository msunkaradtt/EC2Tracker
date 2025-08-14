// src/components/AccountCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import InstanceStatus from './InstanceStatus';

interface Instance {
  id: string | undefined;
  state: string | undefined;
  region: string;
}

interface AccountCardProps {
  accountName: string | undefined;
  accountId: string | undefined;
  instances: Instance[];
}

export default function AccountCard({ accountName, accountId, instances }: AccountCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={accountName}
        subtitle={`ID: ${accountId}`}
        titleVariant="titleMedium"
      />
      <Card.Content>
        {instances.length === 0 ? (
          <Text style={styles.noInstancesText} variant="bodySmall">
            No instances found in selected regions.
          </Text>
        ) : (
          instances.map((inst, index) => (
            <View key={inst.id}>
              <View style={styles.instanceRow}>
                <InstanceStatus state={inst.state!} />
                <View>
                  <Text variant="bodyMedium">{inst.id}</Text>
                  <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                    {inst.region} - {inst.state}
                  </Text>
                </View>
              </View>
              {index < instances.length - 1 && <Divider />}
            </View>
          ))
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  instanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  noInstancesText: {
    fontStyle: 'italic',
    opacity: 0.7,
    paddingVertical: 10,
  }
});