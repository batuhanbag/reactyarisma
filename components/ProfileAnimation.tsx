import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function ProfileAnimation() {
  return (
    <View>
      <LottieView
        style={{
          height: Dimensions.get("screen").height * 0.23,
          width: Dimensions.get("screen").width * 0.6,
        }}
        source={require("../utils/lottie/63004-profile-password-unlock.json")}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
}
