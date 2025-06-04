import { Habit } from "@/types/database.type"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"
import { Surface, Text } from "react-native-paper"

const habitsCard = ({habits, key}: {habits:Habit, key:string})=>{
    return(

        <Surface key={key} style={styles.card} elevation={0}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{habits.title}</Text>
                    <Text style={styles.cardDescription}>
                      {habits.description}
                    </Text>

                    <View style={styles.cardFooter}>
                      <View style={styles.streakBadge}>
                        <MaterialCommunityIcons
                          name="fire"
                          size={18}
                          color="#ff9800"
                        />
                        <Text style={styles.streakText}>
                          {habits.streak_count} day streak
                        </Text>
                      </View>
                      <View style={styles.frequencyBadge}>
                        <Text style={styles.frequencyText}>
                          {habits.frequency.charAt(0).toUpperCase() +
                            habits.frequency.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Surface>

    )
}

export default habitsCard

const styles = StyleSheet.create({
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
   title: {
    fontWeight: "bold",
    marginBottom : 16,
    textAlign : "center",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 4,
    color: "ff9800",
    fontSize: 14,
    fontWeight: "bold",
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  frequencyText: {
    marginLeft: 4,
    color: "#7c4dff",
    fontSize: 14,
    fontWeight: "bold",
  },
})

