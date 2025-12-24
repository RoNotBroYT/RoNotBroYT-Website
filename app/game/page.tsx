"use client";
import { useRef, useState, useEffect } from "react";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 200;
const GROUND_Y = 160;
const DINO_SIZE = 20;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 20;
const GRAVITY = 0.5;
const JUMP_POWER = 12;

interface GameState {
  dinoY: number;
  dinoVelY: number;
  isJumping: boolean;
  obstacles: Array<{ x: number; id: number; height: number; isTop: boolean }>;
  score: number;
  gameOver: boolean;
}

export default function DinoRun() {
  const [gameState, setGameState] = useState<GameState>({
    dinoY: GROUND_Y,
    dinoVelY: 0,
    isJumping: false,
    obstacles: [],
    score: 0,
    gameOver: false,
  });
  const [started, setStarted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastObstacleTimeRef = useRef<number>(0);
  const obstacleIdRef = useRef(0);
  const gameLoopCountRef = useRef(0);

  function handleJump() {
    if (!started) setStarted(true);
    if (!gameState.gameOver && !gameState.isJumping && gameState.dinoY >= GROUND_Y - 2) {
      setGameState((prev) => ({
        ...prev,
        dinoVelY: -JUMP_POWER,
        isJumping: true,
      }));
    }
  }

  useEffect(() => {
    if (!started || gameState.gameOver) return;

    function loop() {
      setGameState((prev) => {
        // Update velocity with gravity
        let newVelY = prev.dinoVelY + GRAVITY;
        let newY = prev.dinoY + newVelY;

        // Land on ground
        let isJumping = true;
        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          newVelY = 0;
          isJumping = false;
        }

        // Move obstacles
        const updatedObstacles = prev.obstacles
          .map((o) => ({ ...o, x: o.x - 6 }))
          .filter((o) => o.x > -OBSTACLE_WIDTH);

        // Spawn obstacles - spawn every ~50 frames (at ~60fps = ~0.8 seconds)
        gameLoopCountRef.current++;
        if (gameLoopCountRef.current % 50 === 0) {
          // Randomly choose obstacle type
          const rand = Math.random();
          let height: number;
          let isTop: boolean;
          
          if (rand < 0.33) {
            // Short obstacle (jump over) - 40px from ground
            height = 40;
            isTop = false;
          } else if (rand < 0.66) {
            // Tall obstacle from top (duck under) - leaves 50px gap at bottom
            height = GAME_HEIGHT - 50;
            isTop = true;
          } else {
            // Medium obstacle (jump over) - 55px from ground
            height = 55;
            isTop = false;
          }
          
          updatedObstacles.push({ 
            x: GAME_WIDTH, 
            id: obstacleIdRef.current++, 
            height,
            isTop
          });
          console.log("Spawned obstacle, total:", updatedObstacles.length);
        }
        
        // Debug: log obstacles every 30 frames
        if (gameLoopCountRef.current % 30 === 0) {
          console.log("Obstacles:", updatedObstacles);
        }

        // Check collision
        let gameOver = false;
        for (const obs of updatedObstacles) {
          // Check horizontal overlap
          if (50 + DINO_SIZE > obs.x && 50 < obs.x + OBSTACLE_WIDTH) {
            // For bottom obstacles: check if dino hits it
            if (!obs.isTop && newY + DINO_SIZE > GROUND_Y - obs.height) {
              gameOver = true;
              break;
            }
            // For top obstacles: check if dino hits it from below
            if (obs.isTop && newY < obs.height) {
              gameOver = true;
              break;
            }
          }
        }

        return {
          ...prev,
          dinoY: newY,
          dinoVelY: newVelY,
          isJumping,
          obstacles: updatedObstacles,
          score: prev.score + 1,
          gameOver,
        };
      });

      animationRef.current = requestAnimationFrame(loop);
    }

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [started, gameState.gameOver]);

  function restart() {
    setGameState({
      dinoY: GROUND_Y,
      dinoVelY: 0,
      isJumping: false,
      obstacles: [],
      score: 0,
      gameOver: false,
    });
    setStarted(false);
    lastObstacleTimeRef.current = 0;
    obstacleIdRef.current = 0;
    gameLoopCountRef.current = 0;
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.key === "ArrowUp") {
        handleJump();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameState.gameOver, gameState.isJumping, gameState.dinoY]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">Christmas Dino Run</h2>
      <div
        className="relative border-2 border-green-400 bg-green-50 dark:bg-green-900 rounded-lg overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onClick={handleJump}
      >
        {/* Dino */}
        <div
          className="absolute bg-green-600 rounded"
          style={{
            left: 50,
            top: gameState.dinoY,
            width: DINO_SIZE,
            height: DINO_SIZE,
          }}
        />
        {/* Obstacles */}
        {gameState.obstacles.map((o) => (
          <div
            key={o.id}
            className="absolute rounded z-20"
            style={{
              left: o.x,
              top: o.isTop ? 0 : GROUND_Y - o.height,
              width: OBSTACLE_WIDTH,
              height: o.height,
              backgroundColor: o.isTop ? "#ff6b6b" : "#ef4444",
            }}
          />
        ))}
        {/* Ground */}
        <div
          className="absolute left-0 w-full bg-green-700"
          style={{ top: GROUND_Y + DINO_SIZE, height: 8 }}
        />
        {/* Score */}
        <div className="absolute left-2 top-2 text-lg font-bold text-green-800 dark:text-green-300">
          {gameState.score}
        </div>
        {/* Game Over */}
        {gameState.gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-green-950/80 z-10">
            <div className="text-lg font-semibold text-pink-600 mb-2">Game Over!</div>
            <button
              onClick={restart}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 mt-2"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-zinc-500 text-sm text-center max-w-xs">
        Tap or press space/arro w up to jump. Avoid the obstacles!
      </p>
    </div>
  );
}
