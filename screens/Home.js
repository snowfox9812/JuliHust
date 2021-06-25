import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { firebase } from "../src/firebase/config";
import { Product } from "../components/";
const db = firebase.firestore();
const { width, height } = Dimensions.get("screen");
var _ = require("lodash");

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Home() {
  const [lessonList, fetchLessonList] = useState();
  const [learnedLessons, fetchLearnedLessonsList] = useState();
  const [numOfSentence, fetchNumOfSentence] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    fetchLearned();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const fetchLesson = async () => {
    var list = [];
    var lessonContent = [];
    var numberOfSentence = [];
    await db
      .collection("juliusData")
      .where("lession", "==", 1)
      .orderBy("code", "asc")
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
          numberOfSentence.push(sentenceContent.length);
        }
        fetchNumOfSentence(numberOfSentence);
        fetchLessonList(lessonContent);
      });
  };
  const fetchLearned = async () => {
    var learned = [];
    await db
      .collection("result")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const resultDetail = doc.data();
          learned.push(resultDetail);
        });
        fetchLearnedLessonsList(learned);
      });
  };

  const renderLessonList = () => {
    var renderList = [];
    console.log("aaa :" + learnedLessons);
    console.log("bbb :" + numOfSentence);

    if (lessonList && learnedLessons && numOfSentence) {
      var learnedPercent = [];
      for (var i = 0; i < 50; i++) {
        var learnedSentence = [];
        for (var count = 0; count < learnedLessons.length; count++) {
          if (learnedLessons[count].unit === i + 1) {
            if (
              !learnedSentence.find(
                (element) => element === learnedLessons[count].lesson
              )
            ) {
              learnedSentence.push(learnedLessons[count].lesson);
            }
          }
        }
        if (numOfSentence) {
          if (numOfSentence[i] === 0) {
            learnedPercent.push(0);
          } else {
            learnedPercent.push(
              Math.round(
                (learnedSentence.length / numOfSentence[i]) * 100 * 100
              ) / 100
            );
          }
        }
        var lessons = {
          title: "Lesson " + (i + 1),
          lesson: i + 1,
          content: lessonList[i],
          complete: learnedPercent ? learnedPercent[i] : 0,
        };
        renderList.push(<Product key={i} product={lessons} />);
      }
    }
    return renderList;
  };

  useEffect(() => {
    fetchLesson();
    fetchLearned();
    renderLessonList();
  }, []);

  return (
    <Block style={styles.home}>
      <Block>
        <ImageBackground
          style={styles.headerImage}
          source={require("../assets/images/blueHeader.png")}
        >
          <Block center style={{ marginTop: 50 }}>
            <Text size={16} color={"#FFFFFF"} bold>
              Let's learn Japanese!
            </Text>
          </Block>
        </ImageBackground>
      </Block>
      <Block style={styles.unitList}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={"#1FACFB"}
              title={"Refreshing..."}
              titleColor={"#1FACFB"}
            />
          }
        >
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
    backgroundColor: "#ffffff",
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
    height: 95,
  },
});
