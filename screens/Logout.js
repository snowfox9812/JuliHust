import { Block, Button, theme } from "galio-framework";
import React from "react";
import { Alert, StyleSheet, Dimensions } from "react-native";
import AuthContext from "../controller/authContext";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");

export default function Logout() {
  const { signOut } = React.useContext(AuthContext);
  return (
    <Block flex center style={styles.home}>
      <Block flex style={(styles.record, styles.options)}>
        <Block flex={1} middle>
          <Button color="#6C24AA" onPress={signOut}>Sign out</Button>
        </Block>
      </Block>
    </Block>
  );
}
const styles = StyleSheet.create({
  home: {
    width: width,
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
