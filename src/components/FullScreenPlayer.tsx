import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlayerContext } from "../providers/PlayerProvider";
import { Track } from "../types";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import MusicSLider from "./Slider";
import { Sound } from "expo-av/build/Audio";
import { AVPlaybackStatus } from "expo-av";

type FullScreenPlayerProps = {
  track: Track;
  onPlayerPress: () => void;
  sound: Sound;
  setSound: () => void;
  status: AVPlaybackStatus;
  onPlayPause: () => void;
  isPlaying: boolean;
};

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({
  track,
  onPlayerPress,
  sound,
  setSound,
  status,
  onPlayPause,
  isPlaying,
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const image = track.album.images?.[1];

  return (
    <LinearGradient
      colors={["#242C40", "#1B1F2D", "#151A24"]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Ionicons
          name={"chevron-down"}
          size={30}
          color={"#fff"}
          style={{ paddingHorizontal: 10 }}
          onPress={onPlayerPress}
        />

        {image && (
          <View
            style={{
              marginVertical: 30,
              marginHorizontal: 10,
              elevation: 2,
              shadowColor: "#FFF",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              borderRadius: 10,
            }}
          >
            <Image source={{ uri: image.url }} style={styles.image} />
          </View>
        )}
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
              marginVertical: 5,
            }}
          >
            {track.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {track.artists.map((item, index) => (
              <Text
                key={item.id}
                style={{ color: colors.subTitle, fontSize: 12 }}
              >
                {item.name}
                {index !== track.artists.length - 1 && ", "}
              </Text>
            ))}
          </View>
          <MusicSLider sound={sound} setSound={setSound} status={status} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Ionicons name="play-skip-back" size={30} color={colors.text} />

            <Pressable
              onPress={onPlayPause}
              style={{
                backgroundColor: colors.text,
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                marginHorizontal: 30,
              }}
            >
              <Ionicons
                disabled={!track?.preview_url}
                name={isPlaying ? "pause" : "play"}
                size={35}
                color={colors.background}
              />
            </Pressable>
            <Ionicons name="play-skip-forward" size={35} color={colors.text} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    image: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: 10,
    },
  });

export default FullScreenPlayer;
