import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Track } from "../types";
import { useTheme } from "@react-navigation/native";
import { usePlayerContext } from "../providers/PlayerProvider";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({ track }: TrackListItemProps) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { setTrack } = usePlayerContext();

  return (
    <Pressable style={styles.container} onPress={() => setTrack(track)}>
      <Image
        source={{ uri: track.album.images[0]?.url }}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.subTitle}>{track.artists[0]?.name}</Text>
      </View>
    </Pressable>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      // backgroundColor: "gray",
      marginVertical: 5,
      padding: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      color: colors.text,
      fontWeight: "500",
      fontSize: 15,
    },
    subTitle: {
      color: colors.subTitle,
    },
    image: {
      width: 50,
      aspectRatio: 1,
      borderRadius: 5,
      marginRight: 10,
    },
  });

export default TrackListItem;
