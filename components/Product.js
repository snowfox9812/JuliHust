import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Block, Text } from "galio-framework";
import ProgressCircle from "react-native-progress-circle";

const { width } = Dimensions.get("screen");

class Product extends React.Component {
  renderSwitch(lesson) {
    switch (lesson) {
      case 1:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/1.jpg")}
          />
        );
      case 2:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/2.jpg")}
          />
        );
      case 3:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/3.jpg")}
          />
        );
      case 4:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/4.jpg")}
          />
        );
      case 5:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/5.jpg")}
          />
        );
      case 6:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/6.jpg")}
          />
        );
      case 7:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/7.jpg")}
          />
        );
      case 8:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/8.jpg")}
          />
        );
      case 9:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/9.jpg")}
          />
        );
      case 10:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/10.jpg")}
          />
        );
      case 11:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/11.jpg")}
          />
        );
      case 12:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/12.jpg")}
          />
        );
      case 13:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/13.jpg")}
          />
        );
      case 14:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/14.jpg")}
          />
        );
      case 15:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/15.jpg")}
          />
        );
      case 16:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/16.jpg")}
          />
        );
      case 17:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/17.jpg")}
          />
        );
      case 18:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/18.jpg")}
          />
        );
      case 19:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/19.jpg")}
          />
        );
      case 20:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/20.jpg")}
          />
        );
      case 21:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/21.jpg")}
          />
        );
      case 22:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/22.jpg")}
          />
        );
      case 23:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/23.jpg")}
          />
        );
      case 24:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/24.jpg")}
          />
        );
      case 25:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/25.jpg")}
          />
        );
      case 26:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/26.jpg")}
          />
        );
      case 27:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/27.jpg")}
          />
        );
      case 28:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/28.jpg")}
          />
        );
      case 29:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/29.jpg")}
          />
        );
      case 30:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/30.jpg")}
          />
        );
      case 31:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/31.jpg")}
          />
        );
      case 32:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/32.jpg")}
          />
        );
      case 33:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/33.jpg")}
          />
        );
      case 34:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/34.jpg")}
          />
        );
      case 35:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/35.jpg")}
          />
        );
      case 36:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/36.jpg")}
          />
        );
      case 37:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/37.jpg")}
          />
        );
      case 38:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/38.jpg")}
          />
        );
      case 39:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/39.jpg")}
          />
        );
      case 40:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/40.jpg")}
          />
        );
      case 41:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/41.jpg")}
          />
        );
      case 42:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/42.jpg")}
          />
        );
      case 43:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/43.jpg")}
          />
        );
      case 44:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/44.jpg")}
          />
        );
      case 45:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/45.jpg")}
          />
        );
      case 46:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/46.jpg")}
          />
        );
      case 47:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/47.jpg")}
          />
        );
      case 48:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/48.jpg")}
          />
        );
      case 49:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/49.jpg")}
          />
        );
      case 50:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/lessons/50.jpg")}
          />
        );
      default:
        return (
          <Image
            style={styles.unitImage}
            source={require("../assets/images/figma/UnitImage.png")}
          />
        );
    }
  }
  render() {
    const { navigation, product } = this.props;
    return (
      <Block center style={styles.unitComponent}>
        <ImageBackground
          source={require("../assets/images/figma/UnitBackground.png")}
          style={styles.image}
        >
          <Block flex row>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Record", { product: product })
              }
            >
              <Block flex={1} middle style={{ marginLeft: 40 }}>
                {this.renderSwitch(product.lesson)}
                {/* <Image
                  style={styles.unitImage}
                  source={require("../assets/images/lessons/20.jpg")}
                /> */}
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Record", { product: product })
              }
            >
              <Block flex={3} middle left style={{ marginLeft: 30 }}>
                <Text size={13} color={"#6E6E6E"}>
                  みんなの日本語
                </Text>
                <Text size={20} color={"#6E6E6E"} bold>
                  {product.title}
                </Text>
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Record", { product: product })
              }
            >
              <Block flex={2} middle style={{ marginRight: 5 }}>
                <ProgressCircle
                  percent={product.complete ? product.complete : 0}
                  radius={30}
                  borderWidth={5}
                  color="#1FACFB"
                  shadowColor="#D5E0EA"
                  bgColor="#EDF2F7"
                >
                  <Text style={{ fontSize: 12 }}>
                    {product.complete ? product.complete : 0}%
                  </Text>
                </ProgressCircle>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

export default withNavigation(Product);

const styles = StyleSheet.create({
  unitComponent: {
    marginBottom: 20,
  },
  image: {
    width: width,
    height: 120,
  },
  unitImage: {
    width: 80,
    height: 55,
  },
});
