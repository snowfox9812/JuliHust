import React, { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Block, Text } from "galio-framework";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import Login from "../screens/Login";
import Logout from "../screens/Logout";
import Registration from "../screens/Registration";
import ResetPassword from "../screens/ResetPassword";
import Record from "../components/AudioRecord";
import ChangePasswordScreen from "../screens/ChangePassword";
import AboutScreen from "../screens/About";
import UpdateProfile from "../screens/UpdateProfile";
import ResultDetail from "../screens/ResultDetail";

import { Icon, Header } from "../components";
import { Images, materialTheme } from "../constants/";

import UserContext from "../controller/context";
import AuthContext from "../controller/authContext";
import * as SecureStore from "expo-secure-store";
import { firebase } from "../src/firebase/config";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

var profile = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Beginner",
};

function SplashScreen() {
  return (
    <Block>
      <Text>Loading...</Text>
    </Block>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="none">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title="Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ResultDetail"
        component={ResultDetail}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title="Result Detail"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Update Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="none"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Reset password"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="About" scene={scene} navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Logout" scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" navigation={navigation} scene={scene} />
          ),
        }}
      />
      <Stack.Screen
        name="Record"
        component={Record}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Record" navigation={navigation} scene={scene} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LogOutStack() {
  return (
    <Stack.Navigator initialRouteName="Logout" mode="card" headerMode="screen">
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              transparent
              title="Logout"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  profile.name = props.userInfo.fullName;
  return (
    <UserContext.Provider value={props.userInfo}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let backgroundColor;

            if (route.name === "Home") {
              iconName = "ios-home-outline";
              backgroundColor = focused ? "#1FACFB" : "#00000";
            } else if (route.name === "Settings") {
              iconName = "ios-settings-outline";
              backgroundColor = focused ? "#1FACFB" : "#00000";
            } else if (route.name === "Profile") {
              iconName = "ios-person-outline";
              backgroundColor = focused ? "#1FACFB" : "#00000";
            }
            return (
              <Block style={{ marginBottom: 12 }}>
                <Block style={styles.elipse_78}>
                  <Block flex middle>
                    <Block
                      style={{
                        backgroundColor: backgroundColor,
                        borderRadius: 46 / 2,
                        height: 46,
                        width: 46,
                      }}
                    >
                      <Block flex middle>
                        <Icon
                          size={24}
                          name={iconName}
                          family="ionicon"
                          color={focused ? "white" : "gray"}
                        />
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#1FACFB",
          inactiveTintColor: "gray",
          style: {
            // borderTopLeftRadius: 20,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowColor: "#3E5163",
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
        {/* <Tab.Screen
          name="Logout"
          component={LogOutStack}
          options={{
            drawerIcon: ({ focused }) => (
              <Icon
                size={16}
                name="md-person-add"
                family="ionicon"
                color={focused ? "white" : materialTheme.COLORS.MUTED}
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

export default function OnboardingStack() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userInfo: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case "RESET_PASSWORD":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userInfo: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
        alert("Restoring token failed!!!");
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((response) => {
            const uid = response.user.uid;
            const usersRef = firebase.firestore().collection("users");
            usersRef
              .doc(uid)
              .get()
              .then((firestoreDocument) => {
                if (!firestoreDocument.exists) {
                  alert("User does not exist anymore.");
                  return;
                }
                const user = firestoreDocument.data();
                dispatch({ type: "SIGN_IN", token: uid, user: user });
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            // alert(error);
          });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        const email = data.email;
        const password = data.password;
        const fullName = data.fullName;
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            const uid = response.user.uid;
            const requestData = {
              id: uid,
              email,
              fullName,
            };
            const usersRef = firebase.firestore().collection("users");
            usersRef
              .doc(uid)
              .set(requestData)
              .then(() => {
                dispatch({
                  type: "SIGN_IN",
                  token: response.user.uid,
                  user: response.user,
                });
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            // alert(error);
          });
      },
      resetPassword: async (data) => {
        const email = data.email;
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(function () {
            // Email sent.
            dispatch({
              type: "RESET_PASSWORD",
            });
            alert("Email sent! Please check your email to reset password");
          })
          .catch(function (error) {
            // An error happened.
            alert("Error occured, please try again later!");
          });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator mode="card" headerMode="none">
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userToken == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="AppStack">
              {(prop) => <AppStack {...prop} userInfo={state.userInfo} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  elipse_78: {
    backgroundColor: "white",
    borderRadius: 54 / 2,
    height: 54,
    width: 54,
  },
  elipse_77: {
    backgroundColor: "#1FACFB",
    borderRadius: 46 / 2,
    height: 46,
    width: 46,
  },
});
