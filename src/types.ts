export interface WorkoutCategory {
  id: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
  description: string;
  keyMovements: string[];
  weeklyCommitment: string;
  adaptation: string;
  sampleWorkout: {
    name: string;
    exercises: { name: string; sets: string; reps: string; note: string }[];
  };
}

export interface TrainingProgram {
  id: string;
  name: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  frequency: string;
  duration: string;
  targetFocus: string;
  image: string;
  alt: string;
  description: string;
  split: string[];
  sampleWeek: {
    day: string;
    focus: string;
    exercises: string[];
  }[];
  nutritionRule: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  discipline: string;
  image: string;
  alt: string;
  aspect: 'tall' | 'wide' | 'square';
  caption: string;
}

export interface NutritionPillar {
  id: string;
  name: string;
  headline: string;
  metric: string;
  summary: string;
  staples: string[];
  timing: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogInternalLink {
  anchorText: string;
  url: string;
  context: string;
}

export interface BlogSection {
  heading: string;
  content: string[];
  subsections?: {
    subheading: string;
    content: string[];
  }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  publishDate: string;
  modifiedDate: string;
  readTime: string;
  category: 'Strength' | 'Hypertrophy' | 'Conditioning' | 'Mobility' | 'Nutrition';
  primaryKeyword: string;
  searchIntent: string;
  relatedKeywords: string[];
  image: string;
  alt: string;
  intro: string;
  // Answer Engine Optimization (AEO) direct snippet: 40-60 words concise answer for AI overviews
  aeoQuickAnswer: {
    directAnswer: string;
    keyTakeaways: string[];
  };
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  reviewedBy: {
    name: string;
    role: string;
  };
  sections: BlogSection[];
  conclusion: string;
  faqs: BlogFAQ[];
  internalLinks: BlogInternalLink[];
  relatedSlugs: string[];
}

