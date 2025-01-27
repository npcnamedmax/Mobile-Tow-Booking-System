import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/general/Button";

export default function AnnouncementPage() {
  // Mock data
  const announcement = {
    title: "Announcement title",
    message: "We apologize for any inconvenience caused.",
    dateTime: new Date().toLocaleString(),
    adminId: "admin1",
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Announcement Details" }} />

      {/* Title Section */}
      <View style={styles.editableContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Title</Text>
          <MaterialIcons name="edit" size={20} color="#777" />
        </View>
        <Text style={styles.text}>{announcement.title}</Text>
      </View>

      {/* Message Section */}
      <View style={[styles.editableContainer, styles.messageContainer]}>
        <View style={styles.messageHeader}>
          <Text style={styles.label}>Message</Text>
          <MaterialIcons name="edit" size={20} color="#777" />
        </View>
        <Text style={[styles.text, styles.messageText]}>{announcement.message}</Text>
      </View>
      <Button pressableStyle={{backgroundColor: '#007BFF'}} textStyle={{color: 'white'}}>Update Announcement</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  editableContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
    lineHeight: 22,
  },
  messageContainer: {
    flex: 1, // Takes up all available space
    justifyContent: "flex-start",
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  messageText: {
    flex: 1,
    textAlign: "left",
  },
});
