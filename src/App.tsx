import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Download,
  ExternalLink,
  Globe,
  ImageIcon,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { academics, overallCGPA } from './data/academics'
import { achievements } from './data/achievements'
import { certificates, certificateCategories } from './data/certificates'
import { conferences } from './data/conferences'
import { datasets, datasetFilters } from './data/datasets'
import { journey } from './data/journey'
import { learningLog } from './data/learningLog'
import { projects } from './data/projects'
import { skills } from './data/skills'

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'explore', label: 'EXPLORE' },
  { id: 'work', label: 'WORK' },
  { id: 'academics', label: 'ACADEMICS' },
  { id: 'certificates', label: 'CERTIFICATES' },
  { id: 'experiences', label: 'EXPERIENCES' },
  { id: 'contact', label: 'CONTACT' },
] as const

const words = ['EXPLORE.', 'ANALYZE.', 'BUILD.', 'LEARN.']

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function App() {
  const [activeWord, setActiveWord] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [datasetFilter, setDatasetFilter] = useState<(typeof datasetFilters)[number]>('ALL')
  const [selectedDataset, setSelectedDataset] = useState<(typeof datasets)[number] | null>(null)
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[number] | null>(null)
  const [selectedSemester, setSelectedSemester] = useState(0)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveWord((current) => (current + 1) % words.length)
    }, 1800)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.24, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const filteredDatasets = useMemo(() => {
    if (datasetFilter === 'ALL') return datasets
    return datasets.filter((dataset) => dataset.category === datasetFilter)
  }, [datasetFilter])

  const filteredCertificates = useMemo(() => {
    if (selectedSkill) {
      return certificates.filter((certificate) =>
        certificate.category.toLowerCase().includes(selectedSkill.toLowerCase()) ||
        certificate.title.toLowerCase().includes(selectedSkill.toLowerCase()),
      )
    }
    return certificates
  }, [selectedSkill])

  const activeAcademic = academics[selectedSemester]

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#f4efe8]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f17]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="text-2xl font-medium tracking-[-0.08em] text-[#f5efe5]">
            Lavanya<span className="text-[#6fe0d4]">.</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`text-[11px] font-medium tracking-[0.18em] uppercase transition ${
                  activeSection === item.id ? 'text-[#f5efe5]' : 'text-[#9aa3ae] hover:text-[#e8e2d9]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
            <a
              href="/assets/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-[#6fe0d4]/50 bg-[#111927] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#eafaf7] transition hover:border-[#6fe0d4] hover:bg-[#123d3b]"
            >
              Resume <ArrowUpRight size={14} />
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            onClick={() => setMobileNavOpen((state) => !state)}
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-[#0b0f17] px-5 py-4 md:hidden"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSection(item.id)
                      setMobileNavOpen(false)
                    }}
                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#c8d0d8]"
                  >
                    {item.label}
                  </a>
                ))}
                <a href="/assets/resume.pdf" className="mt-2 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6fe0d4]">
                  Resume <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,73,74,0.35),transparent_30%),radial-gradient(circle_at_right,_rgba(32,65,75,0.22),transparent_25%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:pb-20 lg:pt-16">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative z-10"
            >
              <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#a9b5c4]">
                <span className="inline-block h-px w-8 bg-[#6fe0d4]" />
                Computer Science Student · ML Enthusiast · Data Explorer
              </div>

              <h1 className="max-w-2xl font-display text-[2.7rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem] lg:text-[4.8rem]">
                Lavanya SM
              </h1>

              <div className="mt-7 flex min-h-[2.5rem] items-center text-[1.2rem] font-medium uppercase tracking-[0.22em] text-[#8bd9d1]">
                {words[activeWord]}
              </div>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#b7c0cb]">
                I enjoy exploring datasets, finding patterns, building machine learning models, and turning curious questions into meaningful insights.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#6fe0d4] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0c121a] transition hover:brightness-110">
                  Explore Work <ArrowRight size={16} />
                </a>
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#e4e7eb]/15 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#edf2f7] transition hover:border-[#6fe0d4]/60 hover:text-[#dffdf8]">
                  <Globe size={16} /> GitHub
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#e4e7eb]/15 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#edf2f7] transition hover:border-[#6fe0d4]/60 hover:text-[#dffdf8]">
                  <Briefcase size={16} /> LinkedIn
                </a>
              </div>

              <div className="mt-10 flex items-center gap-8 text-[#a8b1bc]">
                <div>
                  <div className="text-3xl font-semibold tracking-[-0.06em] text-[#f4efe8]">6</div>
                  <div className="text-[10px] uppercase tracking-[0.18em]">Semesters</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-[-0.06em] text-[#f4efe8]">9.1</div>
                  <div className="text-[10px] uppercase tracking-[0.18em]">CGPA</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-[-0.06em] text-[#f4efe8]">20+</div>
                  <div className="text-[10px] uppercase tracking-[0.18em]">Projects</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.14, ease: 'easeOut' }}
              className="relative z-10 flex items-center justify-center"
            >
              <div className="w-full max-w-[540px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0f1725] p-4 shadow-glow">
                <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#dfe5eb] p-3">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(35,228,201,0.18),transparent_40%)]" />
                  <img src="/assets/profile.jpg" alt="Lavanya SM portrait" className="relative aspect-[4/5] h-full w-full rounded-[18px] object-cover object-center grayscale-[0.15]" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 text-[#dfe6ec]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ea0b4]">Name</div>
                    <div className="mt-1 text-xl font-medium tracking-[-0.06em] text-[#f5efe8]">Lavanya SM</div>
                  </div>
                  <div className="rounded-full border border-[#6fe0d4]/60 bg-[#111b28] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#dffcf8]">
                    ML + DATA
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-4 hidden h-44 w-44 rounded-full border border-[#6fe0d4]/20 bg-[#6fe0d4]/5 blur-3xl md:block" />
          <div className="pointer-events-none absolute right-12 top-28 hidden h-56 w-56 rounded-full border border-[#7dd3fc]/20 bg-[#7dd3fc]/5 blur-3xl md:block" />
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.25em] text-[#93a9bb]">A little about me.</div>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111b27] p-3">
                <div className="aspect-[4/5] max-h-[520px] overflow-hidden rounded-[22px] bg-[#dfe7f0]">
                  <img src="/assets/about-profile.jpg" alt="Lavanya portrait close-up" className="h-full w-full object-cover object-center" />
                </div>
              </div>

              <div>
                <h2 className="max-w-2xl font-display text-[2.8rem] leading-[0.9] tracking-[-0.07em] text-[#f3efe8] sm:text-[4rem]">
                  A LITTLE ABOUT ME.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#b7c0cb]">
                  I’m a Computer Science student with a growing obsession with machine learning and data. I enjoy taking unfamiliar datasets, asking questions, finding patterns, experimenting with different approaches, and seeing what the data can reveal.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {['COMPUTER SCIENCE', 'MACHINE LEARNING', 'DATA SCIENCE', 'PYTHON', 'SQL', 'PROBLEM SOLVING'].map((tag) => (
                    <span key={tag} className="rounded-full border border-[#6fe0d4]/30 bg-[#11202c] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d7fef8]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="explore" className="border-y border-white/10 bg-[#0d141c] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-12 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">My journey</div>
              <div className="relative">
                <div className="absolute left-[10px] top-2 bottom-2 hidden w-px bg-white/10 md:block" />
                <div className="space-y-8 md:space-y-10">
                  {journey.map((item) => (
                    <div key={item.year} className="relative grid gap-4 md:grid-cols-[120px_1fr] md:gap-12">
                      <div className="relative md:pl-0">
                        <div className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#6fe0d4] bg-[#0d141c] shadow-[0_0_0_5px_rgba(111,224,212,0.08)] md:ml-[-2px]" />
                        <div className="mt-4 text-2xl font-semibold tracking-[-0.06em] text-[#f3efe8] md:mt-0">{item.year}</div>
                      </div>

                      <motion.div
                        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-[28px] border border-white/10 bg-[#111b28] p-6"
                      >
                        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#75d7cf]">Milestone</div>
                        <h3 className="text-2xl font-medium tracking-[-0.06em] text-[#f3efe8]">{item.title}</h3>
                        <p className="mt-3 max-w-xl text-base leading-7 text-[#b7c0cb]">{item.description}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Curiosity usually starts with a dataset.</div>
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">DATASETS I'VE EXPLORED</h2>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {datasetFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setDatasetFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition ${
                    datasetFilter === filter
                      ? 'border-[#6fe0d4] bg-[#1d3b3b] text-[#dffcf8]'
                      : 'border-white/10 bg-[#111827] text-[#b4bec9] hover:border-[#6fe0d4]/40'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredDatasets.map((dataset, index) => (
                <motion.button
                  key={dataset.id}
                  type="button"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  onClick={() => setSelectedDataset(dataset)}
                  className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#111b27] text-left transition hover:-translate-y-1 hover:border-[#6fe0d4]/50"
                >
                  <div className="overflow-hidden border-b border-white/10">
                    <img src={dataset.image} alt={dataset.name} className="h-56 w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7ad8d2]">{dataset.category}</div>
                    <h3 className="text-2xl font-medium tracking-[-0.06em] text-[#f3efe8]">{dataset.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#b5bec8]">{dataset.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#dffcf8]">
                      View analysis <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="mt-24">
            <div className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Things I've built.</div>
            <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">THINGS I'VE BUILT.</h2>

            <div className="mt-10 space-y-8">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className={`grid gap-6 overflow-hidden rounded-[36px] border border-white/10 bg-[#111b27] p-4 md:p-6 lg:grid-cols-2 ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#dfe7ee]">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center p-3">
                    <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#75d7cf]">Project</div>
                    <h3 className="text-3xl font-medium tracking-[-0.06em] text-[#f3efe8] sm:text-[2.6rem]">{project.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[#b6bfc9]">{project.shortDescription}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-[#162330] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#dfe9f5]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#edf3f7]">
                        GitHub <ExternalLink size={14} />
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#6fe0d4]/50 bg-[#123d3b] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#dffcf8]">
                        Live Demo <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="academics" className="border-y border-white/10 bg-[#0d141c] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8ca0af]">Academic performance</div>
              <h2 className="font-display text-[2.8rem] leading-[0.92] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">6 SEMESTERS.<br />A LOT OF LEARNING.</h2>

              <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-[26px] border border-white/10 bg-[#111b27] p-4 md:p-5">
                  <div className="flex flex-wrap gap-2">
                    {academics.map((academic, index) => (
                      <button
                        key={academic.semester}
                        type="button"
                        onClick={() => setSelectedSemester(index)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium ${
                          selectedSemester === index
                            ? 'border-[#6fe0d4] bg-[#123d3b] text-[#dffcf8]'
                            : 'border-white/10 bg-[#0f1725] text-[#bfc8d1]'
                        }`}
                      >
                        {academic.semester}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[22px] border border-white/10 bg-[#0f1725] p-5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#8ca0af]">Overall CGPA</div>
                    <div className="mt-3 text-5xl font-semibold tracking-[-0.08em] text-[#f3efe8]">{overallCGPA}</div>
                  </div>
                </div>

                <motion.div
                  key={activeAcademic.semester}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-[30px] border border-white/10 bg-[#111b27] p-6 md:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-[#8ca0af]">Semester</div>
                      <div className="mt-2 text-4xl font-semibold tracking-[-0.08em] text-[#f3efe8]">0{activeAcademic.semester}</div>
                    </div>
                    <div className="rounded-full border border-[#6fe0d4]/40 bg-[#123d3b] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#dffcf8]">
                      SGPA {activeAcademic.sgpa}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {activeAcademic.subjects.map((subject) => (
                      <div key={subject.name} className="rounded-[20px] border border-white/10 bg-[#0f1725] p-4">
                        <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#8ca0af]">Subject</div>
                        <div className="text-xl font-medium tracking-[-0.06em] text-[#f3efe8]">{subject.name}</div>
                        <div className="mt-4 flex items-center justify-between text-sm text-[#dfe8ef]">
                          <span>Grade</span>
                          <span className="font-medium text-[#6fe0d4]">{subject.grade}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm text-[#dfe8ef]">
                          <span>Marks</span>
                          <span>{subject.marks}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#8ca0af]">Relevant coursework</div>
                    <div className="flex flex-wrap gap-2">
                      {activeAcademic.coursework.map((course) => (
                        <span key={course} className="rounded-full border border-white/10 bg-[#162330] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#dfe8ef]">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="certificates" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#8ca0af]">Proof of learning.</div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">CERTIFICATIONS.</h2>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {certificateCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedSkill(category === 'ALL' ? null : category)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition ${
                    (category === 'ALL' && selectedSkill === null) || selectedSkill === category
                      ? 'border-[#6fe0d4] bg-[#1d3b3b] text-[#dffcf8]'
                      : 'border-white/10 bg-[#111827] text-[#b4bec9] hover:border-[#6fe0d4]/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 columns-1 gap-5 md:columns-2 xl:columns-3">
              {filteredCertificates.map((certificate) => (
                <button
                  key={certificate.id}
                  type="button"
                  onClick={() => setSelectedCertificate(certificate)}
                  className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[28px] border border-white/10 bg-[#111b27] text-left"
                >
                  <div className="overflow-hidden border-b border-white/10">
                    <img src={certificate.image} alt={certificate.title} className="h-auto w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#75d7cf]">{certificate.category}</div>
                    <h3 className="mt-3 text-xl font-medium tracking-[-0.05em] text-[#f3efe8]">{certificate.title}</h3>
                    <div className="mt-3 text-sm text-[#b7c0cb]">{certificate.organization}</div>
                    <div className="mt-1 text-sm text-[#8ea0b4]">{certificate.date}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="experiences" className="border-y border-white/10 bg-[#0d141c] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Where I've been learning.</div>
              <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">WHERE I'VE BEEN LEARNING.</h2>

              <div className="mt-10 space-y-10">
                {conferences.map((event, index) => (
                  <article
                    key={event.id}
                    className={`grid gap-6 rounded-[30px] border border-white/10 bg-[#111b27] p-4 md:p-6 lg:grid-cols-2 ${
                      index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    <div className="overflow-hidden rounded-[24px] border border-white/10">
                      <img src={event.photo} alt={event.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex flex-col justify-center p-2">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#75d7cf]">Event 0{index + 1}</div>
                      <h3 className="mt-3 text-3xl font-medium tracking-[-0.06em] text-[#f3efe8]">{event.name}</h3>
                      <div className="mt-3 text-sm uppercase tracking-[0.18em] text-[#aab7c4]">{event.organization}</div>
                      <div className="mt-2 text-sm text-[#97a5b6]">{event.date} · {event.location}</div>
                      <p className="mt-4 text-base leading-7 text-[#b5bec8]">{event.description}</p>

                      <div className="mt-5 rounded-[18px] border border-white/10 bg-[#0f1725] p-4">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ca0af]">What I learned</div>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#dfe8ef]">
                          {event.learnings.map((item) => (
                            <li key={item} className="flex gap-2">
                              <CheckCircle2 size={14} className="mt-1 shrink-0 text-[#6fe0d4]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <a href={event.certificate} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#edf3f7]">
                          Certificate <ImageIcon size={14} />
                        </a>
                        {event.externalLink && (
                          <a href={event.externalLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#6fe0d4]/40 bg-[#123d3b] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#dffcf8]">
                            Event Link <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Recognitions</div>
            <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">ACHIEVEMENTS.</h2>

            <div className="mt-10 space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="grid gap-4 rounded-[28px] border border-white/10 bg-[#111b27] p-5 md:grid-cols-[180px_1fr] md:items-center">
                  <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#dfe7ef]">
                    {achievement.image ? (
                      <img src={achievement.image} alt={achievement.title} className="h-32 w-full object-cover" />
                    ) : (
                      <div className="flex h-32 items-center justify-center text-xs uppercase tracking-[0.2em] text-[#1a2735]">Award</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#75d7cf]">{achievement.date}</div>
                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.06em] text-[#f3efe8]">{achievement.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#b7c0cb]">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Things I work with.</div>
            <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">THINGS I WORK WITH.</h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {skills.map((group) => (
                <div key={group.title} className="rounded-[24px] border border-white/10 bg-[#111b27] p-5">
                  <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#75d7cf]">{group.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSelectedSkill(item)}
                        className={`rounded-full border px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] transition ${
                          selectedSkill === item
                            ? 'border-[#6fe0d4] bg-[#123d3b] text-[#dffcf8]'
                            : 'border-white/10 bg-[#0f1725] text-[#dfe8ef] hover:border-[#6fe0d4]/40'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="border-y border-white/10 bg-[#0d141c] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">What I'm exploring now.</div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111b27] py-5">
                <div className="marquee-track flex min-w-max gap-5 whitespace-nowrap px-4 text-[1.3rem] font-medium uppercase tracking-[-0.06em] text-[#f4efe8] md:text-[2rem]">
                  {['Machine Learning', 'Advanced SQL', 'Data Analytics', 'DSA', 'AI Applications', 'Data Visualization', 'Machine Learning', 'Advanced SQL', 'Data Analytics', 'DSA', 'AI Applications', 'Data Visualization'].map((item) => (
                    <span key={item} className="inline-flex items-center gap-4">
                      {item}
                      <span className="text-[#6fe0d4]">•</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">What I've been learning.</div>
            <div className="grid gap-5 md:grid-cols-3">
              {learningLog.map((entry) => (
                <div key={entry.month} className="rounded-[28px] border border-white/10 bg-[#111b27] p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#75d7cf]">{entry.month}</div>
                  <ul className="mt-4 space-y-3 text-base leading-7 text-[#dfe8ef]">
                    {entry.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <BookOpen size={14} className="text-[#6fe0d4]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="border-y border-white/10 bg-[#0d141c] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#111b27_0%,#0d171d_100%)] p-6 md:p-10"
            >
              <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Beyond the resume.</div>
              <h2 className="font-display text-[2.4rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">BEYOND THE RESUME.</h2>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-[#d7dde5]">
                I’m happiest when there’s a dataset I haven’t understood yet. I like exploring unfamiliar data, finding patterns that aren't immediately obvious, trying different approaches, and occasionally getting lost in a rabbit hole of analysis.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Building in public.</div>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">BUILDING IN PUBLIC.</h2>
              <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#6fe0d4]/50 bg-[#123d3b] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#dffcf8]">
                <Globe size={16} /> GitHub profile <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <a key={project.id} href={project.githubUrl} target="_blank" rel="noreferrer" className="group rounded-[26px] border border-white/10 bg-[#111b27] p-4 transition hover:border-[#6fe0d4]/40">
                  <div className="overflow-hidden rounded-[18px] border border-white/10">
                    <img src={project.image} alt={project.title} className="h-44 w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="mt-4 text-xl font-medium tracking-[-0.06em] text-[#f3efe8]">{project.title}</div>
                  <div className="mt-2 text-sm text-[#b7c0cb]">{project.shortDescription}</div>
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="rounded-[30px] border border-[#6fe0d4]/25 bg-[linear-gradient(135deg,#0f1b1f_0%,#0e1722_100%)] p-6 md:p-10"
          >
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8ca0af]">Want the full story?</div>
            <h2 className="font-display text-[2.4rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">WANT THE FULL STORY?</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/assets/resume.pdf" className="inline-flex items-center gap-2 rounded-full bg-[#6fe0d4] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0d1219]">
                View Resume <ArrowUpRight size={16} />
              </a>
              <a href="/assets/resume.pdf" download className="inline-flex items-center gap-2 rounded-full border border-[#e4e7eb]/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#edf2f7]">
                Download Resume <Download size={16} />
              </a>
            </div>
          </motion.div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-[2.8rem] leading-[0.9] tracking-[-0.08em] text-[#f3efe8] sm:text-[4rem]">LET'S BUILD<br />SOMETHING INTERESTING.</h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <a href="mailto:lavanya@example.com" className="rounded-[24px] border border-white/10 bg-[#111b27] p-5 transition hover:border-[#6fe0d4]/50">
                <Mail className="mb-4 text-[#6fe0d4]" size={22} />
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#8ca0af]">Email</div>
                <div className="mt-2 text-lg font-medium tracking-[-0.05em] text-[#f3efe8]">lavanya@example.com</div>
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="rounded-[24px] border border-white/10 bg-[#111b27] p-5 transition hover:border-[#6fe0d4]/50">
                <Briefcase className="mb-4 text-[#6fe0d4]" size={22} />
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#8ca0af]">LinkedIn</div>
                <div className="mt-2 text-lg font-medium tracking-[-0.05em] text-[#f3efe8]">linkedin.com/in/yourusername</div>
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="rounded-[24px] border border-white/10 bg-[#111b27] p-5 transition hover:border-[#6fe0d4]/50">
                <Globe className="mb-4 text-[#6fe0d4]" size={22} />
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#8ca0af]">GitHub</div>
                <div className="mt-2 text-lg font-medium tracking-[-0.05em] text-[#f3efe8]">github.com/yourusername</div>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-medium tracking-[-0.06em] text-[#f3efe8]">Lavanya SM</div>
            <div className="mt-1 text-sm text-[#9aa7b5]">Computer Science Student · ML Enthusiast · Data Explorer</div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#bac4ce]">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:lavanya@example.com">Email</a>
          </div>
          <div className="text-sm text-[#8ea0b4]">© 2026 Lavanya SM</div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedDataset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#060b12]/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedDataset(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#101a28] p-4 md:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#75d7cf]">{selectedDataset.category}</div>
                <button type="button" onClick={() => setSelectedDataset(null)} className="rounded-full border border-white/10 p-2 text-[#e7edf4]">
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
                <div className="overflow-hidden rounded-[20px] border border-white/10">
                  <img src={selectedDataset.image} alt={selectedDataset.name} className="w-full object-cover" />
                </div>

                <div>
                  <h3 className="text-3xl font-medium tracking-[-0.06em] text-[#f3efe8]">{selectedDataset.name}</h3>
                  <p className="mt-4 text-base leading-7 text-[#b7c0cb]">{selectedDataset.description}</p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[18px] border border-white/10 bg-[#0f1725] p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ca0af]">What I explored</div>
                      <p className="mt-2 text-sm leading-6 text-[#dfe8ef]">{selectedDataset.whatExplored}</p>
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-[#0f1725] p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ca0af]">Analysis</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#dfe8ef]">
                        {selectedDataset.analysis.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ca0af]">Key questions</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#dfe8ef]">
                      {selectedDataset.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ca0af]">Key findings</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#dfe8ef]">
                      {selectedDataset.findings.map((finding) => (
                        <li key={finding}>{finding}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 rounded-[18px] border border-white/10 bg-[#0f1725] p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ca0af]">Conclusion</div>
                    <p className="mt-2 text-sm leading-6 text-[#dfe8ef]">{selectedDataset.conclusion}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#060b12]/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-[#101a28]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#75d7cf]">{selectedCertificate.category}</div>
                <button type="button" onClick={() => setSelectedCertificate(null)} className="rounded-full border border-white/10 p-2 text-[#e7edf4]">
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 md:p-6">
                <img src={selectedCertificate.image} alt={selectedCertificate.title} className="w-full rounded-[20px] border border-white/10 object-cover" />
                <h3 className="mt-6 text-3xl font-medium tracking-[-0.06em] text-[#f3efe8]">{selectedCertificate.title}</h3>
                <div className="mt-2 text-base text-[#b7c0cb]">{selectedCertificate.organization} · {selectedCertificate.date}</div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={selectedCertificate.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#edf3f7]">
                    View Certificate <ExternalLink size={14} />
                  </a>
                  {selectedCertificate.verificationUrl && (
                    <a href={selectedCertificate.verificationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#6fe0d4]/40 bg-[#123d3b] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#dffcf8]">
                      Verify Certificate <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
