import { Block, Text, Input, Checkbox, Button, Icon } from "galio-framework";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContext from "../controller/authContext";
const { width, height } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const { signIn } = React.useContext(AuthContext);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };
  const onResetPasswordPress = () => {
    navigation.navigate("ResetPassword");
  }
  const onLoginPress = () => {
    signIn({ email, password });
  };

  return (
    <Block style={styles.login}>
      <KeyboardAwareScrollView>
        <Block center style={styles.groupTitle}>
          <Block style={styles.title}>
            <Text size={28} color={"#171718"}>
              Sign In
            </Text>
          </Block>
          <Block>
            <Text size={15} color={"#747474"}>
              Sign in to continue our interesting lessons
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
            placeholder="Password"
            rounded
            left
            password
            viewPass={viewPassword}
            icon="ios-lock-closed-outline"
            family="ionicon"
            iconSize={14}
            iconColor="#1FACFB"
            color={"#3C3C40"}
            style={styles.inputBorder}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Block flex row style={styles.loginFormBottom}>
            <Block flex={1}>
              <Checkbox
                color="#1FACFB"
                label="Remember me"
                labelStyle={{ color: "#747474" }}
                checkboxStyle={{
                  fontSize: 16,
                }}
                onChange={() => setRemember(!remember)}
              />
            </Block>
            <Block flex={1} right>
              <TouchableOpacity onPress={onResetPasswordPress}>
                <Text style={{ color: "#747474" }}>Forgot password</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
        <Block center>
          <Block style={styles.signInButton}>
            <Button
              round
              color={"#1FACFB"}
              shadowless
              onPress={() => onLoginPress()}
            >
              Sign in
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
              Didn't have an account yet?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
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
