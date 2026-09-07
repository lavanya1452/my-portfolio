export type Certificate = {
  id: string
  title: string
  organization: string
  date: string
  category: 'AI / ML' | 'DATA SCIENCE' | 'SQL' | 'PROGRAMMING' | 'OTHER'
  image: string
  pdfUrl: string
  verificationUrl?: string
}

export const certificateCategories = ['ALL', 'AI / ML', 'DATA SCIENCE', 'SQL', 'PROGRAMMING', 'OTHER'] as const

export const certificates: Certificate[] = [
  {
    id: 'ml-foundations',
    title: 'Machine Learning Foundations',
    organization: 'Coursera',
    date: 'Sep 2025',
    category: 'AI / ML',
    image: '/assets/certificates/certificate-1.jpg',
    pdfUrl: '#',
    verificationUrl: '#',
  },
  {
    id: 'sql-analytics',
    title: 'SQL for Data Analytics',
    organization: 'DataCamp',
    date: 'Jul 2025',
    category: 'SQL',
    image: '/assets/certificates/certificate-2.jpg',
    pdfUrl: '#',
    verificationUrl: '#',
  },
  {
    id: 'python-ds',
    title: 'Python for Data Science',
    organization: 'Udemy',
    date: 'May 2025',
    category: 'DATA SCIENCE',
    image: '/assets/certificates/certificate-1.jpg',
    pdfUrl: '#',
  },
  {
    id: 'react-bootcamp',
    title: 'Modern React Development',
    organization: 'Frontend Academy',
    date: 'Jan 2026',
    category: 'PROGRAMMING',
    image: '/assets/certificates/certificate-2.jpg',
    pdfUrl: '#',
  },
  {
    id: 'ai-ethics',
    title: 'AI and Ethics',
    organization: 'Learning Hub',
    date: 'Mar 2025',
    category: 'OTHER',
    image: '/assets/certificates/certificate-1.jpg',
    pdfUrl: '#',
  },
]
