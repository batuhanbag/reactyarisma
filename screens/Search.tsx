import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";

// Components
import CategoryList from "../components/CategoryList";
import TopRated from "../components/TopRated";
import Populer from "../components/Populer";
import Discover from "../components/Discover";
import UpComing from "../components/UpComing";

export default function Search() {
  return (
    <ScrollView>
      <View>
        <CategoryList />
        <View style={{ height: Dimensions.get("screen").height * 0.4 }}>
          <TopRated />
        </View>
        <View style={{ height: Dimensions.get("screen").height * 0.4 }}>
          <Populer />
        </View>
        <View style={{ height: Dimensions.get("screen").height * 0.4 }}>
          <Discover />
        </View>
        <View style={{ height: Dimensions.get("screen").height * 0.4 }}>
          <UpComing />
        </View>
      </View>
    </ScrollView>
  );
}
