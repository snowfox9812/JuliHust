import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

class Product extends React.Component {
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
              <Block flex={1} middle style={{ marginLeft: 30 }}>
                <Image
                  style={styles.unitImage}
                  source={require("../assets/images/figma/UnitImage.png")}
                />
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Record", { product: product })
              }
            >
              <Block flex={3} middle left style={{ marginLeft: 15 }}>
                <Text size={13} color={"#6E6E6E"}>
                  みんなの日本語
                </Text>
                <Text size={20} color={"#6E6E6E"} bold>
                  {product.title}
                </Text>
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
