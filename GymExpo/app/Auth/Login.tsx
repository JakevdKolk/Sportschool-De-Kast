import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, ImageBackground, TextInput, Pressable, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

export const options = {
  headerShown: false,
};

export default function LoginScreen() {
  const [loginState, setLoginState] = useState(AsyncStorage.getItem('authToken'));
  const router = useRouter();

  async function handleLogin() {
    console.log('Registreren...');
    await AsyncStorage.setItem('auth', 'true');
    if (await AsyncStorage.getItem('auth') === 'true') {
      router.replace('/(tabs)/home');
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/sportschool-kast-background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // pas dit aan afhankelijk van je header
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <View style={styles.buttonContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Wachtwoord"
                    placeholderTextColor="#fff"
                    style={styles.input}
                    secureTextEntry
                  />
                </View>
                <Pressable style={[styles.btn, styles.loginBtn]} onPress={handleLogin}>
                  <Text style={styles.btnText}>INLOGGEN</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scroll: { flex: 1, padding: 20 },
  contentContainer: { flex: 1, justifyContent: 'flex-end' }, // formulier blijft onderaan
  input: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
    color: 'white',
    backgroundColor: 'rgba(217, 217, 217, 0.30)',
  },
  btn: { borderRadius: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, marginTop: 10 },
  btnText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
  loginBtn: { backgroundColor: 'rgba(217, 217, 217, 0.30)' },
  buttonContainer: {
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    padding: 15,
    width: '100%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 80,
  },
  inputContainer: { display: 'flex', flexDirection: 'column', gap: 20 },
});
