import { BookOpen, Code, Lightbulb, Sparkles } from "lucide-react";

export const PROMPT_SUGGESTIONS = [
  {
    id: 1,
    title: "Quantum Entanglement",
    prompt:
      "Explain quantum entanglement and how it enables 'spooky action at a distance' - include real-world applications in quantum computing",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Quantum Superposition",
    prompt:
      "Help me understand quantum superposition with Schrödinger's cat example and how it relates to quantum bits (qubits) in quantum computers",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Graph Algorithms",
    prompt:
      "Explain Dijkstra's algorithm vs A* pathfinding algorithm - when to use each and implement both with time complexity analysis",
    icon: Code,
  },
  {
    id: 4,
    title: "Dynamic Programming",
    prompt:
      "Break down the concept of dynamic programming using the knapsack problem - show memoization vs tabulation approaches with code examples",
    icon: Lightbulb,
  },
];
