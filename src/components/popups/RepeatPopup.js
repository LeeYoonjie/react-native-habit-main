import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RepeatPopup = ({ onClose, onRepeatSelect }) => {
  const [repeatType, setRepeatType] = useState("매일");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const renderWeeklyButtons = () => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return days.map((day) => (
      <TouchableOpacity
        key={day}
        style={[
          styles.dayButton,
          selectedDays.includes(day) && styles.selectedButton,
        ]}
        onPress={() => toggleSelection(day, selectedDays, setSelectedDays)}
      >
        <Text style={styles.dayText}>{day}</Text>
      </TouchableOpacity>
    ));
  };

  const renderMonthlyButtons = () => {
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);
    return dates.map((date) => (
      <TouchableOpacity
        key={date}
        style={[
          styles.dayButton,
          selectedDates.includes(date) && styles.selectedButton,
        ]}
        onPress={() => toggleSelection(date, selectedDates, setSelectedDates)}
      >
        <Text style={styles.dayText}>{date}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>반복</Text>
      <TouchableOpacity onPress={() => setRepeatType("매일")}>
        <Text style={repeatType === "매일" ? styles.selectedText : styles.text}>
          매일
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRepeatType("매주")}>
        <Text style={repeatType === "매주" ? styles.selectedText : styles.text}>
          매주
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRepeatType("매월")}>
        <Text style={repeatType === "매월" ? styles.selectedText : styles.text}>
          매월
        </Text>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        {repeatType === "매주" && renderWeeklyButtons()}
        {repeatType === "매월" && renderMonthlyButtons()}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onRepeatSelect(repeatType, repeatType === "매주" ? selectedDays : selectedDates);
          onClose();
        }}
      >
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Text style={styles.backText}>뒤로</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, marginVertical: 8 },
  selectedText: { fontSize: 16, marginVertical: 8, fontWeight: "bold", color: "blue" },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 16 },
  dayButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 4,
    margin: 4,
    backgroundColor: "#F7F7F7",
  },
  selectedButton: { backgroundColor: "#DCDFFF" },
  dayText: { fontSize: 14 },
  button: {
    backgroundColor: "#DCDFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: { textAlign: "center", fontWeight: "bold" },
  backButton: { marginTop: 16, alignItems: "center" },
  backText: { color: "gray" },
});

export default RepeatPopup;
