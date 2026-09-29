import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { CameraMode } from "expo-camera";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { getAlbumsAsync, getAssetsAsync, Asset } from "expo-media-library";
import { Image } from "expo-image";

interface MainRowActionsProps {
    handleTakePicture: () => void;
    cameraMode: CameraMode;
    isRecording: boolean;
}

export default function MainRowActions({
    handleTakePicture,
    cameraMode,
    isRecording
}: MainRowActionsProps) {
    const [assets, setAssets] = useState<Asset[]>([])

    async function getAlbums() {
        // const fetchedAlbums = await getAlbumsAsync()
        const albumAsset = await getAssetsAsync({
            // album: fetchedAlbums[0],
            mediaType: ["photo"],
            sortBy: "creationTime",
            first: 4,
        })
        setAssets(albumAsset.assets)
    }

    useEffect(()=>{
        getAlbums();
    },[])

    return <View style={styles.container}>
        <FlatList
        data={assets}
        inverted
        renderItem={({item})=>(
            <Image 
            key={item.id} 
            source={item.uri}
            style={{
                width: 40,
                height: 40,
                borderRadius: 5,
            }}
            />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 6}}
        />
        <TouchableOpacity onPress={handleTakePicture}>
            <SymbolView
                name={
                    cameraMode === "picture" ? "circle"
                        : isRecording ? "record.circle" : "circle.circle"
                }
                size={90}
                type="hierarchical"
                tintColor={isRecording ? Colors.light.snapPrimary : "white"}
                animationSpec={{
                    effect: {
                        type: isRecording ? "pulse" : "bounce"
                    },
                    repeating: isRecording
                }}
            />
        </TouchableOpacity>
        <ScrollView
            horizontal
            contentContainerStyle={{ gap: 2 }}
            showsHorizontalScrollIndicator={false}
        >
        {[, 1, 2, 3, 4].map((item, index) => (
            <SymbolView key={index + 1} name="face.dashed" size={40} type="hierarchical" tintColor={"white"} />
        ))}
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 45,
        height: 100,
    }
})