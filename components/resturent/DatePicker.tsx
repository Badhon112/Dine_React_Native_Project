import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const DatePicker = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const handlePress = () => {
    setShow(!show);
  };

  const handleTimeChanged = (e: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View className="flex flex-row pl-3">
      <TouchableOpacity
        onPress={handlePress}
        className={`rounded-lg text-white text-base ${Platform.OS === "android" && "px-2 py-1 justify-center bg-[#474747]"}`}>
        {Platform.OS === "android" && (
          <Text className="text-white px-2 py-1">
            {date.toLocaleDateString()}
          </Text>
        )}
        {Platform.OS === "android" && show && (
          <DateTimePicker
            value={date}
            accentColor="#f49b33"
            textColor="#f49b33"
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
            onChange={handleTimeChanged}
          />
        )}
        {Platform.OS === "ios" && (
          <DateTimePicker
            value={date}
            accentColor="#f49b33"
            textColor="#f49b33"
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
            onChange={handleTimeChanged}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;
