import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../utils/colors/colors";

export default function CategoryList() {
  const navigation = useNavigation();

  // Burada api'den keywordleri alamadığım için dinamik olarak kullanmak zorunda kaldım, keywordlere göre film listelemesi yapabiliyoruz.
  const [keywords, setKeywords] = useState([
    { id: 1701, name: "hero" },

    {
      id: 2394,
      name: "ghetto",
    },

    {
      id: 2652,
      name: "nazi",
    },

    {
      id: 5565,
      name: "biography",
    },

    {
      id: 2343,
      name: "magic",
    },

    {
      id: 210024,
      name: "anime",
    },

    {
      id: 616,
      name: "witch",
    },

    {
      id: 9715,
      name: "superhero",
    },

    {
      id: 265894,
      name: "marvel comics",
    },

    {
      id: 470,
      name: "spy",
    },

    {
      id: 4565,
      name: "dystopia",
    },

    {
      id: 194063,
      name: "messiah",
    },

    {
      id: 15090,
      name: "police officer",
    },

    {
      id: 10123,
      name: "dark comedy",
    },

    {
      id: 18035,
      name: "family",
    },

    {
      id: 934,
      name: "judge",
    },
    {
      id: 187056,
      name: "woman director",
    },
  ]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      horizontal
    >
      <View style={styles.container}>
        {keywords?.map((row: any) => (
          <View style={styles.categoryCard} key={row.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.push("MovieByKeyword", {
                  id: row.id,
                  name: row.name,
                })
              }
            >
              <Text style={styles.categoryCardText}>{row.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 48,
    height: 36,
    marginVertical: 15,
  },
  container: {
    flexDirection: "row",
  },
  categoryCard: {
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },

  categoryCardText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.secondary,
    textTransform: "capitalize",
  },
});
