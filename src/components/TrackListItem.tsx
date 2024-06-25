import { StyleSheet, Text, View } from "react-native";
import { Track } from "../types";
import { useTheme } from "@react-navigation/native";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({ track }: TrackListItemProps) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{track.name}</Text>
      <Text style={styles.subTitle}>{track.artists[0]?.name}</Text>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      // backgroundColor: "gray",
      marginVertical: 5,
      padding: 5,
    },
    title: {
      color: colors.text,
    },
    subTitle: {
      color: colors.subTitle,
    },
  });

export default TrackListItem;
