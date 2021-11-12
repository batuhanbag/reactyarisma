import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { COLORS } from "../utils/colors/colors";
import { Feather } from "@expo/vector-icons";
export default function ProfileSection() {
  const { width, height } = Dimensions.get("screen");

  const [modal, setModal] = useState({
    movieName: "Fight Club",
    seriesName: "Breaking Bad",
    seriesSeason: "2",
    seriesPart: "14",
  });
  const [complianceModal, setcomplianceModal] = useState(false);

  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={complianceModal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalView,
              {
                height: height * 0.4,
                width: width * 1,
                paddingTop: 10,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setcomplianceModal(false)}>
              <Text style={{ fontWeight: "700" }}>Kapat</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 24 }}>
              <Text
                style={{
                  fontWeight: "700",
                  marginBottom: 6,
                  marginLeft: 6,
                  fontSize: 17,
                }}
              >
                Film
              </Text>
              <TextInput
                placeholder="Film İsimi"
                style={styles.inputItem}
                value={modal.movieName}
                onChangeText={(value) =>
                  setModal({ ...modal, movieName: value })
                }
              ></TextInput>
            </View>
            <View style={{ marginTop: 24 }}>
              <Text
                style={{
                  fontWeight: "700",
                  marginBottom: 6,
                  marginLeft: 6,
                  fontSize: 17,
                }}
              >
                Dizi
              </Text>
              <TextInput
                placeholder="Dizi İsimi"
                style={styles.inputItem}
                value={modal.seriesName}
                onChangeText={(value) =>
                  setModal({ ...modal, seriesName: value })
                }
              ></TextInput>
            </View>
            <View style={{ marginTop: 12, flexDirection: "row" }}>
              <TextInput
                placeholder="Sezon"
                keyboardType={"numeric"}
                style={styles.seasonInput}
                value={modal.seriesSeason}
                onChangeText={(value) =>
                  setModal({ ...modal, seriesSeason: value })
                }
              ></TextInput>
              <View style={{ width: 10 }}></View>
              <TextInput
                placeholder="Bölüm"
                keyboardType={"numeric"}
                style={styles.seasonInput}
                value={modal.seriesPart}
                onChangeText={(value) =>
                  setModal({ ...modal, seriesPart: value })
                }
              ></TextInput>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setcomplianceModal(false)}
              >
                <Text style={styles.modalButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: width * 1,
          height: height * 0.4,
          top: 64,
          marginBottom: 24,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={require("../assets/MoviePhoto/avatar.png")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>İsim</Text>
            <Text style={styles.infoText}>Batuhan Bag</Text>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoText}>batuhannbagg@gmail.com</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 18,
            backgroundColor: "#302f2f",
            width: width * 0.9,
            alignSelf: "center",
            height: 140,
            borderRadius: 20,
            padding: 20,

            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.cardTitle}>Film</Text>
            {/* <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                width: width * 0.13,
                marginBottom: 5,
              }}
            /> */}
            <Text style={styles.cardText}>{modal.movieName}</Text>
            <Text style={styles.cardTitle}>Dizi</Text>
            {/* <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                width: width * 0.13,
                marginBottom: 5,
              }}
            /> */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.cardText}>{modal.seriesName}</Text>
              <Text style={styles.cardText}>
                Sezon : {modal.seriesSeason} --- Bölüm : {modal.seriesPart}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => setcomplianceModal(true)}>
              <Feather name="settings" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Listelerim</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Hesabımı Düzenle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 12,
  },

  button: {
    backgroundColor: COLORS.primary,
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.05,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  infoText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
  },
  infoContainer: {
    padding: 18,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },

  cardText: {
    fontSize: 15,
    color: "#fff",
    marginRight: 12,
    opacity: 0.7,
    textTransform: "capitalize",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },

  moodButtonContainer: {
    marginTop: 60,
    alignItems: "center",
  },

  moodChooseButton: {
    borderWidth: 1,
    padding: 24,
    paddingLeft: 48,
    paddingRight: 48,
    borderRadius: 32,
    backgroundColor: "#fff",
  },

  moodChooseButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },

  moodContainer: {
    marginTop: 24,
  },

  inputItem: {
    borderWidth: 2,
    borderColor: "black",
    paddingLeft: 12,
    height: 36,
    borderRadius: 12,
    width: Dimensions.get("screen").width * 0.7,
  },
  seasonInput: {
    borderWidth: 2,
    borderColor: "black",
    paddingLeft: 12,
    height: 36,
    borderRadius: 12,
    width: Dimensions.get("screen").width * 0.34,
  },
  modalButtonContainer: {
    marginTop: 24,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    width: Dimensions.get("screen").width * 0.7,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
