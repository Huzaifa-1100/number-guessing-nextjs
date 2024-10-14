"use client";

// Importing necessay hooks and components from react and custom componensts

// Type definitions for the number guessing  Component function  components
interface NumberGuessingState {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function NumberGuessingGame(): JSX.Element {
  // state variable to manage the game state
  const [gameStarted, setGameStarted] = useState<boolean>(false); // indicates if game started
  const [gameOver, setGameOver] = useState<boolean>(false); // indicates if game is over
  const [paused, setPaused] = useState<boolean>(false); // indicates if game is paused
  const [targetNumber, setTargetNumber] = useState<number>(0); // the number to be guessed
  const [userGuess, setUserGuess] = useState<number | string>(""); // The user's guess (can be a number or an empty string)
  const [attempts, setAttempts] = useState<number>(0); // Number of attempts made by the user

  // useEffect to generate a new target number when the game starts and resume..
  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 5) + 1; // geenrate a random number between 1 and 5
      setTargetNumber(randomNumber); // set the target number
    }
    [gameStarted, paused]; // Dependicies  gameStarted and paused
  });

  // Function to handle the start of the game
  const handleStartGame = () => {
    setGameStarted(true); // Start the game
    setGameOver(false); // Reset the game over state
    setPaused(false); //ensure the game isnot paused
    setAttempts(0); // reset the attempt counter
  };

  // Functon to handle pausing the game
  const handlePauseGame = () => {
    setPaused(true); // Toggle the paused state
  };

  // Function to handleresuming the game
  const handleResumeGame = () => {
    setPaused(false); // Toggle the paused state
  };

  // Function to handle the user's guess
  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true); // if the guess is correct end the game
    }else{
      setAttempts(attempts + 1); // increment the attempt counter
    }
  };

  // function to handle restaring the game
  const handleTryagain = (): void => {
    setGameStarted(false); //reset the game state
    setGameOver(false); // Reset the game over state
    setUserGuess(""); // clear the user guess
    setAttempts(0); // reset the attempt counter
  };

  // Function to handle input change for user's guess
  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };
  return (
    <div className="flex flex-col items-center justify-center  ">
      <Image
      className="relative h-screen w-full"
      src={"/colorbg.gif"}
      alt="bgImage"
      height={500}
      width={500}
      />
      {/* Main container for the bame */}
      <div className="absolute bg-black bg-opacity-60 border-4 border-red-800 gap-5 md:p-16 rounded-lg shadow-lg p-8 w-full max-w-2xl ">
        {/* Title of the game */}
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Number Guessing Game
        </h1>
        {/* Description of the game */}
        <p className="text-center text-white mb-4">
          Try to guess the number between 1 and 5
        </p>
        {/* Conditional rendering show start button if game has not started*/}
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            {/* Button  to start the game */}
            <Button
              onClick={handleStartGame}
              className="bg-white hover:bg-gray-300 text-red-500 text-lg font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {/* Conditional rendering show the jgame controls if game started and not over */}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {/* Button to resume the game if paused */}
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-white hover:bg-gray-300 text-red-500 font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                /* Button to pause the game */
                <Button
                  onClick={handlePauseGame}
                  className="bg-white hover:bg-gray-300 text-red-500 font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-4">
              {/* Input Field for user's guess */}
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              {/* Button to submit the guess */}
              <Button
              onClick={handleGuess}
              className="bg-white hover:bg-gray-300 text-red-500 font-bold py-2 px-4 rounded ml-4 ">
                Guess
              </Button>
            </div>
            <div className="text-center text-white">
              {/* Dispaly number of attempts */}
              <p>Attempts: {attempts}</p>
              
            </div>
          </div>
        )}
        {/* conditional rendering show tame over message if game is over */}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-white">
              {/* Game over message */}
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>Yout guessed the number in {attempts} attempt.</p>
            </div>
            <div className="flex justify-center">
              {/* Button to ryt the game again */}
              <Button
              onClick={handleTryagain}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
