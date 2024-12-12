import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import * as ImagePicker from "expo-image-picker";
import dayjs from "dayjs";

const CalendarScreen = () => {
  const [images, setImages] = useState({});
  const today = dayjs().format("YYYY-MM-DD");

  const onDayPress = async (day) => {
    if (day.dateString !== today) {
      Alert.alert("알림", "이미지는 오늘 날짜에만 추가할 수 있습니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => ({
        ...prev,
        [day.dateString]: result.assets[0].uri,
      }));
    }
  };

  const renderDay = (day) => {
    const dateString = day.dateString || day;
    return images[dateString] ? (
      <Image source={{ uri: images[dateString] }} style={styles.dayImage} />
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>12월</Text>
      <Text style={styles.subtitle}>이미지 캘린더</Text>
      <Calendar
        current={today}
        markedDates={{
          [today]: { selected: true, marked: true, selectedColor: "blue" },
        }}
        onDayPress={onDayPress}
        dayComponent={({ date, state }) => (
          <View style={styles.dayContainer}>
            <Text
              style={[
                styles.dayText,
                state === "disabled" ? styles.disabledText : null,
              ]}
            >
              {date.day}
            </Text>
            {renderDay(date.dateString)}
          </View>
        )}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: "#00adf5",
          arrowColor: "blue",
          textDayFontWeight: "600",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
  },
  dayContainer: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  disabledText: {
    color: "#d9d9d9",
  },
  dayImage: {
    width: 32,
    height: 32,
    marginTop: 4,
    borderRadius: 4,
  },
});
export default CalendarScreen;
