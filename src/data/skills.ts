export type SkillGroup = {
  title: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    title: 'Programming',
    items: ['Python', 'SQL', 'Java', 'C/C++'],
  },
  {
    title: 'Data',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Data Visualization'],
  },
  {
    title: 'Machine Learning',
    items: ['Scikit-learn', 'Regression', 'Classification', 'Clustering', 'Model Evaluation'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Jupyter', 'VS Code'],
  },
  {
    title: 'Development',
    items: ['TypeScript', 'APIs', 'React'],
  },
]
