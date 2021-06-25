import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
const { width, height } = Dimensions.get("screen");

export default class Settings extends React.Component {
  state = {};

  toggleSwitch = (switchNumber) =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    switch (item.type) {
      case "button":
        if (item.id === "changePassword") {
          return (
            <Block style={styles.rows}>
              <TouchableOpacity onPress={() => navigate("ChangePassword")}>
                <Block row middle space="between" style={{ paddingTop: 7 }}>
                  <Text size={14}>{item.title}</Text>
                  <Icon
                    name="angle-right"
                    family="font-awesome"
                    style={{ paddingRight: 5 }}
                  />
                </Block>
              </TouchableOpacity>
            </Block>
          );
        } else if (item.id === "about") {
          return (
            <Block>
              <Block flex style={styles.rows}>
                <TouchableOpacity onPress={() => navigate("About")}>
                  <Block row middle space="between" style={{ paddingTop: 7 }}>
                    <Text size={14}>{item.title}</Text>
                    <Icon
                      name="angle-right"
                      family="font-awesome"
                      style={{ paddingRight: 5 }}
                    />
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
          );
        } else if (item.id === "logout") {
          return (
            <Block>
              <Block flex style={styles.rows}>
                <TouchableOpacity onPress={() => navigate("Logout")}>
                  <Block row middle space="between" style={{ paddingTop: 7 }}>
                    <Text size={14}>{item.title}</Text>
                    <Icon
                      name="angle-right"
                      family="font-awesome"
                      style={{ paddingRight: 5 }}
                    />
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
          );
        }
      default:
        break;
    }
  };

  render() {
    const recommended = [
      { title: "Reset Password", id: "changePassword", type: "button" },
      { title: "About", id: "about", type: "button" },
      { title: "Logout", id: "logout", type: "button" },
    ];

    return (
      <Block
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
        style={{ backgroundColor: "#ffffff", height: height }}
      >
        <Block>
          <ImageBackground
            style={styles.headerImage}
            source={require("../assets/images/blueHeader.png")}
          >
            <Block center style={{ marginTop: 50 }}>
              <Text size={16} color={"#FFFFFF"} bold>
                Settings
              </Text>
            </Block>
          </ImageBackground>
        </Block>
        <FlatList
          data={recommended}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    marginTop: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
  headerImage: {
    width: width,
    height: 95,
  },
});
