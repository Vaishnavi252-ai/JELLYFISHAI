import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// ── 20 QUESTIONS DATA ────────────────────────────────
const questionsData = [
  { id: 1, title: "Two Sum", category: "Arrays", difficulty: "Easy", question: "Write a function to return indices of two numbers such that they add up to a specific target.", answer: "target - nums[i]" },
  { id: 2, title: "Fibonacci Memoized", category: "DP", difficulty: "Easy", question: "Write a memoized function for Fibonacci sequence.", answer: "if (n in memo) return memo[n]" },
  { id: 3, title: "Valid Parentheses", category: "Stacks", difficulty: "Easy", question: "Given a string containing just '()[]{}', check if valid.", answer: "stack.pop()" },
  { id: 4, title: "Binary Search", category: "Search", difficulty: "Easy", question: "How to find the middle element in binary search?", answer: "low + (high - low) / 2" },
  { id: 5, title: "Reverse Linked List", category: "Linked Lists", difficulty: "Medium", question: "How to reverse a linked list?", answer: "next = curr.next; curr.next = prev;" },
  { id: 6, title: "Merge Sort", category: "Sorting", difficulty: "Medium", question: "What is the time complexity of Merge Sort?", answer: "O(n log n)" },
  { id: 7, title: "LRU Cache", category: "Design", difficulty: "Hard", question: "Which data structure is best for LRU Cache?", answer: "Hash Map + Doubly Linked List" },
  { id: 8, title: "Todo REST API", category: "Backend", difficulty: "Medium", question: "Which HTTP method is used to update a resource?", answer: "PUT or PATCH" },
  // Aap aur questions yahan add kar sakte hain...
];

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// ── IS ROUTE KO BADLA HAI TAAKI FRONTEND ERROR NA DE ─────────────────
// Yeh route challenges ki list return karega
router.get('/battle', verifyToken, (req, res) => {
  res.json({ success: true, challenges: questionsData });
});

// Yeh route user ka submission handle karega
router.post('/battle', verifyToken, (req, res) => {
  const { prompt, userAnswer } = req.body;

  if (!userAnswer) {
    // Agar sirf prompt hai, toh question return karo (Frontend startup)
    const challenge = questionsData.find(q => q.title === prompt) || questionsData[0];
    return res.json({ success: true, challenge });
  }

  // Answer checking logic
  const challenge = questionsData.find(q => q.title === prompt);
  const isCorrect = challenge && userAnswer.toLowerCase().includes(challenge.answer.toLowerCase());

  res.json({
    success: true,
    isCorrect,
    correctAnswer: challenge ? challenge.answer : "",
    feedback: isCorrect ? "✅ Correct!" : "❌ Wrong Answer. Try again.",
    // AI Battle panels ko fill karne ke liye fake data
    claude: isCorrect ? "Correct implementation." : "Logical error detected.",
    gpt: challenge ? challenge.answer : ""
  });
});

export default router;