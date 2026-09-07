export type Achievement = {
  id: string
  title: string
  date: string
  description: string
  image?: string
  certificate?: string
}

export const achievements: Achievement[] = [
  {
    id: 'hack-1',
    title: 'Data Hack Challenge Finalist',
    date: '2025',
    description: 'Reached the final round by building a compelling, data-supported solution and presenting a clear narrative around the problem.',
    image: '/assets/projects/churn.jpg',
    certificate: '/assets/certificates/certificate-1.jpg',
  },
  {
    id: 'presentation',
    title: 'Student Research Presentation',
    date: '2025',
    description: 'Presented a project-driven analysis on customer behavior and pattern discovery to peers and faculty members.',
    image: '/assets/projects/segmentation.jpg',
  },
  {
    id: 'academic-award',
    title: 'Academic Excellence Recognition',
    date: '2024',
    description: 'Recognized for consistent performance and strong analytical thinking through multiple semester milestones.',
    image: '/assets/projects/leaklock.jpg',
  },
]
