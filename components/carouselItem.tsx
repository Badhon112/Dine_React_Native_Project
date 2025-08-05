import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Dimensions, Image, View } from "react-native";
const CarouselItem = ({ item }: { item: any }) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={{ width: windowWidth - 2 }} className="h-64 relative">
      <View
        style={{
          position: "absolute",
          top: "45%",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: 50,
          padding: 5,
          zIndex: 10,
          right: "6%",
        }}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </View>
      <View>
        <Image
          source={{ uri: item }}
          style={{
            opacity: 0.9,
            backgroundColor: "black",
            marginRight: 20,
            marginLeft: 5,
            borderRadius: 25,
          }}
          className="h-64"
        />
      </View>
    </View>
  );
};

export default CarouselItem;
