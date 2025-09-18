import { Button } from '@react-navigation/elements';
import { useNavigation, useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, Text, ImageBackground, Dimensions, Pressable } from 'react-native';

const { height, width } = Dimensions.get('window');
console.log(height, width);
export default function TabTwoScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/sportschool-kast-background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Begin je vandaag <Text style={[styles.text, styles.subtext]}>beter</Text> te voelen
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.btn, styles.loginBtn]} onPress={() => router.push('/Auth/Login')}>
              <Text style={styles.btnText}>Login</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.registerBtn]} onPress={() => console.log('Register')}>
              <Text style={styles.btnText}>Register</Text>
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
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 32,
  },
  subtext: {
    color: '#63D2FF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    height: 60,
    paddingVertical: 10,
    width: '100%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginBottom: 80, 

  },
  btn: {
    width: '45%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loginBtn: {
    backgroundColor: 'rgba(217, 217, 217, 0.30)',

  },
  registerBtn: {
    backgroundColor: '#3A9ADA',
  },

});
