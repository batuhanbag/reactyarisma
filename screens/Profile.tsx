import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ProfileSection from "../components/ProfileSection";
import ProfileAnimation from "../components/ProfileAnimation";

export default function Profile() {
  return (
    <View>
      <ProfileSection />
      <View style={{ alignItems: "center" }}>
        <ProfileAnimation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
