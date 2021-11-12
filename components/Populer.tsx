import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MovieService from "../services/MovieService";
import { COLORS } from "../utils/colors/colors";

export default function Populer() {
  const navigation = useNavigation();
  const basePhotoUrl = "https://image.tmdb.org/t/p/w500";
  const [popularMoviesdata, setPopularMoviesdata] = useState([]);
  useEffect(() => {
    let movieService = new MovieService();

    movieService
      .getPopulerMovies()
      .then((result: any) => setPopularMoviesdata(result.data.results))
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <View>
      <View
        style={{
          width: Dimensions.get("window").width * 0.6,
          height: 35,
          backgroundColor: COLORS.primary,
          borderTopRightRadius: 40,
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 40,
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>Popüler Liste</Text>
      </View>
      <ScrollView horizontal>
        <View style={styles.imageContainer}>
          {popularMoviesdata?.map((row: any) => (
            <View style={styles.image} key={row.id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("MovieDetail", {
                    id: row.id,
                  })
                }
              >
                <Image
                  source={{ uri: `${basePhotoUrl}${row.poster_path}` }}
                  style={styles.movieImage}
                />
                <View style={styles.movieTitleContainer}>
                  <Text style={styles.movieTitle}>{row.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {},
  headerText: {
    fontWeight: "700",
    fontSize: 22,
    color: "white",
  },
  movieImage: {
    width: 120,
    height: 180,
  },
  movieTitle: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  movieTitleContainer: {
    width: 120,
  },
  imageContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
  },
  image: {
    marginLeft: 18,
  },
});
