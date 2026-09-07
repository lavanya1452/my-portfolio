export type DatasetAnalysis = {
  id: string
  name: string
  description: string
  whatExplored: string
  questions: string[]
  analysis: string[]
  findings: string[]
  conclusion: string
  technologies: string[]
  image: string
  category: 'EDA' | 'STATISTICS' | 'VISUALIZATION' | 'BUSINESS ANALYSIS' | 'MACHINE LEARNING'
}

export const datasets: DatasetAnalysis[] = [
  {
    id: 'customer-data',
    name: 'Customer Dataset',
    description: 'A customer behavior dataset used to uncover demographics, purchasing patterns, and loyalty signals.',
    whatExplored: 'Customer behavior, demographics and spending patterns.',
    questions: [
      'Which customer segments are most engaged?',
      'Are there strong correlations between age, spending, and retention?',
      'Where do anomalies appear in customer activity?',
    ],
    analysis: ['EDA', 'Correlation analysis', 'Outlier detection', 'Visualization'],
    findings: [
      'Spending patterns were concentrated in a smaller number of customer groups.',
      'High-value customers tended to show repeated engagement over longer periods.',
      'Outliers revealed a few unusually high-value or low-activity cohorts.',
    ],
    conclusion:
      'The analysis showed that customer value was not evenly distributed and that segment-aware strategy would likely outperform a broad, one-size-fits-all approach.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'SQL'],
    image: '/assets/datasets/dataset-1.jpg',
    category: 'BUSINESS ANALYSIS',
  },
  {
    id: 'sales-patterns',
    name: 'Sales Pattern Dataset',
    description: 'A transactional dataset for identifying recurring trends and business opportunities.',
    whatExplored: 'Demand shifts, seasonal timing, product performance and revenue clustering.',
    questions: [
      'Which months see the highest demand?',
      'Are some product groups disproportionately driving revenue?',
      'What changes affect drop-off after the peak period?',
    ],
    analysis: ['Trend analysis', 'Statistical summaries', 'Visualization'],
    findings: [
      'Revenue spikes appeared in predictable cyclical windows.',
      'A few categories drove the majority of revenue distribution.',
      'Some segments showed interesting low-volume but high-margin behavior.',
    ],
    conclusion:
      'The pattern analysis pointed toward a strategy that balances volume growth with deeper focus on high-value segments rather than broad but shallow demand.',
    technologies: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
    image: '/assets/datasets/dataset-1.jpg',
    category: 'STATISTICS',
  },
  {
    id: 'health-signals',
    name: 'Health Signals Dataset',
    description: 'An exploratory dataset used to understand relationships between indicators and outcome patterns.',
    whatExplored: 'Feature interactions, class distribution and behavioral signals in structured health data.',
    questions: [
      'Which variables show the strongest signal?',
      'Are there interpretable patterns in the distribution?',
      'How much can basic modeling improve understanding of the dataset?',
    ],
    analysis: ['EDA', 'Feature inspection', 'Classification modeling', 'Visualization'],
    findings: [
      'A few variables showed disproportionately strong relationships with the target pattern.',
      'Class imbalance required careful evaluation of model trade-offs.',
      'The dataset demonstrated how simple visual exploration can reveal useful structure before modeling begins.',
    ],
    conclusion:
      'This project highlighted the value of thoughtful experimentation: the best insights came from combining careful EDA with interpretable model evaluation.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    image: '/assets/datasets/dataset-1.jpg',
    category: 'MACHINE LEARNING',
  },
]

export const datasetFilters = ['ALL', 'EDA', 'STATISTICS', 'VISUALIZATION', 'BUSINESS ANALYSIS', 'MACHINE LEARNING'] as const
