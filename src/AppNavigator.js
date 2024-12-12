import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CalendarScreen from "./components/screens/CalendarScreen"; // 캘린더 화면
import TodayHabitScreen from "./components/screens/TodayHabitScreen"; // 오늘의 습관 화면
import FriendsScreen from "./components/screens/FriendsScreen"; // 친구 화면
import AddHabitScreen from "./components/screens/AddHabitScreen"; // 습관 등록 화면
import EditHabitScreen from "./components/screens/EditHabitScreen"; // 습관 수정 화면

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// TodayHabitStack 정의
const TodayHabitStack = () => {
  console.log("TodayHabitStack Loaded");
  return (
    <Stack.Navigator initialRouteName="TodayHabitScreen">
      <Stack.Screen
        name="TodayHabitScreen"
        component={TodayHabitScreen}
        options={{ title: "오늘의 습관",  headerShown: false}}
      />
      <Stack.Screen
        name="AddHabit"
        component={AddHabitScreen}
        options={{ title: "새로운 습관 추가", headerShown: false }}
      />
      <Stack.Screen
        name="EditHabit"
        component={EditHabitScreen}
        options={{ title: "습관 수정", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// AppNavigator 정의
const AppNavigator = () => {
  console.log("AppNavigator Loaded");
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TodayHabitStack" // 초기 화면을 TodayHabitStack으로 설정
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Calendar") {
              iconName = "calendar"; // 캘린더 아이콘
            } else if (route.name === "TodayHabitStack") {
              iconName = "home"; // 중앙 버튼 아이콘
            } else if (route.name === "Friends") {
              iconName = "people"; // 친구 아이콘
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // 모든 탭에서 헤더 숨기기
        })}
      >
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: "" }}
        />
        <Tab.Screen
          name="TodayHabitStack" // TodayHabitStack을 Tab.Navigator에 연결
          component={TodayHabitStack}
          options={{ title: "" }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{ title: "" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
