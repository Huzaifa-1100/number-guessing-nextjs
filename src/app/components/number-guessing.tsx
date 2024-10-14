"use client";

// Importing necessary hooks and components from React and custom components
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function NumberGuessingGame(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false); // Game start state
  const [gameOver, setGameOver] = useState<boolean>(false); // Game over state
  const [paused, setPaused] = useState<boolean>(false); // Game pause state
  const [targetNumber, setTargetNumber] = useState<number>(0); // Target number to guess
  const [userGuess, setUserGuess] = useState<number | string>(""); // User's guess
  const [attempts, setAttempts] = useState<number>(0); // Number of attempts

  // useEffect to generate a new target number when the game starts or resumes
  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]); // Dependencies ensure the effect runs only when these values change


  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setPaused(false);
    setAttempts(0);
  };

   // Function to handle pausing the game
  const handlePauseGame = (): void => {
    setPaused(true); // Pause the game
  };

  // Function to handle resuming the game
  const handleResumeGame = (): void => {
    setPaused(false); // Resume the game
  };

  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true); // End the game if the guess is correct
    } else {
      setAttempts(attempts + 1); // Increment the attempt counter
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="relative h-screen w-full"
        src={"/colorbg.gif"}
        alt="bgImage"
        height={500}
        width={500}
      />
      <div className="absolute bg-black bg-opacity-60 border-4 border-red-800 gap-5 md:p-16 rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Number Guessing Game
        </h1>
        <p className="text-center text-white mb-4">
          Try to guess the number between 1 and 5
        </p>
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-white hover:bg-gray-300 text-red-500 text-lg font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-white hover:bg-gray-300 text-red-500 font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-white hover:bg-gray-300 text-red-500 font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-white hover:bg-gray-300 text-red-500 font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-white">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-white">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
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
