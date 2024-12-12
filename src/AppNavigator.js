import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CalendarScreen from "./components/screens/CalendarScreen"; // 캘린더 화면
import TodayHabitScreen from "./components/screens/TodayHabitScreen"; // 오늘의 습관 화면
import FriendsScreen from "./components/screens/FriendsScreen"; // 친구 화면

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TodayHabitScreen" // 중간 버튼 (기본 화면)
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Calender") {
              iconName = "calendar"; // 캘린더 아이콘
            } else if (route.name === "TodayHabit") {
              iconName = "home"; // 중앙 버튼 아이콘
            } else if (route.name === "Friends") {
              iconName = "people"; // 친구 아이콘
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Calender"
          component={CalendarScreen}
          options={{ title: "캘린더" }}
        />
        <Tab.Screen
          name="TodayHabit"
          component={TodayHabitScreen}
          options={{ title: "오늘의 습관" }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{ title: "친구" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
