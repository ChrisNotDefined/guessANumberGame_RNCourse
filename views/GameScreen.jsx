import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Button, Text, Alert } from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";

const GameScreen = (props) => {
  const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const random = Math.floor(Math.random() * (max - min)) + min;

    if (random === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return random;
    }
  };

  const nextGuessHandler = (direction) => {
    // Avoid cheating
    if (
      (direction === "lower" && guess < props.userChoice) ||
      (direction === "greater" && guess > props.userChoice)
    ) {
      Alert.alert("Hey!!!", "Don't cheat!!", [
        { text: "You got me...", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = guess;
    } else {
      currentLow.current = guess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      guess
    );
    setGuess(nextNumber);
    setRounds((actualRounds) => actualRounds + 1);
  };

  const [guess, setGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (guess === userChoice) {
      onGameOver(rounds);
    }
  }, [guess, userChoice, onGameOver]);

  return (
    <View style={styles.screen}>
      <Card style={styles.headingNumberCard}>
        <Text style={styles.cardTitle}>CPU Guess</Text>
        <Card style={styles.numberCard}>
          <Text style={styles.mainTitle}>{guess}</Text>
        </Card>
        <View style={styles.rowButtons}>
          <View style={styles.evenButtonRow}>
            <Button
              title="LOWER"
              color={Colors.primary}
              onPress={nextGuessHandler.bind(this, "lower")}
            ></Button>
          </View>
          <View style={styles.evenButtonRow}>
            <Button
              title="GREATER"
              color={Colors.primary}
              onPress={nextGuessHandler.bind(this, "greater")}
            ></Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    marginHorizontal: 15,
  },
  headingNumberCard: {
    alignSelf: "stretch",
  },
  mainTitle: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  evenButtonRow: {
    width: "40%",
  },
  numberCard: {
    marginVertical: 10,
    alignSelf: 'center'
  },
});

export default GameScreen;
