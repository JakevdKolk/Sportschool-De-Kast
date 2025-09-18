import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, ImageBackground, TextInput, Pressable, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

export const options = {
  headerShown: false,
};

export default function LoginScreen() {
  const [loginState, setLoginState] = useState(AsyncStorage.getItem('authToken'));
  const router = useRouter();
  const navigation = useNavigation();


  async function handleLogin() {
    console.log('Inloggen...');
    await AsyncStorage.setItem('auth', 'true');
    if (await AsyncStorage.getItem('auth') === 'true') {
      router.replace('/(tabs)/home');
    }
  }

  useLayoutEffect(() => {
    // verberg tabs
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });

    // optie: show tabs weer bij unmount
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined
      });
    };
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/sportschool-kast-background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#fff"
                style={styles.input}
                secureTextEntry
              />
              <TextInput
                placeholder="Wachtwoord"
                placeholderTextColor="#fff"
                style={styles.input}
                secureTextEntry
              />
            </View>
            <Pressable style={[styles.btn, styles.loginBtn]} onPress={() => { handleLogin(); }}>
              <Text style={styles.btnText}>INLOGGEN</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  text: {
    color: 'white',
    fontSize: 28,
  },
  subtext: {
    color: '#63D2FF',
  },
  formContainer: {
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },
  input: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
    color: 'white',
    backgroundColor: 'rgba(217, 217, 217, 0.30)',
  },
  btn: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  loginBtn: {
    backgroundColor: 'rgba(217, 217, 217, 0.30)',
  },
  registerBtn: {
    backgroundColor: '#3A9ADA',
  },
  extraContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    padding: 15,
    width: '100%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 80,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  }
});
