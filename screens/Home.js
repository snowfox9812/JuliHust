import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Text, theme} from "galio-framework";
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
        renderList.push(<Product key={i} product={lessons} horizontal />);
      }
    }
    return renderList;
  };

  useEffect(() => {
    fetchLesson();
    renderLessonList();
  }, []);

  return (
    <Block flex center style={styles.home}>
      <Block flex style={(styles.record, styles.options)}>
        <Block flex={1}>
          <Text bold size={36}>
            Lesson List:
          </Text>
        </Block>
        <Block flex={10}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex>{renderLessonList()}</Block>
          </ScrollView>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  record: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
    width: width,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 2,
    marginBottom: theme.SIZES.BASE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    width: width - theme.SIZES.BASE * 2,
    maxHeight: height - 140,
  },
});
