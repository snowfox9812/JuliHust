import React from "react";
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
import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";
import UserContext from "../controller/context";
import { firebase } from "../src/firebase/config";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
var _ = require("lodash");

const db = firebase.firestore();
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

export default class Profile extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
      learnedLesson: {},
      goodResult: 0,
      imageUrl: "",
    };
  }
  componentDidMount() {
    let user = this.context;
    this.getResultData(user.id);
    this.getAvatarUrl(user.avatarFileName)
  }

  async getResultData(userId) {
    await db
      .collection("result")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        let countGoodResult = 0;
        querySnapshot.forEach((doc) => {
          const result = doc.data();
          this.state.resultList.push(result);
          if (result.accuracyInPercent > 70) {
            countGoodResult += 1;
          }
        });
        var learned = this.state.resultList.reduce(
          (acc, o) => ((acc[o.unit] = (acc[o.unit] || 0) + 1), acc),
          {}
        );
        this.setState({ learnedLesson: learned });
        if (this.state.resultList.length != 0) {
          var goodResultInPercent =
            (countGoodResult / this.state.resultList.length) * 100;
          goodResultInPercent = Math.round(goodResultInPercent * 1000) / 1000;
        } else {
          var goodResultInPercent = 0;
        }
        this.setState({ goodResult: goodResultInPercent });
      });
  }

  renderHistoryContent(navigation) {
    var historyContent = [];
    historyContent.push(
      <Block flex row style={styles.headerTable} key={"header-table"}>
        <Block flex={1} center>
          <Text>Unit</Text>
        </Block>
        <Block flex={1} center>
          <Text>Lesson</Text>
        </Block>
        <Block flex={1} center>
          <Text>Accuracy</Text>
        </Block>
      </Block>
    );
    for (var count = 0; count < this.state.resultList.length; count++) {
      let result = this.state.resultList[count];
      historyContent.push(
        <TouchableWithoutFeedback
          key={count}
          onPress={() =>
            navigation.navigate("ResultDetail", { result: result })
          }
        >
          <Block flex row style={({ flexWrap: "wrap" }, styles.dataTable)}>
            <Block flex={1} center>
              <Text>{result.unit}</Text>
            </Block>
            <Block flex={1} center>
              <Text>{result.lesson}</Text>
            </Block>
            <Block flex={1} center>
              <Text>{result.accuracyInPercent}%</Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      );
    }
    return historyContent;
  }
  async getAvatarUrl(filename) {
    const ref = await firebase
      .storage()
      .ref("images/" + filename)
      .getDownloadURL()
      .then((result) => {
        console.log(result);
        this.setState({imageUrl: result})
      });
  }

  render() {
    let user = this.context;
    // console.log(user.avatarFileName);
    // let avtUrl = this.getAvatarUrl(user.avatarFileName);
    // console.log(avtUrl);
    // if (user.avatarFileName) {
    //   avtUrl = this.getAvatarUrl(user.avatarFileName);
    // }
    var userInfo = {
      level: "Beginner",
      location: user.location ? user.location : "Hust, HaNoi",
      avatar: this.state.imageUrl ? this.state.imageUrl : Images.Avatar,
    };
    const { navigation } = this.props;
    return (
      <Block key={user} flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{ uri: userInfo.avatar }}
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
                      {userInfo.level}
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
                      {userInfo.location}
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
                  {_.size(this.state.learnedLesson)}
                </Text>
                <Text muted size={12}>
                  Lesson learned
                </Text>
              </Block>
              <Block flex={1} middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>
                  {this.state.goodResult}%
                </Text>
                <Text muted size={12}>
                  Good result
                </Text>
              </Block>
            </Block>
            <Block
              row
              space="between"
              style={{ paddingVertical: 16, alignItems: "baseline" }}
            >
              <Text size={16}>Recently learned</Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block flex row space="between">
                <Block flex={1}>{this.renderHistoryContent(navigation)}</Block>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
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
