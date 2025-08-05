// import CarouselItem from "@/components/carouselItem";
import { db } from "@/config/fireBaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const restuarents = () => {
  const { restuarents } = useLocalSearchParams();
  const [resturentsData, setResturentsData] = useState<any>({});
  const [carouselData, setCarouselData] = useState<any>([]);
  const [slotData, setSlotData] = useState({});
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef?.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
    if (currentIndex === carouselLength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef?.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handleprevImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef?.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
    if (currentIndex === 0) {
      const prevIndex = carouselLength - 1;
      setCurrentIndex(prevIndex);
      flatListRef?.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

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
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color="white"
          />
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
        <View
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            transform: [{ translateX: -50 }],
            zIndex: 10,
            bottom: 15,
          }}>
          {carouselData[0].images.map((_: any, index: number) => {
            return (
              <View
                key={index}
                className={`bg-white size-2 ${index === currentIndex && "size-3"} p-1 mx-1 rounded-full`}
              />
            );
          })}
        </View>
        <View
          style={{
            position: "absolute",
            top: "45%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "6%",
          }}>
          <Ionicons
            onPress={handleprevImage}
            name="arrow-back"
            size={24}
            color="white"
          />
        </View>
      </View>
    );
  };

  const init = async () => {
    try {
      setLoading(true);
      const resturentsQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restuarents)
      );
      const resturentSnapshot = await getDocs(resturentsQuery);
      if (resturentSnapshot.empty) {
        console.log("No Data Found");
        return;
      }
      for (const doc of resturentSnapshot.docs) {
        const restuarentData = doc.data();
        setResturentsData(restuarentData);

        // ------------------------
        // ________________________

        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", doc.ref)
        );

        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages: any = [];
        if (carouselSnapshot.empty) {
          console.log("No Data Found on carouselSnapshot");
          return;
        }
        carouselSnapshot.forEach((carouselDoc) => {
          carouselImages.push(carouselDoc.data());
        });
        setCarouselData(carouselImages);

        //________________________
        //------------------------

        const slotQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", doc.ref)
        );
        const slotsSnapshot = await getDocs(slotQuery);
        const slots: any = [];
        if (slotsSnapshot.empty) {
          console.log("No Data Found on slots Snapshot");
          return;
        }
        slotsSnapshot.forEach((slotDoc) => {
          slots.push(slotDoc.data());
        });
        setSlotData(slots);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = () => {};

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b", height: "100%" },
        Platform.OS === "android" && { paddingBottom: 55 },
        Platform.OS === "ios" && { paddingBottom: 20 },
      ]}>
      <ActivityIndicator animating color={"#fb9b33"} />
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS === "android" && { paddingBottom: 55 },
        Platform.OS === "ios" && { paddingBottom: 20 },
      ]}>
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl text-[#f49b33] mr-2 font-semibold">
            {restuarents}
          </Text>
          <View className="border-b border-[#f49b33]" />
        </View>
        <View className="h-64  max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={CarouselItem}
            horizontal
            scrollEnabled={true}
            style={{ borderRadius: 25 }}
          />
        </View>
        <View className="flex-1 flex-row items-center mt-2 p-2">
          <Ionicons size={24} name="location-sharp" color={"#f49b33"} />
          <Text className="max-w-[75%] text-white">
            {resturentsData && resturentsData?.address} |{" "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center text-[#f49b33] italic font-semibold">
              Get Direction
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default restuarents;
