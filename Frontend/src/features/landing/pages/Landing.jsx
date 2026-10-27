import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/landing.scss'

const Landing = () => {
    const { user } = useAuth()

    return (
        <div className="landing">
            {/* Background Orbs */}
            <div className="landing__bg-orbs">
                <div className="landing__orb landing__orb--1" />
                <div className="landing__orb landing__orb--2" />
                <div className="landing__orb landing__orb--3" />
            </div>

            {/* Navigation Bar */}
            <nav className="landing__nav">
                <div className="landing__nav-brand">
                    <span className="landing__nav-logo">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    </span>
                    <span className="landing__nav-title">Interview<span className="highlight">AI</span></span>
                </div>
                <div className="landing__nav-links">
                    <Link to="/demo" className="landing__nav-link">Live Demo</Link>
                    {user ? (
                        <Link to="/dashboard" className="landing__nav-link landing__nav-link--cta">
                            Dashboard &rarr;
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="landing__nav-link">Sign In</Link>
                            <Link to="/register" className="landing__nav-link landing__nav-link--cta">
                                Get Started Free
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing__hero">
                <div className="landing__hero-content">
                    <div className="landing__badge">
                        <span>? Autonomous Interview Intelligence</span>
                    </div>
                    <h1 className="landing__hero-title">
                        Ace Every Tech Interview
                        <br />
                        <span className="landing__hero-highlight">With Adaptive AI Strategy</span>
                    </h1>
                    <p className="landing__hero-subtitle">
                        Inspired by modern evaluation platforms like HackerRank Chakra. Upload your resume or try the instant sandbox demo to get deep technical questions, real-time rubric match scores, and a day-by-day preparation roadmap tailored to any job description.
                    </p>
                    <div className="landing__hero-actions">
                        <Link to="/demo" className="landing__btn landing__btn--primary">
                            <span>? Instant Demo — Zero Signup Required</span>
                            <span className="landing__btn-shimmer" />
                        </Link>
                        {user ? (
                            <Link to="/dashboard" className="landing__btn landing__btn--secondary">
                                Go to My Dashboard
                            </Link>
                        ) : (
                            <Link to="/login" className="landing__btn landing__btn--secondary">
                                Sign In with Account
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing__features" id="features">
                <h2 className="landing__section-title">Everything You Need to Beat the Technical Bar</h2>
                <p className="landing__section-subtitle">
                    Comprehensive multi-modal interview intelligence built on Google Gemini and modern engineering rubrics.
                </p>
                <div className="landing__features-grid">
                    <div className="landing__feature-card">
                        <span className="landing__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="22" y1="12" x2="18" y2="12"></line>
                                <line x1="6" y1="12" x2="2" y2="12"></line>
                                <line x1="12" y1="6" x2="12" y2="2"></line>
                                <line x1="12" y1="22" x2="12" y2="18"></line>
                            </svg>
                        </span>
                        <h3 className="landing__feature-title">Role-Specific Deep Probing</h3>
                        <p className="landing__feature-desc">
                            Generates targeted technical and behavioral questions based on your actual stack and the exact hiring expectations of the role.
                        </p>
                    </div>

                    <div className="landing__feature-card">
                        <span className="landing__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                        </span>
                        <h3 className="landing__feature-title">Match Score & Skill Gap Radar</h3>
                        <p className="landing__feature-desc">
                            Quantifies your alignment with the target role and tags high, medium, and low severity skill gaps before the recruiter sees them.
                        </p>
                    </div>

                    <div className="landing__feature-card">
                        <span className="landing__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                            </svg>
                        </span>
                        <h3 className="landing__feature-title">Day-by-Day Preparation Roadmap</h3>
                        <p className="landing__feature-desc">
                            Actionable study schedule highlighting high-yield topics, system design concepts, and mock rehearsal priorities for your target date.
                        </p>
                    </div>

                    <div className="landing__feature-card">
                        <span className="landing__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </span>
                        <h3 className="landing__feature-title">Tailored Resume PDF Generation</h3>
                        <p className="landing__feature-desc">
                            Puppeteer-driven PDF generation re-formats your project impact and highlights to match recruiter ATS filters.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="landing__how-it-works" id="how-it-works">
                <h2 className="landing__section-title">How It Works</h2>
                <p className="landing__section-subtitle">Zero friction to experience the full AI pipeline.</p>
                <div className="landing__steps">
                    <div className="landing__step">
                        <div className="landing__step-number">1</div>
                        <h3 className="landing__step-title">Paste Role & Experience</h3>
                        <p className="landing__step-desc">
                            Provide the job description and your resume or quick background summary.
                        </p>
                    </div>
                    <div className="landing__step-connector">
                        <span>&rarr;</span>
                    </div>
                    <div className="landing__step">
                        <div className="landing__step-number">2</div>
                        <h3 className="landing__step-title">Gemini Multi-Pass Analysis</h3>
                        <p className="landing__step-desc">
                            The AI assesses technical depth, maps missing competencies, and builds the question bank.
                        </p>
                    </div>
                    <div className="landing__step-connector">
                        <span>&rarr;</span>
                    </div>
                    <div className="landing__step">
                        <div className="landing__step-number">3</div>
                        <h3 className="landing__step-title">Practice & Iterate</h3>
                        <p className="landing__step-desc">
                            Review model answers, study intentions behind each question, and follow the study roadmap.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing__footer">
                <p className="landing__footer-text">
                    Engineered with <span className="landing__footer-highlight">React 19</span>,{' '}
                    <span className="landing__footer-highlight">Express 5</span>,{' '}
                    <span className="landing__footer-highlight">MongoDB Atlas</span> &{' '}
                    <span className="landing__footer-highlight">Google Gemini AI</span>
                </p>
                <a
                    href="https://github.com/mohit-rathwa/mock-interview-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="landing__footer-link"
                >
                    View on GitHub &rarr;
                </a>
            </footer>
        </div>
    )
}

export default Landing
