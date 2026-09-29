import { FlashMode } from "expo-camera";
import { View } from "react-native";
import IconButton from "./icon-button";

interface CameraToolsProps {
    cameraZoom: number;
    cameraTorch: boolean;
    cameraFlash: FlashMode;
    cameraFacing: "front" | "back";
    setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
    setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>
    setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>
    setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>
}

export default function CameraTools({
    cameraZoom,
    cameraTorch,
    cameraFlash,
    cameraFacing,
    setCameraZoom,
    setCameraTorch,
    setCameraFlash,
    setCameraFacing,
}: CameraToolsProps) {

    return <View
        style={{
            position: "absolute",
            right: 6,
            gap: 16,
            zIndex: 1,
        }}
    >
        <IconButton
            iosName={cameraTorch ? "flashlight.off.circle" : "flashlight.slash.circle"}
            androidName="close"
            onPress={() => setCameraTorch((prev) => !prev)}
        />
        <IconButton
            iosName={cameraFacing === "back" ? "arrow.triangle.2.circlepath.camera" : "arrow.triangle.2.circlepath.camera.fill"}
            androidName="close"
            onPress={() => setCameraFacing((prevValue) => prevValue === "back" ? "front" : "back")}
        />
        <IconButton
            iosName={cameraFlash === "on" ? "bolt.circle" : "bolt.slash.circle"}
            androidName="flash"
            onPress={() => {
                setCameraFlash((prevValue) => prevValue === "off" ? "on" : "off")
            }}
        />
        <IconButton
            iosName={"speaker"}
            androidName="volume-high"
            onPress={() => {}}
        />
        <IconButton
            iosName={"plus.magnifyingglass"}
            androidName="close"
            onPress={() => {
                if(cameraZoom < 1){
                    setCameraZoom((prevValue)=> prevValue + 0.01)
                }
            }}
        />
        <IconButton
            iosName={"minus.magnifyingglass"}
            androidName="flash"
            onPress={() => {
                if(cameraZoom > 0){
                    setCameraZoom((prevValue)=> prevValue - 0.01)
                }
            }}
        />
    </View>
}