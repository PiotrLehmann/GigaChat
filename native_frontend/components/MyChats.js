import { View, Text, Pressable } from "native-base";
import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";

const MyChats = () => {
  // const addStorage = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user/login",
  //       { email: "test@signup.co", password: "1234" },
  //       config
  //     );

  //     await AsyncStorage.setItem("LoggedUserEmail", JSON.stringify(data.email));
  //     await AsyncStorage.setItem("LoggedUserName", JSON.stringify(data.name));

  //     alert("Data successfully saved");
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // };

  // const clearStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     alert("Storage successfully cleared!");
  //   } catch (e) {
  //     alert("Failed to clear the async storage.");
  //   }
  // };

  // const consoleEmail = async () => {
  //   const value = await AsyncStorage.getItem("LoggedUserEmail");

  //   alert(value);

  //   console.log("LoggedUserEmail");
  // };

  // const consoleName = async () => {
  //   const value = await AsyncStorage.getItem("LoggedUserName");

  //   alert(value);

  //   console.log("LoggedUserEmail");
  // };

  const [username, setUsername] = useState("");

  const showName = async () => {
    setUsername(await AsyncStorage.getItem("LoggedUserName"));
    // setUsername(username.slice(1, -1));
  };

  // console.log(username);
  return (
    <View style={styles.container}>
      <Pressable onPress={showName} style={styles.button}>
        <Text style={styles.buttonText}>Show my name</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>{username}</Text>
      </Pressable>
      {/* <View style={styles.header}>
        <Text style={styles.title}>AsyncStorage React Native</Text>
      </View>
      <View style={styles.panel}>

        <Text style={styles.text}>Testing</Text>

        <Pressable onPress={addStorage} style={styles.button}>
          <Text style={styles.buttonText}>Add Storage</Text>
        </Pressable>

        <Pressable onPress={clearStorage} style={styles.button}>
          <Text style={styles.buttonText}>Clear Storage</Text>
        </Pressable>

        <Pressable onPress={consoleEmail} style={styles.button}>
          <Text style={styles.buttonText}>Console Email</Text>
        </Pressable>

        <Pressable onPress={consoleName} style={styles.button}>
          <Text style={styles.buttonText}>Console Name</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default MyChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: "#dcdcdc",
    paddingTop: 48,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
  },
  panel: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    paddingTop: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "#444",
  },
});
