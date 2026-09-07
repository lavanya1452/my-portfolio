export type AcademicEntry = {
  semester: string
  sgpa: string
  subjects: Array<{
    name: string
    grade: string
    marks: string
  }>
  coursework: string[]
}

export const academics: AcademicEntry[] = [
  {
    semester: '01',
    sgpa: '8.8',
    subjects: [
      { name: 'Engineering Mathematics', grade: 'A', marks: '88%' },
      { name: 'Programming Fundamentals', grade: 'A+', marks: '92%' },
      { name: 'Physics', grade: 'A', marks: '86%' },
    ],
    coursework: ['Problem solving', 'Foundations of logic', 'Intro to programming'],
  },
  {
    semester: '02',
    sgpa: '9.1',
    subjects: [
      { name: 'Data Structures', grade: 'A+', marks: '94%' },
      { name: 'Discrete Mathematics', grade: 'A', marks: '89%' },
      { name: 'Computer Organization', grade: 'A', marks: '88%' },
    ],
    coursework: ['DSA', 'Algorithms', 'Computer architecture'],
  },
  {
    semester: '03',
    sgpa: '8.9',
    subjects: [
      { name: 'Database Systems', grade: 'A', marks: '90%' },
      { name: 'Object Oriented Programming', grade: 'A+', marks: '93%' },
      { name: 'Operating Systems', grade: 'A', marks: '87%' },
    ],
    coursework: ['SQL', 'OOP', 'System design basics'],
  },
  {
    semester: '04',
    sgpa: '9.2',
    subjects: [
      { name: 'Machine Learning', grade: 'A+', marks: '95%' },
      { name: 'Statistics', grade: 'A', marks: '90%' },
      { name: 'Software Engineering', grade: 'A', marks: '89%' },
    ],
    coursework: ['Regression', 'Probability', 'ML fundamentals'],
  },
  {
    semester: '05',
    sgpa: '9.4',
    subjects: [
      { name: 'Deep Learning', grade: 'A+', marks: '96%' },
      { name: 'Data Mining', grade: 'A+', marks: '94%' },
      { name: 'AI Applications', grade: 'A', marks: '91%' },
    ],
    coursework: ['Neural networks', 'Pattern mining', 'AI systems'],
  },
  {
    semester: '06',
    sgpa: '9.3',
    subjects: [
      { name: 'Advanced Analytics', grade: 'A+', marks: '95%' },
      { name: 'Applied ML', grade: 'A', marks: '92%' },
      { name: 'Research Methods', grade: 'A', marks: '90%' },
    ],
    coursework: ['Experimental design', 'Applied models', 'Research thinking'],
  },
]

export const overallCGPA = '8.61'
