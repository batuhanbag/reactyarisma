import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../utils/colors/colors";
import { LinearGradient } from "expo-linear-gradient";
import MovieService from "../services/MovieService";
import { useNavigation } from "@react-navigation/native";

export default function MovieDetail({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;

  const basePhotoUrl = "https://image.tmdb.org/t/p/w500";
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isLoading, setIsLoading] = useState(true);

  // States
  const [movieData, setMovieData] = useState([]);
  const [similiarMovies, setSimiliarMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);

  const [movieKeywords, setMovieKeywords] = useState([]);

  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(true);
  useEffect(() => {
    let movieService = new MovieService();

    movieService.getMoviesById(id).then((result: any) => {
      let data = [];
      let categories = [];
      data.push(result.data);
      categories.push(result.data.genres);

      setMovieData(data);
    });

    movieService
      .getSimiliarMovies(id)
      .then((res: any) => setSimiliarMovies(res.data.results))
      .catch((err: any) => console.error(err))

      .catch((err: any) => console.error(err));

    setIsLoading(false);

    movieService
      .getMovieActor(id)
      .then((res: any) => setActors(res.data.cast))
      .catch((err: any) => console.error(err));

    movieService
      .getRecommendations(id)
      .then((res: any) => setRecommendedMovies(res.data.results))
      .catch((err: any) => console.error(err));

    movieService
      .getMovieReviews(id)
      .then((res: any) => {
        setMovieReviews(res.data.results);
        let reviewsDetail = [];
        reviewsDetail.push(res.data.results.content);
        console.log(reviewsDetail);
      })
      .catch((err: any) => console.error(err));

    movieService
      .getMovieKeywords(id)
      .then((res: any) => setMovieKeywords(res.data.keywords))
      .catch((err: any) => console.error(err));
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,1)"]}>
        {movieData?.map((row: any) => {
          return (
            <View key={row.id}>
              <View>
                <Image
                  source={{ uri: `${basePhotoUrl}${row?.backdrop_path}` }}
                  // source={require("../assets/MoviePhoto/django.png")}
                  style={styles.topImage}
                />
                <LinearGradient
                  // Background Linear Gradient
                  colors={["transparent", "rgba(0,0,0,0.9)", "rgba(0,0,0,1)"]}
                  style={{
                    width: windowWidth * 1,
                    height: 50,
                    position: "absolute",
                    top: 150,
                  }}
                />

                <Text
                  style={{
                    position: "absolute",
                    top: 160,
                    fontWeight: "700",
                    color: "white",
                    fontSize: 24,
                    marginLeft: 20,
                  }}
                >
                  {row.title}
                </Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <View style={styles.section1}>
                  <View style={styles.ratesMovie}>
                    <View style={styles.imdbRate}>
                      <Text style={styles.imdbRateText}>
                        IMDB : {row.vote_average} / 10
                      </Text>
                    </View>

                    <View style={styles.imdbRate}>
                      <Text style={styles.keywordTitle}>Movie Keywords</Text>
                    </View>
                    <ScrollView>
                      {movieKeywords?.map((row: any) => (
                        <View style={styles.director} key={row.id}>
                          <TouchableOpacity
                            style={styles.keywordButton}
                            onPress={() =>
                              navigation.push("MovieByKeyword", {
                                id: row.id,
                                name: row.name,
                              })
                            }
                          >
                            <Text style={styles.keywordText}>{row.name}</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                  <View style={styles.description}>
                    <View style={styles.descriptionContainer}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.primary,
                          height: windowHeight * 0.05,
                          width: windowWidth * 0.25,
                          borderWidth: 1,
                          borderColor: "#fff",
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              color: "#fff",
                              fontSize: 15,
                              marginRight: 8,
                              textAlign: "center",
                            }}
                          >
                            Watched
                          </Text>
                          <AntDesign
                            name="pluscircleo"
                            size={18}
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.primary,
                          height: windowHeight * 0.05,
                          width: windowWidth * 0.25,
                          borderWidth: 1,
                          borderColor: "#fff",
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              color: "#fff",
                              fontSize: 15,
                              marginRight: 8,
                              textAlign: "center",
                            }}
                          >
                            I'll Watch
                          </Text>
                          <AntDesign
                            name="pluscircleo"
                            size={18}
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={styles.descriptionTitle}>Relase Date</Text>
                      <Text style={styles.descriptionText}>
                        {" "}
                        {row.release_date}
                      </Text>
                    </View>

                    <View style={styles.descriptionContainer}>
                      <Text style={styles.descriptionTitle}>Runtime</Text>
                      <Text style={styles.descriptionText}>
                        {row.runtime} min
                      </Text>
                    </View>
                  </View>
                  <View style={styles.splashMovie}>
                    <View>
                      <Image
                        source={{ uri: `${basePhotoUrl}${row?.poster_path}` }}
                        style={styles.splashImage}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.section2}>
                  <View>
                    <Text style={styles.storyHeader}> Overview </Text>
                    <View
                      style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 1,
                        width: windowWidth * 0.5,
                      }}
                    />
                  </View>
                  <View style={styles.overview}>
                    <Text style={styles.overviewText}>{row.overview}</Text>
                  </View>
                </View>
                <View style={styles.movieActors}>
                  <View>
                    <Text style={styles.storyHeader}> Movie Actors </Text>
                    <View
                      style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 1,
                        width: windowWidth * 0.5,
                      }}
                    />
                  </View>
                  <ScrollView horizontal>
                    {actors?.map((row: any) => (
                      <View>
                        <View style={styles.actorImageContainer} key={row.id}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.push("ActorDetail", {
                                id: row.id,
                              })
                            }
                          >
                            <Image
                              source={{
                                uri: `${basePhotoUrl}${row?.profile_path}`,
                              }}
                              style={styles.actorImage}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.actorNameContainer}>
                          <Text style={styles.actorName}>{row.name}</Text>
                          <Text style={styles.actorCharacterName}>
                            {row.character}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.similiarMovies}>
                  <View>
                    <Text style={styles.storyHeader}> Recommended Movies </Text>
                    <View
                      style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 1,
                        width: windowWidth * 0.7,
                      }}
                    />
                  </View>

                  <ScrollView horizontal>
                    {recommendedMovies?.map((row: any) => (
                      <View style={styles.imageContainer}>
                        <View style={styles.image} key={row.id}>
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
                            <View style={styles.movieTitleContainer}>
                              <Text style={styles.movieTitle}>{row.title}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.similiarMovies}>
                  <View>
                    <Text style={styles.storyHeader}> Similiar Movies </Text>
                    <View
                      style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 1,
                        width: windowWidth * 0.5,
                      }}
                    />
                  </View>

                  <ScrollView horizontal>
                    {similiarMovies?.map((row: any) => (
                      <View style={styles.imageContainer}>
                        <View style={styles.image} key={row.id}>
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
                            <View style={styles.movieTitleContainer}>
                              <Text style={styles.movieTitle}>{row.title}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.movieActors}>
                  <View>
                    <Text style={styles.storyHeader}> Movie Reviews </Text>
                    <View
                      style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 1,
                        width: windowWidth * 0.5,
                        marginBottom: 24,
                      }}
                    />
                  </View>
                  {movieReviews?.map((row: any) => (
                    <View
                      style={{
                        flexDirection: "row",
                        width: windowWidth * 1,
                        marginBottom: 16,
                      }}
                    >
                      <View>
                        <Image
                          // {
                          //   row.author_details.avatar_path ? (uri: `${basePhotoUrl}${row.poster_path}`) : (source={require("../assets/MoviePhoto/avatar.png")})
                          // }
                          source={require("../assets/MoviePhoto/avatar.png")}
                          style={styles.reviewAvatar}
                        />
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: windowWidth * 0.65,
                          }}
                        >
                          <View>
                            <Text style={styles.reviewName}>{row.author}</Text>
                          </View>

                          <View style={{ flexDirection: "row" }}>
                            <Text>⭐</Text>

                            <Text
                              style={{
                                marginLeft: 6,
                                fontWeight: "700",
                                color: "#fff",
                                fontSize: 17,
                              }}
                            >
                              17
                            </Text>
                          </View>
                        </View>

                        <View style={{ width: windowWidth * 0.77 }}>
                          <View
                            style={{
                              borderBottomColor: "white",
                              borderBottomWidth: 1,
                              width: windowWidth * 0.8,
                              marginBottom: 6,
                              marginTop: 6,
                            }}
                          />
                          <Text style={{ color: "#fff", fontWeight: "700" }}>
                            {row.content}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        })}
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},

  topImage: {
    width: Dimensions.get("window").width,
    height: 200,
  },

  section1: {
    flexDirection: "row",
    height: 150,
    marginTop: 12,
  },
  ratesMovie: {
    flex: 1,
  },
  description: {
    flex: 1,
  },
  splashMovie: {
    flex: 1,
  },
  // keywordContainer: {
  //   borderWidth: 1,
  //   borderColor: COLORS.primary,
  // },
  imdbRate: {
    marginTop: 8,
  },
  imdbRateText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.secondary,
  },
  director: {
    marginTop: 8,
  },
  directorText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.secondary,
  },
  descriptionText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.secondary,
  },
  language: {
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.secondary,
    textTransform: "uppercase",
  },

  descriptionTitle: {
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.primary,
  },
  descriptionContainer: {
    marginTop: 0,
  },
  splashImage: {
    marginLeft: 12,
    width: 100,
    height: 150,
  },
  storyHeader: {
    fontWeight: "700",
    fontSize: 22,
    color: COLORS.secondary,
  },

  section2: {
    marginTop: 16,
  },

  overview: {
    marginTop: 8,
  },
  overviewText: { color: COLORS.secondary, fontSize: 13, fontWeight: "700" },
  movieImage: {
    width: 120,
    height: 180,
  },
  imageContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
  },
  actorNameContainer: {
    width: 100,
    marginLeft: 10,
    paddingTop: 5,
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

  keywordTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  similiarMovies: {
    marginTop: 18,
  },
  movieActors: {
    marginTop: 18,
  },
  actorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  actorImageContainer: {
    marginTop: 18,
    marginRight: 12,
  },
  actorName: {
    color: "#fff",
    fontWeight: "700",
    paddingBottom: 6,
  },
  actorCharacterName: {
    color: COLORS.primary,
  },
  reviewsContainer: {},
  reviewsAvatar: {
    width: 50,
    height: 50,
  },
  reviewsText: { color: "#fff" },

  keywordButton: {
    padding: 0,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    width: 100,
  },
  keywordText: {
    textAlign: "center",
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "700",
  },

  reviewAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 12,
  },
  reviewName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  reviewsLikeIcon: {
    width: 36,
    height: 36,
    backgroundColor: "#fff",
  },
});
