// src/screens/DashboardScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, SectionList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  ActivityIndicator, 
  Button, 
  Modal, 
  Portal, 
  Text, 
  useTheme, 
  Appbar 
} from 'react-native-paper';
import { fetchAllInstanceData } from '../services/aws';
import AccountCard from '../components/AccountCard';
import { REGION_GROUPS, Region } from '../constants/regions';
import { deleteCredentials } from '../services/credentials';
import Footer from '../components/Footer';

// Define types for state management
interface Instance {
  id: string | undefined;
  state: string | undefined;
  region: string;
}
interface AccountData {
  accountName: string | undefined;
  accountId: string | undefined;
  instances: Instance[];
}

// Storage Keys
const ROOT_REGION_KEY = '@ec2tracker_root_region';
const EC2_REGIONS_KEY = '@ec2tracker_ec2_regions';

export default function DashboardScreen({ onLogout }: { onLogout: () => void }) {
  const theme = useTheme();
  const [data, setData] = useState<AccountData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for root region, EC2 regions, and modal mode
  const [rootRegion, setRootRegion] = useState('us-east-1');
  const [ec2Regions, setEc2Regions] = useState<string[]>(['us-east-1']);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'root' | 'ec2'>('ec2');
  
  // Load saved settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      const storedRoot = await AsyncStorage.getItem(ROOT_REGION_KEY);
      const storedEc2 = await AsyncStorage.getItem(EC2_REGIONS_KEY);
      if (storedRoot) setRootRegion(JSON.parse(storedRoot));
      if (storedEc2) setEc2Regions(JSON.parse(storedEc2));
    };
    loadSettings();
  }, []);

  // Fetch data from AWS
  const loadData = useCallback(async () => {
    if (ec2Regions.length === 0) {
        setError("Please select at least one EC2 region to scan.");
        setData([]);
        return;
    }
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await fetchAllInstanceData(rootRegion, ec2Regions);
      setData(fetchedData);
    } catch (e) {
      setError('Failed to fetch data. Check permissions and connection.');
    } finally {
      setLoading(false);
    }
  }, [rootRegion, ec2Regions]);

  useEffect(() => { loadData(); }, [loadData]);

  // Handle region selection in the modal
  const handleSelectRegion = (regionCode: string) => {
    if (modalMode === 'root') {
      setRootRegion(regionCode);
    } else { // 'ec2' mode
      const newRegions = ec2Regions.includes(regionCode)
        ? ec2Regions.filter(r => r !== regionCode)
        : [...ec2Regions, regionCode];
      setEc2Regions(newRegions);
    }
  };
  
  // Save settings and close modal
  const handleSaveAndClose = async () => {
    await AsyncStorage.setItem(ROOT_REGION_KEY, JSON.stringify(rootRegion));
    await AsyncStorage.setItem(EC2_REGIONS_KEY, JSON.stringify(ec2Regions));
    setModalVisible(false);
    loadData();
  };
  
  // Handle the logout press from the Appbar
  const handleLogoutPress = async () => {
    await deleteCredentials(); 
    onLogout(); 
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator animating={true} style={styles.center} size="large" />;
    }
    if (error) {
      return (
        <View style={styles.center}>
          <Text variant="bodyLarge" style={{ color: theme.colors.error }}>{error}</Text>
        </View>
      );
    }
    return (
      <SectionList
        contentContainerStyle={styles.listContent}
        sections={[{ title: 'Accounts', data: data }]}
        keyExtractor={(item) => item.accountId!}
        renderItem={({ item }) => (
          <AccountCard
            accountName={item.accountName}
            accountId={item.accountId}
            instances={item.instances}
          />
        )}
      />
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="EC2 Tracker" />
        <Appbar.Action icon="refresh" onPress={loadData} />
        <Appbar.Action icon="map-marker-multiple" onPress={() => { setModalMode('ec2'); setModalVisible(true); }} />
        <Appbar.Action icon="logout" onPress={handleLogoutPress} />
      </Appbar.Header>
      
      <Portal>
        <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <Text variant="headlineSmall" style={styles.modalTitle}>
              {modalMode === 'root' ? 'Select Root Region' : 'Select EC2 Regions'}
            </Text>
            <SectionList
              sections={REGION_GROUPS}
              keyExtractor={(item: Region) => item.code}
              renderItem={({ item }) => {
                const isSelected = modalMode === 'root' ? rootRegion === item.code : ec2Regions.includes(item.code);
                return (
                  <Pressable style={styles.regionOption} onPress={() => handleSelectRegion(item.code)}>
                    <Text variant="bodyLarge">
                      {isSelected ? '✅' : '🔲'} {item.name} ({item.code})
                    </Text>
                  </Pressable>
                );
              }}
              renderSectionHeader={({ section: { title } }) => (
                <Text variant="titleMedium" style={[styles.sectionHeader, {backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurfaceVariant}]}>{title}</Text>
              )}
            />
            <Button mode="contained" onPress={handleSaveAndClose} style={{ marginTop: 20 }}>Done</Button>
        </Modal>
      </Portal>

      <Button mode="text" onPress={() => { setModalMode('root'); setModalVisible(true); }} style={styles.rootRegionButton}>
        Root Region: {rootRegion}
      </Button>
      
      <View style={styles.contentWrapper}>
        {renderContent()}
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingBottom: 20 },
  rootRegionButton: {
    marginVertical: 8,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    padding: 10, 
    marginTop: 10,
    borderRadius: 5,
  },
  regionOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444'
  },
});