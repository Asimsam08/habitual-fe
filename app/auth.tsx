import HabitualLogo from "@/components/HabitualLogo";
import { useAuth } from "@/lib/auth-context";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const theme = useTheme();
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all the fields");
      return;
    }

    if (password.length < 6) {
      setError("Passwords must at least 6 characters long");
      return;
    }
    setError(null);

    if (isSignUp) {
      const error = await signUp(email, password);

      if (error) {
        setError(error);
      }
    } else {
      const error = await signIn(email, password);

      if (error) {
        setError(error);
      } else {
        router.replace("/");
      }
    }
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={{ marginBottom: 34 }}>
          {" "}
          <HabitualLogo />
        </View>

        <Text style={styles.title} variant="headlineSmall">
          {" "}
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>
        <TextInput
          style={styles.input}
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          mode="outlined"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        <Button
          mode="text"
          style={styles.swtichModeButton}
          onPress={handleSwitchMode}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#674FA4",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  swtichModeButton: {
    marginTop: 16,
  },
});
