import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.headingCard}>
        <Text style={styles.cardTitle}>GAME OVER!</Text>
        <Text style={styles.cardSubtitle}>Rounds: {props.roundsTaken}</Text>
        <View style={styles.cardButton}>
          <Button title="New Game" color={Colors.accent} onPress={props.onRestart}></Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  headingCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  cardTitle: {
    fontSize: 16*1.5,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 10*1.5,
    marginTop: 10
  },
  cardButton: {
    marginTop: 15,
  },
});

export default GameOverScreen;
