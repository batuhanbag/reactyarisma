import React from "react";
import { Image } from "react-native";
import {
  DarkTheme,
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MovieDetail from "./screens/MovieDetail";
import Search from "./screens/Search";
import Profile from "./screens/Profile";

// Utils
import icons from "./utils/icons/icons";
import { COLORS } from "./utils/colors/colors";
import MovieByKeyword from "./screens/MovieByKeyword";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "black",
          elevation: 0,
        },
        tabBarShowLabel: false,
        headerTitleStyle: {
          color: "white",
        },
        headerStyle: {
          backgroundColor: "rgba(0,0,0,0.7)",
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.list}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgba(0,0,0,0.6)",
    primary: "white",
    card: "rgb(255, 255, 255)",
    text: "white",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

export default function App(props: any) {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="BottomTab"
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
          }}
          component={BottomTab}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          }}
        />

        <Stack.Screen
          name="MovieByKeyword"
          component={MovieByKeyword}
          options={{
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
