import React, { useState } from "react";

type Option = {
  id: number;
  text: string;
};

type Question = {
  question: string;
  options: Option[];
  answer: number; // id of the correct option
};

const QUESTIONS: Question[] = [
  {
    question: "What is the capital of France?",
    options: [
      { id: 1, text: "Berlin" },
      { id: 2, text: "London" },
      { id: 3, text: "Paris" },
      { id: 4, text: "Madrid" },
    ],
    answer: 3,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: 1, text: "Earth" },
      { id: 2, text: "Mars" },
      { id: 3, text: "Jupiter" },
      { id: 4, text: "Venus" },
    ],
    answer: 2,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      { id: 1, text: "Charles Dickens" },
      { id: 2, text: "William Shakespeare" },
      { id: 3, text: "Mark Twain" },
      { id: 4, text: "Jane Austen" },
    ],
    answer: 2,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      { id: 1, text: "Atlantic" },
      { id: 2, text: "Indian" },
      { id: 3, text: "Arctic" },
      { id: 4, text: "Pacific" },
    ],
    answer: 4,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: [
      { id: 1, text: "Au" },
      { id: 2, text: "Ag" },
      { id: 3, text: "Gd" },
      { id: 4, text: "Go" },
    ],
    answer: 1,
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: [
      { id: 1, text: "China" },
      { id: 2, text: "Brazil" },
      { id: 3, text: "UK" },
      { id: 4, text: "Russia" },
    ],
    answer: 2,
  },
  {
    question: "What is the square root of 64?",
    options: [
      { id: 1, text: "6" },
      { id: 2, text: "7" },
      { id: 3, text: "8" },
      { id: 4, text: "9" },
    ],
    answer: 3,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      { id: 1, text: "Vincent van Gogh" },
      { id: 2, text: "Pablo Picasso" },
      { id: 3, text: "Leonardo da Vinci" },
      { id: 4, text: "Claude Monet" },
    ],
    answer: 3,
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: [
      { id: 1, text: "Spanish" },
      { id: 2, text: "Portuguese" },
      { id: 3, text: "French" },
      { id: 4, text: "English" },
    ],
    answer: 2,
  },
  {
    question: "What is the fastest land animal?",
    options: [
      { id: 1, text: "Lion" },
      { id: 2, text: "Cheetah" },
      { id: 3, text: "Horse" },
      { id: 4, text: "Gazelle" },
    ],
    answer: 2,
  },
];

const MultiChoiceGame: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bonus, setBonus] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [previousScores, setPreviousScores] = useState<number[]>([]);
  const [newHighScore, setNewHighScore] = useState<null | {
    old: number;
    current: number;
  }>(null);

  const handleAnswer = (optionId: number) => {
    if (selected !== null) return; // Prevent multiple answers
    setSelected(optionId);

    const isCorrect = optionId === QUESTIONS[current].answer;
    let newScore = score;
    let newStreak = streak;

    if (isCorrect) {
      if (bonus) {
        newScore += 2;
      } else {
        newScore += 1;
      }
      newStreak += 1;
    } else {
      newStreak = 0;
    }

    setScore(newScore);
    setStreak(newStreak);
    setBonus(newStreak >= 2 && isCorrect);

    setTimeout(() => {
      setSelected(null);
      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        // Calculate high score before updating previousScores
        const oldHigh =
          previousScores.length > 0 ? Math.max(...previousScores) : 0;
        const isNewHigh = newScore > oldHigh;
        setShowResult(true);
        setPreviousScores((prev) => [...prev, newScore]);
        if (isNewHigh) {
          setNewHighScore({ old: oldHigh, current: newScore });
        } else {
          setNewHighScore(null);
        }
      }
    }, 1000);
  };

  const handlePlayAgain = () => {
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setBonus(false);
    setShowResult(false);
    setSelected(null);
    setNewHighScore(null);
  };

  return (
    <div className="MultiChoiceGame" data-testid="multi-choice-game-root">
      {!showResult ? (
        <div data-testid="game-in-progress">
          <div data-testid="score">
            <strong>Score:</strong> {score}
          </div>
          <div data-testid="bonus-streak">
            <strong>Bonus Streak:</strong>{" "}
            {streak >= 2 ? (
              <span style={{ color: "green" }} data-testid="bonus-active">
                Active! (+2 points)
              </span>
            ) : (
              <span style={{ color: "gray" }} data-testid="bonus-inactive">
                Not active
              </span>
            )}
          </div>
          <div style={{ margin: "16px 0" }} data-testid="question-section">
            <strong data-testid="question-number">
              Question {current + 1} of {QUESTIONS.length}
            </strong>
            <div style={{ margin: "8px 0" }} data-testid="question-text">
              {QUESTIONS[current].question}
            </div>
            <div className="OptionsList" data-testid="options-list">
              {QUESTIONS[current].options.map((option) => (
                <button
                  key={option.id}
                  className="OptionButton"
                  onClick={() => handleAnswer(option.id)}
                  disabled={selected !== null}
                  style={{
                    margin: "4px",
                    background:
                      selected === option.id
                        ? option.id === QUESTIONS[current].answer
                          ? "#b2ffb2"
                          : "#ffb2b2"
                        : undefined,
                  }}
                  data-testid={`option-${option.id}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            {selected !== null && (
              <div
                className="QuestionResult"
                style={{ marginTop: 8 }}
                data-testid="answer-feedback"
              >
                {selected === QUESTIONS[current].answer ? (
                  <span
                    className="CorrectFeedback"
                    data-testid="correct-feedback"
                  >
                    Correct!
                  </span>
                ) : (
                  <span
                    className="IncorrectFeedback"
                    data-testid="incorrect-feedback"
                  >
                    Incorrect! The correct answer was "
                    {
                      QUESTIONS[current].options.find(
                        (opt) => opt.id === QUESTIONS[current].answer
                      )?.text
                    }
                    "
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div data-testid="final-score">
          <h2 data-testid="game-over-title">Game Over!</h2>
          <div data-testid="final-score-value">
            <strong>Final Score:</strong> {score}
          </div>
          {newHighScore && (
            <div className="NewHighScoreMessage" data-testid="congrats-message">
              🎉 Congratulations! New High Score!
              <br />
              Previous High Score: {newHighScore.old} <br />
              New High Score: {newHighScore.current}
            </div>
          )}
          <button
            onClick={handlePlayAgain}
            data-testid="play-again-btn"
            style={{ marginTop: 16 }}
          >
            Play Again
          </button>
        </div>
      )}
      <div
        className="PreviousScores"
        style={{ marginTop: 32 }}
        data-testid="previous-scores-section"
      >
        <strong>Previous Scores:</strong>
        <ul data-testid="previous-scores-list">
          {previousScores.length === 0 ? (
            <li data-testid="no-previous-scores">No previous games played.</li>
          ) : (
            previousScores.map((s, i) => {
              const maxScore = Math.max(...previousScores);
              const isHigh = s === maxScore;
              return (
                <li
                  key={i}
                  className={isHigh ? "high-score" : undefined}
                  data-testid={isHigh ? "high-score-item" : "score-item"}
                >
                  Game {i + 1}: {s} points
                  {isHigh ? " (High Score)" : ""}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default MultiChoiceGame;
