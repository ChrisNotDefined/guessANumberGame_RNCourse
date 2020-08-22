import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosen = parseInt(enteredValue);
    if (isNaN(chosen) || chosen <= 0 || chosen > 99) {
      Alert.alert(
        "Invalid Number!",
        "Your number needs to be between 1 and 99",
        [{ text: "OK", style: "default", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNum(chosen);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  const beginGameHandler = () => {
    props.onStartGame(selectedNum);
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.selectedCard}>
        <Text style={styles.mainTitle}>Number</Text>
        <Card style={styles.headingNumberCard}>
          <Text
            style={{ ...styles.mainTitle, fontSize: 35, marginVertical: 0 }}
          >
            {selectedNum}
          </Text>
        </Card>
        <View style={{ ...styles.bigButton, marginTop: 20 }}>
          <Button
            title="BEGIN!!"
            color={Colors.accent}
            onPress={beginGameHandler}
          ></Button>
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.mainTitle}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.title}>Select a number</Text>
          <View style={styles.textInputContainer}>
            <View style={styles.textInput}>
              <Input
                textAlign="center"
                keyboardType="numeric"
                blurOnSubmit
                selectionColor = {Colors.accent}
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonsInContainer}>
              <Button
                color={Colors.seccondary}
                title="Reset"
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.buttonsInContainer}>
              <Button
                color={Colors.primary}
                title="Confirm"
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "stretch",
    marginHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  buttonsInContainer: {
    width: "45%",
  },
  inputContainer: {
    alignSelf: "stretch",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 25,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInputContainer: {
    alignSelf: "center"
  },
  textInput: {
    backgroundColor: "white",
    elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10
  },
  selectedCard: {
    marginVertical: 50,
    alignItems: "stretch",
  },
  headingNumberCard: {
    alignSelf: "center",
  },
  bigButton: {},
});

export default StartGameScreen;
