import ProfileHeader from "@/components/header/ProfileHeader";
import AnnHeader from "@/components/header/AnnHeader";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { LinkButton } from "@/components/general/LinkButton";
import Button from "@/components/general/Button";
import { useAuth } from "@/providers/AuthProvider";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerIcons}>
              <ProfileHeader />
              <AnnHeader />
            </View>
          ),
          headerShown: true,
          title: "Dashboard",
        }}
      />
      <Text style={styles.title}>Welcome to the Dashboard</Text>
      <View style={styles.menuContainer}>
        
        <LinkButton href="/request" pressableStyle={styles.linkButton}>
          View All Requests
        </LinkButton>
        <LinkButton href="/invoices" pressableStyle={styles.linkButton}>
          Manage User Accounts
        </LinkButton>
        <LinkButton href="/invoices" pressableStyle={styles.linkButton}>
          Pending Driver Registrations
        </LinkButton>
        <Button onPress={signOut} pressableStyle={styles.signOutButton}>
          Sign Out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  linkButton: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  linkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: "#FF4D4F",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

