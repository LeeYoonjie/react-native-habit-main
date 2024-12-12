import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AlarmPopup = ({ onClose, onAlarmSelect }) => {
  const [period, setPeriod] = useState("오전");
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);

  const isComplete = period && hour !== null && minute !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알람</Text>
      <View style={styles.options}>
        {["오전", "오후"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.optionButton,
              period === p && styles.selectedButton,
            ]}
            onPress={() => setPeriod(p)}
          >
            <Text style={styles.optionText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.options}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
          <TouchableOpacity
            key={h}
            style={[
              styles.optionButton,
              hour === h && styles.selectedButton,
            ]}
            onPress={() => setHour(h)}
          >
            <Text style={styles.optionText}>{h}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.options}>
        {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.optionButton,
              minute === m && styles.selectedButton,
            ]}
            onPress={() => setMinute(m)}
          >
            <Text style={styles.optionText}>{m.toString().padStart(2, "0")}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, !isComplete && styles.disabledButton]}
        onPress={() => {
          if (isComplete) {
            onAlarmSelect({ period, hour, minute });
            onClose();
          }
        }}
        disabled={!isComplete}
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
  options: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  optionButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 4,
    margin: 4,
    backgroundColor: "#F7F7F7",
  },
  selectedButton: { backgroundColor: "#DCDFFF" },
  optionText: { fontSize: 14 },
  button: {
    backgroundColor: "#DCDFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  disabledButton: { backgroundColor: "#E0E0E0" },
  buttonText: { textAlign: "center", fontWeight: "bold" },
  backButton: { marginTop: 16, alignItems: "center" },
  backText: { color: "gray" },
});

export default AlarmPopup;
