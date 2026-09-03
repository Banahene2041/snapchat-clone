import * as React from "react";
import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { CameraMode, CameraView } from "expo-camera"
import * as WebBrowser from "expo-web-browser"
import IconButton from "@/components/icon-button";
import BottomRowTools from "@/components/bottom-row-tools";
import MainRowActions from "@/components/main-row-actions";


export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null)
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture")

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        style={{ flex: 1 }}
      >
        <MainRowActions cameraMode={cameraMode} handleTakePicture={()=>{} } isRecording={false} />
        <BottomRowTools setCameraMode={setCameraMode} cameraMode={cameraMode} />
      </CameraView>
    </View>
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
