export type EventItem = {
  id: string
  name: string
  organization: string
  date: string
  location: string
  description: string
  learnings: string[]
  certificate: string
  photo: string
  externalLink?: string
}

export const conferences: EventItem[] = [
  {
    id: 'ai-workshop',
    name: 'AI & Data Workshop',
    organization: 'Innovation Lab',
    date: 'Mar 2026',
    location: 'Bengaluru, India',
    description: 'A hands-on workshop focused on practical AI applications, datasets, and experimentation strategies.',
    learnings: ['How to frame ML problems from real-world data', 'How experimentation shapes model quality', 'Why smaller, sharper questions matter more than larger datasets'],
    certificate: '/assets/conferences/event-1-certificate.jpg',
    photo: '/assets/conferences/event-1-photo.jpg',
    externalLink: '#',
  },
  {
    id: 'ml-seminar',
    name: 'Machine Learning Seminar Series',
    organization: 'Data Society',
    date: 'Nov 2025',
    location: 'Virtual',
    description: 'A seminar on applied ML, feature engineering, and the importance of interpretability in real data problems.',
    learnings: ['The role of model explainability', 'Feature quality over feature quantity', 'How to evaluate success beyond accuracy'],
    certificate: '/assets/conferences/event-1-certificate.jpg',
    photo: '/assets/conferences/event-1-photo.jpg',
    externalLink: '#',
  },
]
