import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> De Kast</Text>

      <Text style={styles.subTitle}> QR Code</Text>
      <QRCode
        value="https://jouw-website.nl"
        size={220}
        color="white"  
        backgroundColor="black"
      />
      <Text style={styles.subTitle}>
      </Text>
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
});
