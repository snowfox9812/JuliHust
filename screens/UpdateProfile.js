import React, { useState, useEffect } from "react";
import { firebase } from "../src/firebase/config";
import { StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import AuthContext from "../controller/authContext";
import { Block, Text, theme, Input, Button } from "galio-framework";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

export default function UpdateProfile() {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const { signOut } = React.useContext(AuthContext);

  const [userInfo, setUserInfo] = useState();
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [image, setImage] = useState("");
  const [avatarName, setAvatarName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [cameraPermission, setCameraPermission] = useState(false);

  const updateUserInfo = () => {
    setIsProcessing(true);
    console.log(updatedDisplayName, updatedLocation);
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (document) {
          document.ref
            .update({
              fullName: updatedDisplayName,
              location: updatedLocation,
              avatarFileName: avatarName,
            })
            .then(function () {
              if (image) {
                uploadImage(image, avatarName);
              }
              alert("Update profile successfull! Reload app to update!");
            })
            .catch(function (error) {
              alert(error);
            });
        });
      });
    setIsProcessing(false);
  };
  const onChooseImagePress = async (action) => {
    if (cameraPermission) {
      let result = {};
      if (action === "choose") {
        result = await ImagePicker.launchImageLibraryAsync();
      } else if (action === "take") {
        result = await ImagePicker.launchCameraAsync();
      } else {
        result = {};
      }

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      _askForPermissions();
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  const fetchUserInfo = async () => {
    await db
      .collection("users")
      .where("id", "==", user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUserInfo(doc.data());
          setAvatarName(doc.data().id + "_avt");
        });
      });
  };
  const _askForPermissions = async () => {
    let { existingStatus } = await Permissions.getAsync(Permissions.CAMERA);
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      existingStatus = status;
    }
    if (existingStatus !== "granted") {
      Alert.alert(
        "No Camera Permission",
        "Please accept permission to take a photo",
        [
          { text: "Cancel", onPress: () => console.log("cancel") },
          { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
        ],
        { cancelable: false }
      );
      return;
    }
    setCameraPermission(existingStatus === "granted");
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Block style={styles.profile}>
      {isProcessing ? (
        <Block flex>
          <Block flex={1} middle>
            <ActivityIndicator size="large" color="#6C24AA" />
            <Text>Loading...</Text>
          </Block>
        </Block>
      ) : (
        userInfo && (
          <Block flex style={styles.options}>
            <Block flex={1} style={styles.updateItems}>
              <Text size={16}>Display name:</Text>
              <Input
                defaultValue={userInfo.fullName ? userInfo.fullName : ""}
                onChangeText={(text) => setUpdatedDisplayName(text)}
                color={theme.COLORS.THEME}
                style={{ borderColor: theme.COLORS.THEME }}
              />
            </Block>
            <Block flex={1} style={styles.updateItems}>
              <Text size={16}>Location:</Text>
              <Input
                defaultValue={userInfo.location ? userInfo.location : ""}
                onChangeText={(text) => setUpdatedLocation(text)}
                color={theme.COLORS.THEME}
                style={{ borderColor: theme.COLORS.THEME }}
              />
            </Block>
            <Block flex={1} style={styles.updateItems}>
              <Block flex={1}>
                <Text size={16}>Avatar: {image ? image : ""}</Text>
              </Block>
              <Block flex={3} row>
                <Block flex={2}>
                  <Button
                    style={{
                      maxWidth: ((width - theme.SIZES.BASE * 6) / 5) * 2,
                    }}
                    onPress={() => {
                      onChooseImagePress("choose");
                    }}
                  >
                    Choose...
                  </Button>
                </Block>
                <Block flex={1} center>
                  <Text size={16}>Or</Text>
                </Block>
                <Block flex={2}>
                  <Button
                    style={{
                      maxWidth: ((width - theme.SIZES.BASE * 6) / 5) * 2,
                    }}
                    onPress={() => {
                      onChooseImagePress("take");
                    }}
                  >
                    Take Image
                  </Button>
                </Block>
              </Block>
            </Block>
            <Block flex={1} center>
              <Button
                capitalize
                size="small"
                onPress={() => {
                  updateUserInfo();
                }}
              >
                Update profile
              </Button>
            </Block>
            <Block flex={5}></Block>
          </Block>
        )
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: HeaderHeight + theme.SIZES.BASE,
    marginBottom: -HeaderHeight * 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 2,
    borderRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    minHeight: height - theme.SIZES.BASE * 9,
  },
  updateItems: {
    marginBottom: theme.SIZES.BASE,
  },
});
