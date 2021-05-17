import React from "react";
import {
  StyleSheet,
  Switch,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import materialTheme from "../constants/Theme";

export default class Settings extends React.Component {
  state = {};

  toggleSwitch = (switchNumber) =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={
                Platform.OS === "android"
                  ? materialTheme.COLORS.SWITCH_OFF
                  : null
              }
              trackColor={{
                false: materialTheme.COLORS.SWITCH_OFF,
                true: materialTheme.COLORS.SWITCH_ON,
              }}
              value={this.state[item.id]}
            />
          </Block>
        );
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
            <Block style={styles.rows}>
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
    ];

    return (
      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >
        <FlatList
          data={recommended}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
      </View>
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
});
