// ============================================================================
// GAME MATH QUESTIONS REPOSITORY
// High School / College-Prep Curriculum: Calculus, Trigonometry, Statistics, Geometry
// Designed for fast-paced math gameplay across all games
// ============================================================================

export type MathCurriculumTopic = 'kalkulus' | 'trigonometri' | 'statistika' | 'geometri';

export interface GameMathQuestion {
  id: string;
  topic: MathCurriculumTopic;
  topicLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ----------------------------------------------------------------------------
// CURATED QUESTIONS POOL (60 Questions: 15 per topic)
// ----------------------------------------------------------------------------
export const GAME_MATH_QUESTIONS: GameMathQuestion[] = [
  // ==========================================================================
  // 1. CALCULUS (Derivatives, Limits, Integrals)
  // ==========================================================================
  {
    id: 'kal-1',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'If f(x) = 3x² - 5x + 2, what is f\'(2)?',
    options: ['7', '5', '8', '11'],
    correctIndex: 0,
    explanation: 'f\'(x) = 6x - 5. Thus f\'(2) = 6(2) - 5 = 12 - 5 = 7.'
  },
  {
    id: 'kal-2',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'If f(x) = x³ - 4x, what is f\'(3)?',
    options: ['23', '21', '25', '19'],
    correctIndex: 0,
    explanation: 'f\'(x) = 3x² - 4. Thus f\'(3) = 3(9) - 4 = 27 - 4 = 23.'
  },
  {
    id: 'kal-3',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'What is the derivative of f(x) = 5x⁴?',
    options: ['20x³', '20x⁴', '15x³', '5x³'],
    correctIndex: 0,
    explanation: 'd/dx (5x⁴) = 5 · 4x³ = 20x³.'
  },
  {
    id: 'kal-4',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate lim (x→0) [sin(6x) / (2x)] = ?',
    options: ['3', '6', '2', '0'],
    correctIndex: 0,
    explanation: 'lim (x→0) [sin(ax) / (bx)] = a/b = 6/2 = 3.'
  },
  {
    id: 'kal-5',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate lim (x→0) [tan(8x) / (4x)] = ?',
    options: ['2', '4', '8', '1/2'],
    correctIndex: 0,
    explanation: 'lim (x→0) [tan(ax) / (bx)] = a/b = 8/4 = 2.'
  },
  {
    id: 'kal-6',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate lim (x→2) [(x² - 4) / (x - 2)] = ?',
    options: ['4', '2', '0', '6'],
    correctIndex: 0,
    explanation: '(x - 2)(x + 2) / (x - 2) = x + 2. At x = 2 ⟹ 2 + 2 = 4.'
  },
  {
    id: 'kal-7',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate lim (x→3) [(x² - 9) / (x - 3)] = ?',
    options: ['6', '3', '9', '0'],
    correctIndex: 0,
    explanation: '(x - 3)(x + 3) / (x - 3) = x + 3. At x = 3 ⟹ 3 + 3 = 6.'
  },
  {
    id: 'kal-8',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate ∫ 6x² dx = ?',
    options: ['2x³ + C', '3x³ + C', '6x³ + C', '12x + C'],
    correctIndex: 0,
    explanation: '∫ 6x² dx = (6/3)x³ + C = 2x³ + C.'
  },
  {
    id: 'kal-9',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate ∫ (4x + 3) dx = ?',
    options: ['2x² + 3x + C', '4x² + 3x + C', '2x² + C', '4x² + C'],
    correctIndex: 0,
    explanation: '∫ (4x + 3) dx = 2x² + 3x + C.'
  },
  {
    id: 'kal-10',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate the definite integral ∫₀² 3x² dx = ?',
    options: ['8', '6', '12', '4'],
    correctIndex: 0,
    explanation: 'F(x) = x³. F(2) - F(0) = 2³ - 0 = 8.'
  },
  {
    id: 'kal-11',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate the definite integral ∫₀¹ (2x + 1) dx = ?',
    options: ['2', '1', '3', '4'],
    correctIndex: 0,
    explanation: 'F(x) = x² + x. F(1) - F(0) = (1 + 1) - 0 = 2.'
  },
  {
    id: 'kal-12',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'What is the derivative of f(x) = sin(x)?',
    options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'],
    correctIndex: 0,
    explanation: 'd/dx (sin(x)) = cos(x).'
  },
  {
    id: 'kal-13',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'What is the derivative of f(x) = cos(x)?',
    options: ['-sin(x)', 'sin(x)', '-cos(x)', 'tan(x)'],
    correctIndex: 0,
    explanation: 'd/dx (cos(x)) = -sin(x).'
  },
  {
    id: 'kal-14',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'The stationary point f\'(x) = 0 for f(x) = 2x³ - 6x occurs when x² = ?',
    options: ['1', '2', '3', '0'],
    correctIndex: 0,
    explanation: 'f\'(x) = 6x² - 6 = 0 ⟹ 6x² = 6 ⟹ x² = 1.'
  },
  {
    id: 'kal-15',
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: 'Evaluate lim (x→∞) [(4x² + 3) / (2x² - 5)] = ?',
    options: ['2', '4', '∞', '0'],
    correctIndex: 0,
    explanation: 'Ratio of leading coefficients = 4 / 2 = 2.'
  },

  // ==========================================================================
  // 2. TRIGONOMETRY (Special Angles, Identities, Triangles)
  // ==========================================================================
  {
    id: 'trig-1',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of sin(30°)?',
    options: ['1/2', '√3/2', '1', '0'],
    correctIndex: 0,
    explanation: 'Special angle ratio: sin(30°) = 1/2.'
  },
  {
    id: 'trig-2',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of cos(60°)?',
    options: ['1/2', '√3/2', '√2/2', '0'],
    correctIndex: 0,
    explanation: 'Special angle ratio: cos(60°) = 1/2.'
  },
  {
    id: 'trig-3',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of tan(45°)?',
    options: ['1', '0', '√3', '1/2'],
    correctIndex: 0,
    explanation: 'Special angle ratio: tan(45°) = sin(45°) / cos(45°) = 1.'
  },
  {
    id: 'trig-4',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of sin(90°)?',
    options: ['1', '0', '1/2', '-1'],
    correctIndex: 0,
    explanation: 'Special angle ratio: sin(90°) = 1.'
  },
  {
    id: 'trig-5',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of cos(0°)?',
    options: ['1', '0', '-1', '1/2'],
    correctIndex: 0,
    explanation: 'Special angle ratio: cos(0°) = 1.'
  },
  {
    id: 'trig-6',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of sin(150°)?',
    options: ['1/2', '-1/2', '√3/2', '-√3/2'],
    correctIndex: 0,
    explanation: 'sin(150°) = sin(180° - 30°) = sin(30°) = 1/2 (Quadrant II is positive).'
  },
  {
    id: 'trig-7',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of cos(120°)?',
    options: ['-1/2', '1/2', '-√3/2', '√3/2'],
    correctIndex: 0,
    explanation: 'cos(120°) = cos(180° - 60°) = -cos(60°) = -1/2.'
  },
  {
    id: 'trig-8',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'Pythagorean trigonometric identity: sin²(x) + cos²(x) = ?',
    options: ['1', '0', '2', 'tan²(x)'],
    correctIndex: 0,
    explanation: 'Fundamental identity: sin²(x) + cos²(x) = 1.'
  },
  {
    id: 'trig-9',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of tan(60°)?',
    options: ['√3', '1/√3', '1', '√2'],
    correctIndex: 0,
    explanation: 'Special angle ratio: tan(60°) = √3.'
  },
  {
    id: 'trig-10',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'In a right triangle with opposite = 3 and hypotenuse = 5, what is sin(θ)?',
    options: ['3/5', '4/5', '3/4', '5/3'],
    correctIndex: 0,
    explanation: 'sin(θ) = opposite / hypotenuse = 3/5.'
  },
  {
    id: 'trig-11',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'In a right triangle with opposite = 3 and hypotenuse = 5, what is cos(θ)?',
    options: ['4/5', '3/5', '3/4', '4/3'],
    correctIndex: 0,
    explanation: 'Adjacent side = √(5² - 3²) = 4. cos(θ) = adjacent / hypotenuse = 4/5.'
  },
  {
    id: 'trig-12',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'In a right triangle with opposite = 6 and adjacent = 8, what is tan(θ)?',
    options: ['3/4', '4/3', '3/5', '4/5'],
    correctIndex: 0,
    explanation: 'tan(θ) = opposite / adjacent = 6/8 = 3/4.'
  },
  {
    id: 'trig-13',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of 2 · sin(30°) · cos(30°)?',
    options: ['√3/2', '1/2', '1', '√2/2'],
    correctIndex: 0,
    explanation: 'Double angle identity sin(2A) = sin(60°) = √3/2.'
  },
  {
    id: 'trig-14',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'What is the value of cos(90°)?',
    options: ['0', '1', '-1', '1/2'],
    correctIndex: 0,
    explanation: 'Special angle ratio: cos(90°) = 0.'
  },
  {
    id: 'trig-15',
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: 'Trigonometric identity: 1 + tan²(x) is equal to...?',
    options: ['sec²(x)', 'csc²(x)', 'cot²(x)', 'cos²(x)'],
    correctIndex: 0,
    explanation: '1 + tan²(x) = sec²(x).'
  },

  // ==========================================================================
  // 3. STATISTICS (Mean, Median, Mode, Probability, Combinatorics)
  // ==========================================================================
  {
    id: 'stat-1',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'What is the mean of the data set: 4, 6, 8, 10, 12?',
    options: ['8', '7', '9', '10'],
    correctIndex: 0,
    explanation: 'Sum = 40. n = 5. Mean = 40 / 5 = 8.'
  },
  {
    id: 'stat-2',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'What is the mean of the data set: 5, 7, 8, 10, 15?',
    options: ['9', '8', '10', '8.5'],
    correctIndex: 0,
    explanation: 'Sum = 45. n = 5. Mean = 45 / 5 = 9.'
  },
  {
    id: 'stat-3',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'What is the median of the data set: 3, 5, 7, 9, 11?',
    options: ['7', '5', '8', '9'],
    correctIndex: 0,
    explanation: 'The middle value (3rd item) is 7.'
  },
  {
    id: 'stat-4',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'What is the median of the ordered data set: 4, 6, 8, 12?',
    options: ['7', '6', '8', '7.5'],
    correctIndex: 0,
    explanation: 'Median = (6 + 8) / 2 = 14 / 2 = 7.'
  },
  {
    id: 'stat-5',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'What is the mode of the data set: 2, 3, 3, 5, 7, 7, 7, 8?',
    options: ['7', '3', '5', '8'],
    correctIndex: 0,
    explanation: 'The number 7 occurs most frequently (3 times).'
  },
  {
    id: 'stat-6',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'What is the range of the data set: 5, 8, 12, 15, 23?',
    options: ['18', '15', '20', '12'],
    correctIndex: 0,
    explanation: 'Range = Maximum - Minimum = 23 - 5 = 18.'
  },
  {
    id: 'stat-7',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'A fair 6-sided die is rolled. Probability of rolling an even number (2, 4, 6) = ?',
    options: ['1/2', '1/3', '1/6', '2/3'],
    correctIndex: 0,
    explanation: '3 favorable outcomes out of 6. Probability = 3/6 = 1/2.'
  },
  {
    id: 'stat-8',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'A fair 6-sided die is rolled. Probability of rolling a prime number (2, 3, 5) = ?',
    options: ['1/2', '1/3', '2/3', '1/6'],
    correctIndex: 0,
    explanation: 'Prime outcomes on die: 2, 3, 5 (3 outcomes). Probability = 3/6 = 1/2.'
  },
  {
    id: 'stat-9',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'Two fair coins are flipped. What is the probability of getting two Heads (HH)?',
    options: ['1/4', '1/2', '3/4', '1/8'],
    correctIndex: 0,
    explanation: 'Sample space: {HH, HT, TH, TT} (4 outcomes). Probability of HH = 1/4.'
  },
  {
    id: 'stat-10',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'Evaluate ₅P₂ (Permutation of 2 from 5 items) = ?',
    options: ['20', '10', '25', '15'],
    correctIndex: 0,
    explanation: '₅P₂ = 5 × 4 = 20.'
  },
  {
    id: 'stat-11',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'Evaluate ₅C₂ (Combination of 2 from 5 items) = ?',
    options: ['10', '20', '15', '5'],
    correctIndex: 0,
    explanation: '₅C₂ = (5 × 4) / (2 × 1) = 20 / 2 = 10.'
  },
  {
    id: 'stat-12',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'Evaluate ₄C₂ (Combination of 2 from 4 items) = ?',
    options: ['6', '8', '12', '4'],
    correctIndex: 0,
    explanation: '₄C₂ = (4 × 3) / (2 × 1) = 12 / 2 = 6.'
  },
  {
    id: 'stat-13',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'If the average of 4 numbers is 15, what is their total sum?',
    options: ['60', '45', '75', '50'],
    correctIndex: 0,
    explanation: 'Total sum = 4 × 15 = 60.'
  },
  {
    id: 'stat-14',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'The second quartile (Q₂) of a data set is equivalent to the...?',
    options: ['Median', 'Mean', 'Mode', 'Range'],
    correctIndex: 0,
    explanation: 'Q₂ divides the ordered data set into two equal halves (the Median).'
  },
  {
    id: 'stat-15',
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: 'If the probability of event A is P(A) = 0.35, what is P(A\')?',
    options: ['0.65', '0.35', '0.70', '0.50'],
    correctIndex: 0,
    explanation: 'P(A\') = 1 - P(A) = 1 - 0.35 = 0.65.'
  },

  // ==========================================================================
  // 4. GEOMETRY (Pythagoras, Angles, Plane Shapes, 3D Geometry)
  // ==========================================================================
  {
    id: 'geo-1',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'A right triangle has legs of 6 cm and 8 cm. What is the hypotenuse?',
    options: ['10 cm', '12 cm', '14 cm', '9 cm'],
    correctIndex: 0,
    explanation: 'c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.'
  },
  {
    id: 'geo-2',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'A right triangle has legs of 5 cm and 12 cm. What is the hypotenuse?',
    options: ['13 cm', '15 cm', '17 cm', '14 cm'],
    correctIndex: 0,
    explanation: 'c = √(5² + 12²) = √(25 + 144) = √169 = 13 cm.'
  },
  {
    id: 'geo-3',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'A cube has edge length 6 cm. What is the length of its space diagonal (s√3)?',
    options: ['6√3 cm', '6√2 cm', '12 cm', '18 cm'],
    correctIndex: 0,
    explanation: 'Space diagonal of cube = s√3 = 6√3 cm.'
  },
  {
    id: 'geo-4',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'A cube has edge length 8 cm. What is the length of its face diagonal (s√2)?',
    options: ['8√2 cm', '8√3 cm', '16 cm', '4√2 cm'],
    correctIndex: 0,
    explanation: 'Face diagonal of cube = s√2 = 8√2 cm.'
  },
  {
    id: 'geo-5',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'What is the sum of the interior angles of a triangle?',
    options: ['180°', '360°', '90°', '270°'],
    correctIndex: 0,
    explanation: 'The interior angles of any planar triangle sum to 180°.'
  },
  {
    id: 'geo-6',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'Two angles are supplementary. If angle A = 70°, what is angle B?',
    options: ['110°', '20°', '90°', '120°'],
    correctIndex: 0,
    explanation: 'Supplementary angles sum to 180°. Angle B = 180° - 70° = 110°.'
  },
  {
    id: 'geo-7',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'Two angles are complementary. If angle A = 35°, what is angle B?',
    options: ['55°', '145°', '65°', '45°'],
    correctIndex: 0,
    explanation: 'Complementary angles sum to 90°. Angle B = 90° - 35° = 55°.'
  },
  {
    id: 'geo-8',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'A square has perimeter 36 cm. What is its area?',
    options: ['81 cm²', '72 cm²', '64 cm²', '100 cm²'],
    correctIndex: 0,
    explanation: 'Side length s = 36 / 4 = 9 cm. Area = 9² = 81 cm².'
  },
  {
    id: 'geo-9',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'A square has area 64 cm². What is its perimeter?',
    options: ['32 cm', '16 cm', '24 cm', '64 cm'],
    correctIndex: 0,
    explanation: 'Side length s = √64 = 8 cm. Perimeter = 4 × 8 = 32 cm.'
  },
  {
    id: 'geo-10',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'A cube has edge length 5 cm. What is its volume?',
    options: ['125 cm³', '150 cm³', '100 cm³', '25 cm³'],
    correctIndex: 0,
    explanation: 'Volume = s³ = 5³ = 125 cm³.'
  },
  {
    id: 'geo-11',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'The area of a circle with radius r = 7 cm (π = 22/7) is...?',
    options: ['154 cm²', '44 cm²', '144 cm²', '88 cm²'],
    correctIndex: 0,
    explanation: 'Area = π · r² = (22/7) · 7 · 7 = 154 cm².'
  },
  {
    id: 'geo-12',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'The circumference of a circle with radius r = 7 cm (π = 22/7) is...?',
    options: ['44 cm', '88 cm', '154 cm', '22 cm'],
    correctIndex: 0,
    explanation: 'Circumference = 2 · π · r = 2 · (22/7) · 7 = 44 cm.'
  },
  {
    id: 'geo-13',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'How many edges does a cube have?',
    options: ['12', '8', '6', '16'],
    correctIndex: 0,
    explanation: 'A cube has 12 edges, 6 faces, and 8 vertices.'
  },
  {
    id: 'geo-14',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'How many vertices does a cube have?',
    options: ['8', '6', '12', '10'],
    correctIndex: 0,
    explanation: 'A cube has 8 vertices.'
  },
  {
    id: 'geo-15',
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: 'The area of a triangle with base 10 cm and height 12 cm is...?',
    options: ['60 cm²', '120 cm²', '50 cm²', '72 cm²'],
    correctIndex: 0,
    explanation: 'Area = 1/2 · base · height = 1/2 · 10 · 12 = 60 cm².'
  }
];

// ----------------------------------------------------------------------------
// DYNAMIC GENERATOR: DYNAMICALLY CREATES FRESH QUESTIONS FOR ENDLESS GAMEPLAY
// ----------------------------------------------------------------------------
function generateDynamicCalculus(): GameMathQuestion {
  const types = ['deriv_poly', 'limit_poly', 'integral_power', 'trig_limit'];
  const t = types[Math.floor(Math.random() * types.length)];
  const id = `dyn-kal-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (t === 'deriv_poly') {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 7) + 1;
    const xVal = Math.floor(Math.random() * 4) + 1;
    const ans = 2 * a * xVal + b;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'kalkulus',
      topicLabel: 'Calculus',
      question: `If f(x) = ${a}x² + ${b}x, what is f'(${xVal})?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `f'(x) = ${2 * a}x + ${b}. Thus f'(${xVal}) = ${2 * a}(${xVal}) + ${b} = ${ans}.`
    };
  }

  if (t === 'limit_poly') {
    const root = Math.floor(Math.random() * 5) + 2;
    const ans = root * 2;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'kalkulus',
      topicLabel: 'Calculus',
      question: `Evaluate lim (x→${root}) [(x² - ${root * root}) / (x - ${root})] = ?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Factor (x - ${root})(x + ${root}) / (x - ${root}) = x + ${root}. At x = ${root} ⟹ ${root} + ${root} = ${ans}.`
    };
  }

  if (t === 'integral_power') {
    const coeff = (Math.floor(Math.random() * 4) + 1) * 3;
    const a = coeff / 3;
    return {
      id,
      topic: 'kalkulus',
      topicLabel: 'Calculus',
      question: `Evaluate ∫ ${coeff}x² dx = ?`,
      options: [`${a}x³ + C`, `${coeff}x³ + C`, `${a * 2}x² + C`, `${a}x + C`],
      correctIndex: 0,
      explanation: `∫ ${coeff}x² dx = (${coeff}/3)x³ + C = ${a}x³ + C.`
    };
  }

  const k = Math.floor(Math.random() * 6) + 2;
  const m = Math.floor(Math.random() * 3) + 1;
  const ans = k * m;
  const opts = makeDistinctOptions(ans, 4);
  return {
    id,
    topic: 'kalkulus',
    topicLabel: 'Calculus',
    question: `Evaluate lim (x→0) [sin(${ans}x) / (${m}x)] = ?`,
    options: opts.options,
    correctIndex: opts.correctIndex,
    explanation: `lim (x→0) [sin(ax) / (bx)] = a/b = ${ans}/${m} = ${k}.`
  };
}

function generateDynamicTrig(): GameMathQuestion {
  const specials = [
    { name: 'sin(30°)', val: '1/2', fakes: ['√3/2', '√2/2', '1'] },
    { name: 'cos(60°)', val: '1/2', fakes: ['√3/2', '√2/2', '0'] },
    { name: 'sin(60°)', val: '√3/2', fakes: ['1/2', '√2/2', '1'] },
    { name: 'cos(30°)', val: '√3/2', fakes: ['1/2', '√2/2', '0'] },
    { name: 'tan(45°)', val: '1', fakes: ['0', '√3', '1/2'] },
    { name: 'sin(90°)', val: '1', fakes: ['0', '1/2', '-1'] },
    { name: 'cos(0°)', val: '1', fakes: ['0', '-1', '1/2'] },
    { name: 'cos(90°)', val: '0', fakes: ['1', '-1', '1/2'] },
    { name: 'sin(0°)', val: '0', fakes: ['1', '1/2', '-1'] }
  ];

  const pick = specials[Math.floor(Math.random() * specials.length)];
  const shuffled = shuffleWithIndex([pick.val, ...pick.fakes], 0);

  return {
    id: `dyn-trig-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    topic: 'trigonometri',
    topicLabel: 'Trigonometry',
    question: `What is the value of ${pick.name}?`,
    options: shuffled.options,
    correctIndex: shuffled.correctIndex,
    explanation: `Special trigonometric angle ratio: ${pick.name} = ${pick.val}.`
  };
}

function generateDynamicStats(): GameMathQuestion {
  const types = ['mean', 'range', 'comb'];
  const t = types[Math.floor(Math.random() * types.length)];
  const id = `dyn-stat-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (t === 'mean') {
    const base = Math.floor(Math.random() * 10) + 5;
    const diff = Math.floor(Math.random() * 3) + 1;
    const nums = [base - 2 * diff, base - diff, base, base + diff, base + 2 * diff];
    const ans = base;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'statistika',
      topicLabel: 'Statistics',
      question: `What is the mean of the data set: ${nums.join(', ')}?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Total sum = ${nums.reduce((a, b) => a + b, 0)}. Divided by 5 = ${ans}.`
    };
  }

  if (t === 'range') {
    const minVal = Math.floor(Math.random() * 10) + 2;
    const maxVal = minVal + Math.floor(Math.random() * 20) + 8;
    const mid1 = minVal + Math.floor(Math.random() * 5) + 1;
    const mid2 = minVal + Math.floor(Math.random() * 5) + 6;
    const ans = maxVal - minVal;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'statistika',
      topicLabel: 'Statistics',
      question: `What is the range of the data set: ${minVal}, ${mid1}, ${mid2}, ${maxVal}?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Range = Max - Min = ${maxVal} - ${minVal} = ${ans}.`
    };
  }

  const n = Math.floor(Math.random() * 5) + 4;
  const ans = (n * (n - 1)) / 2;
  const opts = makeDistinctOptions(ans, 4);
  return {
    id,
    topic: 'statistika',
    topicLabel: 'Statistics',
    question: `Evaluate ₂C_${n} (choosing 2 from ${n} objects) = ?`,
    options: opts.options,
    correctIndex: opts.correctIndex,
    explanation: `${n}C₂ = (${n} × ${n - 1}) / 2 = ${ans}.`
  };
}

function generateDynamicGeometry(): GameMathQuestion {
  const pythagorasTriples = [
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 8, c: 10 },
    { a: 5, b: 12, c: 13 },
    { a: 9, b: 12, c: 15 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 }
  ];

  const types = ['pythagoras', 'cube_diag', 'angles', 'rect_area'];
  const t = types[Math.floor(Math.random() * types.length)];
  const id = `dyn-geo-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (t === 'pythagoras') {
    const trip = pythagorasTriples[Math.floor(Math.random() * pythagorasTriples.length)];
    const opts = makeDistinctOptions(trip.c, 4, ' cm');
    return {
      id,
      topic: 'geometri',
      topicLabel: 'Geometry',
      question: `A right triangle has legs of ${trip.a} cm and ${trip.b} cm. Hypotenuse = ...?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `c = √(${trip.a}² + ${trip.b}²) = √(${trip.a * trip.a + trip.b * trip.b}) = ${trip.c} cm.`
    };
  }

  if (t === 'cube_diag') {
    const s = Math.floor(Math.random() * 8) + 3;
    const ans = `${s}√3 cm`;
    const fakes = [`${s}√2 cm`, `${s * 2} cm`, `${s + 3} cm`];
    const shuffled = shuffleWithIndex([ans, ...fakes], 0);
    return {
      id,
      topic: 'geometri',
      topicLabel: 'Geometry',
      question: `A cube has edge length ${s} cm. What is its space diagonal?`,
      options: shuffled.options,
      correctIndex: shuffled.correctIndex,
      explanation: `Space diagonal of cube = s√3 = ${s}√3 cm.`
    };
  }

  if (t === 'angles') {
    const ang = Math.floor(Math.random() * 50) + 25;
    const ans = 180 - ang;
    const opts = makeDistinctOptions(ans, 4, '°');
    return {
      id,
      topic: 'geometri',
      topicLabel: 'Geometry',
      question: `Two angles are supplementary. If angle A = ${ang}°, angle B = ...?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Supplementary angles sum to 180°. Angle B = 180° - ${ang}° = ${ans}°.`
    };
  }

  const p = Math.floor(Math.random() * 10) + 5;
  const l = Math.floor(Math.random() * 6) + 3;
  const ans = p * l;
  const opts = makeDistinctOptions(ans, 4, ' cm²');
  return {
    id,
    topic: 'geometri',
    topicLabel: 'Geometry',
    question: `What is the area of a rectangle with length ${p} cm and width ${l} cm?`,
    options: opts.options,
    correctIndex: opts.correctIndex,
    explanation: `Area = length × width = ${p} × ${l} = ${ans} cm².`
  };
}

// Helper: Make 4 unique options from a correct numeric answer
function makeDistinctOptions(correct: number, count: number = 4, suffix: string = ''): { options: string[]; correctIndex: number } {
  const set = new Set<number>([correct]);
  while (set.size < count) {
    const delta = (Math.floor(Math.random() * 6) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const fake = correct + delta;
    if (fake >= 0) set.add(fake);
  }
  const nums = Array.from(set).sort(() => Math.random() - 0.5);
  const correctIndex = nums.indexOf(correct);
  return {
    options: nums.map(n => `${n}${suffix}`),
    correctIndex
  };
}

// Helper: Shuffle array and return new correctIndex
function shuffleWithIndex(arr: string[], correctOriginalIdx: number = 0): { options: string[]; correctIndex: number } {
  const correctVal = arr[correctOriginalIdx];
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(correctVal)
  };
}

// ----------------------------------------------------------------------------
// MAIN EXPORTED RANDOM GETTER
// ----------------------------------------------------------------------------
export function getRandomGameQuestion(filterTopic?: MathCurriculumTopic): GameMathQuestion {
  const topics: MathCurriculumTopic[] = ['kalkulus', 'trigonometri', 'statistika', 'geometri'];
  const chosenTopic: MathCurriculumTopic = filterTopic && topics.includes(filterTopic)
    ? filterTopic
    : topics[Math.floor(Math.random() * topics.length)];

  const useCurated = Math.random() < 0.6;

  if (useCurated) {
    const curatedFiltered = GAME_MATH_QUESTIONS.filter(q => q.topic === chosenTopic);
    if (curatedFiltered.length > 0) {
      const q = curatedFiltered[Math.floor(Math.random() * curatedFiltered.length)];
      const shuffled = shuffleWithIndex(q.options, q.correctIndex);
      return {
        ...q,
        options: shuffled.options,
        correctIndex: shuffled.correctIndex
      };
    }
  }

  switch (chosenTopic) {
    case 'kalkulus':
      return generateDynamicCalculus();
    case 'trigonometri':
      return generateDynamicTrig();
    case 'statistika':
      return generateDynamicStats();
    case 'geometri':
      return generateDynamicGeometry();
    default:
      return generateDynamicCalculus();
  }
}
