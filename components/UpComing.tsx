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
import { COLORS } from "../utils/colors/colors";
import { useNavigation } from "@react-navigation/native";
export default function UpComing() {
  const navigation = useNavigation();
  const [upComingMovies, setUpComingMovies] = useState([]);
  const basePhotoUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    let movieService = new MovieService();

    movieService
      .getUpComingMovies()
      .then((res: any) => setUpComingMovies(res.data.results))
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <View style={{ marginTop: 0 }}>
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
        <Text style={{ color: "white", fontSize: 15 }}>Beklenen Liste</Text>
      </View>
      <ScrollView horizontal>
        {upComingMovies?.map((row: any) => (
          <View style={styles.imageContainer} key={row.id}>
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
