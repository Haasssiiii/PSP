import React, { useState, useEffect } from "react";

const questions = [
  {
    question: "Capital of France?",
    options: ["Berlin", "London", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "5 + 7 = ?",
    options: ["10", "11", "12", "13"],
    answer: 2
  },
  {
    question: "Fastest land animal?",
    options: ["Lion", "Cheetah", "Tiger", "Panther"],
    answer: 1
  }
];

export default function Quiz({ username }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!submitted && timer > 0) {
      const countdown = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(countdown);
    }
    if (timer === 0 && !submitted) handleSubmit();
  }, [timer, submitted]);

  const handleSubmit = () => {
    const correct = selected === questions[index].answer;
    if (correct) {
      setScore(s => s + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct: ${questions[index].options[questions[index].answer]}`);
    }

    setTimeout(() => {
      setSelected(null);
      setFeedback("");
      if (index + 1 < questions.length) {
        setIndex(i => i + 1);
        setTimer(30);
      } else {
        setSubmitted(true);
        localStorage.setItem(username, score + (correct ? 1 : 0));
      }
    }, 1500);
  };

  if (submitted) return <h2>✅ {username}, your score is: {score}/{questions.length}</h2>;

  const q = questions[index];
  return (
    <div>
      <h3>⏳ Time left: {timer}s</h3>
      <h2>{q.question}</h2>
      {q.options.map((opt, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              name="option"
              checked={selected === i}
              onChange={() => setSelected(i)}
              disabled={!!feedback}
            />
            {opt}
          </label>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{ marginTop: 10, padding: 8 }}
        disabled={selected === null || !!feedback}
      >
        {index + 1 === questions.length ? "Finish Quiz" : "Next"}
      </button>
      <div style={{ marginTop: 10 }}>{feedback}</div>
    </div>
  );
}