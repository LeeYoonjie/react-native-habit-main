import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { db } from "../config/firebaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import StartDatePopup from "../components/popups/StartDatePopup";
import EndDatePopup from "../components/popups/EndDatePopup";
import RepeatPopup from "../components/popups/RepeatPopup";
import AlarmPopup from "../components/popups/AlarmPopup";

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

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "habits", habit.id), {
        name: habitName,
        startDate,
        endDate,
        repeat,
        alarm,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error updating habit: ", error);
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
            await deleteDoc(doc(db, "habits", habit.id));
            navigation.goBack();
          } catch (error) {
            console.error("Error deleting habit: ", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>해빗 수정</Text>
      <TextInput
        style={styles.input}
        placeholder="습관 제목"
        value={habitName}
        onChangeText={setHabitName}
      />
      <TouchableOpacity
        style={styles.option}
        onPress={() => setShowStartDatePopup(true)}
      >
        <Text style={styles.optionText}>
          시작 날짜: {startDate || "없음"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setShowEndDatePopup(true)}
      >
        <Text style={styles.optionText}>
          종료 날짜: {endDate || "없음"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setShowRepeatPopup(true)}
      >
        <Text style={styles.optionText}>
          반복: {repeat || "없음"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setShowAlarmPopup(true)}
      >
        <Text style={styles.optionText}>
          알람 시간: {alarm || "없음"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>완료</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>

      {/* 팝업 창 */}
      {showStartDatePopup && (
        <StartDatePopup
          onClose={() => setShowStartDatePopup(false)}
          onDateSelect={setStartDate}
        />
      )}
      {showEndDatePopup && (
        <EndDatePopup
          onClose={() => setShowEndDatePopup(false)}
          onDateSelect={setEndDate}
        />
      )}
      {showRepeatPopup && (
        <RepeatPopup
          onClose={() => setShowRepeatPopup(false)}
          onRepeatSelect={setRepeat}
        />
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginBottom: 16 },
  option: {
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
  optionText: { fontSize: 16 },
  saveButton: {
    backgroundColor: "#DCDFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: { textAlign: "center", fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#FFCDD2",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteButtonText: { textAlign: "center", fontWeight: "bold", color: "red" },
});

export default EditHabitScreen;
