import { useRef } from "react";
import { SharedValue } from "react-native-reanimated";
import { Button, StyleSheet, View } from "react-native";
import { BaseBottomSheet } from "@/components/BottomSheet/BaseBottomSheet";
import QRCode from "react-native-qrcode-svg";
import { generateQRCode } from "@/repositories/FileSystem/generateQRCode";

type NewQRCodeBottomSheetProps = {
  name: string;
  url: string;
  isOpen: SharedValue<boolean>;
  onClose: () => void;
};

export function NewQRCodeBottomSheet({
  name,
  url,
  isOpen,
  onClose,
}: NewQRCodeBottomSheetProps) {
  const svgRef = useRef<any>(null);

  function saveQRCode() {
    svgRef.current?.toDataURL(async (data: string) => {
      await generateQRCode({ filename: name, data });
    });
  }

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <QRCode value={url} getRef={svgRef as any} />

        <Button title="Save QR Code2" onPress={saveQRCode} />
      </View>
    </BaseBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});