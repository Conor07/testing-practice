import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import MultiChoiceGame from "./MultiChoiceGame";

function selectOptionByText(text) {
  // Find the button by its data-testid, which is always option-<id>
  // But since we only have the text, let's use getByRole with name:
  const option = screen.getByRole("button", { name: text });
  fireEvent.click(option);
}

describe("MultiChoiceGame", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("shows 'No previous games played.' if no games played", () => {
    render(<MultiChoiceGame />);
    expect(screen.getByTestId("no-previous-scores")).toBeInTheDocument();
  });

  it("shows correct feedback when a correct option is selected", async () => {
    render(<MultiChoiceGame />);
    selectOptionByText("Paris");
    expect(await screen.findByTestId("correct-feedback")).toBeInTheDocument();
  });

  it("shows incorrect feedback when a wrong option is selected", async () => {
    render(<MultiChoiceGame />);
    selectOptionByText("Berlin");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
  });

  it("shows previous scores after playing a game", async () => {
    render(<MultiChoiceGame />);
    selectOptionByText("Paris"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Mars"); act(() => { jest.runAllTimers(); });
    selectOptionByText("William Shakespeare"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Pacific"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Au"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Brazil"); act(() => { jest.runAllTimers(); });
    selectOptionByText("8"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Leonardo da Vinci"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Portuguese"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Cheetah"); act(() => { jest.runAllTimers(); });

    expect(await screen.findByTestId("final-score")).toBeInTheDocument();
    expect(screen.getByTestId("previous-scores-list")).toHaveTextContent("Game 1:");
  });

  it("plays a game, gets a low score, then plays again and gets a high score", async () => {
    render(<MultiChoiceGame />);

    // Play first game: answer first 2 correct, rest wrong
    expect(screen.getByTestId("game-in-progress")).toBeInTheDocument();

    // Q1: Paris (correct)
    selectOptionByText("Paris");
    expect(await screen.findByTestId("correct-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q2: Mars (correct)
    selectOptionByText("Mars");
    expect(await screen.findByTestId("correct-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q3: Wrong answer (not William Shakespeare)
    selectOptionByText("Charles Dickens");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q4: Wrong answer (not Pacific)
    selectOptionByText("Atlantic");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q5: Wrong answer (not Au)
    selectOptionByText("Ag");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q6: Wrong answer (not Brazil)
    selectOptionByText("China");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q7: Wrong answer (not 8)
    selectOptionByText("6");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q8: Wrong answer (not Leonardo da Vinci)
    selectOptionByText("Vincent van Gogh");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q9: Wrong answer (not Portuguese)
    selectOptionByText("Spanish");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Q10: Wrong answer (not Cheetah)
    selectOptionByText("Lion");
    expect(await screen.findByTestId("incorrect-feedback")).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });

    // Should see final score and previous scores
    expect(await screen.findByTestId("final-score")).toBeInTheDocument();
    const lowScore = Number(screen.getByTestId("final-score-value").textContent.replace(/\D/g, ""));
    expect(screen.getByTestId("previous-scores-list")).toHaveTextContent(`Game 1: ${lowScore} points`);

    // Play again
    fireEvent.click(screen.getByTestId("play-again-btn"));
    expect(screen.getByTestId("game-in-progress")).toBeInTheDocument();

    // Play second game: all correct for high score
    selectOptionByText("Paris"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Mars"); act(() => { jest.runAllTimers(); });
    selectOptionByText("William Shakespeare"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Pacific"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Au"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Brazil"); act(() => { jest.runAllTimers(); });
    selectOptionByText("8"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Leonardo da Vinci"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Portuguese"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Cheetah"); act(() => { jest.runAllTimers(); });

    // Should see final score and previous scores
    expect(await screen.findByTestId("final-score")).toBeInTheDocument();
    const highScore = Number(screen.getByTestId("final-score-value").textContent.replace(/\D/g, ""));
    expect(highScore).toBeGreaterThan(lowScore);

    // Should see both scores in previous scores list
    const scoresList = screen.getByTestId("previous-scores-list");
    expect(scoresList).toHaveTextContent(`Game 1: ${lowScore} points`);
    expect(scoresList).toHaveTextContent(`Game 2: ${highScore} points`);

    // High score should have special class and label
    const highScoreItem = screen.getByTestId("high-score-item");
    expect(highScoreItem).toHaveClass("high-score");
    expect(highScoreItem).toHaveTextContent("High Score");

    // Play again button works
    fireEvent.click(screen.getByTestId("play-again-btn"));
    expect(screen.getByTestId("game-in-progress")).toBeInTheDocument();
  });

  it("high score in previous scores has the correct class", async () => {
    render(<MultiChoiceGame />);
    // Play two games with different scores
    selectOptionByText("Paris"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Mars"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Charles Dickens"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Atlantic"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Ag"); act(() => { jest.runAllTimers(); });
    selectOptionByText("China"); act(() => { jest.runAllTimers(); });
    selectOptionByText("6"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Vincent van Gogh"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Spanish"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Lion"); act(() => { jest.runAllTimers(); });

    fireEvent.click(screen.getByTestId("play-again-btn"));

    selectOptionByText("Paris"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Mars"); act(() => { jest.runAllTimers(); });
    selectOptionByText("William Shakespeare"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Pacific"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Au"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Brazil"); act(() => { jest.runAllTimers(); });
    selectOptionByText("8"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Leonardo da Vinci"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Portuguese"); act(() => { jest.runAllTimers(); });
    selectOptionByText("Cheetah"); act(() => { jest.runAllTimers(); });

    const highScoreItem = await screen.findByTestId("high-score-item");
    expect(highScoreItem).toHaveClass("high-score");
  });
});