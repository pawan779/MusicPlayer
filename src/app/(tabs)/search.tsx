import { FlatList, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/src/components/Themed";
import { tracks } from "@/assets/data/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";

export default function SearchScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="search" size={16} color={"gray"} />
        <TextInput
          placeholder="What do you want to listen to?"
          style={styles.input}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        {search && (
          <Text style={styles.text} onPress={() => setSearch("")}>
            Cancel
          </Text>
        )}
      </View>
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </SafeAreaView>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {},
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    },
    input: {
      flex: 1,
      padding: 8,
      marginHorizontal: 8,
      borderRadius: 5,
      color: colors.text,
      backgroundColor: colors.searchBackground,
    },
    text: {
      color: colors.text,
    },
  });
