import { useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView, Decoration } from '@codemirror/view';
import { StateField } from '@codemirror/state';
import type { DecorationSet } from '@codemirror/view';
import { useTypingGame } from '../hooks/useTypingGame';
import type { TypingStats } from '../hooks/useTypingGame';
import { createTerminalTheme } from '../themes/terminalTheme';
import { useTheme } from '../context/ThemeContext';
import './CodeEditor.css';

export interface CodeEditorProps {
  targetCode: string;
  language?: 'javascript' | 'typescript' | 'python' | 'java' | 'go';
  onComplete?: (stats: TypingStats) => void;
}

export const CodeEditor = ({ 
  targetCode, 
  language = 'javascript',
  onComplete 
}: CodeEditorProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [pasteAttempted, setPasteAttempted] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  const {
    userInput,
    stats,
    isStarted,
    isCompleted,
    handleInputChange,
    resetGame,
    currentCharIndex,
    errors,
    hasError,
  } = useTypingGame({ targetCode, onComplete });

  // Create the terminal theme based on current theme
  const terminalTheme = useMemo(() => createTerminalTheme(isDark), [isDark]);

  // Create error decoration extension
  const errorDecoration = useMemo(() => {
    const errorMark = Decoration.mark({
      class: 'cm-error-char'
    });

    const errorField = StateField.define<DecorationSet>({
      create() {
        return Decoration.none;
      },
      update() {
        // Build decorations for error positions
        const builder: any[] = [];
        errors.forEach(errorPos => {
          if (errorPos < userInput.length) {
            builder.push(errorMark.range(errorPos, errorPos + 1));
          }
        });
        return Decoration.set(builder.sort((a, b) => a.from - b.from));
      },
      provide: f => EditorView.decorations.from(f)
    });

    return errorField;
  }, [errors, userInput]);

  // Prevent paste extension for CodeMirror
  const preventPasteExtension = useMemo(() => {
    return EditorView.domEventHandlers({
      paste: (event) => {
        event.preventDefault();
        setPasteAttempted(true);
        setTimeout(() => setPasteAttempted(false), 2000);
        return true;
      },
      // Also prevent drop events (drag and drop text)
      drop: (event) => {
        event.preventDefault();
        return true;
      },
      // Block typing when there's an error (but allow backspace/delete)
      keydown: (event) => {
        if (hasError) {
          // Allow backspace, delete, and arrow keys
          const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
          if (!allowedKeys.includes(event.key)) {
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
    });
  }, [hasError]);

  // Get language support based on prop
  const getLanguageSupport = () => {
    switch (language) {
      case 'javascript':
      case 'typescript':
        return javascript({ jsx: true, typescript: language === 'typescript' });
      // Add more languages here as needed
      default:
        return javascript();
    }
  };

  // Create decorated target code with character highlighting and line numbers
  const decoratedTarget = useMemo(() => {
    const lines = targetCode.split('\n');
    let charIndex = 0;
    
    return lines.map((line, lineIndex) => {
      const lineChars = line.split('').map((char) => {
        const globalCharIndex = charIndex;
        charIndex++;
        
        let className = 'char';
        
        if (globalCharIndex < currentCharIndex) {
          // Character has been typed
          if (errors.has(globalCharIndex)) {
            className += ' char-error';
          } else {
            className += ' char-correct';
          }
        } else if (globalCharIndex === currentCharIndex) {
          // Current character to type
          className += ' char-current';
        }
        
        return { char, className, index: globalCharIndex };
      });
      
      // Increment charIndex for the newline character (except for the last line)
      if (lineIndex < lines.length - 1) {
        charIndex++;
      }
      
      return {
        lineNumber: lineIndex + 1,
        chars: lineChars,
      };
    });
  }, [targetCode, currentCharIndex, errors]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle reset - also force CodeMirror to re-render
  const handleReset = () => {
    resetGame();
    setEditorKey(prev => prev + 1);
  };

  return (
    <div className="code-editor-container">
      {/* Stats Panel */}
      <div className="stats-panel">
        <div className="stat-item">
          <span className="stat-label">WPM:</span>
          <span className="stat-value">{stats.wpm}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Accuracy:</span>
          <span className="stat-value">{stats.accuracy.toFixed(1)}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{formatTime(stats.timeElapsed)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Chars:</span>
          <span className="stat-value">{currentCharIndex}/{targetCode.length}</span>
        </div>
      </div>

      {/* Single Terminal with Overlay */}
      <div className={`typing-terminal ${hasError ? 'has-error' : ''}`}>
        <div className="code-header">
          <span className="code-header-title">$ Type the Code</span>
          {!isStarted && (
            <span className="code-header-hint">Start typing to begin...</span>
          )}
          {isCompleted && (
            <span className="code-header-complete">Complete!</span>
          )}
          {pasteAttempted && (
            <span className="paste-warning">No cheating! Type it out.</span>
          )}
          {hasError && (
            <span className="error-warning">Fix the typo to continue!</span>
          )}
        </div>
        
        <div className="terminal-content">
          {/* Ghost target code overlay */}
          <div 
            className="ghost-code-overlay"
            onContextMenu={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
          >
            <div className="ghost-code-with-lines">
              {decoratedTarget.map(({ lineNumber, chars }) => (
                <div key={lineNumber} className="ghost-code-line">
                  <pre className="ghost-code-content">
                    {chars.map(({ char, className, index }) => (
                      <span key={index} className={className}>
                        {char}
                      </span>
                    ))}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* User input editor - overlays on top */}
          <div className="user-input-overlay">
            <CodeMirror
              key={editorKey}
              value={userInput}
              height="auto"
              extensions={[
                getLanguageSupport(),
                terminalTheme,
                EditorView.lineWrapping,
                preventPasteExtension,
                errorDecoration,
              ]}
              onChange={handleInputChange}
              placeholder=""
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightActiveLine: false,
                foldGutter: false,
                dropCursor: true,
                allowMultipleSelections: false,
                indentOnInput: false,
                bracketMatching: true,
                closeBrackets: false,
                autocompletion: false,
                highlightSelectionMatches: false,
                searchKeymap: false,
                completionKeymap: false,
              }}
              readOnly={isCompleted}
              className="code-mirror-editor"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="editor-actions">
        {isCompleted && (
          <button className="btn btn-primary" onClick={handleReset}>
            Play Again
          </button>
        )}
        {isStarted && !isCompleted && (
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
