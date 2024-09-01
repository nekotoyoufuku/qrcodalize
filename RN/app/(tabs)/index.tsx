import { StyleSheet, TouchableOpacity, FlatList } from "react-native";

// Components
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { getQRcodeFiles } from "@/repositories/FileSystem/getQRcodeFiles";
import React from "react";
import QrCodeBottomSheet from "@/components/BottomSheet/QrCodeBottomSheet";
import { useSharedValue } from "react-native-reanimated";

type HomeListItemType = {
  title: string;
  url: string;
};

export default function HomeScreen() {
  const [data, setData] = React.useState<HomeListItemType[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string | null>(null);

  // This is a shared value that can be used to animate the bottom sheet
  const isOpen = useSharedValue(false);

  const onOpen = () => {
    isOpen.value = !isOpen.value;
  };

  const onClose = () => {
    isOpen.value = !isOpen.value;
  };

  const onPressItem = (item: HomeListItemType) => {
    setQrCodeUrl(item.url);
    onOpen();
  };

  const renderItem = ({ item }: { item: HomeListItemType }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{item.title}</ThemedText>
          <Entypo name="chevron-right" size={24} color="black" />
        </ThemedView>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    (async () => {
      const items = await getQRcodeFiles();

      setData(
        items.map((item) => ({
          title: item.name,
          url: item.path,
        }))
      );
    })();
  }, []);

  return (
    <>
      <ThemedView wrapper style={styles.wrapper}>
        <ListHeaderComponent />
        <FlatList data={data} renderItem={renderItem} />
        <TouchableOpacity onPress={onOpen} style={styles.plusIcon}>
          <AntDesign name="pluscircle" size={48} color="black" />
        </TouchableOpacity>
      </ThemedView>
      <QrCodeBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        qrCodeUrl={qrCodeUrl}
      />
    </>
  );
}

const ListHeaderComponent = () => {
  return (
    <ThemedView style={styles.header}>
      <ThemedText type="title">Home</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderColor: "#ACACAC",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
  },
  plusIcon: {
    position: "absolute",
    bottom: 28,
    right: 40,
  },
});
