import { WorkoutCategory, TrainingProgram, GalleryItem, NutritionPillar } from '../types.ts';

export const HERO_IMAGE = {
  src: '/images/hero_athlete.jpg',
  alt: 'Muscular athlete preparing for heavy barbell lift in cinematic dark gym with chalk dust and dramatic rim lighting'
};

export const MOTIVATION_IMAGE = {
  src: '/images/motivation_athlete.jpg',
  alt: 'Disciplined athlete in deep concentration under dramatic overhead gym lighting'
};

export const NUTRITION_IMAGE = {
  src: '/images/nutrition_meal.jpg',
  alt: 'Gourmet high-protein meal with wild-caught salmon, fresh grilled asparagus, and avocado'
};

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  {
    id: 'strength',
    title: 'STRENGTH',
    tagline: 'Raw mechanical tension and progressive overload.',
    image: '/images/workout_strength.jpg',
    alt: 'Muscular athlete lifting heavy iron barbell with intense determination',
    description: 'Designed to build neural recruitment, tendon density, and uncompromising total-body power through compound barbell movements.',
    keyMovements: ['Barbell Conventional Deadlift', 'Low-Bar Back Squat', 'Overhead Press', 'Pendlay Row'],
    weeklyCommitment: '3–4 Sessions / Week',
    adaptation: 'Central nervous system recruitment & peak force production',
    sampleWorkout: {
      name: 'Max Effort Lower Chain',
      exercises: [
        { name: 'Barbell Deadlift', sets: '5', reps: '3', note: 'Heavy compound, 3 min rest' },
        { name: 'Deficit Romanian Deadlift', sets: '4', reps: '6', note: 'Tempo 3-1-0' },
        { name: 'Front Squat', sets: '4', reps: '5', note: 'Deep pause at bottom' },
        { name: 'Heavy Barbell Shrugs', sets: '3', reps: '8', note: '2 sec isometric contraction' }
      ]
    }
  },
  {
    id: 'hypertrophy',
    title: 'HYPERTROPHY',
    tagline: 'Precision volume, metabolic stress, and muscle development.',
    image: '/images/workout_hypertrophy.jpg',
    alt: 'Muscular male athlete executing dumbbell curls under cinematic studio lighting',
    description: 'Targeted muscular architecture designed to maximize cross-sectional area, structural density, and symmetrical muscularity.',
    keyMovements: ['Incline Dumbbell Press', 'Seated Cable Row', 'Hack Squat', 'Romanian Deadlift'],
    weeklyCommitment: '4–5 Sessions / Week',
    adaptation: 'Myofibrillar hypertrophy & sarcoplasmic volume expansion',
    sampleWorkout: {
      name: 'Upper Body Hypertrophy Split',
      exercises: [
        { name: 'Incline Dumbbell Press', sets: '4', reps: '8–10', note: 'Full stretch at bottom' },
        { name: 'Weighted Chest Dips', sets: '3', reps: '10–12', note: 'Slow eccentric control' },
        { name: 'Chest Supported T-Bar Row', sets: '4', reps: '10', note: 'Peak squeeze' },
        { name: 'Cable Lateral Raises', sets: '4', reps: '15', note: 'Constant tension' }
      ]
    }
  },
  {
    id: 'cardio',
    title: 'CARDIO',
    tagline: 'Athletic sprinting, VO2 max capacity, and relentless engine.',
    image: '/images/workout_cardio.jpg',
    alt: 'Athletic sprinter in full stride under dramatic night stadium floodlights',
    description: 'Relentless aerobic capacity and lactate threshold conditioning to build unmatched work capacity and athletic stamina.',
    keyMovements: ['Sprint Repeats', 'Assault Bike Intervals', 'Row Ergometer Threshold', 'Zone 2 Base Miles'],
    weeklyCommitment: '3–5 Sessions / Week',
    adaptation: 'Mitochondrial density, cardiac stroke volume & lactate clearance',
    sampleWorkout: {
      name: 'High-Output Lactate Protocol',
      exercises: [
        { name: 'AirBike Sprint', sets: '8', reps: '30s on / 60s off', note: 'Maximum effort watts' },
        { name: 'Concept2 Row Pace', sets: '5', reps: '500m', note: 'Target 1:42 pace' },
        { name: 'Trap Bar Carry', sets: '4', reps: '60m', note: 'Bodyweight equivalent' },
        { name: 'Prowler Sled Push', sets: '4', reps: '40m', note: 'Heavy resistance' }
      ]
    }
  },
  {
    id: 'mobility',
    title: 'MOBILITY',
    tagline: 'Joint longevity, kinetic chain freedom, and dynamic control.',
    image: '/images/workout_mobility.jpg',
    alt: 'Athletic woman performing dynamic mobility and flexibility movements',
    description: 'Active range-of-motion drills, end-range joint control, and fascial release to bulletproof tendons and optimize movement quality.',
    keyMovements: ['Thoracic Spine Rotations', 'Hip 90/90 Transitions', 'Ankle Dorsiflexion Pails/Rails', 'Shoulder CARs'],
    weeklyCommitment: 'Daily / 20–30 Minutes',
    adaptation: 'Active range of motion, articular health & injury resilience',
    sampleWorkout: {
      name: 'Hips & Thoracic Reset',
      exercises: [
        { name: 'Hip 90/90 Flow', sets: '3', reps: '10 transitions', note: 'Keep spine upright' },
        { name: 'Thoracic Bridge Reach', sets: '3', reps: '8 each side', note: 'Breathe into ribcage' },
        { name: 'Cossack Squats', sets: '3', reps: '8 each side', note: 'Slow tempo descent' },
        { name: 'Deadhang Lat Stretch', sets: '3', reps: '60s hold', note: 'Decompress spine' }
      ]
    }
  }
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'the-strength-plan',
    name: 'THE STRENGTH PLAN',
    subtitle: 'Compound power, raw mechanical force, and dense structural strength.',
    level: 'Advanced',
    frequency: '4 Days / Week',
    duration: '12 Weeks',
    targetFocus: 'Maximum Force Output & Central Nervous System Drive',
    image: '/images/program_strength.jpg',
    alt: 'Athlete focused intensely on a heavy barbell deadlift in a dramatic gym',
    description: 'A ruthless 12-week undulating periodization protocol calibrated for athletes demanding unbreakable compound strength in the squat, bench, and deadlift.',
    split: ['Day 1: Heavy Squat & Lower Posterior', 'Day 2: Heavy Bench & Upper Press', 'Day 3: Active Rest / Mobility', 'Day 4: Heavy Deadlift & Posterior Chain', 'Day 5: Overhead Press & Volume Upper', 'Days 6–7: Regeneration'],
    sampleWeek: [
      { day: 'Day 1', focus: 'Squat & Posterior', exercises: ['Competition Back Squat (5x3)', 'Bulgarian Split Squats (3x8)', 'Standing Calf Raises (4x12)'] },
      { day: 'Day 2', focus: 'Bench & Torso', exercises: ['Pause Bench Press (5x3)', 'Heavy Barbell Rows (4x6)', 'Face Pulls (3x15)'] },
      { day: 'Day 4', focus: 'Deadlift & Core', exercises: ['Conventional Deadlift (4x2)', 'Good Mornings (3x8)', 'Hanging Leg Raises (4x12)'] },
      { day: 'Day 5', focus: 'Overhead & Arms', exercises: ['Standing Strict Press (4x5)', 'Weighted Pull-ups (4x6)', 'Heavy Hammer Curls (3x10)'] }
    ],
    nutritionRule: 'Surplus of 300–500 kcal with 2.2g protein per kg to optimize neuromuscular recovery.'
  },
  {
    id: 'lean-and-athletic',
    name: 'LEAN & ATHLETIC',
    subtitle: 'High work capacity, functional speed, and razor-sharp conditioning.',
    level: 'Intermediate',
    frequency: '5 Days / Week',
    duration: '10 Weeks',
    targetFocus: 'Sub-10% Body Composition & Unbreakable Engine',
    image: '/images/program_athletic.jpg',
    alt: 'Athletic runner moving at high speed during conditioning session',
    description: 'Engineered for athletes who demand the physique of an elite sprinter and the endurance of a decathlete. Combines Olympic lifting hybrids with high-output threshold intervals.',
    split: ['Day 1: Athletic Power & Plyometrics', 'Day 2: Upper Functional Strength', 'Day 3: Anaerobic Threshold Sprinting', 'Day 4: Lower Explosive Output', 'Day 5: Full-Body Capacity Metcon', 'Days 6–7: Active Recovery'],
    sampleWeek: [
      { day: 'Day 1', focus: 'Explosive Power', exercises: ['Hang Power Clean (5x3)', 'Box Jumps (4x5)', 'Sprint Starts (6x30m)'] },
      { day: 'Day 2', focus: 'Upper Drive', exercises: ['Incline DB Neutral Press (4x8)', 'Neutral Grip Pull-ups (4x8)', 'Landmine Rotations (3x10)'] },
      { day: 'Day 3', focus: 'VO2 Max Intervals', exercises: ['Assault Bike 400m Repeats (6 rounds)', 'Farmer Carries (4x50m)'] },
      { day: 'Day 4', focus: 'Lower Kinetic', exercises: ['Trap Bar Jumps (4x4)', 'Walking DB Lunges (3x12)', 'Nordic Curls (3x6)'] }
    ],
    nutritionRule: 'Targeted carb-cycling: high complex carbohydrates surrounding intense training windows.'
  },
  {
    id: 'muscle-building',
    name: 'MUSCLE BUILDING',
    subtitle: 'Systematic muscular development, symmetry, and full-spectrum hypertrophy.',
    level: 'All Levels',
    frequency: '5 Days / Week',
    duration: '16 Weeks',
    targetFocus: 'Hypertrophic Architecture & Structural Mass',
    image: '/images/program_muscle.jpg',
    alt: 'Bodybuilder executing heavy overhead dumbbell press in dark gym',
    description: 'Hypertrophy broken down to its purest physiological science: calibrated sets to 1–2 RIR (reps in reserve), progressive mechanical overload, and full muscle length tension.',
    split: ['Day 1: Chest & Biceps', 'Day 2: Quads & Calves', 'Day 3: Back & Triceps', 'Day 4: Hamstrings & Core', 'Day 5: Shoulders & Upper Back', 'Days 6–7: Rest'],
    sampleWeek: [
      { day: 'Day 1', focus: 'Pectorals & Biceps', exercises: ['Incline Smith Press (3x8-10)', 'Cable Flys (3x12-15)', 'Incline DB Curls (4x10)'] },
      { day: 'Day 2', focus: 'Quadriceps', exercises: ['Hack Squat (3x8-10)', 'Leg Press (3x12)', 'Leg Extensions (3x15, drop set)'] },
      { day: 'Day 3', focus: 'Lats & Triceps', exercises: ['Weighted Neutral Chins (3x8)', 'Chest-Supported Row (3x10)', 'Rope Pushdowns (4x12)'] },
      { day: 'Day 5', focus: 'Deltoids & Traps', exercises: ['DB Shoulder Press (3x8)', 'Cable Lateral Raises (4x15)', 'Barbell Shrugs (3x12)'] }
    ],
    nutritionRule: 'High leucine intake every 3.5 hours to maximize daily muscle protein synthesis.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'THE CHALK RITUAL',
    discipline: 'Strength',
    image: '/images/gallery_chalk.jpg',
    alt: 'Barbell deadlift with magnesium carbonate chalk floating in dark gym light',
    aspect: 'tall',
    caption: 'Kinetic transfer at 260kg. The moment between stillness and absolute acceleration.'
  },
  {
    id: 'g2',
    title: 'BALLISTIC CONDITIONING',
    discipline: 'Conditioning',
    image: '/images/gallery_kettlebell.jpg',
    alt: 'High-intensity kettlebell and conditioning work in gym',
    aspect: 'square',
    caption: 'Dynamic force distribution across the posterior chain.'
  },
  {
    id: 'g3',
    title: 'EXPLOSIVE VELOCITY',
    discipline: 'Sprint Track',
    image: '/images/gallery_sprint.jpg',
    alt: 'Track athlete in full forward drive during high-speed sprint',
    aspect: 'wide',
    caption: 'Every millisecond earned through thousands of repeat efforts in the dark.'
  },
  {
    id: 'g4',
    title: 'TEMPERED STEEL',
    discipline: 'Equipment',
    image: '/images/gallery_equipment.jpg',
    alt: 'Solid iron dumbbells racked in minimalist gym setting',
    aspect: 'square',
    caption: 'Precision knurling. Calibrated iron weights that never compromise.'
  },
  {
    id: 'g5',
    title: 'THE INTERNAL DIALOGUE',
    discipline: 'Mindset',
    image: '/images/gallery_focus.jpg',
    alt: 'Focused athlete sitting on bench with head bowed before final set',
    aspect: 'tall',
    caption: 'Where the body negotiates with the mind. Discipline answers every time.'
  },
  {
    id: 'g6',
    title: 'DYNAMIC RESTORATION',
    discipline: 'Mobility',
    image: '/images/gallery_restoration.jpg',
    alt: 'Athlete stretching dynamic kinetic chain for recovery',
    aspect: 'wide',
    caption: 'Decompressing joints to prepare the central nervous system for tomorrow.'
  }
];

export const NUTRITION_PILLARS: NutritionPillar[] = [
  {
    id: 'protein',
    name: 'PROTEIN',
    headline: 'Structural Synthesis & Amino Balance',
    metric: '2.0 – 2.4g / kg Bodyweight',
    summary: 'The building block of contractile tissue. High biological value sources delivering complete essential amino acids to stimulate maximal muscle protein synthesis.',
    staples: ['Wild Alaskan Salmon', 'Grass-Fed Ribeye & Sirloin', 'Pasture-Raised Whole Eggs', 'Native Whey Isolate'],
    timing: 'Distributed evenly across 4 distinct boluses separated by 3 to 4 hours.'
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    headline: 'Glycogen Storage & ATP Generation',
    metric: '3.5 – 6.0g / kg Training Days',
    summary: 'Unprocessed complex carbohydrates timed to flood skeletal muscle with glycogen before high-intensity sessions and accelerate replenishment post-training.',
    staples: ['Slow-Rolled Oats', 'Japanese Sweet Potatoes', 'White Jasmine Rice', 'Tart Cherry & Berries'],
    timing: '50% of daily carbohydrate intake allocated within the 4-hour peri-workout window.'
  },
  {
    id: 'recovery',
    name: 'RECOVERY',
    headline: 'Cellular Hydration & Micronutrient Shield',
    metric: '0.8 – 1.0g / kg Healthy Lipids',
    summary: 'Omega-3 fatty acids, bioavailable electrolytes, and antioxidant-rich micronutrients that slash systemic inflammation and optimize natural endocrine health.',
    staples: ['Extra Virgin Olive Oil (Cold-Pressed)', 'Hass Avocados', 'Raw Macadamia Nuts', 'Himalayan Pink Salt & Magnesium'],
    timing: 'Consistent intake throughout non-workout meals with optimal hydration pacing.'
  }
];
