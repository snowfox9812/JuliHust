/**
 * @flow
 */

import React from "react";
import { Dimensions, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { registerRootComponent } from "expo";
import { Audio } from "expo-av";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import * as Linking from "expo-linking";
import * as FileSystem from "expo-file-system";
import { Block, Text, theme, Button } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
import Swiper from "react-native-swiper";
import patienceDiff from "../controller/patienceDiff";
import Highlighter from "react-native-highlight-words";

import { firebase } from "../src/firebase/config";
const db = firebase.firestore();
import UserContext from "../controller/context";

export default class Record extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      isRecordingComplete: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      isReceivedResult: false,
      receivedResultData: {},
      isProcessing: false,
    };
    this.recordingSettings = JSON.parse(
      JSON.stringify({
        ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        ios: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 256000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      })
    );
  }
  static contextType = UserContext;

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        "cutive-mono-regular": require("../assets/fonts/CutiveMono-Regular.ttf"),
      });
      this.setState({ fontLoaded: true });
    })();
    this._askForPermissions();
  }

  _askForPermissions = async () => {
    let { existingStatus } = await Permissions.getAsync(
      Permissions.AUDIO_RECORDING
    );
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      existingStatus = status;
    }
    if (existingStatus !== "granted") {
      Alert.alert(
        "No Audio Record Permission",
        "please goto setting and on notification permission manual",
        [
          { text: "cancel", onPress: () => console.log("cancel") },
          { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
        ],
        { cancelable: false }
      );
      return;
    }
    this.setState({
      haveRecordingPermissions: existingStatus === "granted",
    });
  };

  _updateScreenForSoundStatus = (status) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = (status) => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
      isRecordingComplete: false,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
      isRecordingComplete: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
    this.setState({ isReceivedResult: false });
  };

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.soundPosition
      )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
    }
    return "";
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  async _onUploadPressed(sentence, phnome, lesson, unit) {
    this.setState({ isProcessing: true });
    const userInfo = this.context;
    // Get audio file's info
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    let uri = info.uri;
    let apiUrl = "http://192.168.0.167:1234/upload";

    let timeStamp = Date.parse(new Date());
    let fileName = userInfo.id + "_" + timeStamp + "_" + lesson + ".wav";

    let formData = new FormData();
    formData.append("file", {
      uri,
      name: "test.wav",
      type: "wav",
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    // Send audio file to google cloud store
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          try {
            resolve(xhr.response);
          } catch (error) {
            console.log("error:", error);
          }
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      if (blob != null) {
        firebase
          .storage()
          .ref()
          .child(fileName)
          .put(blob, {
            contentType: `audio/wav`,
          })
          .then(() => {
            console.log("Sent data to cloud storage!");
            return fetch(apiUrl, options)
              .then((response) => response.json())
              .then((data) => {
                data.result.patience = patienceDiff.patienceDiff(
                  phnome.split(" "),
                  data.result.phnome.split(" "),
                  true
                );
                if (
                  data.result.patience.lineCountDeleted >=
                  data.result.patience.lineCountInserted
                ) {
                  data.result.accuracyInPercent =
                    ((data.result.patience.lines.length -
                      data.result.patience.lineCountDeleted) /
                      data.result.patience.lines.length) *
                    100;
                } else {
                  data.result.accuracyInPercent =
                    ((data.result.patience.lines.length -
                      data.result.patience.lineCountInserted) /
                      data.result.patience.lines.length) *
                    100;
                }
                data.result.accuracyInPercent =
                  Math.round(data.result.accuracyInPercent * 1000) / 1000;
                // Show missspell word
                data.result.missSpell = [];
                var checkMissSpell = patienceDiff.patienceDiff(
                  sentence.split(" "),
                  data.result.sentence.split(" "),
                  true
                );
                for (var line of checkMissSpell.lines) {
                  // If sentence does not have a word in example sentence, return this word
                  if (line.bIndex === -1) {
                    data.result.missSpell.push(line.line);
                  }
                }
                this.setState({
                  isReceivedResult: true,
                  receivedResultData: data,
                });

                // Add more result info to send to Firestore
                data.result.userId = userInfo.id;
                data.result.lesson = lesson;
                data.result.unit = unit;
                data.result.created = timeStamp;

                const recordRef = db
                  .collection("result")
                  .add(data.result)
                  .then(function () {
                    console.log("Doc successful");
                  })
                  .catch(function (error) {
                    console.error("Error writing doc", error);
                  });
                this.setState({ isProcessing: false });
              });
          })
          .catch((e) => console.log("error:", e));
      } else {
        console.log("error with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  deckSwiperRender = (unit, lesson, sentence, phnome) => {
    return (
      <Block flex>
        <Block flex={2}>
          <Block
            row
            space="between"
            style={{ paddingVertical: theme.SIZES.BASE }}
          >
            <Block left>
              <Text bold size={36} style={{ marginBottom: 8 }}>
                Lesson {unit}
              </Text>
              <Text muted size={18}>
                {lesson}:
              </Text>
            </Block>
          </Block>
          <Block
            row
            space="between"
            center
            style={{ paddingBottom: 16, alignItems: "baseline" }}
          >
            {/* <Text size={24}>{sentence}</Text> */}
            {console.log(this.state.receivedResultData)}
            {this.state.receivedResultData.result ? (
              <Highlighter
                style={{ fontSize: 24 }}
                highlightStyle={{ color: "red" }}
                searchWords={
                  !this.state.receivedResultData
                    ? []
                    : this.state.receivedResultData.result.missSpell
                }
                autoEscape={true}
                textToHighlight={sentence ? sentence : ""}
              />
            ) : (
              <Text size={24}>{sentence}</Text>
            )}
          </Block>
        </Block>
        <Block flex={4}>
          <Block flex>
            <Block flex={1}>
              <Block flex row>
                <Block flex={1} middle>
                  <Block>
                    {!this.state.isPlaying ? (
                      <Button
                        onlyIcon
                        icon="play-outline"
                        iconFamily="ionicon"
                        iconSize={14}
                        color="primary"
                        iconColor="white"
                        onPress={() => {
                          this._onPlayPausePressed();
                        }}
                        disabled={
                          !this.state.isPlaybackAllowed || this.state.isLoading
                        }
                      />
                    ) : (
                      <Button
                        onlyIcon
                        icon="pause-outline"
                        iconFamily="ionicon"
                        iconSize={14}
                        color="primary"
                        iconColor="white"
                        onPress={() => {
                          this._onPlayPausePressed();
                        }}
                        disabled={
                          !this.state.isPlaybackAllowed || this.state.isLoading
                        }
                      />
                    )}
                  </Block>
                </Block>
                <Block flex={1} middle>
                  {!this.state.muted ? (
                    <Button
                      onlyIcon
                      icon="volume-high-outline"
                      iconFamily="ionicon"
                      iconSize={14}
                      color="primary"
                      iconColor="white"
                      onPress={this._onMutePressed}
                      disabled={
                        !this.state.isPlaybackAllowed || this.state.isLoading
                      }
                    />
                  ) : (
                    <Button
                      onlyIcon
                      icon="volume-mute-outline"
                      iconFamily="ionicon"
                      iconSize={14}
                      color="primary"
                      iconColor="white"
                      onPress={this._onMutePressed}
                      disabled={
                        !this.state.isPlaybackAllowed || this.state.isLoading
                      }
                    />
                  )}
                </Block>
                <Block flex={1} middle>
                  <Button
                    onlyIcon
                    icon="stop-outline"
                    iconFamily="ionicon"
                    iconSize={14}
                    color="primary"
                    iconColor="white"
                    onPress={this._onStopPressed}
                    disabled={
                      !this.state.isPlaybackAllowed || this.state.isLoading
                    }
                  />
                </Block>
                <Block flex={2} middle>
                  <Text>{this._getPlaybackTimestamp()}</Text>
                </Block>
              </Block>
            </Block>
            <Block flex={5}>
              {this.state.isReceivedResult && this.state.receivedResultData && (
                <Block flex middle>
                  <Block>
                    <Text bold size={24}>
                      Accuracy :
                      {this.state.receivedResultData.result.accuracyInPercent}%
                    </Text>
                  </Block>
                </Block>
              )}
            </Block>
          </Block>
        </Block>
        <Block flex={2}>
          <Block flex middle>
            <Block flex={1}>
              {this.state.isRecording ? (
                <Text>Recording... {this._getRecordingTimestamp()}</Text>
              ) : (
                this.state.isRecordingComplete && (
                  <Block>
                    <Button
                      capitalize
                      size="small"
                      disabled={
                        this.state.isLoading && this.state.isRecordingComplete
                      }
                      onPress={() => {
                        this._onUploadPressed(sentence, phnome, lesson, unit);
                      }}
                    >
                      Submit
                    </Button>
                  </Block>
                )
              )}
            </Block>
            <Block flex={2}>
              <Button
                onlyIcon
                icon={
                  this.state.isRecording
                    ? "dots-three-horizontal"
                    : "mic-outline"
                }
                iconFamily={this.state.isRecording ? "Entypo" : "ionicon"}
                iconSize={35}
                color="primary"
                iconColor="white"
                onPress={this._onRecordPressed}
                disabled={this.state.isLoading}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderRecordScreen = () => {
    let lessonContent = this.props.route.params.product.content;
    var lessonRender = [];
    for (var lesson of lessonContent) {
      lessonRender.push(
        <Block key={lesson} flex>
          {this.deckSwiperRender(
            lesson.lession,
            lesson.code,
            lesson.juliusSentence,
            lesson.phnome
          )}
        </Block>
      );
    }
    return (
      <Swiper loop={false} showsPagination={false} showsButtons={false}>
        {lessonRender}
      </Swiper>
    );
  };

  render() {
    return !this.state.fontLoaded ? (
      <Block />
    ) : !this.state.haveRecordingPermissions ? (
      <Block>
        <Text>
          You must enable audio recording permissions in order to use this app.
        </Text>
      </Block>
    ) : (
      <Block flex style={(styles.record, styles.options)}>
        {this.state.isProcessing ? (
          <Block flex>
            <Block flex={1} middle>
              <ActivityIndicator size="large" color="#6C24AA" />
              <Text>Loading...</Text>
            </Block>
          </Block>
        ) : (
          this.renderRecordScreen()
        )}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
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

registerRootComponent(Record);
