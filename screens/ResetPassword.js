import { Block, Text, Input, Button } from "galio-framework";
import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContext from "../controller/authContext";
const { width, height } = Dimensions.get("screen");

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const { resetPassword } = React.useContext(AuthContext);

  const onBackToLoginPress = () => {
    navigation.navigate("Login");
  };

  const onResetPasswordPress = () => {
    resetPassword({ email });
  };

  return (
    <Block style={styles.login}>
      <KeyboardAwareScrollView>
        <Block center style={styles.groupTitle}>
          <Block style={styles.title}>
            <Text size={28} color={"#171718"}>
              Forgot Password
            </Text>
          </Block>
          <Block>
            <Text size={15} color={"#747474"}>
              Please enter email to reset password
            </Text>
          </Block>
        </Block>
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
          <Block style={styles.signInButton}>
            <Text size={15} color={"#747474"}>
              Or
            </Text>
          </Block>
          <Block style={{ maxHeight: 50 }}>
            <Button
              round
              color={"#1FACFB"}
              shadowless
              onPress={() => onBackToLoginPress()}
            >
              Back to login
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
  footerLink: {
    color: "#1FACFB",
  },
});
