import { useState, useEffect, useCallback, useRef } from 'react';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

// Helper function to normalize whitespace for comparison
const normalizeWhitespace = (str: string): string => {
  // Replace multiple consecutive spaces with a single space
  // Preserve newlines
  return str.replace(/[^\S\n]+/g, ' ').replace(/^\s+/gm, '').replace(/\s+$/gm, '');
};

// Helper function to check if character matches with whitespace flexibility
const isCharMatch = (userChar: string, targetChar: string, userInput: string, targetCode: string, index: number): boolean => {
  // Exact match is always correct
  if (userChar === targetChar) {
    return true;
  }
  
  // If both are whitespace characters (space, tab), consider them equivalent
  // This allows flexibility between spaces and tabs
  if (/\s/.test(userChar) && /\s/.test(targetChar) && userChar !== '\n' && targetChar !== '\n') {
    return true;
  }
  
  // If user typed a non-whitespace but target expects whitespace, check if we can skip it
  // This handles cases where the user might skip trailing/extra spaces
  if (!(/\s/.test(userChar)) && /\s/.test(targetChar) && targetChar !== '\n') {
    // Look ahead to see if the next non-whitespace character in target matches current user char
    let targetLookAhead = index + 1;
    while (targetLookAhead < targetCode.length && /\s/.test(targetCode[targetLookAhead]) && targetCode[targetLookAhead] !== '\n') {
      targetLookAhead++;
    }
    // If we found a non-whitespace character ahead that matches, allow it
    if (targetLookAhead < targetCode.length && userChar === targetCode[targetLookAhead]) {
      return true;
    }
  }
  
  // If target expects non-whitespace but user typed whitespace (except newlines), check if we can skip
  if (/\s/.test(userChar) && userChar !== '\n' && !(/\s/.test(targetChar))) {
    // Look ahead in user input to see if next non-whitespace matches target
    let userLookAhead = index + 1;
    while (userLookAhead < userInput.length && /\s/.test(userInput[userLookAhead]) && userInput[userLookAhead] !== '\n') {
      userLookAhead++;
    }
    // If we found a non-whitespace character ahead that matches, allow it
    if (userLookAhead < userInput.length && userInput[userLookAhead] === targetChar) {
      return true;
    }
  }
  
  return false;
};

export interface UseTypingGameProps {
  targetCode: string;
  onComplete?: (stats: TypingStats) => void;
}

export interface UseTypingGameReturn {
  userInput: string;
  stats: TypingStats;
  isStarted: boolean;
  isCompleted: boolean;
  handleInputChange: (value: string) => void;
  resetGame: () => void;
  currentCharIndex: number;
  errors: Set<number>;
  hasError: boolean;
}

export const useTypingGame = ({ 
  targetCode, 
  onComplete 
}: UseTypingGameProps): UseTypingGameReturn => {
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [hasError, setHasError] = useState(false);
  
  const intervalRef = useRef<number | null>(null);
  
  // Normalize target code for flexible matching
  const normalizedTarget = useRef(normalizeWhitespace(targetCode));
  const normalizedInput = normalizeWhitespace(userInput);

  // Calculate stats
  const stats: TypingStats = {
    wpm: 0,
    accuracy: 0,
    timeElapsed,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: userInput.length,
  };

  // Count correct and incorrect characters (using normalized strings)
  for (let i = 0; i < normalizedInput.length; i++) {
    if (normalizedInput[i] === normalizedTarget.current[i]) {
      stats.correctChars++;
    } else {
      stats.incorrectChars++;
    }
  }
  stats.totalChars = normalizedInput.length;

  // Calculate accuracy
  if (stats.totalChars > 0) {
    stats.accuracy = (stats.correctChars / stats.totalChars) * 100;
  }

  // Calculate WPM (Words Per Minute)
  // Standard: 5 characters = 1 word
  if (timeElapsed > 0) {
    const minutes = timeElapsed / 60;
    const words = stats.correctChars / 5;
    stats.wpm = Math.round(words / minutes);
  }

  // Timer effect
  useEffect(() => {
    if (isStarted && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStarted, isCompleted]);

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    // Start the game on first input
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    // Don't allow input beyond target length
    if (value.length > targetCode.length) {
      return;
    }

    setUserInput(value);

    // Track errors for display purposes and hasError state
    const newErrors = new Set<number>();
    for (let i = 0; i < value.length; i++) {
      if (!isCharMatch(value[i], targetCode[i], value, targetCode, i)) {
        newErrors.add(i);
      }
    }
    setErrors(newErrors);
    setHasError(newErrors.size > 0);

    // Check if completed (using normalized comparison for flexibility)
    const normalizedValue = normalizeWhitespace(value);
    const normalizedTargetCode = normalizeWhitespace(targetCode);
    
    if (value.length === targetCode.length && normalizedValue === normalizedTargetCode) {
      setIsCompleted(true);
      if (onComplete) {
        // Calculate final stats
        const finalStats: TypingStats = {
          wpm: 0,
          accuracy: 100, // If completed, they got it all right
          timeElapsed: startTime ? Math.floor((Date.now() - startTime) / 1000) : 0,
          correctChars: normalizedValue.length,
          incorrectChars: 0,
          totalChars: normalizedValue.length,
        };

        if (finalStats.timeElapsed > 0) {
          const minutes = finalStats.timeElapsed / 60;
          const words = finalStats.correctChars / 5;
          finalStats.wpm = Math.round(words / minutes);
        }

        onComplete(finalStats);
      }
    }
  }, [isStarted, targetCode, onComplete, startTime, userInput]);

  // Reset game
  const resetGame = useCallback(() => {
    setUserInput('');
    setIsStarted(false);
    setIsCompleted(false);
    setStartTime(null);
    setTimeElapsed(0);
    setErrors(new Set());
    setHasError(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  return {
    userInput,
    stats,
    isStarted,
    isCompleted,
    handleInputChange,
    resetGame,
    currentCharIndex: userInput.length,
    errors,
    hasError,
  };
};
