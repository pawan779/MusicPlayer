import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tracks } from "../../assets/data/tracks";
import { usePlayerContext } from "../providers/PlayerProvider";
import { useEffect, useState } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import FullScreenPlayer from "./FullScreenPlayer";
import { gql, useMutation, useQuery } from "@apollo/client";
const track = tracks[0];

const insertFavouriteMutation = gql`
  mutation MyMutation($userId: String!, $trackId: String!) {
    insertFavorites(userid: $userId, trackid: $trackId) {
      id
      trackid
      userid
    }
  }
`;

const isFavouriteQuery = gql`
  query MyQuery($userId: String!, $trackId: String!) {
    favoritesByTrackidAndUserid(trackid: $trackId, userid: $userId) {
      id
      trackid
      userid
    }
  }
`;

const removeFavouriteMutation = gql`
  mutation MyMutation($userId: String!, $trackId: String!) {
    deleteFavorites(trackid: $trackId, userid: $userId) {
      id
      trackid
      userid
    }
  }
`;

const Player = () => {
  const { track } = usePlayerContext();
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const [showFullScreen, setShowFullScreen] = useState<Boolean>(true);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const [insertFavorite] = useMutation(insertFavouriteMutation);
  const [removeFavourite] = useMutation(removeFavouriteMutation);

  const { data, refetch } = useQuery(isFavouriteQuery, {
    variables: {
      userId: "1",
      trackId: track?.id || "",
    },
  });

  const isLiked = data?.favoritesByTrackidAndUserid?.length > 0;

  const onLike = async () => {
    if (!track) {
      return;
    }
    try {
      if (isLiked) {
        await removeFavourite({
          variables: {
            userId: "1",
            trackId: track.id,
          },
        });
      } else {
        await insertFavorite({
          variables: {
            userId: "1",
            trackId: track.id,
          },
        });
      }
      await refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  const onPlayPause = async () => {
    if (!sound) {
      return;
    }

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    console.log(status);
    setStatus(status);
    setIsPlaying(status.isPlaying);
  };

  const playTrack = async () => {
    if (sound) {
      //stop other sound
      await sound.unloadAsync();
    }
    if (!track?.preview_url) {
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track?.preview_url,
    });

    setSound(newSound);

    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    await newSound.playAsync();
  };

  useEffect(() => {
    playTrack();
    refetch();
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    setShowFullScreen(true);
  }, [track]);

  if (!track) {
    return null;
  }

  const image = track.album.images?.[1];

  const onPlayerPress = () => {
    setShowFullScreen(!showFullScreen);
  };

  return (
    <View
      style={{
        position: showFullScreen ? "relative" : "absolute",
        width: "100%",
        top: showFullScreen ? 0 : -75,
        height: showFullScreen ? "100%" : 75,
        padding: showFullScreen ? 0 : 10,
      }}
    >
      {showFullScreen ? (
        <FullScreenPlayer
          track={track}
          onPlayerPress={onPlayerPress}
          onPlayPause={onPlayPause}
          isPlaying={isPlaying}
          sound={sound}
          setSound={setSound}
          status={status}
        />
      ) : (
        <Pressable style={styles.player} onPress={onPlayerPress}>
          {image && <Image source={{ uri: image.url }} style={styles.image} />}

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{track.name}</Text>
            <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
          </View>

          <Ionicons
            onPress={onLike}
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={"white"}
            style={{ marginHorizontal: 10 }}
          />
          <Ionicons
            onPress={onPlayPause}
            disabled={!track?.preview_url}
            name={isPlaying ? "pause" : "play"}
            size={22}
            color={track?.preview_url ? "white" : "gray"}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: -75,
    height: 75,
    padding: 10,
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;
