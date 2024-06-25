import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { tracks } from "@/assets/data/tracks";
import TrackListItem from "@/src/components/TrackListItem";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
