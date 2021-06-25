import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import { Icon } from "../components";
import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";
import UserContext from "../controller/context";
import { firebase } from "../src/firebase/config";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ProgressCircle from "react-native-progress-circle";
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
    this.getAvatarUrl(user.avatarFileName);
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
          <Text size={15} bold>
            Lesson
          </Text>
        </Block>
        <Block flex={1} center>
          <Text size={15} bold>
            Sentence
          </Text>
        </Block>
        <Block flex={1} center>
          <Text size={15} bold>
            Accuracy
          </Text>
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
              <Text muted>{result.unit}</Text>
            </Block>
            <Block flex={1} center>
              <Text muted>{result.lesson}</Text>
            </Block>
            <Block flex={1} center>
              <Text size={15} color={"#1FACFB"}>
                {result.accuracyInPercent}%
              </Text>
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
        this.setState({ imageUrl: result });
      });
  }

  render() {
    let user = this.context;
    var userInfo = {
      location: user.location ? user.location : "Hust, HaNoi",
      avatar: this.state.imageUrl ? this.state.imageUrl : Images.Avatar,
    };
    const { navigation } = this.props;
    return (
      <Block key={user} flex style={styles.profile}>
        <ImageBackground
          style={styles.headerImage}
          source={require("../assets/images/blueHeader.png")}
        >
          <Block flex row style={{ maxHeight: 85 }}>
            {/* <Block flex={1} stlye={{ marginLeft: 70, marginTop: 70 }} bottom>
              <Icon
                size={20}
                name="arrow-back-outline"
                family="ionicon"
                color="white"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            </Block> */}
            <Block flex={9} center style={{ marginTop: 65 }}>
              <Text
                size={16}
                color={"#FFFFFF"}
                bold
              >
                My profile
              </Text>
            </Block>
          </Block>
          <Block flex row style={{ marginTop: 10 }}>
            <Block flex={1} style={{ marginLeft: 20 }}>
              <Image style={styles.avatar} source={{ uri: userInfo.avatar }} />
            </Block>
            <Block flex={4}>
              <Block flex={1}>
                <Text size={16} color={"#ffffff"} bold>
                  {user.fullName}
                </Text>
              </Block>
              <Block flex={2} row style={{ marginRight: 20 }}>
                <Block flex={1} left>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.props.navigation.navigate("UpdateProfile");
                    }}
                  >
                    <Text size={15} color={"#E3F1F9"}>
                      Update profile
                      <Icon
                        size={15}
                        name="ios-pencil-outline"
                        family="ionicon"
                        color="#E3F1F9"
                        style={{ marginLeft: 10 }}
                      />
                    </Text>
                  </TouchableWithoutFeedback>
                </Block>
                <Block flex={1} right>
                  <Text color={"#E3F1F9"} size={15}>
                    <Icon
                      name="map-marker"
                      family="font-awesome"
                      color={"#E3F1F9"}
                      size={15}
                    />
                    {userInfo.location}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row flex style={{ padding: theme.SIZES.BASE, marginBottom: 10 }}>
              <Block flex={1} middle>
                <ProgressCircle
                  percent={_.size(this.state.learnedLesson)*2}
                  radius={40}
                  borderWidth={5}
                  color="#1FACFB"
                  shadowColor="#D5E0EA"
                  bgColor="#fff"
                >
                  <Text style={{ fontSize: 18 }}>{_.size(this.state.learnedLesson)}</Text>
                </ProgressCircle>
                <Text muted size={15} style={{marginTop: 10}}>
                  Lesson learned
                </Text>
              </Block>
              <Block flex={1} middle>
                <ProgressCircle
                  percent={this.state.goodResult}
                  radius={40}
                  borderWidth={5}
                  color="#1FACFB"
                  shadowColor="#D5E0EA"
                  bgColor="#fff"
                >
                  <Text style={{ fontSize: 18 }}>{this.state.goodResult}%</Text>
                </ProgressCircle>
                <Text muted size={15} style={{marginTop: 10}}>
                  Good result
                </Text>
              </Block>
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
    backgroundColor: "#ffffff",
  },
  options: {
    marginHorizontal: 20,
  },
  dataTable: {
    marginBottom: theme.SIZES.BASE * 2,
  },
  headerTable: {
    borderBottomWidth: 1,
    marginBottom: theme.SIZES.BASE * 2,
    paddingBottom: theme.SIZES.BASE * 1,
  },
  headerImage: {
    width: width,
    height: 180,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
});
