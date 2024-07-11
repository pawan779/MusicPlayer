import Slider from "@react-native-community/slider";
import { AVPlaybackStatus } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

type MusicSliderProps = {
  sound: Sound;
  setSound: () => void;
  status: AVPlaybackStatus;
};

const MusicSlider = ({ sound, setSound, status }: MusicSliderProps) => {
  const handleValueChange = async (value: number) => {
    await sound.setPositionAsync(value);
  };

  return (
    <View>
      <Slider
        style={{
          width: "100%",
          height: 40,
        }}
        minimumValue={0}
        disabled={!status?.isLoaded}
        maximumValue={status?.durationMillis || 0}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#5b2327"
        value={status?.positionMillis || 0}
        tapToSeek={true}
        onValueChange={handleValueChange}
        onSlidingComplete={() => sound.playAsync()}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#fff", fontSize: 10 }}>
          {new Date(status?.positionMillis || 0).toISOString().substr(14, 5)}
        </Text>
        <Text style={{ color: "#fff", fontSize: 10 }}>
          {new Date(status?.durationMillis || 0).toISOString().substr(14, 5)}
        </Text>
      </View>
    </View>
  );
};

export default MusicSlider;
