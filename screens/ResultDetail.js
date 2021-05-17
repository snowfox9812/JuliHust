import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import UserContext from "../controller/context";
import { Audio } from "expo-av";
import Highlighter from "react-native-highlight-words";
import { firebase } from "../src/firebase/config";
var _ = require("lodash");

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const db = firebase.firestore();

export default function ResultDetail({ route }) {
  const { result } = route.params;
  const user = useContext(UserContext);

  var defautInfo = {
    level: "Beginner",
    destination: "Hust, HaNoi",
    avatar: Images.Avatar,
  };
  var [sentence, setSentence] = useState("");

  async function getSentence(lesson, unit) {
    var sentenceRef = db.collection("juliusData").where("code", "==", lesson);
    sentenceRef = sentenceRef.where("lession", "==", unit);
    const snapshot = await sentenceRef.get();
    snapshot.forEach((doc) => {
      setSentence(doc.data());
    });
  }

  async function downloadAudio(userId, lesson, timeStamp) {
    let fileName = userId + "_" + timeStamp + "_" + lesson + ".wav";
    const uri = await firebase.storage().ref(fileName).getDownloadURL();

    console.log("uri:", uri);
    // The rest of this plays the audio
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {
      console.log("error:", error);
    }
  }

  useEffect(() => {
    getSentence(result.lesson, result.unit);
  }, []);
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={{ uri: defautInfo.avatar }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}
        >
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                {user.fullName}
              </Text>
              <Block row space="between">
                <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>
                    {defautInfo.level}
                  </Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon
                      name="map-marker"
                      family="font-awesome"
                      color={theme.COLORS.MUTED}
                      size={16}
                    />
                    {defautInfo.destination}
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={styles.gradient}
            />
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block row flex style={{ padding: theme.SIZES.BASE }}>
            <Block flex={1} middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>
                Lesson
              </Text>
              <Text muted size={12}>
                {result.lesson}
              </Text>
            </Block>
            <Block flex={1} middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>
                Accuracy
              </Text>
              <Text muted size={12}>
                {result.accuracyInPercent}%
              </Text>
            </Block>
          </Block>
          <Block flex style={{ paddingBottom: -HeaderHeight * 2 }}>
            <Block flex center>
              <Block>
                <Highlighter
                  style={{ fontSize: 24 }}
                  highlightStyle={{ color: "red" }}
                  searchWords={!result.missSpell ? [] : result.missSpell}
                  autoEscape={true}
                  textToHighlight={sentence.rawSentence}
                />
              </Block>
              <Block>
                <Button
                  onlyIcon
                  icon="play-outline"
                  iconFamily="ionicon"
                  iconSize={14}
                  color="primary"
                  iconColor="white"
                  onPress={() => {
                    downloadAudio(result.userId, result.lesson, result.created);
                  }}
                />
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
  dataTable: {
    marginBottom: theme.SIZES.BASE * 2,
  },
  headerTable: {
    borderBottomWidth: 1,
    marginBottom: theme.SIZES.BASE * 2,
    paddingBottom: theme.SIZES.BASE * 1,
  },
});
