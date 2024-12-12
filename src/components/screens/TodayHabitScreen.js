import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한글 로케일 추가

const TodayHabitScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const today = dayjs().format("ddd"); // 오늘 요일 (예: Mon, Tue)

  // Firebase에서 데이터 가져오는 함수
  const fetchHabits = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "habits"));
      const fetchedHabits = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Habits: ", fetchedHabits);
      setHabits(fetchedHabits);
    } catch (error) {
      console.error("Error fetching habits: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Fetching habits...");
      fetchHabits();
    });
    return unsubscribe;
  }, [navigation]);

  // 오늘의 습관 필터링
  const todayHabits = habits.filter((habit) => habit.repeat.includes(today));

  // 체크박스 상태 업데이트 함수
  const toggleHabitCompletion = async (habit) => {
    try {
      const updatedHabits = habits.map((h) =>
        h.id === habit.id ? { ...h, completed: !h.completed } : h
      );
      setHabits(updatedHabits);

      const habitRef = doc(db, "habits", habit.id);
      await updateDoc(habitRef, { completed: !habit.completed });
    } catch (error) {
      console.error("Error updating habit: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.todayText}>오늘은</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{dayjs().format("MM월 DD일")}</Text>
          <Text style={styles.dayText}>{dayjs().format("ddd요일")}</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 오늘의 습관 섹션 */}
      <View style={styles.section}>
        <FlatList
          data={todayHabits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.habitContainer}>
              <Text style={styles.habitText}>{item.name}</Text>
              <TouchableOpacity onPress={() => toggleHabitCompletion(item)}>
                <Ionicons
                  name={item.completed ? "checkbox" : "square-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text>오늘의 습관이 없습니다.</Text>} // 데이터가 없을 경우 표시
        />
      </View>

      <View style={styles.divider} />

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
          renderItem={({ item }) => {
            // item.repeat이 문자열일 경우 배열로 변환
            const repeatDays =
              typeof item.repeat === "string" ? item.repeat.split(",") : item.repeat;

            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("EditHabit", { habit: item })}
              >
                <View style={styles.myHabitContainer}>
                  <Text style={styles.habitText}>{item.name}</Text>
                  <Text style={styles.daysText}>{repeatDays.join(", ")}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F2F4FC" },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 40,
    paddingHorizontal: 0,
  },
  todayText: { fontSize: 18, fontWeight: "bold", color: "#666", marginTop: 20,},
  dateContainer: { flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 0,},
  dateText: { fontSize: 20, fontWeight: "bold", color: "#000", marginTop: 20, },
  dayText: { fontSize: 14, color: "#666", marginLeft: 8, marginTop: 20, },
  notificationIcon: {},
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
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
    elevation: 3,
    marginBottom: 8,
  },
  habitText: { fontSize: 16, color: "#333" },
  daysText: { fontSize: 14, color: "#999" },
  addButton: { marginLeft: "auto" },
});

export default TodayHabitScreen;