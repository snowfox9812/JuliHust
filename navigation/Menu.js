import React, { useState, useEffect, useContext } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import { Drawer as DrawerCustomItem } from "../components/";
import { materialTheme } from "../constants/";
import UserContext from "../controller/context";
import { firebase } from "../src/firebase/config";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  props,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = ["Home", "Profile", "Settings"];
  const user = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState("");

  async function getAvatarUrl(filename) {
    const ref = await firebase
      .storage()
      .ref("images/" + filename)
      .getDownloadURL()
      .then((result) => {
        setImageUrl(result);
      });
  }

  useEffect(() => {
    getAvatarUrl(user.avatarFileName);
  }, []);

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <Block style={styles.profile}>
            <Image source={{ uri: imageUrl }} style={styles.avatar} />
            <Text h5 color={"white"}>
              {profile.name}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <Block row>
          <Text size={16} muted style={styles.seller}>
            {profile.type}
          </Text>
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
      <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}>
        <DrawerCustomItem
          title="Logout"
          navigation={navigation}
          focused={state.index === 3 ? true : false}
        />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#4B1958",
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: "flex-end",
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  },
});

export default CustomDrawerContent;
