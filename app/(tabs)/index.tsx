import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth()
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen</Text>
      <Link href="/add-habit">Login Page</Link>
      <Button onPress={signOut} mode="text" icon="logout">Sign Out</Button>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
