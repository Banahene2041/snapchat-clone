import { Image } from 'expo-image';
import { Alert, Button, Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Colors } from '@/constants/theme';
import { usePermissions } from "expo-media-library"
import {useCameraPermissions, useMicrophonePermissions} from "expo-camera"
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function OnboardingScreen() {
  const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
  const [microphonePermissions, requestMicrophonePermission] = useMicrophonePermissions();
  const [mediaLibraryPermissions, requesMediaLibraryPermissions] = usePermissions();

  async function handleContinue() {
    const allPermission = await requestAllPermission()
    if (allPermission) {
      // navigation tabs
      router.replace("/(tabs)")
    } else {
     Alert.alert("To continue please provide permissions in settings") 
    }
  }

  async function requestAllPermission() {
    const cameraStatus = await requestCameraPermission()
    if (!cameraStatus?.granted) {
      Alert.alert("Error", "Camera permissions is required")
      return false
    }

     const microphoneStatus = await requestMicrophonePermission()
    if (!microphoneStatus?.granted) {
      Alert.alert("Error", "Microphone permissions is required")
      return false
    }
     const mediaLibraryStatus = await requesMediaLibraryPermissions()
    if (!mediaLibraryStatus?.granted) {
      Alert.alert("Error", "MediaLibrary permissions is required")
      return false
    }
    await AsyncStorage.setItem("hasOpened", "true")
    return true;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
              <SymbolView
                  name='camera.circle'
              size={250}
              type="hierarchical"
              tintColor={Colors.dark.snapPrimary}
              animationSpec={{
                effect: {
                  type: "bounce",
                }
              }}
              fallback={
                <Image
                  source={require('@/assets/images/partial-react-logo.png')}
                  style={styles.reactLogo}
                />
              }
              />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Snapchat Camera</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        Welcome friend! To provide the best experience, this app requires permission for the following:
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Camera Permission</ThemedText>
        <ThemedText type="defaultSemiBold">
          📹 For taking pictures
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Microphone Permission</ThemedText>
        <ThemedText type="defaultSemiBold">
          🎙️ For taking videos with audio
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Media Library Permission</ThemedText>
        <ThemedText type="defaultSemiBold">
          📸 To save/view your amazing shots
        </ThemedText>
      </ThemedView>
      <Button title='Continue' onPress={handleContinue} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
