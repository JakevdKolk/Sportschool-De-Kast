import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router"; // 👈

export default function QRCodeScreen() {
  const [subscription, setSubscription] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadSubscription = async () => {
        const saved = await AsyncStorage.getItem("subscription");
        if (saved) {
          setSubscription(saved);
        } else {
          setSubscription(null);
        }
      };
      loadSubscription();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>De Kast</Text>

      <Text style={styles.subTitle}>QR Code</Text>
      <QRCode
        value="https://jouw-website.nl"
        size={220}
        color="white"
        backgroundColor="black"
      />

      {/* Tekstje met het gekozen abonnement */}
      {subscription ? (
        <Text style={styles.subscriptionText}>
          Jouw abonnement: {subscription}
        </Text>
      ) : (
        <Text style={styles.subscriptionText}>
          Nog geen abonnement gekozen
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 60,
  },
  subTitle: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 50,
  },
  subscriptionText: {
    marginTop: 30,
    fontSize: 18,
    color: "white",
  },
});
