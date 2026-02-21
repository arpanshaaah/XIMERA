import { LayerData, Question } from './types';

interface QuestionTemplate {
  topic: string;
  question: string;
  options: string[];
  correct: number;
}

const ANALYTICS_TOPICS: QuestionTemplate[] = [
  {
    topic: "Descriptive Analytics",
    question: "Which action best defines the primary goal of Descriptive Analytics?",
    options: [
      "Summarizing raw data to make it interpretable.",
      "Predicting future trends based on past patterns.",
      "Recommending specific actions to optimize outcomes.",
      "Determining the root cause of a past event."
    ],
    correct: 0
  },
  {
    topic: "Diagnostic Analytics",
    question: "When performing Diagnostic Analytics, what is the key question being asked?",
    options: [
      "What will happen next?",
      "How can we make it happen?",
      "Why did it happen?",
      "What is happening right now?"
    ],
    correct: 2
  },
  {
    topic: "Predictive Modelling",
    question: "Which technique is most commonly associated with Predictive Modelling?",
    options: [
      "Data Aggregation and Mining",
      "Regression Analysis and Forecasting",
      "Optimization and Simulation",
      "Root Cause Analysis"
    ],
    correct: 1
  },
  {
    topic: "Prescriptive Analytics",
    question: "Prescriptive Analytics differs from Predictive Analytics by:",
    options: [
      "Focusing solely on historical data.",
      "Providing probabilistic forecasts only.",
      "Suggesting decision options and showing their implications.",
      "Visualizing data for better readability."
    ],
    correct: 2
  },
  {
    topic: "Big Data Architecture",
    question: "In Big Data Architecture, what is the primary purpose of a 'Data Lake'?",
    options: [
      "Storing structured data for transactional processing.",
      "Storing vast amounts of raw data in its native format.",
      "Visualizing real-time data streams.",
      "Caching frequently accessed database queries."
    ],
    correct: 1
  },
  {
    topic: "Machine Learning Concepts",
    question: "What is 'Overfitting' in the context of Machine Learning models?",
    options: [
      "The model performs poorly on both training and test data.",
      "The model learns the training data too well, including noise, failing to generalize.",
      "The model is too simple to capture the underlying structure of the data.",
      "The model requires too much computational power to train."
    ],
    correct: 1
  },
  {
    topic: "Data Visualization",
    question: "Which principle is crucial for effective Data Visualization?",
    options: [
      "Maximizing the 'data-ink' ratio.",
      "Using as many colors as possible to distinguish categories.",
      "Always using 3D charts for better depth.",
      "Including every available data point on a single chart."
    ],
    correct: 0
  },
  {
    topic: "Statistical Significance",
    question: "What does a P-value indicate in hypothesis testing?",
    options: [
      "The probability that the null hypothesis is true.",
      "The exact probability of the alternative hypothesis.",
      "The probability of observing the results assuming the null hypothesis is true.",
      "The magnitude of the effect size."
    ],
    correct: 2
  },
  {
    topic: "Ethics in AI",
    question: "Which of the following is a major concern regarding Ethics in AI?",
    options: [
      "AI models processing data too slowly.",
      "Algorithmic bias reinforcing historical inequalities.",
      "AI replacing all human jobs immediately.",
      "The cost of cloud storage for AI models."
    ],
    correct: 1
  },
  {
    topic: "Cloud Computing",
    question: "What is a key benefit of 'Elasticity' in Cloud Computing for data analytics?",
    options: [
      "Permanent storage of data on physical tapes.",
      "The ability to scale resources up or down based on demand.",
      "Fixed pricing regardless of usage.",
      "Manual allocation of server racks."
    ],
    correct: 1
  },
  {
    topic: "Data Cleaning",
    question: "What is the primary goal of 'Imputation' in data preprocessing?",
    options: [
      "Removing all rows with missing values.",
      "Replacing missing data with substituted values.",
      "Normalizing the scale of numeric features.",
      "Encoding categorical variables."
    ],
    correct: 1
  },
  {
    topic: "Deep Learning",
    question: "Which neural network architecture is best suited for image recognition?",
    options: [
      "Recurrent Neural Networks (RNN)",
      "Convolutional Neural Networks (CNN)",
      "Multilayer Perceptrons (MLP)",
      "K-Means Clustering"
    ],
    correct: 1
  },
  {
    topic: "NLP",
    question: "In Natural Language Processing, what does 'Tokenization' refer to?",
    options: [
      "Translating text from one language to another.",
      "Breaking down text into smaller units like words or subwords.",
      "Assigning sentiment scores to sentences.",
      "Generating new text from a prompt."
    ],
    correct: 1
  },
  {
    topic: "A/B Testing",
    question: "What is the purpose of the 'Control Group' in an A/B test?",
    options: [
      "To receive the new feature being tested.",
      "To provide a baseline for comparison against the variant.",
      "To ensure the sample size is large enough.",
      "To eliminate outliers from the dataset."
    ],
    correct: 1
  }
];

// Helper to generate mock analytics questions
const generateQuestions = (layer: number): Question[] => {
  // Use layer number to offset into the topics array so layers look different
  const layerOffset = (layer - 1) * 3;
  
  return Array.from({ length: 10 }).map((_, i) => {
    // Cycle through topics
    const templateIndex = (layerOffset + i) % ANALYTICS_TOPICS.length;
    const template = ANALYTICS_TOPICS[templateIndex];
    
    // We can add slight variation to text based on layer to make it feel unique
    const variantText = `Layer ${layer} Challenge: ${template.question}`;

    return {
      id: `L${layer}-Q${i}`,
      text: variantText,
      options: template.options, // These now correspond specifically to the question
      correctIndex: template.correct,
      explanation: `This relates to the core concept of ${template.topic}.`
    };
  });
};

export const MOCK_LAYERS: LayerData[] = Array.from({ length: 7 }).map((_, i) => ({
  layerId: i + 1,
  name: `Chakravyuh Layer ${i + 1}`,
  questions: generateQuestions(i + 1)
}));

export const WAR_AMBIENCE_VOLUME = 0.3;
export const MUSIC_VOLUME = 0.4;
