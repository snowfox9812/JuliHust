import React, { useState } from "react";
import { Dimensions, StyleSheet, ImageBackground } from "react-native";
import { Block, Text, Input, Icon, Button } from "galio-framework";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../src/firebase/config";
import AuthContext from "../controller/authContext";
const { width, height } = Dimensions.get("screen");
import { useNavigation } from "@react-navigation/native";

export default function ChangePassword() {
  const { resetPassword } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const onResetPasswordPress = () => {
    resetPassword({ email });
  };

  return (
    <Block style={styles.login}>
      <Block>
        <ImageBackground
          style={styles.headerImage}
          source={require("../assets/images/blueHeader.png")}
        >
          <Block flex row>
            <Block flex={1} style={{ marginTop: 35 }} middle>
              <Icon
                size={20}
                name="arrow-back-outline"
                family="ionicon"
                color="white"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </Block>
            <Block flex={9} center style={{ marginTop: 35 }}>
              <Text
                size={16}
                color={"#FFFFFF"}
                bold
                style={{ marginRight: 44 }}
              >
                Forgot password
              </Text>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
      <KeyboardAwareScrollView>
        <Block center style={styles.loginForm}>
          <Input
            placeholder="Email"
            type={"email-address"}
            rounded
            left
            icon="ios-mail-outline"
            family="ionicon"
            iconSize={14}
            iconColor="#1FACFB"
            color={"#3C3C40"}
            style={styles.inputBorder}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Block>
        <Block center>
          <Block style={styles.signInButton}>
            <Button
              round
              color={"#1FACFB"}
              shadowless
              onPress={() => onResetPasswordPress()}
            >
              Send
            </Button>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    </Block>
  );
}
const styles = StyleSheet.create({
  login: {
    width: width,
    height: height,
    backgroundColor: "#ffffff",
  },
  groupTitle: {
    marginTop: 104,
    marginBottom: 54,
  },
  title: {
    marginBottom: 12,
  },
  loginForm: {
    width: width * 0.78,
    marginBottom: 40,
    marginTop: 40,
  },
  inputBorder: {
    borderColor: "#1FACFB",
  },
  loginFormBottom: {
    marginTop: 12,
  },
  signInButton: {
    marginBottom: 24,
  },
  loginIcon: {
    width: 36,
    height: 36,
  },
  bottom: {
    marginTop: 250,
  },
  headerImage: {
    width: width,
    height: 95,
  },
});
