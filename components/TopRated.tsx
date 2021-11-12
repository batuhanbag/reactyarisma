import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MovieService from "../services/MovieService";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../utils/colors/colors";
export default function TopRated(props: any) {
  const navigation = useNavigation();
  const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
  const basePhotoUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    let movieService = new MovieService();

    movieService
      .getTopRatedMovies()
      .then((res: any) => setTopRatedMoviesData(res.data.results))
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          width: Dimensions.get("window").width * 0.6,
          height: 35,
          backgroundColor: COLORS.primary,
          borderTopRightRadius: 40,
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 40,
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>Kült Liste</Text>
      </View>
      <ScrollView horizontal>
        {topRatedMoviesData?.map((row: any) => (
          <View style={styles.imageContainer} key={row.id}>
            <View style={styles.image}>
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
          </View>
        ))}
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
  imageContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
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
  image: {
    marginLeft: 18,
  },
});
