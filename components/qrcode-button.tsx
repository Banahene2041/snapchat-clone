import { TouchableOpacity } from "react-native";
import IconButton from "./icon-button";
import { ThemedText } from "./themed-text";

interface QrCodeButtonProps {
    handleOpenQrCode: () => void;
}

export default function QrCodeButton({ handleOpenQrCode }: QrCodeButtonProps) {
    return <TouchableOpacity
        onPress={handleOpenQrCode}
        style={{
            width: 200,
            alignItems: "center",
            top: "65%",
            alignSelf: "center",
            padding: 6,
            borderWidth: 3,
            borderRadius: 10,
            borderStyle: "dashed",
            borderColor: "white"
        }}
    >
        <IconButton
            iosName="qrcode"
            androidName="qr-code-sharp"
        />
        <ThemedText type="defaultSemiBold" style={{ color: "white" }}>
            Qr code Detected
        </ThemedText>
    </TouchableOpacity>
}