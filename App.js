import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './views/StartGameScreen';
import GameScreen from './views/GameScreen';
import GameOverScreen from './views/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  StatusBar.setBarStyle('light-content');

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let Content = <StartGameScreen onStartGame = {startGameHandler}/>

  if(userNumber && guessRounds <= 0) {
    Content = <GameScreen userChoice = {userNumber} onGameOver={gameOverHandler}/>
  } else if(guessRounds > 0) {
    Content = <GameOverScreen roundsTaken = {guessRounds} onRestart = {configureNewGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {Content}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
