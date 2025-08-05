import OurRestaurants from "@/components/OurRestaurants";
import { BlurView } from "expo-blur";
import React from "react";
import {
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const homeBanner = require("../../assets/images/homeBanner.png");
const Home = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b", height: "100%" }}>
      <View className="flex items-center p-3">
        <View className="bg-[#5f5f5f] w-full rounded-lg shadow-lg justify-between px-3 flex flex-col p-2">
          <View className="flex flex-row items-center">
            <Text className="text-base h-10 align-middle text-white">
              Welcome to{" "}
            </Text>
            <Text className="text-xl text-[#f49b33] font-semibold">
              Medimart
            </Text>
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode="cover"
          className="mb-4 bg-[#2b2b2b] w-full h-52 items-center justify-center"
          source={homeBanner}>
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 50}
            className="w-full p-4 shadow-lg"
            tint="dark">
            <Text className="text-center text-3xl font-bold text-white">
              Hello, my container is blurring contents underneath!
            </Text>
          </BlurView>
        </ImageBackground>

        <OurRestaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
