export type Project = {
  id: string
  title: string
  shortDescription: string
  description: string
  problem: string
  approach: string
  technologies: string[]
  results: string
  githubUrl: string
  liveUrl: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'churn',
    title: 'Customer Churn Prediction',
    shortDescription: 'Predicting customers likely to churn with interpretable ML models.',
    description:
      'A machine learning project focused on understanding churn risk and identifying the strongest drivers behind customer attrition.',
    problem:
      'Retention teams need early signals so they can intervene before a customer leaves, but churn patterns are often buried across large behavioral histories.',
    approach:
      'I cleaned the dataset, explored feature relationships, benchmarked models, and visualized the churn drivers to highlight patterns in customer behavior.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    results:
      'The model surfaced the most important churn signals and helped turn an opaque retention problem into a more actionable, data-driven workflow.',
    githubUrl: 'https://github.com/yourusername/churn-prediction',
    liveUrl: '#',
    image: '/assets/projects/churn.jpg',
  },
  {
    id: 'leaklock',
    title: 'LeakLock',
    shortDescription: 'A security-focused tool for detecting exposed credentials and API risks.',
    description:
      'LeakLock explores data exposure patterns by checking for leaked or compromised credentials and surfacing relevant risk signals from API-based integrations.',
    problem:
      'Credential leaks and compromised records can be invisible until they cause real security or trust issues, especially when the data is spread across systems.',
    approach:
      'I designed a security-minded workflow that combines data checks, API integrations, and structured validation to make exposure detection clearer and more actionable.',
    technologies: ['TypeScript', 'APIs', 'Security', 'Backend'],
    results:
      'The project demonstrates a practical approach to exposure monitoring and how security signals can be made more visible to users and teams.',
    githubUrl: 'https://github.com/yourusername/leaklock',
    liveUrl: '#',
    image: '/assets/projects/leaklock.jpg',
  },
  {
    id: 'segmentation',
    title: 'Customer Segmentation',
    shortDescription: 'Unsupervised clustering to understand customer groups and behavior.',
    description:
      'A clustering-based analysis of customer behavior, exploring how customers can be grouped into meaningful segments based on their patterns.',
    problem:
      'Without segmentation, it is hard to distinguish broad customer habits from high-value behavioral patterns and tailor interventions effectively.',
    approach:
      'I used dimensionality reduction and clustering techniques to identify behavioral groups and visualized those clusters to understand what separated them.',
    technologies: ['Python', 'K-Means', 'DBSCAN', 'Clustering', 'Data Visualization'],
    results:
      'The analysis made underlying customer patterns easier to interpret and highlighted how clustering can support segmentation decisions.',
    githubUrl: 'https://github.com/yourusername/customer-segmentation',
    liveUrl: '#',
    image: '/assets/projects/segmentation.jpg',
  },
  {
    id: 'sql-project',
    title: 'SQL / Data Analytics Project',
    shortDescription: 'Placeholder project for upcoming analytics work and exploratory SQL projects.',
    description:
      'This project space is intentionally structured so future analyses, SQL experiments, and business queries can be added without redesigning the portfolio.',
    problem:
      'Analytical questions often start with messy raw data; the goal here is to turn that into a readable, structured story with clear business insight.',
    approach:
      'I am building a reusable structure for data cleaning, exploratory analysis, and summary reporting that can grow as the project portfolio evolves.',
    technologies: ['SQL', 'Data Analysis', 'Business Reporting'],
    results:
      'This placeholder demonstrates the portfolio’s flexibility while keeping the content easy to update with final project details later.',
    githubUrl: '#',
    liveUrl: '#',
    image: '/assets/projects/churn.jpg',
  },
]
