import React, { useState, useEffect } from "react";
import { firebase } from "../src/firebase/config";
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import AuthContext from "../controller/authContext";
import { Block, Text, theme, Input, Button, Icon } from "galio-framework";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("screen");
import { useNavigation } from "@react-navigation/native";

export default function UpdateProfile() {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();

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
    <Block style={{ backgroundColor: "#ffffff", height: height }}>
      {isProcessing ? (
        <Block flex>
          <Block flex={1} middle>
            <ActivityIndicator size="large" color="#6C24AA" />
            <Text>Loading...</Text>
          </Block>
        </Block>
      ) : (
        userInfo && (
          <Block flex>
            <ImageBackground
              style={styles.headerImage}
              source={require("../assets/images/blueHeader.png")}
            >
              <Block flex row>
                <Block flex={1} style={{ marginTop: 35 }} center>
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
                    Update profile
                  </Text>
                </Block>
              </Block>
            </ImageBackground>
            <Block flex style={styles.options}>
              <Block flex={1} style={styles.updateItems}>
                <Text size={16}>Display name:</Text>
                <Input
                  rounded
                  defaultValue={userInfo.fullName ? userInfo.fullName : ""}
                  onChangeText={(text) => setUpdatedDisplayName(text)}
                  color={"#1FACFB"}
                  style={{ borderColor: "#1FACFB" }}
                />
              </Block>
              <Block flex={1} style={styles.updateItems}>
                <Text size={16}>Location:</Text>
                <Input
                  rounded
                  defaultValue={userInfo.location ? userInfo.location : ""}
                  onChangeText={(text) => setUpdatedLocation(text)}
                  color={"#1FACFB"}
                  style={{ borderColor: "#1FACFB" }}
                />
              </Block>
              <Block flex={1} style={styles.updateItems}>
                <Block flex={1}>
                  <Text size={16}>Avatar: {image ? image : ""}</Text>
                </Block>
                <Block flex={3} row>
                  <Block flex={2}>
                    <Button
                      round
                      style={{
                        maxWidth: ((width - theme.SIZES.BASE * 6) / 5) * 2,
                      }}
                      color={"#1FACFB"}
                      shadowless
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
                      round
                      style={{
                        maxWidth: ((width - theme.SIZES.BASE * 6) / 5) * 2,
                      }}
                      color={"#1FACFB"}
                      shadowless
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
                  round
                  color={"#1FACFB"}
                  shadowless
                  onPress={() => {
                    updateUserInfo();
                  }}
                >
                  Update profile
                </Button>
              </Block>
              <Block flex={5}></Block>
            </Block>
          </Block>
        )
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  options: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  updateItems: {
    marginBottom: theme.SIZES.BASE,
  },
  headerImage: {
    width: width,
    height: 95,
  },
});
