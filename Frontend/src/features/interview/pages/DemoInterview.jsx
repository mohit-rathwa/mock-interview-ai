import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { generateDemoReport } from '../services/interview.api'
import '../style/interview.scss'
import '../style/home.scss'

const PRESET_JOBS = [
    {
        title: "Senior Full-Stack Engineer (React & Node)",
        jd: "We are seeking a Senior Full-Stack Engineer proficient in React, TypeScript, Node.js, and MongoDB. Experience designing scalable microservices, REST/GraphQL APIs, and writing automated tests is required. System design and performance optimization expertise preferred."
    },
    {
        title: "Frontend Developer (React / Next.js)",
        jd: "Looking for a Frontend Developer with 2+ years of experience in React, modern JavaScript/TypeScript, CSS/SCSS, and state management. Strong understanding of web vitals, responsive design, and component architecture required."
    },
    {
        title: "Backend Engineer (Node / Distributed Systems)",
        jd: "Seeking a Backend Engineer skilled in Node.js, Express, PostgreSQL/MongoDB, Redis caching, and Docker. Experience with asynchronous event architectures, rate limiting, and database indexing is highly desirable."
    }
]

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Interviewer Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const DemoInterview = () => {
    const navigate = useNavigate()
    const [ jobDescription, setJobDescription ] = useState(PRESET_JOBS[0].jd)
    const [ selfDescription, setSelfDescription ] = useState("Full Stack Developer with 2 years of experience in JavaScript, React, Node.js, and MongoDB.")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ report, setReport ] = useState(null)
    const [ activeNav, setActiveNav ] = useState('technical')

    const handleGenerateDemo = async () => {
        if (!jobDescription.trim()) {
            setError("Please provide a job description.")
            return
        }
        setLoading(true)
        setError(null)
        try {
            const data = await generateDemoReport({
                jobDescription,
                selfDescription
            })
            if (data && data.interviewReport) {
                setReport(data.interviewReport)
            } else {
                setError("Unable to generate demo report. Please check your backend connection.")
            }
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Failed to generate demo report.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="home-page demo-page" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Top Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(22, 22, 22, 0.8)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" style={{ color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                        &larr; Back to Home
                    </Link>
                    <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(225, 3, 77, 0.15)',
                        border: '1px solid rgba(225, 3, 77, 0.3)',
                        borderRadius: '999px',
                        color: '#ff4d79',
                        fontSize: '0.75rem',
                        fontWeight: 600
                    }}>
                        ? Live Sandbox Demo
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>Want to upload your actual resume?</span>
                    <Link to="/register" className="button primary-button" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                        Create Account
                    </Link>
                </div>
            </div>

            {/* If no report generated yet, show setup UI */}
            {!report && (
                <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1.5rem' }}>
                    <header className="page-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h1>Test Drive <span className="highlight">InterviewAI</span> Instantly</h1>
                        <p style={{ color: '#aaa', maxWidth: '650px', margin: '0.5rem auto' }}>
                            Experience how our Gemini-powered engine extracts key competencies, formulates high-depth interview questions, and builds your custom preparation plan in seconds.
                        </p>
                    </header>

                    {error && (
                        <div style={{
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            background: 'rgba(225, 3, 77, 0.15)',
                            border: '1px solid rgba(225, 3, 77, 0.4)',
                            borderRadius: '0.75rem',
                            color: '#ff4d79',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Preset Selector */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#888', display: 'block', marginBottom: '0.5rem' }}>
                            Quick Presets:
                        </span>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {PRESET_JOBS.map((preset, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setJobDescription(preset.jd)}
                                    style={{
                                        background: jobDescription === preset.jd ? 'rgba(225, 3, 77, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                        border: jobDescription === preset.jd ? '1px solid #e1034d' : '1px solid rgba(255, 255, 255, 0.1)',
                                        color: jobDescription === preset.jd ? '#fff' : '#aaa',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {preset.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="interview-card">
                        <div className="interview-card__body">
                            {/* Left: Job Description */}
                            <div className="panel panel--left" style={{ flex: 1.2 }}>
                                <div className="panel__header">
                                    <span className="panel__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                    </span>
                                    <h2>Job Description</h2>
                                </div>
                                <textarea
                                    className="panel__textarea"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    rows={8}
                                    placeholder="Paste target job description here..."
                                    style={{ minHeight: '180px' }}
                                />
                                <div className="char-counter">{jobDescription.length} chars</div>
                            </div>

                            <div className="panel-divider" />

                            {/* Right: Candidate Profile */}
                            <div className="panel panel--right" style={{ flex: 1 }}>
                                <div className="panel__header">
                                    <span className="panel__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </span>
                                    <h2>Demo Candidate Profile</h2>
                                </div>
                                <div style={{
                                    padding: '0.85rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    fontSize: '0.85rem',
                                    color: '#bbb',
                                    marginBottom: '1rem'
                                }}>
                                    <strong style={{ color: '#fff' }}>Included Demo Resume:</strong> Junior/Mid Software Engineer with React, Node.js, Express, Jest, MongoDB & SQL.
                                </div>

                                <label className="section-label">Candidate Self-Description / Notes</label>
                                <textarea
                                    className="panel__textarea panel__textarea--short"
                                    value={selfDescription}
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    placeholder="Add any specific highlights..."
                                />
                            </div>
                        </div>

                        <div className="interview-card__footer" style={{ justifyContent: 'space-between' }}>
                            <span className="footer-info">Powered by Google Gemini AI &bull; No API key required</span>
                            <button
                                onClick={handleGenerateDemo}
                                disabled={loading}
                                className="generate-btn"
                                style={{ opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? "Generating Strategy..." : "? Generate Strategy (Instant)"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{
                        display: 'inline-block',
                        width: '50px',
                        height: '50px',
                        border: '3px solid rgba(225, 3, 77, 0.2)',
                        borderTopColor: '#e1034d',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <h2 style={{ marginTop: '1.5rem', color: '#fff' }}>Analyzing Role & Engineering Rubric...</h2>
                    <p style={{ color: '#888', marginTop: '0.5rem' }}>Extracting core competencies, determining match score, and drafting deep follow-ups.</p>
                </div>
            )}

            {/* Render Generated Report */}
            {report && !loading && (
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem' }}>
                    {/* Guest Callout Banner */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(90deg, rgba(225, 3, 77, 0.15), rgba(99, 102, 241, 0.15))',
                        border: '1px solid rgba(225, 3, 77, 0.3)',
                        borderRadius: '1rem',
                        padding: '1rem 1.5rem',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <div>
                            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>?? Demo Strategy Successfully Generated!</h3>
                            <p style={{ margin: '0.25rem 0 0', color: '#aaa', fontSize: '0.88rem' }}>
                                This report was generated on-the-fly. Create a free account to upload your own PDF resume, generate downloadable PDF resumes, and save past interview histories.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={() => setReport(null)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    color: '#ccc',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                Try Another Role
                            </button>
                            <Link to="/register" className="button primary-button" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                                Sign Up & Save
                            </Link>
                        </div>
                    </div>

                    {/* Report Layout */}
                    <div className="interview-layout">
                        {/* Left Navigation */}
                        <nav className="interview-nav">
                            <div className="nav-content">
                                <p className="interview-nav__label">Sections</p>
                                {NAV_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                        onClick={() => setActiveNav(item.id)}
                                    >
                                        <span className="interview-nav__icon">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </nav>

                        <div className="interview-divider" />

                        {/* Center Content */}
                        <main className="interview-content">
                            {activeNav === 'technical' && (
                                <section>
                                    <div className="content-header">
                                        <h2>Technical Questions</h2>
                                        <span className="content-header__count">{report.technicalQuestions?.length || 0} questions</span>
                                    </div>
                                    <div className="q-list">
                                        {report.technicalQuestions?.map((q, i) => (
                                            <QuestionCard key={i} item={q} index={i} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeNav === 'behavioral' && (
                                <section>
                                    <div className="content-header">
                                        <h2>Behavioral Questions</h2>
                                        <span className="content-header__count">{report.behavioralQuestions?.length || 0} questions</span>
                                    </div>
                                    <div className="q-list">
                                        {report.behavioralQuestions?.map((q, i) => (
                                            <QuestionCard key={i} item={q} index={i} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeNav === 'roadmap' && (
                                <section>
                                    <div className="content-header">
                                        <h2>Preparation Road Map</h2>
                                        <span className="content-header__count">{report.preparationPlan?.length || 0} days</span>
                                    </div>
                                    <div className="roadmap-list">
                                        {report.preparationPlan?.map((day, i) => (
                                            <RoadMapDay key={i} day={day} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </main>

                        <div className="interview-divider" />

                        {/* Right Sidebar: Match Score & Skill Gaps */}
                        <aside className="interview-sidebar">
                            <div className="score-card">
                                <p className="score-card__label">Match Score</p>
                                <div className={`score-ring ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                    <span className="score-ring__value">{report.matchScore}%</span>
                                </div>
                                <p className="score-card__assessment">
                                    {report.matchScore >= 80 ? "Strong match for this role" : report.matchScore >= 60 ? "Moderate match with gap areas" : "Significant preparation needed"}
                                </p>
                            </div>

                            <div className="skills-card">
                                <p className="skills-card__title">Identified Skill Gaps</p>
                                <div className="skills-tags">
                                    {report.skillGaps?.map((gap, i) => (
                                        <span key={i} className={`skill-tag skill-tag--${gap.severity?.toLowerCase() || 'medium'}`}>
                                            {gap.skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DemoInterview
