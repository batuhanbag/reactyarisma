import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MovieService from "../services/MovieService";
import { LinearGradient } from "expo-linear-gradient";

export default function MovieByKeyword({ route }) {
  const { id, name } = route.params;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");

  const basePhotoUrl = "https://image.tmdb.org/t/p/w500";

  //   States
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    let movieService = new MovieService();

    movieService
      .getMovieByKeywordId(id)
      .then((res: any) => setMovie(res.data.results))
      .catch((err: any) => console.error(err));
  }, []);

  console.log(id);

  return (
    <View>
      <ScrollView>
        <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,1)"]}>
          <View style={{ paddingTop: 64 }}>
            <Text style={styles.headTitle}> Movie About {name} </Text>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 1,
                width: width * 1,
                marginTop: 12,
              }}
            />
            <View
              style={{
                width: width * 0.9,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {movie?.map((row: any) => (
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
                        source={{
                          uri: `${basePhotoUrl}${row.poster_path}`,
                        }}
                        style={styles.movieImage}
                      />
                      {/* TODO */}
                      <View style={styles.movieTitleContainer}>
                        <Text style={styles.movieTitle}>{row.title}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },

  image: {
    marginLeft: 56,
  },
  movieImage: {
    width: 120,
    height: 180,
  },
  headTitle: {
    fontWeight: "700",
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    textTransform: "capitalize",
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
});
