import { useState, useEffect } from 'react';
import { RefreshCw, Heart, HeartOff } from 'lucide-react';

function generateBaseColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 30);
  const lightness = 45 + Math.floor(Math.random() * 15);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateContrastingColor(baseHue: number): string {
  const hueShift = 120 + Math.floor(Math.random() * 60);
  const newHue = (baseHue + hueShift) % 360;
  const saturation = 70 + Math.floor(Math.random() * 30);
  const lightness = 45 + Math.floor(Math.random() * 15);
  return `hsl(${newHue}, ${saturation}%, ${lightness}%)`;
}

function generateSimilarColors(baseColor: string, count: number): string[] {
  const [h, s, l] = baseColor.match(/\d+/g)!.map(Number);
  const colors = [baseColor];

  colors.push(generateContrastingColor(h));
  colors.push(generateContrastingColor((h + 180) % 360));

  while (colors.length < count) {
    const hueVariation =
      Math.random() < 0.5
        ? h + Math.floor(Math.random() * 5)
        : h - Math.floor(Math.random() * 5);
    const satVariation = s + (Math.random() * 10 - 5);
    const lightVariation = l + (Math.random() * 10 - 5);

    const newColor = `hsl(${hueVariation}, ${satVariation}%, ${lightVariation}%)`;
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }

  return colors.sort(() => Math.random() - 0.5);
}

function App() {
  const [targetColor, setTargetColor] = useState<string>('');
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('colorGameHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const startNewGame = () => {
    const newColor = generateBaseColor();
    setTargetColor(newColor);
    setColorOptions(generateSimilarColors(newColor, 6));
    setGameStatus('');
    setIsCorrect(null);
  };

  const newGame = () => {
    // Reset everything, including high score and local storage
    setScore(0);
    setLives(3);
    setShowGameOver(false);
    localStorage.removeItem('colorGameHighScore');
    setHighScore(0);
    startNewGame();
  };

  const playAgain = () => {
    // Reset game state, but keep high score
    setScore(0);
    setLives(3);
    setShowGameOver(false);
    startNewGame();
  };

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('colorGameHighScore', score.toString());
    }
  }, [score, highScore]);

  const handleGuess = (color: string) => {
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus('Well Done! 💪🏽 Keep Trying');
      setIsCorrect(true);
      setTimeout(startNewGame, 1500);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setGameStatus("Oops! 🫢 That's not it! Try Again");
      setIsCorrect(false);

      setColorOptions(() => {
        const newOptions = generateSimilarColors(targetColor, 6);
        if (!newOptions.includes(targetColor)) {
          const randomIndex = Math.floor(Math.random() * newOptions.length);
          newOptions[randomIndex] = targetColor;
        }
        return newOptions;
      });

      if (newLives <= 0) {
        setShowGameOver(true);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] overflow-hidden transform transition-all duration-300 hover:scale-[1.02]'>
        <div className='p-6 space-y-4'>
          {/* Header */}
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-800'>Color Master?</h1>
            <div className='flex items-center gap-1'>
              {[...Array(3)].map((_, i) =>
                i < lives ? (
                  <Heart
                    key={i}
                    className='w-5 h-5 text-red-500 fill-red-500'
                  />
                ) : (
                  <HeartOff key={i} className='w-5 h-5 text-gray-300' />
                )
              )}
            </div>
          </div>

          {/* Instructions */}
          <div data-testid='gameInstructions' className='text-sm text-gray-600'>
            Select from the options the exact match of the color shown below
          </div>

          {/* Target Color */}
          <div
            className='w-full aspect-[4/1] rounded-lg shadow-lg transition-all duration-500'
            style={{ backgroundColor: targetColor }}
            data-testid='colorBox'
          />

          {/* Status and Score */}
          <div className='flex justify-between items-center text-sm'>
            <p
              className={`font-medium transition-all duration-300 ${
                isCorrect === true
                  ? 'text-green-600'
                  : isCorrect === false
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
              data-testid='gameStatus'
            >
              {gameStatus}
            </p>
            <div className='flex gap-4' data-testid='score'>
              <p className='font-semibold text-gray-800'>Score: {score}</p>
              <p className='font-semibold text-amber-600'>Best: {highScore}</p>
            </div>
          </div>

          {/* Color Options */}
          <div className='grid grid-cols-3 gap-2'>
            {colorOptions.map((color, index) => (
              <button
                key={index}
                className='aspect-[4/3] rounded-md shadow hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                style={{ backgroundColor: color }}
                onClick={() => handleGuess(color)}
                data-testid='colorOption'
                disabled={showGameOver}
              />
            ))}
          </div>

          {/* New Game Button */}
          <button
            className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2'
            onClick={() => newGame()}
            data-testid='newGameButton'
          >
            <RefreshCw className='w-4 h-4' />
            New Game
          </button>
        </div>
      </div>

      {/* Game Over Modal */}
      {showGameOver && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white text-gray-900 rounded-xl p-8 max-w-sm w-full shadow-2xl'>
            <h2 className='text-3xl font-bold text-center mb-4'>Game Over!</h2>
            <div className='text-center mb-6'>
              <p className='text-xl mb-2'>Final Score: {score}</p>
              <p className='text-lg text-yellow-600'>High Score: {highScore}</p>
            </div>
            <button
              onClick={() => playAgain()}
              className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity'
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className='absolute bottom-4 left-0 right-0 text-center text-xs text-blue-200 hover:text-purple-600 transition-colors'>
        <a
          href='https://quxpta.codes'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          🌠 QUxPTA Built
        </a>
      </footer>
    </div>
  );
}

export default App;
