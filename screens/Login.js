import { Block } from "galio-framework";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../assets/style/style";
import AuthContext from "../controller/authContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = React.useContext(AuthContext);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = () => {
    signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Block
          style={{
            flex: 1,
            height: 120,
            alignItems: "center",
            margin: 50,
            paddingTop: 30,
          }}
        >
          <Text style={{ fontSize: 50 }}>JuliHust</Text>
          <Text>A simple App in Japanese recognition</Text>
        </Block>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
