import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { Block, NavBar, theme } from "galio-framework";

import Icon from "./Icon";
import materialTheme from "../constants/Theme";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const SettingButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("UpdateProfile")}
  >
    <Icon
      size={16}
      name="gears"
      family="font-awesome"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : null;
  };

  renderRight = () => {
    const { white, title, navigation } = this.props;

    switch (title) {
      case "Profile":
        return [
          <SettingButton
            key="setting-top-right"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      default:
        break;
    }
  };

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    // const { routeName } = navigation.state;
    // const noShadow = ["Profile"].includes(title);
    // const headerStyles = [
    //   !noShadow ? styles.shadow : null,
    //   transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
    // ];
    let background = title === "Profile" ? "#1FACFB" : "#00000";
    let customStyle = title === "Profile" ? [
      
    ] : null;
    return (
      <Block style={(styles.header)}>
        <NavBar
          back={back}
          title={title}
          style={{backgroundColor: background}, styles.navbar}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: "center" }}
          leftStyle={{ flex: 0.5, paddingTop: 2 }}
          leftIconName={back ? "chevron-left" : ""}
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            { color: theme.COLORS[white ? "WHITE" : "ICON"] },
          ]}
          onLeftPress={this.handleLeftPress}
        />
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
    borderBottomRightRadius: 100
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: "#1FACFB",
  },
});
