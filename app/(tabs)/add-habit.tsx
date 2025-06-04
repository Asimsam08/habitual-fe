import HabitualLogo from "@/components/HabitualLogo";
import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];
const AddHabitScreen = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [frequency, setFrequncy] = useState<Frequency>("daily");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    try {
      await databases.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return error.message;
      }

      return "There was error creating habit";
    }

    router.push("/");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ alignItems: "flex-start" }}>
        <HabitualLogo isText={false} />
      </View>

      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Add Habbit
        </Text>

        <TextInput
          label="Title"
          mode="outlined"
          style={styles.input}
          onChangeText={setTitle}
        />
        <TextInput
          label="Title"
          mode="outlined"
          style={styles.input}
          onChangeText={setDescription}
        />
        <View style={styles.frequencyContainer}>
          <SegmentedButtons
            buttons={FREQUENCIES.map((freq) => ({
              value: freq,
              label: freq.charAt(0).toUpperCase() + freq.slice(1),
            }))}
            onValueChange={(value) => setFrequncy(value)}
            value={frequency}
          />
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleSubmit}
          disabled={!title || !description}
        >
          Add Habit
        </Button>
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddHabitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "f5f5f5",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
