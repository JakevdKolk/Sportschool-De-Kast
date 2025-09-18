import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;

export default function qr() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.card}>
        {/* Logo / Title */}
        <ThemedText style={styles.title}>BIOFuel</ThemedText>

        {/* QR Code */}
        <View style={styles.qrContainer}>
          
        </View>

        {/* Caption */}
        <ThemedText style={styles.caption}>
          Scan de QR code om BioPoints te verdienen en korting te krijgen!
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 32,
    color: '#0a7c2f',
  },
  qrContainer: {
    marginBottom: 32,
  },
  caption: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6B7280',
  },
});
