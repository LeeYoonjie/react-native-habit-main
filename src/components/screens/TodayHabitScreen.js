import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

const TodayHabitsScreen = ({ navigation }) => {
  const [today, setToday] = useState(dayjs().format("dd"));
  const [habits, setHabits] = useState([]);

  // Firebase에서 데이터 불러오기
  const fetchHabits = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "habits"));
      const fetchedHabits = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(fetchedHabits);
    } catch (error) {
      console.error("Error fetching habits: ", error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // 오늘의 습관 필터링
  const todayHabits = habits.filter((habit) =>
    habit.days.includes(today)
  );

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.todayText}>오늘은</Text>
        <Text style={styles.dateText}>
          {dayjs().format("MM월 DD일 dddd")}
        </Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 오늘의 습관 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>오늘의 습관</Text>
        <FlatList
          data={todayHabits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.habitContainer}>
              <Text style={styles.habitText}>{item.name}</Text>
              <TouchableOpacity>
                <Ionicons
                  name={item.completed ? "checkbox" : "square-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* 나의 해빗 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>나의 해빗</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddHabit")}
          >
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("EditHabit", { habit: item })}
            >
              <View style={styles.myHabitContainer}>
                <Text style={styles.habitText}>{item.name}</Text>
                <Text style={styles.daysText}>
                  {item.repeat || item.days.join(", ")}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F7F8FC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  todayText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  dateText: { fontSize: 18, color: "#666" },
  notificationIcon: {},

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  habitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#DCDFFF",
    borderRadius: 8,
    marginBottom: 8,
  },
  myHabitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3, // Android
    marginBottom: 8,
  },
  habitText: { fontSize: 16, color: "#333" },
  daysText: { fontSize: 14, color: "#999" },
  addButton: { marginLeft: "auto" },
});

export default TodayHabitsScreen;
