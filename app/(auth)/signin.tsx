import { validationSchema } from "@/utils/authSchema";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const logo = require("../../assets/images/logo.png");
const SignIn = () => {
  const router = useRouter();
  const handleSignIn = () => {};
  return (
    <SafeAreaView className="bg-[#2b2b2b]">
      {/* <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} /> */}
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 230, height: 230 }} />
          <Text className="text-lg text-center text-white font-bold mb-10">
            Let's get you started
          </Text>
        </View>
        <View className="w-5/6 mx-auto">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View className="w-full text-white">
                <Text className="text-white py-2">Email</Text>
                <TextInput
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  className="border-2 border-[#f49b33] bg-white text-black pl-2.5 rounded-md"
                  placeholder="Enter Your Email"
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 text-xs mb-2">
                    {errors.email}
                  </Text>
                )}
                <Text className="text-white py-2 mt-4">password</Text>
                <TextInput
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  className="border-2 border-[#f49b33] bg-white text-black pl-2.5 rounded-md"
                  placeholder="Enter Your password"
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500 text-xs mb-2">
                    {errors.password}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  className="p-2 my-2 bg-[#f49b33] text-black rounded-lg mt-10">
                  <Text className="text-xl font-semibold text-center">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
        <TouchableOpacity
          className="flex flex-row items-center text-center justify-center"
          onPress={() => router.push("/signup" as any)}>
          <Text className="text-white font-semibold">New User?</Text>
          <Text className="text-base font-semibold underline text-[#f49b33] pl-2">
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text className="text-center text-base font-semibold my-4  text-white">
          <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
          or
          <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/Home")}
          className="flex flex-row justify-center mt-5 p-2 items-center">
          <Text className="text-white font-semibold">Be a</Text>
          <Text className="text-base font-semibold underline text-[#f49b33] pl-2">
            guest user
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
