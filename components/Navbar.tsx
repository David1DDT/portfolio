'use client'
import { usePathname } from "next/navigation";
import "./styles/Navbar.css"

const Navbar = () => {
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const transitionHandler = (window as any).__handlePageTransition;
        if (transitionHandler) {
            transitionHandler(href, e);
        } else {
            // Fallback to normal navigation
            window.location.href = href;
        }
    };

    return (
        <nav className="portfolio-navbar">
            <a
                href="/"
                className={`portfolio-navbar-link ${pathname === '/' ? 'active' : ''}`}
                onClick={(e) => handleClick(e, '/')}
            >
                Home
            </a>
            <a
                href="/projects"
                className={`portfolio-navbar-link ${pathname === '/projects' ? 'active' : ''}`}
                onClick={(e) => handleClick(e, '/projects')}
            >
                Projects
            </a>
            <a
                href="/contact"
                className={`portfolio-navbar-link ${pathname === '/contact' ? 'active' : ''}`}
                onClick={(e) => handleClick(e, '/contact')}
            >
                Contact
            </a>
        </nav>
    );
};

export default Navbar;
