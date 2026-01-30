"use client"

export default function Contact() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = String(formData.get('name') || '');
        const email = String(formData.get('email') || '');
        const message = String(formData.get('message') || '');

        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

        window.location.href = `mailto:davidddum345@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <div className="backdrop-blur-sm container background ">
                <div className="container" style={{ paddingTop: '4rem' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem' }}>Contact Me</h1>

                    <div className="contactGrid">

                        <div>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#a5b4fc' }}>Get in Touch</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#b0b0b0', marginBottom: '2rem' }}>
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#a5b4fc' }}>Social Links</h3>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a
                                        href="https://github.com/David1DDT"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            color: '#a5b4fc',
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            textDecoration: 'none',
                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/david1ddt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            color: '#a5b4fc',
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            textDecoration: 'none',
                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn
                                    </a>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#a5b4fc' }}>Contact</h3>
                                <p style={{ color: '#b0b0b0', marginBottom: '0.4rem' }}>Phone: <a href="tel:+40774996022" style={{ color: '#a5b4fc', textDecoration: 'none' }}>+40774996022</a></p>
                                <p style={{ color: '#b0b0b0' }}>Email: <a href="mailto:davidddum345@gmail.com" style={{ color: '#a5b4fc', textDecoration: 'none' }}>davidddum345@gmail.com</a></p>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#a5b4fc' }}>Send Me a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b0b0b0', fontSize: '0.9rem' }}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            color: '#fff',
                                            fontSize: '1rem'
                                        }}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b0b0b0', fontSize: '0.9rem' }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            color: '#fff',
                                            fontSize: '1rem'
                                        }}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b0b0b0', fontSize: '0.9rem' }}>Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            color: '#fff',
                                            fontSize: '1rem',
                                            resize: 'vertical'
                                        }}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                                        color: '#fff',
                                        padding: '0.9rem',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        letterSpacing: '0.04em'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px 0 #6366f155';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 16px 0 #6366f155';
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
