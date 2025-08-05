import { db } from "@/config/fireBaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import RenderItem from "./RenderItem";
import { Restaurant } from "./interface";

const OurRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "restaurants"));
      const res = await getDocs(q);
      res.forEach((item) => {
        setRestaurants((prev) => [...prev, item.data() as Restaurant]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <ActivityIndicator animating color={"#fb9b33"} />
  ) : (
    <>
      <View className="p-4 bg-[#2b2b2b] flex-row items-center">
        <Text className="text-3xl text-[#f49b33] mr-2 font-semibold">
          Our Restaurants
        </Text>
      </View>
      {restaurants.length > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={RenderItem}
          horizontal
          contentContainerStyle={{ padding: 16 }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
        />
      ) : (
        <ActivityIndicator animating color={"#fb9b33"} />
      )}
    </>
  );
};

export default OurRestaurants;
