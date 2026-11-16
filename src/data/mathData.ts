export interface KeyFormula {
  name: string;
  formula: string;
  desc: string;
  note?: string;
}

export interface ExampleProblem {
  question: string;
  level?: 'Basic' | 'Intermediate' | 'Advanced';
  steps: string[];
  answer: string;
  tips?: string;
}

export interface PracticeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MathTopic {
  id: string;
  grade: 10 | 11 | 12;
  title: string;
  category: 'Geometry' | 'Statistics' | 'Combinatorics & Probability' | 'Calculus' | 'Algebra & Matrices' | 'Sequences & Series' | 'Trigonometry' | 'Financial & Logic';
  icon: string;
  color: string;
  accentColor: string;
  readTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  detailedOverview: string;
  coreConcepts: {
    title: string;
    points: string[];
  }[];
  keyFormulas: KeyFormula[];
  examples: ExampleProblem[];
  quickQuiz: PracticeQuestion[];
  example?: {
    question: string;
    steps: string[];
    answer: string;
  };
}

export interface Question {
  id: number;
  grade: 10 | 11 | 12;
  topicId: string;
  topicTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// ============================================================================
// KELAS 10 (SMA / MA FASE E - KURIKULUM MERDEKA & K13)
// ============================================================================
export const MATERI_KELAS_10: MathTopic[] = [
  {
    id: 'grade-10-exponents',
    grade: 10,
    title: 'Exponents & Logarithms',
    category: 'Algebra & Matrices',
    icon: '⚡',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '14 Mins',
    difficulty: 'Easy',
    summary: 'Properties of rational exponents, exponential equations & inequalities, logarithm properties, and growth/decay applications.',
    detailedOverview: 'Exponents and logarithms are inverse operations that are very fundamental. This concept is widely used in modeling radioactive decay, bacterial growth, calculating compound interest, as well as decibel and earthquake (Richter) scales.',
    coreConcepts: [
      {
        title: '1. Properties of Powers & Exponents',
        points: [
          'Multiplication with same base: aᵐ · aⁿ = aᵐ⁺ⁿ.',
          'Division with same base: aᵐ : aⁿ = aᵐ⁻ⁿ (where a ≠ 0).',
          'Power of a power: (aᵐ)ⁿ = aᵐⁿ.',
          'Power of a product: (a · b)ⁿ = aⁿ · bⁿ.',
          'Negative & fractional powers: a⁻ⁿ = 1 / aⁿ and a^(m/n) = ⁿ√(aᵐ).'
        ]
      },
      {
        title: '2. Definition & Properties of Logarithms',
        points: [
          'Basic definition: ᵃlog b = c ⟺ aᶜ = b (base a > 0, a ≠ 1 and argument b > 0).',
          'Addition: ᵃlog x + ᵃlog y = ᵃlog(x · y).',
          'Subtraction: ᵃlog x - ᵃlog y = ᵃlog(x / y).',
          'Power rule: ᵃlog(xⁿ) = n · ᵃlog x.',
          'Change of base: ᵃlog b = (ᶜlog b) / (ᶜlog a) = 1 / (ᵇlog a).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Product & Quotient Rule for Exponents',
        formula: 'aᵐ · aⁿ = aᵐ⁺ⁿ  |  aᵐ : aⁿ = aᵐ⁻ⁿ',
        desc: 'Simplify exponents by adding/subtracting powers on the same base.'
      },
      {
        name: 'Definition of Logarithm',
        formula: 'ᵃlog b = c  ⟺  aᶜ = b',
        desc: 'Relates exponential and logarithmic forms.'
      },
      {
        name: 'Chain Rule for Logarithms',
        formula: 'ᵃlog b · ᵇlog c = ᵃlog c',
        desc: 'Simplifies multiplication of logarithms with chained bases.'
      }
    ],
    examples: [
      {
        question: 'Determine the solution set of the exponential equation 3^(2x - 1) = 81.',
        level: 'Basic',
        steps: [
          'Change the right side to base 3: 81 = 3⁴.',
          'Equate the exponents: 2x - 1 = 4.',
          'Solve algebraically: 2x = 5 ⟹ x = 5/2 = 2.5.'
        ],
        answer: 'x = 5/2',
        tips: 'Always convert both sides of the equation to powers with the same base.'
      },
      {
        question: "Given that ²log 3 = a and ²log 5 = b, express ⁶log 45 in terms of a and b.",
        level: "Intermediate",
        steps: [
          "Apply the change-of-base rule to base 2: ⁶log 45 = (²log 45) / (²log 6).",
          "Factor 45 and 6 into prime factors: 45 = 3² · 5 and 6 = 2 · 3.",
          "Expand the numerator: ²log(3² · 5) = 2 · ²log 3 + ²log 5 = 2a + b.",
          "Expand the denominator: ²log(2 · 3) = ²log 2 + ²log 3 = 1 + a.",
          "Combine into the final fractional expression: (2a + b) / (1 + a)."
        ],
        answer: "(2a + b) / (1 + a)",
        tips: "Use the base change formula ᶜlog b / ᶜlog a with the common base 2 of the given logarithms."
      }
    ],
    quickQuiz: [
      {
        question: 'The value of ²log 48 - ²log 3 is...',
        options: ['4', '16', '3', '8'],
        correctIndex: 0,
        explanation: '²log (48 : 3) = ²log 16 = 4 (because 2⁴ = 16).'
      }
    ]
  },
  {
    id: 'grade-10-quadratics',
    grade: 10,
    title: 'Quadratic Equations & Functions',
    category: 'Algebra & Matrices',
    icon: '📈',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '15 Mins',
    difficulty: 'Easy',
    summary: 'Factoring, quadratic formula, discriminant (D = b² - 4ac), parabola vertex, and properties of roots (Vieta\'s formulas).',
    detailedOverview: 'A quadratic function has the form f(x) = ax² + bx + c with a graph in the shape of a parabola. The value of \'a\' determines the opening direction (a > 0 opens upwards, a < 0 opens downwards), while the Discriminant (D) determines the number of x-axis intersections.',
    coreConcepts: [
      {
        title: '1. Discriminant & Types of Roots',
        points: [
          'D = b² - 4ac.',
          'D > 0: Has two distinct real roots (graph intersects the x-axis at 2 points).',
          'D = 0: Has identical real roots (graph touches the x-axis at 1 point).',
          'D < 0: No real roots / imaginary (graph does not intersect the x-axis).'
        ]
      },
      {
        title: '2. Parabola Vertex & Vieta\'s Formulas',
        points: [
          'Axis of Symmetry: x_p = -b / (2a).',
          'Optimum Value / Vertex: y_p = -D / (4a) = f(x_p).',
          'Sum of Roots: x₁ + x₂ = -b / a.',
          'Product of Roots: x₁ · x₂ = c / a.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Quadratic Formula',
        formula: 'x₁,₂ = [-b ± √(b² - 4ac)] / 2a',
        desc: 'Finds the roots of any quadratic equation.'
      },
      {
        name: 'Parabola Vertex Coordinates',
        formula: 'P = (-b / 2a, -D / 4a)',
        desc: 'The maximum or minimum turning point of the quadratic function graph.'
      }
    ],
    examples: [
      {
        question: 'Determine the maximum/minimum turning point of the quadratic function f(x) = x² - 6x + 5.',
        level: 'Basic',
        steps: [
          'Identify the coefficients: a = 1, b = -6, c = 5.',
          'Find the axis of symmetry: x_p = -(-6) : (2 · 1) = 6 : 2 = 3.',
          'Substitute x_p into f(x): y_p = (3)² - 6(3) + 5 = 9 - 18 + 5 = -4.',
          'Since a = 1 > 0, the curve opens upwards so the turning point is a minimum (3, -4).'
        ],
        answer: 'Minimum Point (3, -4)',
        tips: 'If \'a\' is positive, the curve has a minimum point; if \'a\' is negative, the curve has a maximum point.'
      },
      {
        question: "Find the vertex coordinates and the maximum value of the quadratic function f(x) = -x² + 6x - 5.",
        level: "Basic",
        steps: [
          "Identify quadratic coefficients: a = -1, b = 6, c = -5.",
          "Calculate the axis of symmetry: x_v = -b / (2a) = -6 / (2 · (-1)) = 3.",
          "Substitute x = 3 to find the optimum value: f(3) = -(3)² + 6(3) - 5 = -9 + 18 - 5 = 4.",
          "Since a = -1 < 0, the parabola opens downward, confirming a maximum at (3, 4)."
        ],
        answer: "Vertex = (3, 4), Maximum Value = 4",
        tips: "You can also verify with y_v = -D / (4a) = -(36 - 20) / (-4) = 4."
      }
    ],
    quickQuiz: [
      {
        question: 'The roots of the equation x² - 5x + 6 = 0 are...',
        options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = -6'],
        correctIndex: 0,
        explanation: 'Factor into (x - 2)(x - 3) = 0 ⟹ x = 2 or x = 3.'
      }
    ]
  },
  {
    id: 'grade-10-spltv',
    grade: 10,
    title: 'System of Linear Equations in Three Variables',
    category: 'Algebra & Matrices',
    icon: '📐',
    color: '#ffb17a',
    accentColor: '#ea580c',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Elimination, substitution, mixed elimination-substitution methods, and modeling real-world contextual problems.',
    detailedOverview: 'This system consists of three linear equations with three unknown variables (usually x, y, z). Its solution represents the intersection point of three flat planes in 3D space.',
    coreConcepts: [
      {
        title: '1. Mixed Method (Elimination-Substitution)',
        points: [
          'Step 1: Select two pairs of equations to eliminate one of the same variables, resulting in a 2-variable system.',
          'Step 2: Solve the 2-variable system to get the values of the first two variables.',
          'Step 3: Substitute the two found variable values into one of the original equations to find the third variable.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'General Form',
        formula: 'a₁x + b₁y + c₁z = d₁',
        desc: 'Standard format of a three-variable linear system.'
      }
    ],
    examples: [
      {
        question: 'Given: x + y + z = 6, 2y + z = 7, and z = 3. Determine the value of x.',
        level: 'Basic',
        steps: [
          'From the third equation, it is already known that z = 3.',
          'Substitute z = 3 into 2y + z = 7: 2y + 3 = 7 ⟹ 2y = 4 ⟹ y = 2.',
          'Substitute y = 2 and z = 3 into x + y + z = 6: x + 2 + 3 = 6 ⟹ x + 5 = 6 ⟹ x = 1.'
        ],
        answer: 'x = 1',
        tips: 'Take advantage of equations that have the fewest variables first.'
      },
      {
        question: "A shop sells notebooks (x), pens (y), and pencils (z). Ali pays $7.00 for 2 notebooks, 1 pen, and 2 pencils. Budi pays $6.00 for 1 notebook, 2 pens, and 2 pencils. Citra pays $7.50 for 3 notebooks, 1 pen, and 1 pencil. Find the unit price of each item.",
        level: "Intermediate",
        steps: [
          "Form equations: (1) 2x + y + 2z = 7.00, (2) x + 2y + 2z = 6.00, (3) 3x + y + z = 7.50.",
          "Subtract (2) from (1): (2x + y + 2z) - (x + 2y + 2z) = 1.00 ⟹ x - y = 1.00 ⟹ y = x - 1.00.",
          "Multiply (3) by 2 and subtract (1): (6x + 2y + 2z) - (2x + y + 2z) = 15.00 - 7.00 ⟹ 4x + y = 8.00.",
          "Substitute y = x - 1.00: 4x + (x - 1.00) = 8.00 ⟹ 5x = 9.00 ⟹ x = 1.80 ($1.80 for notebook).",
          "Solve for y: y = 1.80 - 1.00 = 0.80 ($0.80 for pen).",
          "Solve for z from (3): 3(1.80) + 0.80 + z = 7.50 ⟹ 6.20 + z = 7.50 ⟹ z = 1.30 ($1.30 for pencil)."
        ],
        answer: "Notebook = $1.80, Pen = $0.80, Pencil = $1.30",
        tips: "Eliminating the variable with the same coefficient (2z) immediately produces a 2-variable system."
      }
    ],
    quickQuiz: [
      {
        question: 'If x + y = 5 and x - y = 1, what are the values of x and y?',
        options: ['x = 3, y = 2', 'x = 4, y = 1', 'x = 2, y = 3', 'x = 5, y = 0'],
        correctIndex: 0,
        explanation: 'Add the two equations: 2x = 6 ⟹ x = 3. Then y = 5 - 3 = 2.'
      }
    ]
  },
  {
    id: 'grade-10-trigonometry',
    grade: 10,
    title: 'Basic Trigonometry & Triangle Rules',
    category: 'Trigonometry',
    icon: '📐',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Right-triangle trigonometric ratios (SOH CAH TOA), special angles 0°–90°, co-terminal/quadrant angles, and the Laws of Sines & Cosines.',
    detailedOverview: 'Trigonometry studies the relationships between side lengths and angles of triangles. This concept is the foundation of calculus, wave physics, astronomy, and architectural navigation.',
    coreConcepts: [
      {
        title: '1. Right Triangle Ratios (SOH CAH TOA)',
        points: [
          'Sine (sin θ) = Opposite / Hypotenuse (O/H).',
          'Cosine (cos θ) = Adjacent / Hypotenuse (A/H).',
          'Tangent (tan θ) = Opposite / Adjacent (O/A) = sin θ / cos θ.',
          'Pythagorean Identity: sin² θ + cos² θ = 1.'
        ]
      },
      {
        title: '2. Angles in the 4 Quadrants',
        points: [
          'Quadrant I (0°–90°): All functions positive (ASTC rule).',
          'Quadrant II (90°–180°): Only Sine & Cosecant are positive (sin(180° - θ) = sin θ).',
          'Quadrant III (180°–270°): Only Tangent & Cotangent are positive (tan(180° + θ) = tan θ).',
          'Quadrant IV (270°–360°): Only Cosine & Secant are positive (cos(360° - θ) = cos θ).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Law of Sines',
        formula: 'a / sin A = b / sin B = c / sin C',
        desc: 'Used when opposite side-angle pairs are known.'
      },
      {
        name: 'Law of Cosines',
        formula: 'a² = b² + c² - 2bc · cos A',
        desc: 'Finds the third side given two sides and the included angle.'
      },
      {
        name: 'Trigonometric Triangle Area',
        formula: 'Area = 1/2 · a · b · sin C',
        desc: 'Calculates the area of any triangle given two sides and the included angle.'
      }
    ],
    examples: [
      {
        question: 'In triangle ABC, side b = 6 cm, c = 8 cm, and angle A = 60°. Find the length of side a.',
        level: 'Intermediate',
        steps: [
          'Use the Law of Cosines: a² = b² + c² - 2bc cos A.',
          'a² = 6² + 8² - 2(6)(8) cos 60°.',
          'a² = 36 + 64 - 96(0.5) = 100 - 48 = 52.',
          'a = √52 = √(4 × 13) = 2√13 cm.'
        ],
        answer: 'a = 2√13 cm',
        tips: 'Remember the special angle value: cos 60° = 1/2.'
      },
      {
        question: "In triangle PQR, side p = 12 cm, angle P = 45°, and angle Q = 30°. Find the exact length of side q and the value of sin R.",
        level: "Basic",
        steps: [
          "Apply the Law of Sines: p / sin P = q / sin Q.",
          "Substitute known values: 12 / sin 45° = q / sin 30° ⟹ 12 / (1/2 √2) = q / (1/2).",
          "Cross multiply: q = 12 · (1/2) / (1/2 √2) = 12 / √2 = 6√2 cm.",
          "Find angle R: ∠R = 180° - (45° + 30°) = 105°.",
          "Apply addition formula: sin 105° = sin(60° + 45°) = sin 60° cos 45° + cos 60° sin 45° = (√6 + √2) / 4."
        ],
        answer: "q = 6√2 cm, sin R = (√6 + √2) / 4",
        tips: "Use the Law of Sines whenever two angles and one opposite side are given."
      }
    ],
    quickQuiz: [
      {
        question: 'In a right triangle, opposite side = 3 and hypotenuse = 5. What is the value of cos θ?',
        options: ['4/5', '3/5', '3/4', '5/4'],
        correctIndex: 0,
        explanation: 'Adjacent side = √(5² - 3²) = √16 = 4. Therefore cos θ = Adjacent / Hypotenuse = 4/5.'
      }
    ]
  },
  {
    id: 'grade-10-sequences',
    grade: 10,
    title: 'Sequences & Series: Arithmetic & Geometric',
    category: 'Sequences & Series',
    icon: '🔢',
    color: '#a855f7',
    accentColor: '#7e22ce',
    readTime: '15 Mins',
    difficulty: 'Easy',
    summary: 'Number patterns, general term (nth term an) and sum of first n terms (Sn) for arithmetic & geometric sequences, plus infinite geometric series.',
    detailedOverview: 'Arithmetic sequences have a common difference (d) through addition, while geometric sequences have a common ratio (r) through multiplication. This topic is essential for quantitative aptitude and calculus.',
    coreConcepts: [
      {
        title: '1. Arithmetic Sequences & Series',
        points: [
          'nth term: aₙ = a + (n - 1)d.',
          'Common difference: d = aₙ - aₙ₋₁.',
          'Sum of first n terms: Sₙ = n/2 · [2a + (n - 1)d] = n/2 · (a + aₙ).'
        ]
      },
      {
        title: '2. Geometric Sequences & Series',
        points: [
          'nth term: aₙ = a · rⁿ⁻¹.',
          'Common ratio: r = aₙ / aₙ₋₁.',
          'Sum of first n terms: Sₙ = a(rⁿ - 1) / (r - 1) for r > 1.',
          'Infinite Convergent Geometric Series (-1 < r < 1): S_∞ = a / (1 - r).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'nth Term for Arithmetic & Geometric',
        formula: 'aₙ = a + (n-1)d  |  aₙ = a · rⁿ⁻¹',
        desc: 'Formulas to find the value of the term at index n.'
      },
      {
        name: 'Infinite Geometric Series',
        formula: 'S_∞ = a / (1 - r)',
        desc: 'Calculates the infinite sum when the absolute ratio |r| < 1.'
      }
    ],
    examples: [
      {
        question: 'A ball is dropped from a height of 12 meters and bounces back to 2/3 of its previous height repeatedly until it stops. Find the total distance traveled by the ball.',
        level: 'Intermediate',
        steps: [
          'Initial downward drop: h₀ = 12 m.',
          'The ball bounces up and down repeatedly with ratio r = 2/3.',
          'Shortcut formula for bouncing ball total distance: Distance = h₀ · (b + a) / (b - a) where r = a/b = 2/3.',
          'Distance = 12 · (3 + 2) / (3 - 2) = 12 · 5 / 1 = 60 meters.'
        ],
        answer: '60 meters',
        tips: 'Shortcut for bouncing ball distance: h · (denominator + numerator) / (denominator - numerator).'
      },
      {
        question: "The 3rd term of an arithmetic progression is 11 and the 8th term is 31. Determine the first term (a), common difference (d), and the sum of the first 25 terms (S₂₅).",
        level: "Intermediate",
        steps: [
          "Form equations from u_n = a + (n - 1)d: u₃ = a + 2d = 11 and u₈ = a + 7d = 31.",
          "Subtract equations: (a + 7d) - (a + 2d) = 31 - 11 ⟹ 5d = 20 ⟹ d = 4.",
          "Find first term a: a + 2(4) = 11 ⟹ a + 8 = 11 ⟹ a = 3.",
          "Apply sum formula S₂₅ = (25 / 2) · [2(3) + (25 - 1)(4)] = (25 / 2) · [6 + 96] = (25 / 2) · 102 = 1,275."
        ],
        answer: "a = 3, d = 4, S₂₅ = 1,275",
        tips: "Direct subtraction eliminates a, allowing you to solve for common difference d immediately."
      }
    ],
    quickQuiz: [
      {
        question: 'What is the sum of the infinite geometric series 18 + 6 + 2 + ... ?',
        options: ['27', '24', '36', '54'],
        correctIndex: 0,
        explanation: 'a = 18, r = 6/18 = 1/3. S_∞ = 18 / (1 - 1/3) = 18 / (2/3) = 27.'
      }
    ]
  },
  {
    id: 'grade-10-vectors',
    grade: 10,
    title: 'Vectors in 2D & 3D Space',
    category: 'Geometry',
    icon: '↗️',
    color: '#ec4899',
    accentColor: '#db2777',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Algebraic vector operations, vector magnitude, dot product, angle between two vectors, and orthogonal projection.',
    detailedOverview: 'Vectors possess both magnitude and direction. The dot product determines whether two vectors are perpendicular (dot product = 0), parallel, or form acute/obtuse angles.',
    coreConcepts: [
      {
        title: '1. Vector Magnitude & Component Operations',
        points: [
          'Magnitude of vector v = (x, y, z): |v| = √(x² + y² + z²).',
          'Unit vector: u = v / |v|.',
          'Vector addition and scalar multiplication are performed component-wise.'
        ]
      },
      {
        title: '2. Dot Product & Angle Between Vectors',
        points: [
          'Algebraic dot product: u · v = u₁v₁ + u₂v₂ + u₃v₃.',
          'Geometric dot product: u · v = |u| |v| cos θ.',
          'Perpendicular condition (orthogonality): u · v = 0.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Cosine of Angle Between Vectors',
        formula: 'cos θ = (u · v) / (|u| · |v|)',
        desc: 'Finds the angle between vectors u and v.'
      },
      {
        name: 'Scalar Orthogonal Projection',
        formula: '|c| = (u · v) / |v|',
        desc: 'Magnitude of the projection of vector u onto vector v.'
      }
    ],
    examples: [
      {
        question: 'Given vectors u = (2, -1, 2) and v = (4, 4, -2). Find the cosine of the angle between u and v.',
        level: 'Intermediate',
        steps: [
          'Compute u · v = (2)(4) + (-1)(4) + (2)(-2) = 8 - 4 - 4 = 0.',
          'Since u · v = 0, cos θ = 0 ⟹ θ = 90° (orthogonal / perpendicular).'
        ],
        answer: '0 (orthogonal 90°)',
        tips: 'If the dot product equals zero, the vectors are guaranteed to be perpendicular.'
      }
    ],
    quickQuiz: [
      {
        question: 'The magnitude of vector a = (3, 4) is...',
        options: ['5', '7', '25', '1'],
        correctIndex: 0,
        explanation: '|a| = √(3² + 4²) = √(9 + 16) = √25 = 5.'
      }
    ]
  },
  {
    id: 'grade-10-keuangan',
    grade: 10,
    title: 'Financial Mathematics: Interest & Annuities',
    category: 'Financial & Logic',
    icon: '💰',
    color: '#10b981',
    accentColor: '#047857',
    readTime: '13 Mins',
    difficulty: 'Easy',
    summary: 'Simple interest, compound interest, discount, asset depreciation, and loan/credit annuities.',
    detailedOverview: 'Financial mathematics builds quantitative financial literacy. Calculate capital accumulation using compound interest A = P(1 + r)ⁿ and periodic amortization payments.',
    coreConcepts: [
      {
        title: '1. Simple Interest vs. Compound Interest',
        points: [
          'Simple Interest: I = P · r · t (Interest is calculated only on the initial principal).',
          'Final Amount (Simple Interest): A = P(1 + r · t).',
          'Final Amount (Compound Interest): A = P(1 + r)ᵗ (Interest earns interest every period).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Compound Interest Formula',
        formula: 'A = P · (1 + r)ᵗ',
        desc: 'P = principal, r = interest rate per period, t = number of periods.'
      }
    ],
    examples: [
      {
        question: 'A principal of $10,000 is invested in a bank with 10% annual compound interest. How much will it be after 2 years?',
        level: 'Basic',
        steps: [
          'P = 10,000, r = 0.10, t = 2.',
          'A = 10,000 × (1 + 0.10)² = 10,000 × (1.10)².',
          'A = 10,000 × 1.21 = $12,100.'
        ],
        answer: '$12,100',
        tips: 'With compound interest, the first year\'s interest earns interest in subsequent years.'
      }
    ],
    quickQuiz: [
      {
        question: 'If $5,000 is saved with simple interest at 8% per year for 3 years, the total interest earned is...',
        options: ['$1,200', '$1,500', '$800', '$1,000'],
        correctIndex: 0,
        explanation: 'Interest = 5,000 × 0.08 × 3 = $1,200.'
      }
    ]
  },
  {
    id: 'grade-10-statistika-dasar',
    grade: 10,
    title: 'Univariate Statistics & Boxplots',
    category: 'Statistics',
    icon: '📊',
    color: '#3b82f6',
    accentColor: '#1d4ed8',
    readTime: '12 Mins',
    difficulty: 'Easy',
    summary: 'Data presentation, mean, median, mode of ungrouped data, interquartile range (IQR), and box-and-whisker plots.',
    detailedOverview: 'Analyzing measures of central tendency and spread for univariate data. Boxplots visualize the minimum value, lower quartile Q1, median Q2, upper quartile Q3, maximum value, and potential outliers.',
    coreConcepts: [
      {
        title: '1. Quartiles & Interquartile Range',
        points: [
          'Range: R = X_max - X_min.',
          'Interquartile Range: IQR = Q₃ - Q₁.',
          'Semi-Interquartile Range (Quartile Deviation): Qd = 1/2 · (Q₃ - Q₁).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Interquartile Range (IQR)',
        formula: 'IQR = Q₃ - Q₁',
        desc: 'Measure of statistical dispersion resistant to outliers.'
      }
    ],
    examples: [
      {
        question: 'Given the ordered data: 3, 5, 7, 8, 9, 11, 13. Determine the values of Median (Q2), Q1, and Q3.',
        level: 'Basic',
        steps: [
          'Number of data points n = 7 (odd).',
          'Median Q₂ = 4th data point = 8.',
          'Lower half (3, 5, 7) has middle value Q₁ = 5.',
          'Upper half (9, 11, 13) has middle value Q₃ = 11.'
        ],
        answer: 'Q1 = 5, Q2 = 8, Q3 = 11',
        tips: 'Always sort data from smallest to largest before calculating quartiles.'
      }
    ],
    quickQuiz: [
      {
        question: 'The interquartile range (IQR) of a dataset with Q1 = 12 and Q3 = 28 is...',
        options: ['16', '20', '8', '14'],
        correctIndex: 0,
        explanation: 'IQR = Q3 - Q1 = 28 - 12 = 16.'
      }
    ]
  }
];

// ============================================================================
// KELAS 11 (SMA / MA FASE F - TINGKAT LANJUT)
// ============================================================================
export const MATERI_KELAS_11: MathTopic[] = [
  {
    id: 'grade-11-functions',
    grade: 11,
    title: 'Composite & Inverse Functions',
    category: 'Algebra & Matrices',
    icon: '🔄',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Algebraic operations on functions, composite functions (f ∘ g)(x), associative/identity properties, and fast methods for inverse functions f⁻¹(x).',
    detailedOverview: 'A composite function feeds the output of function g as the input into function f. An inverse function reverses the mapping back to the domain elements, provided the function is bijective (one-to-one and onto).',
    coreConcepts: [
      {
        title: '1. Composite Function Rules',
        points: [
          '(f ∘ g)(x) = f(g(x)) ⟹ Substitute g(x) into the variable x of f(x).',
          'Generally NOT commutative: (f ∘ g)(x) ≠ (g ∘ f)(x).',
          'Inverse of a composition: (f ∘ g)⁻¹(x) = (g⁻¹ ∘ f⁻¹)(x).'
        ]
      },
      {
        title: '2. Fast Inverse Trick for Linear Fractional Functions',
        points: [
          'If f(x) = (ax + b) / (cx + d), then its inverse is: f⁻¹(x) = (-dx + b) / (cx - a).',
          'Swap coefficients a and d, then negate their signs (multiply by -1).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Fast Linear Fraction Inverse',
        formula: 'f(x) = (ax+b)/(cx+d)  ⟹  f⁻¹(x) = (-dx+b)/(cx-a)',
        desc: 'Quick formula to invert a linear rational fraction.'
      }
    ],
    examples: [
      {
        question: 'If f(x) = 2x + 1 and g(x) = x² - 3, find the value of (f ∘ g)(3).',
        level: 'Basic',
        steps: [
          'First calculate g(3): g(3) = 3² - 3 = 9 - 3 = 6.',
          'Substitute the result into f(x): f(6) = 2(6) + 1 = 12 + 1 = 13.'
        ],
        answer: '13',
        tips: 'Always evaluate starting from the innermost function.'
      },
      {
        question: "Given f(x) = 2x - 3 and (f ∘ g)(x) = 4x² + 6x - 7. Determine the formula for function g(x) and evaluate g(3).",
        level: "Intermediate",
        steps: [
          "By composite definition: (f ∘ g)(x) = f(g(x)) = 2g(x) - 3.",
          "Equate with given expression: 2g(x) - 3 = 4x² + 6x - 7.",
          "Add 3 to both sides: 2g(x) = 4x² + 6x - 4.",
          "Divide by 2: g(x) = 2x² + 3x - 2.",
          "Evaluate g(3): g(3) = 2(3)² + 3(3) - 2 = 2(9) + 9 - 2 = 18 + 7 = 25."
        ],
        answer: "g(x) = 2x² + 3x - 2, g(3) = 25",
        tips: "When the outer function is linear, isolating g(x) is direct and requires no inverse substitution."
      }
    ],
    quickQuiz: [
      {
        question: 'The inverse of f(x) = 3x - 6 is...',
        options: ['(x + 6) / 3', '(x - 6) / 3', '3x + 6', 'x / 3 - 6'],
        correctIndex: 0,
        explanation: 'y = 3x - 6 ⟹ y + 6 = 3x ⟹ x = (y + 6) / 3. So f⁻¹(x) = (x + 6) / 3.'
      }
    ]
  },
  {
    id: 'grade-11-circles',
    grade: 11,
    title: 'Equations of Circles & Tangent Lines',
    category: 'Geometry',
    icon: '⭕',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Circles centered at (0,0) and (a,b), general form x² + y² + Ax + By + C = 0, position of points/lines, and tangent line equations.',
    detailedOverview: 'A circle is the set of all points equidistant (radius r) from a central point. Tangent lines can be determined through a point on the circle, a given slope m, or a point outside the circle.',
    coreConcepts: [
      {
        title: '1. Standard Forms of Circle Equations',
        points: [
          'Center (0,0) and radius r: x² + y² = r².',
          'Center (a,b) and radius r: (x - a)² + (y - b)² = r².',
          'General form: x² + y² + Ax + By + C = 0 with Center = (-A/2, -B/2) and radius r = √(a² + b² - C).'
        ]
      },
      {
        title: '2. Tangent Line with Given Slope m',
        points: [
          'For circle (x - a)² + (y - b)² = r²: y - b = m(x - a) ± r√(1 + m²).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Tangent Lines with Slope m',
        formula: 'y - b = m(x - a) ± r√(1 + m²)',
        desc: 'Yields two parallel tangent lines with slope m.'
      },
      {
        name: 'Tangent Line at Point of Tangency (x₁, y₁)',
        formula: '(x₁ - a)(x - a) + (y₁ - b)(y - b) = r²',
        desc: 'Split-point formula for a point lying on the circle.'
      }
    ],
    examples: [
      {
        question: 'Find the center and radius of the circle given by x² + y² - 4x + 6y - 12 = 0.',
        level: 'Intermediate',
        steps: [
          'Identify coefficients: A = -4, B = 6, C = -12.',
          'Center P = (-A/2, -B/2) = (-(-4)/2, -6/2) = (2, -3).',
          'Radius r = √(2² + (-3)² - (-12)) = √(4 + 9 + 12) = √25 = 5.'
        ],
        answer: 'Center (2, -3) and Radius r = 5',
        tips: 'Remember that the constant C is subtracted under the square root.'
      },
      {
        question: "Find the equation of the tangent line to the circle (x - 3)² + (y + 2)² = 25 at the point P(7, 1).",
        level: "Basic",
        steps: [
          "Verify P(7, 1) lies on the circle: (7 - 3)² + (1 + 2)² = 4² + 3² = 16 + 9 = 25 (confirmed).",
          "Circle center is (a, b) = (3, -2) and r² = 25.",
          "Apply point-of-tangency formula: (x₁ - a)(x - a) + (y₁ - b)(y - b) = r².",
          "Substitute: (7 - 3)(x - 3) + (1 - (-2))(y - (-2)) = 25 ⟹ 4(x - 3) + 3(y + 2) = 25.",
          "Expand: 4x - 12 + 3y + 6 = 25 ⟹ 4x + 3y - 6 = 25 ⟹ 4x + 3y - 31 = 0."
        ],
        answer: "4x + 3y - 31 = 0",
        tips: "Always confirm the given point lies on the circumference before applying (x₁ - a)(x - a) + (y₁ - b)(y - b) = r²."
      }
    ],
    quickQuiz: [
      {
        question: 'The radius of the circle (x - 2)² + (y + 5)² = 36 is...',
        options: ['6', '36', '12', '18'],
        correctIndex: 0,
        explanation: 'r² = 36 ⟹ r = √36 = 6.'
      }
    ]
  },
  {
    id: 'grade-11-matrices',
    grade: 11,
    title: 'Matrices & Systems of Linear Equations',
    category: 'Algebra & Matrices',
    icon: '📊',
    color: '#ffb17a',
    accentColor: '#ea580c',
    readTime: '18 Mins',
    difficulty: 'Medium',
    summary: 'Matrix dimensions, addition/multiplication (row × column), determinants of 2×2 and 3×3 (Sarrus rule), inverse matrices, and Cramer\'s rule.',
    detailedOverview: 'A matrix is a rectangular array of numbers arranged in rows and columns. A matrix has an inverse (A⁻¹) if and only if its determinant det(A) ≠ 0 (non-singular). Critical in linear algebra and computer graphics.',
    coreConcepts: [
      {
        title: '1. Matrix Multiplication (Row × Column)',
        points: [
          'Matrix A (m × k) can be multiplied by B (k × n) to produce C (m × n).',
          'Matrix multiplication is NOT commutative: A · B ≠ B · A.'
        ]
      },
      {
        title: '2. Determinant & Inverse of 2×2 Matrix',
        points: [
          'If A = [[a, b], [c, d]], then det(A) = |A| = ad - bc.',
          'Inverse: A⁻¹ = (1 / det(A)) · [[d, -b], [-c, a]].'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Inverse of a 2×2 Matrix',
        formula: 'A⁻¹ = (1 / (ad - bc)) · [[d, -b], [-c, a]]',
        desc: 'Condition for inverse existence: det(A) = ad - bc ≠ 0.'
      }
    ],
    examples: [
      {
        question: 'Given matrix A = [[3, 2], [1, 4]]. Determine the determinant and inverse of matrix A.',
        level: 'Intermediate',
        steps: [
          'Compute determinant: det(A) = (3)(4) - (2)(1) = 12 - 2 = 10.',
          'Swap main diagonal (3 and 4) and negate anti-diagonal (2 and 1): Adjugate = [[4, -2], [-1, 3]].',
          'Inverse A⁻¹ = 1/10 · [[4, -2], [-1, 3]] = [[0.4, -0.2], [-0.1, 0.3]].'
        ],
        answer: 'det(A) = 10, A⁻¹ = 1/10 [[4, -2], [-1, 3]]',
        tips: 'Ensure determinant is non-zero before computing the inverse.'
      },
      {
        question: "Solve the system of linear equations 2x + 3y = 8 and 3x - 4y = -5 using Cramer's Rule with matrix determinants.",
        level: "Basic",
        steps: [
          "Write in matrix form: [[2, 3], [3, -4]] · [[x], [y]] = [[8], [-5]].",
          "Compute main determinant D: D = (2)(-4) - (3)(3) = -8 - 9 = -17.",
          "Compute D_x (replace column 1 with constants): D_x = (8)(-4) - (3)(-5) = -32 + 15 = -17.",
          "Compute D_y (replace column 2 with constants): D_y = (2)(-5) - (8)(3) = -10 - 24 = -34.",
          "Calculate variables: x = D_x / D = -17 / -17 = 1; y = D_y / D = -34 / -17 = 2."
        ],
        answer: "x = 1, y = 2",
        tips: "Cramer's Rule is exceptionally fast for 2×2 systems when D ≠ 0."
      }
    ],
    quickQuiz: [
      {
        question: 'The determinant of matrix [[5, 3], [2, 4]] is...',
        options: ['14', '26', '10', '16'],
        correctIndex: 0,
        explanation: 'det = (5 × 4) - (3 × 2) = 20 - 6 = 14.'
      }
    ]
  },
  {
    id: 'grade-11-transformations',
    grade: 11,
    title: 'Geometric Transformations & Matrices',
    category: 'Geometry',
    icon: '✨',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Translations, reflections (over x-axis, y-axis, y=x, origin), rotations by angle θ about (0,0) and (a,b), and dilations by scale factor k.',
    detailedOverview: 'Geometric transformations map each point in the coordinate plane to a new position. Matrix representations streamline the computation of composite sequential transformations (T₂ ∘ T₁).',
    coreConcepts: [
      {
        title: '1. Basic Transformation Types',
        points: [
          'Translation T(a, b): (x\', y\') = (x + a, y + b).',
          'Reflection over x-axis: (x, -y); over y-axis: (-x, y); over line y = x: (y, x).',
          'Rotation 90° counterclockwise about (0,0): (x\', y\') = (-y, x).',
          'Dilation centered at (0,0) with scale factor k: (x\', y\') = (kx, ky).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Rotation Matrix about Origin by Angle θ',
        formula: 'R(θ) = [[cos θ, -sin θ], [sin θ, cos θ]]',
        desc: 'Counterclockwise rotation corresponds to positive θ.'
      }
    ],
    examples: [
      {
        question: 'Find the image of point A(3, -2) after a 90° counterclockwise rotation centered at (0,0).',
        level: 'Basic',
        steps: [
          'Use 90° rotation mapping: (x\', y\') = (-y, x).',
          'x\' = -(-2) = 2.',
          'y\' = 3.',
          'The transformed point is A\'(2, 3).'
        ],
        answer: 'A\'(2, 3)',
        tips: 'A 90° counterclockwise rotation maps (x, y) ⟹ (-y, x).'
      },
      {
        question: "Find the equation of the line 2x - 3y + 6 = 0 after dilation centered at O(0,0) with scale factor k = 3, followed by reflection across the y-axis.",
        level: "Intermediate",
        steps: [
          "Step 1 (Dilation [O, 3]): (x', y') = (3x, 3y) ⟹ x = x'/3 and y = y'/3.",
          "Step 2 (Reflection across y-axis): (x'', y'') = (-x', y') ⟹ x' = -x'' and y' = y''.",
          "Express original coordinates in terms of final coordinates: x = -x'' / 3 and y = y'' / 3.",
          "Substitute into line equation: 2(-x''/3) - 3(y''/3) + 6 = 0.",
          "Multiply entire equation by 3: -2x'' - 3y'' + 18 = 0 ⟹ 2x'' + 3y'' - 18 = 0."
        ],
        answer: "2x + 3y - 18 = 0",
        tips: "Express original (x, y) backwards in terms of final image coordinates (x'', y'') before substituting."
      }
    ],
    quickQuiz: [
      {
        question: 'The image of point P(4, 1) translated by T(-2, 5) is...',
        options: ['(2, 6)', '(6, 6)', '(2, -4)', '(6, -4)'],
        correctIndex: 0,
        explanation: 'P\' = (4 + (-2), 1 + 5) = (2, 6).'
      }
    ]
  },
  {
    id: 'grade-11-limit',
    grade: 11,
    title: 'Limits of Algebraic Functions',
    category: 'Calculus',
    icon: '🎯',
    color: '#a855f7',
    accentColor: '#7e22ce',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Determinate and indeterminate forms (0/0, ∞/∞, ∞ - ∞), direct substitution, factoring, conjugate radical multiplication, and L\'Hôpital\'s Rule.',
    detailedOverview: 'Limits examine the behavior of a function as the input approaches a specific value. If direct substitution yields 0/0, perform algebraic simplification or differentiate numerator and denominator using L\'Hôpital\'s Rule.',
    coreConcepts: [
      {
        title: '1. Resolving the 0/0 Indeterminate Form',
        points: [
          'Direct Substitution: If the result is a real number L, the limit is L.',
          'Factoring Method: Factor numerator and denominator to cancel the zero-factor (x - c).',
          'Conjugate Method: Multiply radicals by their conjugate √(a) + √(b).',
          'L\'Hôpital\'s Rule: lim [f(x) / g(x)] = lim [f\'(x) / g\'(x)].'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'L\'Hôpital\'s Rule',
        formula: 'lim (x→c) [f(x) / g(x)] = lim (x→c) [f\'(x) / g\'(x)]',
        desc: 'Applicable only when the form evaluates to 0/0 or ∞/∞.'
      }
    ],
    examples: [
      {
        question: 'Evaluate lim (x→2) [(x² - 4) / (x - 2)].',
        level: 'Basic',
        steps: [
          'Substituting x = 2 gives (4 - 4)/(2 - 2) = 0/0 (indeterminate).',
          'Factor numerator: x² - 4 = (x - 2)(x + 2).',
          'Cancel the common factor (x - 2): lim (x→2) (x + 2).',
          'Substitute x = 2: 2 + 2 = 4.'
        ],
        answer: '4',
        tips: 'The zero-factor (x - 2) cancels out completely.'
      },
      {
        question: "Evaluate the radical limit: lim (x→4) [(x - 4) / (√(x) - 2)].",
        level: "Intermediate",
        steps: [
          "Check direct substitution: (4 - 4) / (√4 - 2) = 0 / 0 (indeterminate form).",
          "Multiply numerator and denominator by conjugate (√(x) + 2): lim (x→4) [((x - 4)(√(x) + 2)) / ((√(x) - 2)(√(x) + 2))].",
          "Expand denominator using difference of squares: (√(x))² - 2² = x - 4.",
          "Cancel common factor (x - 4): lim (x→4) (√(x) + 2).",
          "Substitute x = 4: √4 + 2 = 2 + 2 = 4."
        ],
        answer: "4",
        tips: "Multiplying by the radical conjugate rationalizes the denominator and reveals the cancellable zero-factor."
      }
    ],
    quickQuiz: [
      {
        question: 'The value of lim (x→3) [(x² - 9) / (x - 3)] is...',
        options: ['6', '3', '0', '9'],
        correctIndex: 0,
        explanation: 'Factor: (x - 3)(x + 3)/(x - 3) = x + 3. At x = 3 ⟹ 3 + 3 = 6.'
      }
    ]
  },
  {
    id: 'grade-11-calculus-diff',
    grade: 11,
    title: 'Derivatives of Algebraic Functions',
    category: 'Calculus',
    icon: '⚡',
    color: '#ec4899',
    accentColor: '#db2777',
    readTime: '18 Mins',
    difficulty: 'Medium',
    summary: 'Power rule d/dx(xⁿ) = n·xⁿ⁻¹, product rule (uv)\', quotient rule (u/v)\', tangent line slope m = f\'(x₁), and stationary points (max/min).',
    detailedOverview: 'Derivatives measure the instantaneous rate of change of a function. Key applications include intervals of increase/decrease (f\'(x) > 0 or f\'(x) < 0), finding optimum local extrema, and physics problems with velocity v(t) = s\'(t) and acceleration a(t) = v\'(t).',
    coreConcepts: [
      {
        title: '1. Standard Differentiation Rules',
        points: [
          'Constant rule: d/dx (c) = 0.',
          'Power rule: d/dx (a · xⁿ) = a · n · xⁿ⁻¹.',
          'Product rule: (u · v)\' = u\'v + uv\'.',
          'Quotient rule: (u / v)\' = (u\'v - uv\') / v².',
          'Chain rule: d/dx [f(g(x))] = f\'(g(x)) · g\'(x).'
        ]
      },
      {
        title: '2. Stationary Values & Tangent Lines',
        points: [
          'Slope of tangent line at (x₁, y₁): m = f\'(x₁).',
          'Tangent line equation: y - y₁ = m(x - x₁).',
          'Stationary point condition (extrema): f\'(x) = 0.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Product & Quotient Rules',
        formula: '(u · v)\' = u\'v + uv\'  |  (u/v)\' = (u\'v - uv\') / v²',
        desc: 'Essential differentiation rules for product and quotient functions.'
      }
    ],
    examples: [
      {
        question: 'Find the slope of the tangent line to the curve y = x³ - 2x² + 4 at the point with x = 2.',
        level: 'Intermediate',
        steps: [
          'Find the first derivative: y\' = f\'(x) = 3x² - 4x.',
          'Substitute x = 2 into the derivative: m = f\'(2) = 3(2)² - 4(2) = 3(4) - 8 = 12 - 8 = 4.'
        ],
        answer: 'm = 4',
        tips: 'The tangent slope is the value of the first derivative evaluated at that point.'
      }
    ],
    quickQuiz: [
      {
        question: 'The first derivative of f(x) = 4x³ - 5x² + 7x - 2 is...',
        options: ['12x² - 10x + 7', '12x² - 10x', '4x² - 5x + 7', '12x³ - 10x² + 7'],
        correctIndex: 0,
        explanation: 'f\'(x) = (4×3)x² - (5×2)x¹ + 7 = 12x² - 10x + 7.'
      }
    ]
  },
  {
    id: 'grade-11-integral-tak-tentu',
    grade: 11,
    title: 'Indefinite Integrals of Algebraic Functions',
    category: 'Calculus',
    icon: '∫',
    color: '#10b981',
    accentColor: '#047857',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Antiderivative ∫ xⁿ dx = (1/(n+1)) xⁿ⁺¹ + C, linearity of integration, algebraic substitution, and determining curve equations f(x).',
    detailedOverview: 'An indefinite integral is the inverse operation of differentiation (antiderivative). The integration constant C can be uniquely determined if a specific point (x, y) on the curve is given.',
    coreConcepts: [
      {
        title: '1. Basic Algebraic Integration Rules',
        points: [
          '∫ k dx = kx + C.',
          '∫ a xⁿ dx = [a / (n + 1)] xⁿ⁺¹ + C (for n ≠ -1).',
          'Sum/Difference rule: ∫ [f(x) ± g(x)] dx = ∫ f(x) dx ± ∫ g(x) dx.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Algebraic Indefinite Integral',
        formula: '∫ a xⁿ dx = [a / (n + 1)] · xⁿ⁺¹ + C',
        desc: 'Increase exponent by 1 and divide by the new exponent.'
      }
    ],
    examples: [
      {
        question: 'Evaluate ∫ (6x² - 4x + 3) dx.',
        level: 'Basic',
        steps: [
          'Integrate term by term:',
          '∫ 6x² dx = (6/3) x³ = 2x³.',
          '∫ -4x dx = (-4/2) x² = -2x².',
          '∫ 3 dx = 3x.',
          'Combine and add constant C: 2x³ - 2x² + 3x + C.'
        ],
        answer: '2x³ - 2x² + 3x + C',
        tips: 'Never forget to include the integration constant + C for indefinite integrals.'
      }
    ],
    quickQuiz: [
      {
        question: 'The result of ∫ 3x² dx is...',
        options: ['x³ + C', '3x³ + C', '6x + C', 'x² + C'],
        correctIndex: 0,
        explanation: '∫ 3x² dx = (3 / 3) x³ + C = x³ + C.'
      }
    ]
  },
  {
    id: 'grade-11-polynomials',
    grade: 11,
    title: 'Polynomials',
    category: 'Algebra & Matrices',
    icon: '🧩',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Degree of polynomials, synthetic division (Horner\'s scheme), Remainder Theorem (R = P(k)), Factor Theorem, and higher-degree Vieta\'s formulas.',
    detailedOverview: 'Polynomial P(x) = aₙxⁿ + ... + a₀. Horner\'s synthetic division provides an efficient technique to obtain quotient Q(x) and remainder R without laborious long division.',
    coreConcepts: [
      {
        title: '1. Remainder Theorem & Factor Theorem',
        points: [
          'When P(x) is divided by (x - k), the remainder is R = P(k).',
          'When P(x) is divided by (ax - b), the remainder is R = P(b/a).',
          'Factor Theorem: (x - k) is a factor of P(x) if and only if the remainder P(k) = 0.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Fundamental Polynomial Division',
        formula: 'P(x) = Divisor · Q(x) + Remainder',
        desc: 'The degree of the remainder is always strictly less than the divisor.'
      }
    ],
    examples: [
      {
        question: 'Find the remainder when the polynomial P(x) = 2x³ - 5x² + 4x + 7 is divided by (x - 2).',
        level: 'Basic',
        steps: [
          'Apply the Remainder Theorem: Remainder = P(2).',
          'P(2) = 2(2)³ - 5(2)² + 4(2) + 7.',
          'P(2) = 2(8) - 5(4) + 8 + 7 = 16 - 20 + 8 + 7 = 11.'
        ],
        answer: '11',
        tips: 'Directly plug the root of the divisor (x = 2) into P(x).'
      }
    ],
    quickQuiz: [
      {
        question: 'If P(x) = x³ - 2x + 5 is divided by (x - 1), the remainder is...',
        options: ['4', '6', '5', '2'],
        correctIndex: 0,
        explanation: 'P(1) = 1³ - 2(1) + 5 = 1 - 2 + 5 = 4.'
      }
    ]
  },
  {
    id: 'grade-11-program-linear',
    grade: 11,
    title: 'Linear Programming & Optimization',
    category: 'Financial & Logic',
    icon: '📊',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Feasible region of linear inequalities, mathematical modeling of profit/cost optimization, and corner point (vertex) testing method.',
    detailedOverview: 'Linear programming models optimal allocation of constrained resources to maximize profit or minimize expenses. The optimum value always occurs at one of the vertices (corner points) of the feasible region.',
    coreConcepts: [
      {
        title: '1. Corner Point (Vertex) Evaluation Method',
        points: [
          'Step 1: Graph boundary lines of the linear inequalities and determine the feasible region.',
          'Step 2: Identify coordinates of all vertices bounding the feasible region.',
          'Step 3: Substitute each vertex (x, y) into the objective function Z = ax + by to determine maximum or minimum.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Objective Function',
        formula: 'Z = ax + by',
        desc: 'The target function to be maximized or minimized.'
      }
    ],
    examples: [
      {
        question: 'Find the maximum value of f(x, y) = 5x + 4y across vertices A(0,0), B(4,0), C(3,2), and D(0,5).',
        level: 'Basic',
        steps: [
          'Evaluate A(0,0) ⟹ 5(0) + 4(0) = 0.',
          'Evaluate B(4,0) ⟹ 5(4) + 4(0) = 20.',
          'Evaluate C(3,2) ⟹ 5(3) + 4(2) = 15 + 8 = 23.',
          'Evaluate D(0,5) ⟹ 5(0) + 4(5) = 20.',
          'The highest value is 23 at vertex C(3,2).'
        ],
        answer: 'Maximum Value = 23',
        tips: 'Test every boundary vertex to guarantee the global optimal value.'
      }
    ],
    quickQuiz: [
      {
        question: 'The value of the objective function Z = 3x + 2y at point (4, 5) is...',
        options: ['22', '20', '26', '17'],
        correctIndex: 0,
        explanation: 'Z = 3(4) + 2(5) = 12 + 10 = 22.'
      }
    ]
  }
];

// ============================================================================
// KELAS 12 (SMA / MA FASE F+ / UTBK - SNBT & PERSIAPAN KULIAH)
// ============================================================================
export const MATERI_KELAS_12: MathTopic[] = [
  {
    id: 'dimensi-tiga',
    grade: 12,
    title: '3D Geometry (Spatial Geometry)',
    category: 'Geometry',
    icon: '🧊',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '20 Mins',
    difficulty: 'Hard',
    summary: 'Points, lines, and planes in cubes & pyramids, space diagonals s√3, orthogonal projections, and point-to-line/plane distances.',
    detailedOverview: 'Spatial geometry examines geometric structures in three dimensions. Calculating point-to-line distances frequently relies on area equivalence of helper triangles (1/2 base × height) or the Law of Cosines.',
    coreConcepts: [
      {
        title: '1. Cube Properties with Side Length s',
        points: [
          'Face diagonal (e.g. AC, AF): d = s√2.',
          'Space diagonal (e.g. AG, BH): d = s√3.',
          'Diagonal plane area: A = s²√2.'
        ]
      },
      {
        title: '2. Point-to-Line Distance via Triangle Area',
        points: [
          'Construct a triangle connecting the point with both endpoints of the line segment.',
          'If the triangle is right-angled at that vertex: d = (base × height) / hypotenuse.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Face & Space Diagonals of a Cube',
        formula: 'd_face = s√2  |  d_space = s√3',
        desc: 'Lengths of face and space diagonals of a cube with edge length s.'
      },
      {
        name: 'Right Triangle Altitude to Hypotenuse',
        formula: 'h = (a · b) / c',
        desc: 'Distance from the right-angle vertex to the hypotenuse c.'
      }
    ],
    examples: [
      {
        question: 'In cube ABCD.EFGH with edge length 6 cm, find the distance from vertex A to space diagonal BH.',
        level: 'Intermediate',
        steps: [
          'Consider triangle ABH, which is right-angled at A (edge AB is perpendicular to side face ADHE).',
          'Length AB = 6 cm, face diagonal AH = 6√2 cm, space diagonal BH = 6√3 cm.',
          'Apply triangle area equivalence: 1/2 · AB · AH = 1/2 · BH · d.',
          'd = (AB · AH) / BH = (6 · 6√2) / (6√3) = (6√2) / √3 = 2√6 cm.'
        ],
        answer: '2√6 cm',
        tips: 'Use right triangle cross-sections to simplify spatial distance computations.'
      },
      {
        question: "In a regular cube ABCD.EFGH with edge length 8 cm, calculate the exact distance from vertex F to the space diagonal AG.",
        level: "Advanced",
        steps: [
          "Consider right triangle AFG inside the cube: face diagonal AF = 8√2 cm, edge FG = 8 cm.",
          "Space diagonal AG = 8√3 cm. Since FG ⊥ face ABFE, FG ⊥ AF, so ∠AFG = 90°.",
          "Let d be the perpendicular distance from vertex F to hypotenuse AG.",
          "Express the area of triangle AFG in two ways: 1/2 · AF · FG = 1/2 · AG · d.",
          "Solve for d: d = (AF · FG) / AG = (8√2 · 8) / (8√3) = (8√2) / √3.",
          "Rationalize the denominator: d = (8√6) / 3 cm."
        ],
        answer: "d = (8/3)√6 cm",
        tips: "Use the triangle area equivalence (Base₁ × Height₁ = Base₂ × Height₂) to find perpendicular distances."
      }
    ],
    quickQuiz: [
      {
        question: 'A cube with edge length 8 cm has a space diagonal of...',
        options: ['8√3 cm', '8√2 cm', '16 cm', '4√6 cm'],
        correctIndex: 0,
        explanation: 'Space diagonal of a cube = s√3 = 8√3 cm.'
      }
    ]
  },
  {
    id: 'statistika',
    grade: 12,
    title: 'Grouped Data Statistics & Dispersion',
    category: 'Statistics',
    icon: '📊',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '18 Mins',
    difficulty: 'Medium',
    summary: 'Frequency distribution tables, mean (assumed mean/coding method), median, mode of grouped data, quartiles, and standard deviation.',
    detailedOverview: 'Grouped data statistics analyzes continuous data divided into class intervals. Measures of central tendency (Mean, Median, Mode) and dispersion (Standard Deviation) are essential curriculum components.',
    coreConcepts: [
      {
        title: '1. Mode of Grouped Data',
        points: [
          'Mo = L + (d₁ / (d₁ + d₂)) · c.',
          'L = Lower boundary of modal class (class with highest frequency).',
          'd₁ = Difference in frequency between modal class and preceding class.',
          'd₂ = Difference in frequency between modal class and succeeding class.',
          'c = Class interval width.'
        ]
      },
      {
        title: '2. Median & Quartiles of Grouped Data',
        points: [
          'Qᵢ = L + ((i/4 · N - Fk) / f_Q) · c (for quartile i = 1, 2, 3).',
          'N = Total frequency, Fk = Cumulative frequency before quartile class, f_Q = Frequency of quartile class.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Mode of Grouped Data',
        formula: 'Mo = L + [d₁ / (d₁ + d₂)] · c',
        desc: 'Calculates the mode from a frequency distribution table.'
      },
      {
        name: 'Median of Grouped Data',
        formula: 'Me = L + [(1/2 N - Fk) / f_me] · c',
        desc: 'Finds the middle value for grouped continuous data.'
      }
    ],
    examples: [
      {
        question: 'If class width c = 5, lower boundary L = 20.5, d₁ = 3, and d₂ = 2, what is the Mode?',
        level: 'Basic',
        steps: [
          'Apply the formula: Mo = L + (d₁ / (d₁ + d₂)) · c.',
          'Mo = 20.5 + (3 / (3 + 2)) · 5 = 20.5 + (3/5) · 5 = 20.5 + 3 = 23.5.'
        ],
        answer: '23.5',
        tips: 'Multiply the fraction d₁/(d₁+d₂) by the class width c before adding to L.'
      },
      {
        question: "Given grouped score intervals: 51-60 (f=4), 61-70 (f=8), 71-80 (f=14), 81-90 (f=10), 91-100 (f=4). Calculate the sample mean (x̄) using class midpoints.",
        level: "Basic",
        steps: [
          "Calculate midpoints (x_i): 55.5, 65.5, 75.5, 85.5, 95.5.",
          "Total sample size N = 4 + 8 + 14 + 10 + 4 = 40.",
          "Calculate sum of products Σ(f_i · x_i): (4 × 55.5) + (8 × 65.5) + (14 × 75.5) + (10 × 85.5) + (4 × 95.5).",
          "Σ(f_i · x_i) = 222 + 524 + 1,057 + 855 + 382 = 3,040.",
          "Compute mean: x̄ = 3,040 / 40 = 76.0."
        ],
        answer: "x̄ = 76.0",
        tips: "The class midpoint x_i is calculated as (lower limit + upper limit) / 2."
      }
    ],
    quickQuiz: [
      {
        question: 'The mean of the numbers 4, 6, 8, 10, 12 is...',
        options: ['8', '7', '9', '10'],
        correctIndex: 0,
        explanation: 'Mean = (4 + 6 + 8 + 10 + 12) : 5 = 40 : 5 = 8.'
      }
    ]
  },
  {
    id: 'kaidah-pencacahan',
    grade: 12,
    title: 'Counting Principles: Permutations & Combinations',
    category: 'Combinatorics & Probability',
    icon: '🧮',
    color: '#ffb17a',
    accentColor: '#ea580c',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Multiplication & addition rules, factorials, distinct element permutations, identical element permutations, circular permutations, and combinations.',
    detailedOverview: 'Counting principles determine the number of possible outcomes without listing each explicitly. Key distinction: Permutations care about order (rankings/positions: AB ≠ BA), whereas Combinations disregard order (teams/groups: AB = BA).',
    coreConcepts: [
      {
        title: '1. Permutations (Order Matters: AB ≠ BA)',
        points: [
          'Permutations of r from n objects: ₙPᵣ = n! / (n - r)!.',
          'Permutations with identical items: P = n! / (k₁! · k₂! ...).',
          'Circular permutations: P_circular = (n - 1)!.'
        ]
      },
      {
        title: '2. Combinations (Order Does Not Matter: AB = BA)',
        points: [
          'Combinations of r from n objects: ₙCᵣ = n! / (r! · (n - r)!).',
          'Used when choosing committee members, handshakes between people, or drawing lottery balls.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Combination Formula',
        formula: 'ₙCᵣ = n! / [r! · (n - r)!]',
        desc: 'Number of ways to choose r items from n items without regard to order.'
      },
      {
        name: 'Circular Permutation',
        formula: 'P_circular = (n - 1)!',
        desc: 'Number of circular arrangements for n distinct items.'
      }
    ],
    examples: [
      {
        question: 'From 8 candidate students, 3 are to be chosen as competition delegates. How many different selections are possible?',
        level: 'Basic',
        steps: [
          'Because all chosen delegates have equal roles (order is ignored), use combination ₈C₃.',
          '₈C₃ = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56 ways.'
        ],
        answer: '56 ways',
        tips: 'Cancel numerator and denominator factors for fast calculation.'
      },
      {
        question: "How many 4-digit numbers greater than 3,000 can be formed from the distinct digits {1, 2, 3, 5, 7, 8} without repeating any digit?",
        level: "Intermediate",
        steps: [
          "Available digit pool: {1, 2, 3, 5, 7, 8} (6 unique digits).",
          "To exceed 3,000, the thousands digit must be 3, 5, 7, or 8 (4 valid options).",
          "Hundreds place: remaining 5 digits available (5 options).",
          "Tens place: remaining 4 digits available (4 options).",
          "Units place: remaining 3 digits available (3 options).",
          "Total possible numbers = 4 × 5 × 4 × 3 = 240 distinct numbers."
        ],
        answer: "240 numbers",
        tips: "Always begin by placing constraints on the most restricted slot (the thousands digit)."
      }
    ],
    quickQuiz: [
      {
        question: 'The number of ways 5 people can sit around a circular table is...',
        options: ['24 ways', '120 ways', '60 ways', '12 ways'],
        correctIndex: 0,
        explanation: 'P_circular = (5 - 1)! = 4! = 4 × 3 × 2 × 1 = 24 ways.'
      }
    ]
  },
  {
    id: 'peluang-majemuk',
    grade: 12,
    title: 'Compound & Conditional Probability',
    category: 'Combinatorics & Probability',
    icon: '🎲',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Sample space n(S), complement P(A\'), mutually exclusive events, independent events, conditional probability P(A|B), and expected frequency.',
    detailedOverview: 'Probability quantifies the likelihood of events occurring (0 ≤ P(A) ≤ 1). Mutually exclusive events use addition P(A ∪ B) = P(A) + P(B), while independent events use multiplication P(A ∩ B) = P(A) · P(B).',
    coreConcepts: [
      {
        title: '1. Theoretical Probability & Complements',
        points: [
          'P(A) = n(A) / n(S), with 0 ≤ P(A) ≤ 1.',
          'Complementary event probability: P(A\') = 1 - P(A).'
        ]
      },
      {
        title: '2. Mutually Exclusive & Independent Events',
        points: [
          'Mutually Exclusive (disjoint): P(A ∪ B) = P(A) + P(B).',
          'Independent Events: P(A ∩ B) = P(A) · P(B).',
          'Expected Frequency: E(A) = N · P(A).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Union Probability of Two Events',
        formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
        desc: 'General addition rule (if mutually exclusive, P(A ∩ B) = 0).'
      }
    ],
    examples: [
      {
        question: 'Two fair dice are rolled once. Find the probability that the sum of the dice equals 8.',
        level: 'Basic',
        steps: [
          'Total sample space n(S) = 6 × 6 = 36.',
          'Pairs summing to 8: (2,6), (3,5), (4,4), (5,3), (6,2) ⟹ 5 pairs.',
          'P(sum = 8) = 5 / 36.'
        ],
        answer: '5/36',
        tips: 'List pairs systematically by starting from the smallest first die roll.'
      },
      {
        question: "Two fair six-sided dice are rolled simultaneously. Find the probability that the sum of the dice equals 8 OR both dice show even numbers.",
        level: "Intermediate",
        steps: [
          "Total sample space outcomes: n(S) = 6 × 6 = 36.",
          "Event A (sum equals 8): {(2,6), (3,5), (4,4), (5,3), (6,2)} ⟹ n(A) = 5.",
          "Event B (both even): {2,4,6} × {2,4,6} ⟹ n(B) = 3 × 3 = 9 outcomes.",
          "Intersection A ∩ B (sum is 8 AND both even): {(2,6), (4,4), (6,2)} ⟹ n(A ∩ B) = 3.",
          "Apply Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 5/36 + 9/36 - 3/36 = 11/36."
        ],
        answer: "11/36",
        tips: "Subtract the intersection P(A ∩ B) so non-mutually exclusive outcomes are not counted twice."
      }
    ],
    quickQuiz: [
      {
        question: 'A fair coin is flipped 100 times. The expected frequency of landing heads is...',
        options: ['50 times', '25 times', '100 times', '75 times'],
        correctIndex: 0,
        explanation: 'P(Heads) = 1/2. E(Heads) = 100 × (1/2) = 50 times.'
      }
    ]
  },
  {
    id: 'kalkulus-lanjut',
    grade: 12,
    title: 'Limits & Derivatives of Trigonometric Functions',
    category: 'Calculus',
    icon: '📈',
    color: '#a855f7',
    accentColor: '#7e22ce',
    readTime: '19 Mins',
    difficulty: 'Hard',
    summary: 'Trigonometric limit theorem lim(x→0) sin(ax)/bx = a/b, derivatives of sin/cos/tan, chain rule, and tangent lines to trigonometric curves.',
    detailedOverview: 'Advanced calculus extends differentiation and limits to periodic trigonometric functions. A cornerstone topic in calculus and STEM exams.',
    coreConcepts: [
      {
        title: '1. Trigonometric Limits as x Approaches 0',
        points: [
          'lim(x→0) [sin(ax) / bx] = a / b.',
          'lim(x→0) [tan(ax) / bx] = a / b.',
          'Cosine transformation identity: 1 - cos(ax) = 2 sin²(ax/2).'
        ]
      },
      {
        title: '2. Derivatives of Trigonometric Functions',
        points: [
          'd/dx (sin x) = cos x.',
          'd/dx (cos x) = -sin x.',
          'd/dx (tan x) = sec² x.',
          'Chain rule: d/dx [sin(u)] = cos(u) · u\'.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Basic Trigonometric Limit Theorem',
        formula: 'lim (x→0) [sin(ax) / bx] = a / b',
        desc: 'Resolves indeterminate 0/0 limits for sine and tangent ratios.'
      }
    ],
    examples: [
      {
        question: 'Evaluate lim (x→0) [sin(6x) / (2x)].',
        level: 'Basic',
        steps: [
          'Apply the limit theorem: lim (x→0) [sin(ax) / bx] = a / b.',
          'Substitute a = 6 and b = 2: 6 / 2 = 3.'
        ],
        answer: '3',
        tips: 'Valid when sine coefficients and denominators are linear as x approaches 0.'
      },
      {
        question: "Evaluate the trigonometric limit: lim (x→0) [(1 - cos(4x)) / (x²)].",
        level: "Advanced",
        steps: [
          "Direct substitution gives (1 - cos 0) / 0 = 0 / 0 (indeterminate form).",
          "Apply half-angle identity: 1 - cos(2θ) = 2 sin²(θ). For 2θ = 4x, 1 - cos(4x) = 2 sin²(2x).",
          "Rewrite expression: lim (x→0) [2 · sin(2x) · sin(2x) / (x · x)].",
          "Separate into standard limits: 2 · lim (x→0) [sin(2x) / x] · lim (x→0) [sin(2x) / x].",
          "Since lim (x→0) [sin(kx) / x] = k: 2 · 2 · 2 = 8."
        ],
        answer: "8",
        tips: "The identity 1 - cos(kx) = 2 sin²(kx / 2) is the standard transformation for indeterminate cosine limits."
      }
    ],
    quickQuiz: [
      {
        question: 'The first derivative of y = sin(3x) is...',
        options: ['3 cos(3x)', 'cos(3x)', '-3 cos(3x)', '3 sin(3x)'],
        correctIndex: 0,
        explanation: 'By the chain rule: y\' = cos(3x) · 3 = 3 cos(3x).'
      }
    ]
  },
  {
    id: 'integral-kalkulus',
    grade: 12,
    title: 'Definite Integrals & Area Under Curves',
    category: 'Calculus',
    icon: '∫',
    color: '#ec4899',
    accentColor: '#db2777',
    readTime: '18 Mins',
    difficulty: 'Hard',
    summary: 'Fundamental Theorem of Calculus ∫[a to b] f(x) dx = F(b) - F(a), area under a curve, and area bounded between two curves.',
    detailedOverview: 'Definite integrals calculate total accumulated quantity over an interval. Key applications include finding area under irregular curves and area bounded between curves f(x) and g(x).',
    coreConcepts: [
      {
        title: '1. Fundamental Theorem of Calculus',
        points: [
          '∫ [a to b] f(x) dx = [F(x)]_a^b = F(b) - F(a).',
          'Reversed limits property: ∫ [a to b] f(x) dx = - ∫ [b to a] f(x) dx.',
          'Interval additivity: ∫ [a to c] f(x) dx = ∫ [a to b] f(x) dx + ∫ [b to c] f(x) dx.'
        ]
      },
      {
        title: '2. Area Between Two Curves',
        points: [
          'Area = ∫ [a to b] (Upper Curve - Lower Curve) dx = ∫ [a to b] [f(x) - g(x)] dx.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Fundamental Theorem of Calculus',
        formula: '∫ [a to b] f(x) dx = F(b) - F(a)',
        desc: 'Evaluate antiderivative at upper limit F(b) minus lower limit F(a).'
      }
    ],
    examples: [
      {
        question: 'Evaluate ∫ [0 to 2] (3x² + 2x) dx.',
        level: 'Basic',
        steps: [
          'Find the antiderivative F(x): ∫ (3x² + 2x) dx = x³ + x².',
          'Evaluate at upper limit F(2) = 2³ + 2² = 8 + 4 = 12.',
          'Evaluate at lower limit F(0) = 0³ + 0² = 0.',
          'Result = F(2) - F(0) = 12 - 0 = 12.'
        ],
        answer: '12',
        tips: 'Integrate algebraically first, then substitute the limits.'
      }
    ],
    quickQuiz: [
      {
        question: 'The value of ∫ [1 to 3] 2x dx is...',
        options: ['8', '9', '6', '4'],
        correctIndex: 0,
        explanation: 'F(x) = x². F(3) - F(1) = 3² - 1² = 9 - 1 = 8.'
      }
    ]
  },
  {
    id: 'distribusi-binomial',
    grade: 12,
    title: 'Binomial & Normal Probability Distributions',
    category: 'Statistics',
    icon: '🔔',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '16 Mins',
    difficulty: 'Hard',
    summary: 'Bernoulli trials, discrete/continuous random variables, binomial probability P(X=x) = ₙCₓ · pˣ · qⁿ⁻ˣ, and z-score standard normal curve.',
    detailedOverview: 'The binomial distribution models experiments with two outcomes: success (p) or failure (q = 1 - p). The normal distribution forms the symmetrical bell curve central to inferential statistics.',
    coreConcepts: [
      {
        title: '1. Binomial Distribution Conditions',
        points: [
          'The trial is repeated n independent times.',
          'Each trial has only 2 mutually exclusive outcomes (Success or Failure).',
          'The probability of success (p) remains constant across all trials.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Binomial Probability Mass Function',
        formula: 'P(X = x) = ₙCₓ · pˣ · (1 - p)ⁿ⁻ˣ',
        desc: 'Probability of obtaining exactly x successes in n trials.'
      },
      {
        name: 'Z-Score Normal Transformation',
        formula: 'Z = (X - μ) / σ',
        desc: 'Standardizes random variable X to standard normal distribution Z ~ N(0, 1).'
      }
    ],
    examples: [
      {
        question: 'A fair coin is flipped 4 times. Find the probability of obtaining exactly 3 heads.',
        level: 'Intermediate',
        steps: [
          'n = 4, x = 3, p = 1/2, q = 1 - 1/2 = 1/2.',
          'P(X = 3) = ₄C₃ · (1/2)³ · (1/2)¹.',
          '₄C₃ = 4.',
          'P(X = 3) = 4 · (1/8) · (1/2) = 4/16 = 1/4 = 0.25.'
        ],
        answer: '1/4 (0.25)',
        tips: 'Compute the combination nCx first before multiplying probabilities.'
      }
    ],
    quickQuiz: [
      {
        question: 'If the probability of success is p = 0.4, what is the probability of failure q?',
        options: ['0.6', '0.4', '0.5', '1.0'],
        correctIndex: 0,
        explanation: 'q = 1 - p = 1 - 0.4 = 0.6.'
      }
    ]
  },
  {
    id: 'utbk-penalaran-matematika',
    grade: 12,
    title: 'Mathematical Reasoning & Quantitative Literacy',
    category: 'Financial & Logic',
    icon: '💡',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Quick mathematical reasoning strategies, numerical patterns, symbolic operations (# & *), data sufficiency (1) & (2), and quantitative comparison P vs Q.',
    detailedOverview: 'Mathematical reasoning tests logical deduction applied to real-world contexts. Mastering rapid estimation, comparing quantities P and Q, and evaluating data sufficiency drastically saves problem-solving time.',
    coreConcepts: [
      {
        title: '1. Quantitative Comparison Types (P vs Q)',
        points: [
          'Option A: Quantity P is greater than Q.',
          'Option B: Quantity Q is greater than P.',
          'Option C: Quantity P is equal to Q.',
          'Option D: The provided information is insufficient to determine the relationship.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Round-Trip Average Speed',
        formula: 'v_avg = (2 · v₁ · v₂) / (v₁ + v₂)',
        desc: 'Average speed of a round trip over the same distance.'
      }
    ],
    examples: [
      {
        question: 'If an operation is defined as a ⊗ b = (2a + b) / (a - 1), determine the value of 4 ⊗ 6.',
        level: 'Basic',
        steps: [
          'Substitute a = 4 and b = 6 into the defined operation.',
          '4 ⊗ 6 = (2(4) + 6) / (4 - 1).',
          '4 ⊗ 6 = (8 + 6) / 3 = 14 / 3.'
        ],
        answer: '14/3',
        tips: 'Follow the exact substitution pattern of the newly defined symbol.'
      }
    ],
    quickQuiz: [
      {
        question: 'If a ★ b = a² - 3b, what is the value of 5 ★ 4?',
        options: ['13', '17', '25', '12'],
        correctIndex: 0,
        explanation: '5 ★ 4 = 5² - 3(4) = 25 - 12 = 13.'
      }
    ]
  }
];

// Semua materi gabungan kurikulum Indonesia lengkap
export const ALL_MATERI: MathTopic[] = [
  ...MATERI_KELAS_10,
  ...MATERI_KELAS_11,
  ...MATERI_KELAS_12
];

export const getMateriByGrade = (grade: 10 | 11 | 12): MathTopic[] => {
  if (grade === 10) return MATERI_KELAS_10;
  if (grade === 11) return MATERI_KELAS_11;
  return MATERI_KELAS_12;
};

// ============================================================================
// QUESTION BANK (GRADES 10, 11, 12) FOR ARCADE & QUIZ
// ============================================================================
export const MATH_QUESTIONS: Question[] = [
  // --- GRADE 10 QUESTIONS ---
  {
    id: 101,
    grade: 10,
    topicId: 'grade-10-exponents',
    topicTitle: 'Exponents & Logarithms',
    question: 'Solve the equation 2^(3x - 1) = 32.',
    options: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
    correctIndex: 0,
    explanation: '32 = 2⁵. Therefore 3x - 1 = 5 ⟹ 3x = 6 ⟹ x = 2.',
    difficulty: 'easy'
  },
  {
    id: 102,
    grade: 10,
    topicId: 'grade-10-exponents',
    topicTitle: 'Exponents & Logarithms',
    question: 'What is the value of ²log 48 - ²log 3?',
    options: ['4', '16', '3', '8'],
    correctIndex: 0,
    explanation: '²log (48 : 3) = ²log 16 = 4 (since 2⁴ = 16).',
    difficulty: 'easy'
  },
  {
    id: 103,
    grade: 10,
    topicId: 'grade-10-sequences',
    topicTitle: 'Sequences & Series',
    question: 'The 10th term of the arithmetic sequence 5, 8, 11, 14, ... is...',
    options: ['32', '35', '38', '29'],
    correctIndex: 0,
    explanation: 'a = 5, d = 3. a₁₀ = 5 + 9(3) = 5 + 27 = 32.',
    difficulty: 'easy'
  },
  {
    id: 104,
    grade: 10,
    topicId: 'grade-10-sequences',
    topicTitle: 'Sequences & Series',
    question: 'The sum of the infinite geometric series 18 + 6 + 2 + ... is...',
    options: ['27', '24', '36', '54'],
    correctIndex: 0,
    explanation: 'a = 18, r = 1/3. S_∞ = 18 / (1 - 1/3) = 18 / (2/3) = 27.',
    difficulty: 'medium'
  },
  {
    id: 105,
    grade: 10,
    topicId: 'grade-10-trigonometry',
    topicTitle: 'Basic Trigonometry',
    question: 'In a right triangle, the opposite side = 3 and the hypotenuse = 5. What is cos θ?',
    options: ['4/5', '3/5', '3/4', '5/4'],
    correctIndex: 0,
    explanation: 'Adjacent = √(5² - 3²) = √(25 - 9) = 4. cos θ = Adjacent / Hypotenuse = 4/5.',
    difficulty: 'easy'
  },
  {
    id: 106,
    grade: 10,
    topicId: 'grade-10-quadratics',
    topicTitle: 'Quadratic Functions',
    question: 'The roots of the equation x² - 5x + 6 = 0 are...',
    options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = -6'],
    correctIndex: 0,
    explanation: '(x - 2)(x - 3) = 0 ⟹ x = 2 or x = 3.',
    difficulty: 'easy'
  },
  {
    id: 107,
    grade: 10,
    topicId: 'grade-10-vectors',
    topicTitle: 'Vectors',
    question: 'The magnitude of vector a = (3, 4) is...',
    options: ['5', '7', '25', '1'],
    correctIndex: 0,
    explanation: '|a| = √(3² + 4²) = √25 = 5.',
    difficulty: 'easy'
  },
  {
    id: 108,
    grade: 10,
    topicId: 'grade-10-keuangan',
    topicTitle: 'Financial Mathematics',
    question: 'If $5,000 is saved with simple interest at 8% per year for 3 years, the total interest earned is...',
    options: ['$1,200', '$1,500', '$800', '$1,000'],
    correctIndex: 0,
    explanation: 'Interest = 5,000 × 0.08 × 3 = $1,200.',
    difficulty: 'easy'
  },

  // --- GRADE 11 QUESTIONS ---
  {
    id: 201,
    grade: 11,
    topicId: 'grade-11-functions',
    topicTitle: 'Composite Functions',
    question: 'If f(x) = 2x + 1 and g(x) = x² - 3, what is (f ∘ g)(3)?',
    options: ['13', '15', '46', '7'],
    correctIndex: 0,
    explanation: 'g(3) = 3² - 3 = 6. f(6) = 2(6) + 1 = 13.',
    difficulty: 'easy'
  },
  {
    id: 202,
    grade: 11,
    topicId: 'grade-11-circles',
    topicTitle: 'Equations of Circles',
    question: 'The radius of the circle (x - 2)² + (y + 5)² = 36 is...',
    options: ['6', '36', '12', '18'],
    correctIndex: 0,
    explanation: 'r² = 36 ⟹ r = 6.',
    difficulty: 'easy'
  },
  {
    id: 203,
    grade: 11,
    topicId: 'grade-11-matrices',
    topicTitle: 'Matrices',
    question: 'The determinant of matrix A = [[3, 1], [4, 2]] is...',
    options: ['2', '10', '-2', '6'],
    correctIndex: 0,
    explanation: 'det(A) = (3 × 2) - (1 × 4) = 6 - 4 = 2.',
    difficulty: 'easy'
  },
  {
    id: 204,
    grade: 11,
    topicId: 'grade-11-calculus-diff',
    topicTitle: 'Algebraic Derivatives',
    question: 'The first derivative of f(x) = 3x³ - 4x² + 5x - 1 at x = 1 is...',
    options: ['6', '8', '14', '10'],
    correctIndex: 0,
    explanation: 'f\'(x) = 9x² - 8x + 5. f\'(1) = 9(1) - 8(1) + 5 = 6.',
    difficulty: 'medium'
  },
  {
    id: 205,
    grade: 11,
    topicId: 'grade-11-transformations',
    topicTitle: 'Geometric Transformations',
    question: 'The image of point P(4, -1) under a 90° counterclockwise rotation about (0,0) is...',
    options: ['(1, 4)', '(-1, -4)', '(-4, 1)', '(4, 1)'],
    correctIndex: 0,
    explanation: '(x, y) ⟹ (-y, x). Therefore (4, -1) ⟹ (1, 4).',
    difficulty: 'medium'
  },
  {
    id: 206,
    grade: 11,
    topicId: 'grade-11-limit',
    topicTitle: 'Algebraic Limits',
    question: 'The value of lim (x→3) [(x² - 9) / (x - 3)] is...',
    options: ['6', '3', '0', '9'],
    correctIndex: 0,
    explanation: '(x - 3)(x + 3)/(x - 3) = x + 3. At x = 3 ⟹ 6.',
    difficulty: 'easy'
  },
  {
    id: 207,
    grade: 11,
    topicId: 'grade-11-integral-tak-tentu',
    topicTitle: 'Algebraic Integrals',
    question: 'The result of ∫ 3x² dx is...',
    options: ['x³ + C', '3x³ + C', '6x + C', 'x² + C'],
    correctIndex: 0,
    explanation: '∫ 3x² dx = (3/3)x³ + C = x³ + C.',
    difficulty: 'easy'
  },

  // --- GRADE 12 QUESTIONS ---
  {
    id: 301,
    grade: 12,
    topicId: 'dimensi-tiga',
    topicTitle: '3D Geometry',
    question: 'Cube ABCD.EFGH has an edge length of 8 cm. The space diagonal AG is...',
    options: ['8√3 cm', '8√2 cm', '16 cm', '4√6 cm'],
    correctIndex: 0,
    explanation: 'Space diagonal of a cube = s√3 = 8√3 cm.',
    difficulty: 'easy'
  },
  {
    id: 302,
    grade: 12,
    topicId: 'statistika',
    topicTitle: 'Grouped Statistics',
    question: 'If class width c = 5, lower boundary L = 20.5, d₁ = 3, and d₂ = 2, what is the Mode?',
    options: ['23.5', '22.5', '24.5', '25.0'],
    correctIndex: 0,
    explanation: 'Mo = L + [d₁ / (d₁ + d₂)] · c = 20.5 + [3 / 5] · 5 = 23.5.',
    difficulty: 'easy'
  },
  {
    id: 303,
    grade: 12,
    topicId: 'kaidah-pencacahan',
    topicTitle: 'Permutations & Combinations',
    question: 'The value of ₇C₂ (Combination of 2 from 7) is...',
    options: ['21', '14', '42', '35'],
    correctIndex: 0,
    explanation: '₇C₂ = (7 × 6) : (2 × 1) = 42 : 2 = 21.',
    difficulty: 'easy'
  },
  {
    id: 304,
    grade: 12,
    topicId: 'peluang-majemuk',
    topicTitle: 'Compound Probability',
    question: 'Two dice are rolled once. What is the probability that the sum of the dice equals 8?',
    options: ['5/36', '4/36', '6/36', '7/36'],
    correctIndex: 0,
    explanation: 'Pairs summing to 8: (2,6), (3,5), (4,4), (5,3), (6,2) ⟹ 5 out of 36.',
    difficulty: 'easy'
  },
  {
    id: 305,
    grade: 12,
    topicId: 'kalkulus-lanjut',
    topicTitle: 'Trigonometric Limits',
    question: 'The value of lim (x→0) [sin(6x) / (2x)] is...',
    options: ['3', '0', '1', '6'],
    correctIndex: 0,
    explanation: 'lim (x→0) [sin(ax) / bx] = a/b = 6/2 = 3.',
    difficulty: 'easy'
  },
  {
    id: 306,
    grade: 12,
    topicId: 'integral-kalkulus',
    topicTitle: 'Definite Integrals',
    question: 'The value of ∫ [0 to 2] (3x² + 2x) dx is...',
    options: ['12', '10', '14', '16'],
    correctIndex: 0,
    explanation: 'F(x) = x³ + x². F(2) - F(0) = (8 + 4) - 0 = 12.',
    difficulty: 'medium'
  },
  {
    id: 307,
    grade: 12,
    topicId: 'distribusi-binomial',
    topicTitle: 'Binomial Distribution',
    question: 'If the probability of success is p = 0.35, then the probability of failure q is...',
    options: ['0.65', '0.35', '0.70', '0.50'],
    correctIndex: 0,
    explanation: 'q = 1 - p = 1 - 0.35 = 0.65.',
    difficulty: 'easy'
  },
  {
    id: 308,
    grade: 12,
    topicId: 'utbk-penalaran-matematika',
    topicTitle: 'Mathematical Reasoning',
    question: 'If defined a # b = a² - 2b, what is the value of 6 # 5?',
    options: ['26', '21', '31', '16'],
    correctIndex: 0,
    explanation: '6 # 5 = 6² - 2(5) = 36 - 10 = 26.',
    difficulty: 'easy'
  }
];
