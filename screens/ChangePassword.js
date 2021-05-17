import React, { useState } from "react";
import {
  TextInput,
} from "react-native";
import { Block, theme, Icon, Button } from "galio-framework";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../assets/style/style";
import { firebase } from "../src/firebase/config";
export default function ChangePassword({ navigation }) {
  var user = firebase.auth().currentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onResetPasswordPress = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords don't match.");
      return;
    }
    var auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
        alert("Email sent, please check your email!");
      })
      .catch(function (error) {
        // An error happened.
        alert("An error has ocurred, please try again.");
      });
    // user
    //   .updatePassword(newPassword)
    //   .then(function () {
    //     // Update successful.
    //     alert("Passwords update successful!");
    //   })
    //   .catch(function (error) {
    //     // An error happened.
    //     alert("An error has ocurred, please try again.");
    //   });
  };

  return (
    <Block style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {/* <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Old Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="New Password"
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm New Password"
          onChangeText={(text) => setConfirmNewPassword(text)}
          value={confirmNewPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /> */}
        <Block center>
          <Button>Send</Button>
        </Block>
      </KeyboardAwareScrollView>
    </Block>
  );
}
