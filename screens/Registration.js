import React, { useState } from "react";
import { Block, Text, Input, Checkbox, Button, Icon } from "galio-framework";
import { TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContext from "../controller/authContext";
const { width, height } = Dimensions.get("screen");

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp } = React.useContext(AuthContext);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (!email || !fullName || !password ||!confirmPassword) {
        alert("Please fill all the field to sign up!");
        return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    signUp({ email, password, fullName });
  };

  return (
    <Block style={styles.login}>
      <KeyboardAwareScrollView>
        <Block center style={styles.groupTitle}>
          <Block style={styles.title}>
            <Text size={28} color={"#171718"}>
              Sign Up
            </Text>
          </Block>
          <Block>
            <Text size={15} color={"#747474"}>
              Sign up to start learning Japanese lessons
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
          <Input
            placeholder="Full name"
            rounded
            left
            icon="ios-person-circle-outline"
            family="ionicon"
            iconSize={14}
            iconColor="#1FACFB"
            color={"#3C3C40"}
            style={styles.inputBorder}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <Input
            placeholder="Password"
            rounded
            left
            password
            viewPass={false}
            icon="ios-lock-closed-outline"
            family="ionicon"
            iconSize={14}
            iconColor="#1FACFB"
            color={"#3C3C40"}
            style={styles.inputBorder}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Confirm password"
            rounded
            left
            password
            viewPass={false}
            icon="ios-lock-closed-outline"
            family="ionicon"
            iconSize={14}
            iconColor="#1FACFB"
            color={"#3C3C40"}
            style={styles.inputBorder}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </Block>
        <Block center>
          <Block style={styles.signInButton}>
            <Button
              round
              color={"#1FACFB"}
              shadowless
              onPress={() => onRegisterPress()}
            >
              Sign up
            </Button>
          </Block>
          <Block style={styles.signInButton}>
            <Text size={15} color={"#747474"}>
              Or
            </Text>
          </Block>
          <Block flex row style={{ maxHeight: 50 }}>
            <Block style={{ marginRight: 35 }}>
              <TouchableOpacity>
                <Image
                  style={styles.loginIcon}
                  source={require("../assets/images/figma/facebook.png")}
                />
              </TouchableOpacity>
            </Block>
            <Block>
              <TouchableOpacity>
                <Image
                  style={styles.loginIcon}
                  source={require("../assets/images/figma/google.png")}
                />
              </TouchableOpacity>
            </Block>
          </Block>
          <Block style={styles.bottom}>
            <Text size={15} color={"#747474"}>
              Already have an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign in
              </Text>
            </Text>
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
  signInButton: {
    marginBottom: 24,
  },
  loginIcon: {
    width: 36,
    height: 36,
  },
  bottom: {
    marginTop: 165,
  },
  footerLink: {
    color: "#1FACFB",
  },
});
