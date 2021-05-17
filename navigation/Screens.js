import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Block, Text} from "galio-framework";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import Login from "../screens/Login";
import Logout from "../screens/Logout";
import Registration from "../screens/Registration";
import Record from "../components/AudioRecord";
import ChangePasswordScreen from "../screens/ChangePassword";
import AboutScreen from "../screens/About";
import UpdateProfile from "../screens/UpdateProfile";
import ResultDetail from "../screens/ResultDetail";

import CustomDrawerContent from "./Menu";
import { Icon, Header } from "../components";
import { Images, materialTheme } from "../constants/";

import UserContext from "../controller/context";
import AuthContext from "../controller/authContext";
import * as SecureStore from "expo-secure-store";
import { firebase } from "../src/firebase/config";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

var profile = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Beginner",
  plan: "Pro",
  rating: 4.8,
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
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
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
      headerMode="screen"
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
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Home"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Record"
        component={Record}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              search
              tabs
              title="Record"
              navigation={navigation}
              scene={scene}
            />
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
      <Drawer.Navigator
        style={{ flex: 1 }}
        drawerContent={(props) => (
          <CustomDrawerContent {...props} profile={profile} />
        )}
        drawerStyle={{
          backgroundColor: "white",
          width: width * 0.8,
        }}
        drawerContentOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: materialTheme.COLORS.ACTIVE,
          inactiveBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.74,
            paddingHorizontal: 12,
            // paddingVertical: 4,
            justifyContent: "center",
            alignContent: "center",
            // alignItems: 'center',
            overflow: "hidden",
          },
          labelStyle: {
            fontSize: 18,
            fontWeight: "normal",
          },
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            drawerIcon: ({ focused }) => (
              <Icon
                size={16}
                name="home-outline"
                family="ionicon"
                color={focused ? "white" : materialTheme.COLORS.MUTED}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            drawerIcon: ({ focused }) => (
              <Icon
                size={16}
                name="circle-10"
                family="GalioExtra"
                color={focused ? "white" : materialTheme.COLORS.MUTED}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            drawerIcon: ({ focused }) => (
              <Icon
                size={16}
                name="gears"
                family="font-awesome"
                color={focused ? "white" : materialTheme.COLORS.MUTED}
                style={{ marginRight: -3 }}
              />
            ),
          }}
        />
        <Drawer.Screen
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
        />
      </Drawer.Navigator>
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
