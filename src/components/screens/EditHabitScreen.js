import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import StartDatePopup from "../../components/popups/StartDatePopup";
import EndDatePopup from "../../components/popups/EndDatePopup";
import RepeatPopup from "../../components/popups/RepeatPopup";
import AlarmPopup from "../../components/popups/AlarmPopup";
import { Ionicons } from "@expo/vector-icons";

const EditHabitScreen = ({ route, navigation }) => {
  const { habit } = route.params;

  const [habitName, setHabitName] = useState(habit.name);
  const [startDate, setStartDate] = useState(habit.startDate);
  const [endDate, setEndDate] = useState(habit.endDate);
  const [repeat, setRepeat] = useState(habit.repeat);
  const [alarm, setAlarm] = useState(habit.alarm);
  const [showStartDatePopup, setShowStartDatePopup] = useState(false);
  const [showEndDatePopup, setShowEndDatePopup] = useState(false);
  const [showRepeatPopup, setShowRepeatPopup] = useState(false);
  const [showAlarmPopup, setShowAlarmPopup] = useState(false);

  const db = getFirestore();
  const auth = getAuth();

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not logged in");
        return;
      }

      // Update the habit in Firestore under the logged-in user's habits collection
      await updateDoc(doc(db, `users/${user.uid}/habits`, habit.id), {
        name: habitName,
        startDate,
        endDate,
        repeat,
        alarm,
      });
      Alert.alert("성공", "습관이 수정되었습니다!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating habit: ", error);
      Alert.alert("오류", "습관을 수정할 수 없습니다.");
    }
  };

  const handleDelete = async () => {
    Alert.alert("삭제 확인", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            const user = auth.currentUser;
            if (!user) {
              console.error("User is not logged in");
              return;
            }

            // Delete the habit from Firestore under the logged-in user's habits collection
            await deleteDoc(doc(db, `users/${user.uid}/habits`, habit.id));
            Alert.alert("성공", "습관이 삭제되었습니다!");
            navigation.goBack();
          } catch (error) {
            console.error("Error deleting habit: ", error);
            Alert.alert("오류", "습관을 삭제할 수 없습니다.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>해빗 수정</Text>

      {/* Habit name */}
      <TouchableOpacity style={styles.optionRow}>
        <TextInput
          style={styles.input}
          placeholder="습관 제목"
          value={habitName}
          onChangeText={setHabitName}
        />
      </TouchableOpacity>

      {/* Start date */}
      <TouchableOpacity style={styles.optionRow} onPress={() => setShowStartDatePopup(true)}>
        <Text style={styles.optionLabel}>시작 날짜</Text>
        <Text style={styles.optionValue}>{startDate || "없음"}</Text>
      </TouchableOpacity>

      {/* End date */}
      <TouchableOpacity style={styles.optionRow} onPress={() => setShowEndDatePopup(true)}>
        <Text style={styles.optionLabel}>종료 날짜</Text>
        <Text style={styles.optionValue}>{endDate || "없음"}</Text>
      </TouchableOpacity>

      {/* Repeat */}
      <TouchableOpacity style={styles.optionRow} onPress={() => setShowRepeatPopup(true)}>
        <Text style={styles.optionLabel}>반복</Text>
        <Text style={styles.optionValue}>
          {Array.isArray(repeat) && repeat.length > 0 ? `매주: ${repeat.join(" ")}` : "없음"}
        </Text>
      </TouchableOpacity>

      {/* Alarm */}
      <TouchableOpacity style={styles.optionRow} onPress={() => setShowAlarmPopup(true)}>
        <Text style={styles.optionLabel}>알람 시간</Text>
        <Text style={styles.optionValue}>{alarm || "없음"}</Text>
      </TouchableOpacity>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>완료</Text>
      </TouchableOpacity>

      {/* Delete button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>

      {/* Popups */}
      {showStartDatePopup && (
        <StartDatePopup onClose={() => setShowStartDatePopup(false)} onDateSelect={setStartDate} />
      )}
      {showEndDatePopup && (
        <EndDatePopup onClose={() => setShowEndDatePopup(false)} onDateSelect={setEndDate} />
      )}
      {showRepeatPopup && (
        <RepeatPopup onClose={() => setShowRepeatPopup(false)} onRepeatSelect={setRepeat} />
      )}
      {showAlarmPopup && (
        <AlarmPopup
          onClose={() => setShowAlarmPopup(false)}
          onAlarmSelect={(alarmData) => {
            const alarmText = `${alarmData.period} ${alarmData.hour}:${alarmData.minute}`;
            setAlarm(alarmText);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F7F8FC" },
  backButton: { marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, marginTop: 40 },
  input: { fontSize: 16, color: "#333" },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  optionLabel: { fontSize: 16, color: "#333" },
  optionValue: { fontSize: 16, color: "#8A8787" },
  saveButton: {
    backgroundColor: "#DCDFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#DCDFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: "white",
  },
  deleteButtonText: { textAlign: "center", fontWeight: "bold", color: "red", fontSize: 16 },
});

export default EditHabitScreen;