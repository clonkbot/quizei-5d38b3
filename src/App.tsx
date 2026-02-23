import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  questions: Question[];
}

const quizCategories: QuizCategory[] = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-600',
    questions: [
      { id: 1, question: 'What is the chemical symbol for gold?', options: ['Go', 'Au', 'Ag', 'Gd'], correct: 1, category: 'science', difficulty: 'easy' },
      { id: 2, question: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], correct: 1, category: 'science', difficulty: 'easy' },
      { id: 3, question: 'What is the speed of light in km/s?', options: ['150,000', '299,792', '350,000', '200,000'], correct: 1, category: 'science', difficulty: 'medium' },
      { id: 4, question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correct: 2, category: 'science', difficulty: 'easy' },
      { id: 5, question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, category: 'science', difficulty: 'easy' },
    ]
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    questions: [
      { id: 1, question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct: 2, category: 'history', difficulty: 'easy' },
      { id: 2, question: 'Who was the first President of the United States?', options: ['John Adams', 'Thomas Jefferson', 'George Washington', 'Benjamin Franklin'], correct: 2, category: 'history', difficulty: 'easy' },
      { id: 3, question: 'The Great Wall of China was built to protect against?', options: ['Romans', 'Mongols', 'Japanese', 'Persians'], correct: 1, category: 'history', difficulty: 'medium' },
      { id: 4, question: 'Which empire was ruled by Genghis Khan?', options: ['Roman', 'Ottoman', 'Mongol', 'Persian'], correct: 2, category: 'history', difficulty: 'easy' },
      { id: 5, question: 'When did the French Revolution begin?', options: ['1776', '1789', '1799', '1815'], correct: 1, category: 'history', difficulty: 'medium' },
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    questions: [
      { id: 1, question: 'What is the largest country by area?', options: ['China', 'USA', 'Canada', 'Russia'], correct: 3, category: 'geography', difficulty: 'easy' },
      { id: 2, question: 'Which river is the longest in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correct: 1, category: 'geography', difficulty: 'medium' },
      { id: 3, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correct: 2, category: 'geography', difficulty: 'medium' },
      { id: 4, question: 'Mount Everest is located in which mountain range?', options: ['Alps', 'Andes', 'Himalayas', 'Rockies'], correct: 2, category: 'geography', difficulty: 'easy' },
      { id: 5, question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3, category: 'geography', difficulty: 'easy' },
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    questions: [
      { id: 1, question: 'Who directed the movie "Inception"?', options: ['Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino'], correct: 1, category: 'entertainment', difficulty: 'easy' },
      { id: 2, question: 'Which band sang "Bohemian Rhapsody"?', options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'], correct: 2, category: 'entertainment', difficulty: 'easy' },
      { id: 3, question: 'What year was the first iPhone released?', options: ['2005', '2006', '2007', '2008'], correct: 2, category: 'entertainment', difficulty: 'medium' },
      { id: 4, question: 'Who played Iron Man in the MCU?', options: ['Chris Evans', 'Chris Hemsworth', 'Robert Downey Jr.', 'Mark Ruffalo'], correct: 2, category: 'entertainment', difficulty: 'easy' },
      { id: 5, question: 'What is the highest-grossing film of all time?', options: ['Titanic', 'Avatar', 'Avengers: Endgame', 'Star Wars'], correct: 1, category: 'entertainment', difficulty: 'medium' },
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    questions: [
      { id: 1, question: 'How many players are on a soccer team?', options: ['9', '10', '11', '12'], correct: 2, category: 'sports', difficulty: 'easy' },
      { id: 2, question: 'Which country has won the most FIFA World Cups?', options: ['Germany', 'Argentina', 'Brazil', 'Italy'], correct: 2, category: 'sports', difficulty: 'easy' },
      { id: 3, question: 'In tennis, what is a score of 40-40 called?', options: ['Match point', 'Deuce', 'Advantage', 'Love'], correct: 1, category: 'sports', difficulty: 'medium' },
      { id: 4, question: 'Which sport uses the term "birdie"?', options: ['Tennis', 'Golf', 'Badminton', 'Cricket'], correct: 1, category: 'sports', difficulty: 'easy' },
      { id: 5, question: 'How long is an Olympic swimming pool?', options: ['25m', '50m', '75m', '100m'], correct: 1, category: 'sports', difficulty: 'medium' },
    ]
  },
  {
    id: 'tech',
    name: 'Technology',
    icon: '💻',
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-600',
    questions: [
      { id: 1, question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correct: 0, category: 'tech', difficulty: 'easy' },
      { id: 2, question: 'Who founded Microsoft?', options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Jeff Bezos'], correct: 1, category: 'tech', difficulty: 'easy' },
      { id: 3, question: 'What programming language was created by Guido van Rossum?', options: ['Java', 'Ruby', 'Python', 'JavaScript'], correct: 2, category: 'tech', difficulty: 'medium' },
      { id: 4, question: 'What year was Google founded?', options: ['1996', '1998', '2000', '2002'], correct: 1, category: 'tech', difficulty: 'medium' },
      { id: 5, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correct: 0, category: 'tech', difficulty: 'easy' },
    ]
  },
];

type GameState = 'home' | 'category' | 'quiz' | 'result';

function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    if (gameState === 'quiz' && !showAnswer && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTotalTime(totalTime + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer) {
      handleTimeout();
    }
  }, [timeLeft, gameState, showAnswer]);

  const handleTimeout = () => {
    setShowAnswer(true);
    setStreak(0);
    setAnswers([...answers, false]);
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const startQuiz = (category: QuizCategory) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(15);
    setTotalTime(0);
    setAnswers([]);
    setGameState('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    if (showAnswer) return;

    setSelectedAnswer(answerIndex);
    setShowAnswer(true);

    const isCorrect = answerIndex === selectedCategory!.questions[currentQuestionIndex].correct;

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 10);
      const streakBonus = streak * 50;
      setScore(score + 100 + timeBonus + streakBonus);
      setStreak(streak + 1);
      setAnswers([...answers, true]);
    } else {
      setStreak(0);
      setAnswers([...answers, false]);
    }

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedCategory!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(15);
    } else {
      setGameState('result');
    }
  };

  const restartQuiz = () => {
    setGameState('home');
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setAnswers([]);
  };

  const currentQuestion = selectedCategory?.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-900/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-900/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          {gameState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col"
            >
              {/* Hero Section */}
              <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-center mb-8 md:mb-12"
                >
                  <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-3 md:mb-4">
                    <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      QUIZEI
                    </span>
                  </h1>
                  <p className="text-base md:text-xl text-gray-400 font-light tracking-wide">
                    Test your knowledge. Challenge yourself.
                  </p>
                </motion.div>

                {/* Category Grid */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-full max-w-5xl px-4"
                >
                  <h2 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-4 md:mb-6 text-center">
                    Choose a Category
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {quizCategories.map((category, index) => (
                      <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => startQuiz(category)}
                        className={`group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 bg-gradient-to-br ${category.gradient} shadow-2xl`}
                      >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="relative z-10">
                          <span className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4 block">{category.icon}</span>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 md:mb-2">{category.name}</h3>
                          <p className="text-white/70 text-xs md:text-sm">{category.questions.length} questions</p>
                        </div>
                        <div className="absolute bottom-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {gameState === 'quiz' && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col"
            >
              {/* Quiz Header */}
              <div className="p-3 md:p-6 border-b border-white/10">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <button
                    onClick={restartQuiz}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden md:inline">Exit</span>
                  </button>

                  <div className="flex items-center gap-3 md:gap-6">
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="text-xl md:text-2xl">{selectedCategory?.icon}</span>
                      <span className="text-xs md:text-sm font-medium text-gray-300 hidden sm:inline">{selectedCategory?.name}</span>
                    </div>

                    <div className="flex items-center gap-1 md:gap-2 bg-white/5 px-2 md:px-4 py-1.5 md:py-2 rounded-full">
                      <span className="text-yellow-400">⚡</span>
                      <span className="font-bold text-sm md:text-base">{score}</span>
                    </div>

                    {streak > 1 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 px-2 md:px-3 py-1 md:py-1.5 rounded-full"
                      >
                        <span className="text-xs md:text-sm">🔥</span>
                        <span className="font-bold text-xs md:text-sm">{streak}x</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-3 md:px-6 pt-4 md:pt-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex gap-1 md:gap-2 mb-4 md:mb-6">
                    {selectedCategory?.questions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 md:h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          index < currentQuestionIndex
                            ? answers[index]
                              ? 'bg-green-500'
                              : 'bg-red-500'
                            : index === currentQuestionIndex
                            ? 'bg-white'
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="px-3 md:px-6 mb-4 md:mb-8">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    <div className={`relative w-14 h-14 md:w-20 md:h-20 ${timeLeft <= 5 ? 'animate-pulse' : ''}`}>
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="4"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="none"
                          stroke={timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#10b981'}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${(timeLeft / 15) * 283} 283`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xl md:text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400' : ''}`}>
                          {timeLeft}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="flex-1 px-3 md:px-6 pb-6 md:pb-12">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center mb-6 md:mb-10"
                  >
                    <span className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 md:mb-4 block">
                      Question {currentQuestionIndex + 1} of {selectedCategory?.questions.length}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight px-2">
                      {currentQuestion.question}
                    </h2>
                  </motion.div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {currentQuestion.options.map((option, index) => {
                      const isCorrect = index === currentQuestion.correct;
                      const isSelected = selectedAnswer === index;

                      let bgClass = 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20';
                      if (showAnswer) {
                        if (isCorrect) {
                          bgClass = 'bg-green-500/20 border-green-500';
                        } else if (isSelected && !isCorrect) {
                          bgClass = 'bg-red-500/20 border-red-500';
                        }
                      }

                      return (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={!showAnswer ? { scale: 1.02 } : {}}
                          whileTap={!showAnswer ? { scale: 0.98 } : {}}
                          onClick={() => handleAnswer(index)}
                          disabled={showAnswer}
                          className={`relative overflow-hidden p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all duration-300 ${bgClass} ${showAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center gap-3 md:gap-4">
                            <span className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl font-bold text-sm md:text-base ${
                              showAnswer && isCorrect
                                ? 'bg-green-500 text-white'
                                : showAnswer && isSelected && !isCorrect
                                ? 'bg-red-500 text-white'
                                : 'bg-white/10'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="font-medium text-sm md:text-lg flex-1">{option}</span>
                            {showAnswer && isCorrect && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-xl md:text-2xl"
                              >
                                ✓
                              </motion.span>
                            )}
                            {showAnswer && isSelected && !isCorrect && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-xl md:text-2xl"
                              >
                                ✗
                              </motion.span>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center px-4 py-8"
            >
              <div className="text-center max-w-lg w-full">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="mb-6 md:mb-8"
                >
                  <span className="text-6xl md:text-8xl block mb-4">
                    {answers.filter(Boolean).length === answers.length
                      ? '🏆'
                      : answers.filter(Boolean).length >= answers.length * 0.7
                      ? '🎉'
                      : answers.filter(Boolean).length >= answers.length * 0.5
                      ? '👍'
                      : '💪'}
                  </span>
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">
                  {answers.filter(Boolean).length === answers.length
                    ? 'Perfect Score!'
                    : answers.filter(Boolean).length >= answers.length * 0.7
                    ? 'Great Job!'
                    : answers.filter(Boolean).length >= answers.length * 0.5
                    ? 'Not Bad!'
                    : 'Keep Practicing!'}
                </h2>

                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
                  <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-6">
                    <div className="text-2xl md:text-4xl font-bold text-yellow-400">{score}</div>
                    <div className="text-xs md:text-sm text-gray-400 mt-1">Points</div>
                  </div>
                  <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-6">
                    <div className="text-2xl md:text-4xl font-bold text-green-400">
                      {answers.filter(Boolean).length}/{answers.length}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 mt-1">Correct</div>
                  </div>
                  <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-6">
                    <div className="text-2xl md:text-4xl font-bold text-cyan-400">{totalTime}s</div>
                    <div className="text-xs md:text-sm text-gray-400 mt-1">Time</div>
                  </div>
                </div>

                {/* Answer Review */}
                <div className="flex justify-center gap-2 mb-6 md:mb-10">
                  {answers.map((correct, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-sm ${
                        correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startQuiz(selectedCategory!)}
                    className={`px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold bg-gradient-to-r ${selectedCategory?.gradient} text-white shadow-lg text-sm md:text-base`}
                  >
                    Play Again
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartQuiz}
                    className="px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold bg-white/10 hover:bg-white/20 transition-colors text-sm md:text-base"
                  >
                    New Category
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 md:py-6 border-t border-white/5">
        <p className="text-center text-[10px] md:text-xs text-gray-600 tracking-wide">
          Requested by <span className="text-gray-500">@fumezui</span> · Built by <span className="text-gray-500">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
