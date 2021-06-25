import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
  Image,
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import UserContext from "../controller/context";
import { Audio } from "expo-av";
import Highlighter from "react-native-highlight-words";
import { firebase } from "../src/firebase/config";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ProgressCircle from "react-native-progress-circle";
import { useNavigation } from "@react-navigation/native";
var _ = require("lodash");

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const db = firebase.firestore();

export default function ResultDetail({ route }) {
  const { result } = route.params;
  const user = useContext(UserContext);
  const navigation = useNavigation();

  var userInfo = {
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
    <Block key={user} flex style={styles.profile}>
      <ImageBackground
        style={styles.headerImage}
        source={require("../assets/images/blueHeader.png")}
      >
        <Block flex row style={{ maxHeight: 85 }}>
          <Block flex={1} stlye={{ marginLeft: 70, marginTop: 70 }} bottom>
            <Icon
              size={20}
              name="arrow-back-outline"
              family="ionicon"
              color="white"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </Block>
          <Block flex={9} center style={{ marginTop: 65 }}>
            <Text size={16} color={"#FFFFFF"} bold style={{ marginRight: 44 }}>
              {result.lesson}
            </Text>
          </Block>
        </Block>
      </ImageBackground>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block
            row
            flex
            style={{ padding: theme.SIZES.BASE, marginBottom: 10 }}
          >
            <Block flex={1} middle>
              <ProgressCircle
                percent={result.accuracyInPercent}
                radius={40}
                borderWidth={5}
                color="#1FACFB"
                shadowColor="#D5E0EA"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 18 }}>
                  {result.accuracyInPercent}%
                </Text>
              </ProgressCircle>
              <Text muted size={15} style={{ marginTop: 10 }}>
                Accuracy
              </Text>
            </Block>
          </Block>
          <Block flex style={{ paddingBottom: -HeaderHeight * 2 }}>
            <Block flex center>
              <Block style={{ marginBottom: 20 }}>
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
                  shadowless
                  icon="play-outline"
                  iconFamily="ionicon"
                  iconSize={14}
                  color="#1FACFB"
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
  headerImage: {
    width: width,
    height: 95,
  },
  profile: {
    backgroundColor: "#ffffff",
  },
});
