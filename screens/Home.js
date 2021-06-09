import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { firebase } from "../src/firebase/config";
import { Product } from "../components/";
const db = firebase.firestore();
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
var _ = require("lodash");

export default function Home() {
  const [lessonList, fetchLessonList] = useState();

  const fetchLesson = async () => {
    var list = [];
    var lessonContent = [];
    await db
      .collection("juliusData")
      .where("lession", "==", 1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const lessonDetail = doc.data();
          list.push(lessonDetail);
        });
        for (let i = 0; i < 50; i++) {
          var sentenceContent = [];
          for (var count = 0; count < list.length; count++) {
            if (list[count].lession === i + 1) {
              sentenceContent.push(list[count]);
            }
          }
          lessonContent.push(sentenceContent);
        }
        fetchLessonList(lessonContent);
      });
  };
  const renderLessonList = () => {
    var renderList = [];
    if (lessonList) {
      for (var i = 0; i < 50; i++) {
        var lessons = {
          title: "Lesson " + (i + 1),
          image: "https://source.unsplash.com/dS2hi__ZZMk/840x840",
          lesson: i + 1,
          content: lessonList[i],
        };
        renderList.push(<Product key={i} product={lessons} />);
      }
    }
    return renderList;
  };

  useEffect(() => {
    fetchLesson();
    renderLessonList();
  }, []);

  return (
    <Block style={styles.home}>
      <Block>
        <ImageBackground
          style={styles.headerImage}
          source={require("../assets/images/blueHeader.png")}
        >
          <Block center style={{marginTop: 50}}>
            <Text size={16} color={"#FFFFFF"} bold>Let's learn Japanese!</Text>
          </Block>
        </ImageBackground>
      </Block>
      <Block style={styles.unitList}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex>{renderLessonList()}</Block>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
    height: height,
    backgroundColor: "#ffffff"
  },
  unitList: {
    position: "relative",
    marginHorizontal: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    maxHeight: height - 140,
  },
  headerImage: {
    width: width,
    height: 95
  }
});
