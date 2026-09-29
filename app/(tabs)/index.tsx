import * as React from "react";
import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { BarcodeScanningResult, CameraMode, CameraView, FlashMode } from "expo-camera"
import * as WebBrowser from "expo-web-browser"
import IconButton from "@/components/icon-button";
import BottomRowTools from "@/components/bottom-row-tools";
import MainRowActions from "@/components/main-row-actions";
import QrCodeButton from "@/components/qrcode-button";
import CameraTools from "@/components/camera-tools";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [qrCodeDetected, setQrCodeDetected] = React.useState<string>("");
  const [isBrowsing, setIsBrowsing] = React.useState<boolean>(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [camereaZoom, setCameraZoom] = React.useState<number>(0);
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false)
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">("back")
  const [picture, setPicture] = React.useState<string>("https://picsum.photos/seed/696/3000/2000")


  async function handlTakePicture() {
   const response = await cameraRef.current?.takePictureAsync({})
  //  console.log(response?.uri)
   setPicture(response!.uri)
  }

  async function handleOpenQrCode() {
    setIsBrowsing(true)
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET
    })

    if (browserResult.type === "cancel") {
      setIsBrowsing(false)
    }
  }

  function handleBarcodeScanned(scanningResult: BarcodeScanningResult) {
    if (scanningResult.data) {
      console.log(scanningResult.data)
      setQrCodeDetected(scanningResult.data);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("")
    }, 1000)
  }

  if (isBrowsing) return <></>

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        zoom={camereaZoom}
        flash={cameraFlash}
        enableTorch={cameraTorch}
        facing={cameraFacing}
        // barcode scanner on camera view
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={handleBarcodeScanned}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{flex: 1}}>
            {qrCodeDetected ? (<QrCodeButton handleOpenQrCode={handleOpenQrCode} />) : null}
            <CameraTools
              cameraZoom={camereaZoom}
              cameraFlash={cameraFlash}
              cameraFacing={cameraFacing}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraFlash={setCameraFlash}
              setCameraTorch={setCameraTorch}
            />
            <MainRowActions cameraMode={cameraMode} handleTakePicture={handlTakePicture} isRecording={false} />
            <BottomRowTools setCameraMode={setCameraMode} cameraMode={cameraMode} />
          </View>
        </SafeAreaView>
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
