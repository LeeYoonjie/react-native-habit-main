import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

const StartDatePopup = ({ onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>시작 날짜</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#DCDFFF",
          },
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onDateSelect(selectedDate);
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  button: {
    backgroundColor: "#DCDFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: { textAlign: "center", fontWeight: "bold" },
  backButton: {
    marginTop: 16,
    alignItems: "center",
  },
  backText: { color: "gray" },
});

export default StartDatePopup;