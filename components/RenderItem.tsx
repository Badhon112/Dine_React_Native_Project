import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RenderItem = ({
  item,
}: {
  item: {
    name: string;
    seats: number;
    image: string;
    address: string;
    opening: string;
    closing: string;
  };
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/restuarent/${item.name}` as any)}
      className="bg-[#5f5f5f]  max-h-72 max-w-xs flex justify-center items-center rounded-lg p-5 mx-4 shadow-md">
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-36 w-full mt-2 mb-1 rounded-lg"
      />
      <View>
        <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
        <Text className="text-white text-base mb-2">{item.address}</Text>
        <Text className="text-white text-base mb-2">
          Open: {item.opening} - Close {item.closing}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;
