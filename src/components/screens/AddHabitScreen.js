import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import StartDatePopup from "../components/popups/StartDatePopup";
import EndDatePopup from "../components/popups/EndDatePopup";
import RepeatPopup from "../components/popups/RepeatPopup";
import AlarmPopup from "../components/popups/AlarmPopup";

const AddHabitScreen = ({ navigation }) => {
  const [habitName, setHabitName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeat, setRepeat] = useState("");
  const [alarm, setAlarm] = useState("");
  const [showStartDatePopup, setShowStartDatePopup] = useState(false);
  const [showEndDatePopup, setShowEndDatePopup] = useState(false);
  const [showRepeatPopup, setShowRepeatPopup] = useState(false);
  const [showAlarmPopup, setShowAlarmPopup] = useState(false);

  const saveHabit = async () => {
    try {
      await addDoc(collection(db, "habits"), {
        name: habitName,
        startDate,
        endDate,
        repeat,
        alarm,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error adding habit: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>해빗 등록</Text>
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
      <TouchableOpacity style={styles.saveButton} onPress={saveHabit}>
        <Text style={styles.saveButtonText}>완료</Text>
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
});

export default AddHabitScreen;
