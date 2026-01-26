'use client'

export default function Projects() {
    const projects = [
        {
            name: 'youtube-clone',
            url: 'https://github.com/david1ddt/youtube-clone',
            techStack: ['TypeScript', 'React', 'CSS', 'HTML'],
            image: 'https://github.com/David1DDT/youtube-clone/raw/main/main-page-screenshot.png'
        },
        {
            name: 'ai-or-human-image-detector',
            url: 'https://github.com/david1ddt/ai-or-human-image-detector',
            techStack: ['Python', 'Machine Learning', 'OpenCV', 'NumPy'],
            image: 'https://github.com/David1DDT/ai-or-human-image-detector/raw/main/screenshot.png'
        },
        {
            name: 'Ai-Reviewer-for-GitHub-PRs',
            url: 'https://github.com/david1ddt/Ai-Reviewer-for-GitHub-PRs',
            techStack: ['TypeScript', 'Node.js', 'GitHub API', 'AI/NLP'],
            image: 'https://github.com/David1DDT/Ai-Reviewer-for-GitHub-PRs/raw/main/screenshot1.png'
        },
        {
            name: 'Miles-to-Km-Converter-python',
            url: 'https://github.com/david1ddt/Miles-to-Km-Converter-python',
            techStack: ['Python', 'Tkinter', 'GUI'],
            image: 'https://opengraph.githubassets.com/1/david1ddt/Miles-to-Km-Converter-python'
        },
        {
            name: 'snake-game-with-turtle',
            url: 'https://github.com/david1ddt/snake-game-with-turtle',
            techStack: ['Python', 'Turtle', 'Game Logic'],
            image: 'https://opengraph.githubassets.com/1/david1ddt/snake-game-with-turtle'
        },
        {
            name: 'pong-game-with-turtle',
            url: 'https://github.com/david1ddt/pong-game-with-turtle',
            techStack: ['Python', 'Turtle', 'Game Physics'],
            image: 'https://opengraph.githubassets.com/1/david1ddt/pong-game-with-turtle'
        }
    ];

    return (
        <>
            <div className="background backdrop-blur-[2.5px] container projects-page">
                <div className="container" style={{ paddingTop: '4rem' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem' }}>My Projects</h1>

                    <div className="projects-list" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        {projects.map((project) => (
                            <div key={project.name} className="project-row">
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card" style={{ width: '100%', maxWidth: '520px' }}>
                                    <img
                                        src={project.image}
                                        alt={`${project.name} preview`}
                                        style={{ width: '100%', borderRadius: '10px', marginBottom: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.style.display = 'none';
                                        }}
                                    />
                                    <h3 style={{ textTransform: 'none' }}>{project.name}</h3>
                                    <div className="project-tags">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="tag">{tech}</span>
                                        ))}
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
                        <a
                            href="https://github.com/David1DDT"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                                color: '#fff',
                                padding: '0.9rem 2.2rem',
                                borderRadius: '2rem',
                                fontWeight: 600,
                                fontSize: '1.2rem',
                                textDecoration: 'none',
                                boxShadow: '0 2px 16px 0 #6366f155',
                                transition: 'background 0.2s, box-shadow 0.2s',
                                letterSpacing: '0.04em',
                                display: 'inline-block'
                            }}
                        >
                            View More on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
