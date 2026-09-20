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
    id: 'oracle-data-science-professional',
    title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    organization: 'Oracle',
    date: 'Oct 2025',
    category: 'DATA SCIENCE',
    image: '/assets/certificates/oracle-data-science-professional-2025.png',
    pdfUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=421D05785FBB4E07981A5D32BD1C739010D6A2A1D31FD9E5F1BCB5B51D4A1D79',
    verificationUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=421D05785FBB4E07981A5D32BD1C739010D6A2A1D31FD9E5F1BCB5B51D4A1D79',
  },
  {
    id: 'oracle-ai-foundations-associate',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    organization: 'Oracle',
    date: 'Oct 2025',
    category: 'AI / ML',
    image: '/assets/certificates/oracle-ai-foundations-2025.png',
    pdfUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=CF21453AFFA3D1EB40DDE5D9B264DA2FA5CCEF8D275CD19240C386E3EB080CF3',
    verificationUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=CF21453AFFA3D1EB40DDE5D9B264DA2FA5CCEF8D275CD19240C386E3EB080CF3',
  },
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
