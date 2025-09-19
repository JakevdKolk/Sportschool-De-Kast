import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';

import abonnement from './abonnement';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const storedAuth = AsyncStorage.getItem('auth');
  useEffect(() => {
    console.log("Stored auth value:", storedAuth);
    console.log("Authenticated state:", authenticated);
    console.log("Loading state:", loading);
  }, [storedAuth, loading, authenticated]);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem('auth');
        setAuthenticated(storedAuth === 'true');
      } catch (e) {
        console.error("Fout bij ophalen auth:", e);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Redirect naar login als niet ingelogd
  useEffect(() => {
    const handleAuth = async () => {
      if (!loading && authenticated === false) {
        router.replace('/LandingsPage');
      }
      if (authenticated) {
        await AsyncStorage.setItem('auth', 'true');
      }
    };

    handleAuth();
  }, [loading, authenticated]);

  if (loading) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="abonnement"/>
        <Stack.Screen name="register" />
        <Stack.Screen name="landingspage" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
