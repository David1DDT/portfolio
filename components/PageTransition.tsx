'use client'
import { useEffect, useRef, ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import StarBackground, { StarBackgroundHandles } from './StarBackground';
import Navbar from './Navbar';
import './styles/PageTransition.css';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const router = useRouter();
    const starRef = useRef<StarBackgroundHandles>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isTransitioningRef = useRef(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const prevPathnameRef = useRef(pathname);
    const [entryClass, setEntryClass] = useState('page-fade-in');

    useEffect(() => {
        // Mark initial load as complete after first render
        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (isInitialLoad) return;

        const content = contentRef.current;
        if (content) {
            content.classList.remove('slide-out-left', 'slide-out-right');
            content.classList.remove('slide-in-left', 'slide-in-right');
            void content.offsetHeight;
        }

        const savedDirection = sessionStorage.getItem('page-transition-direction');
        if (savedDirection === 'left') {
            setEntryClass('slide-in-left');
        } else if (savedDirection === 'right') {
            setEntryClass('slide-in-right');
        } else if (pathname === '/projects' || pathname === '/contact') {
            setEntryClass('slide-in-right');
        } else {
            setEntryClass('slide-in-left');
        }

        sessionStorage.removeItem('page-transition-direction');
        isTransitioningRef.current = false;
        prevPathnameRef.current = pathname;
    }, [pathname, isInitialLoad]);

    const handleNavigation = (href: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();

        if (isTransitioningRef.current || pathname === href) return;
        isTransitioningRef.current = true;

        const content = contentRef.current;
        if (!content) return;

        // Remove any existing animation classes
        content.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');

        // Determine direction
        const isGoingToProjects = href === '/projects';
        const isGoingToContact = href === '/contact';
        const isGoingHome = href === '/';

        let slideOutClass = '';
        let starDirection = '';
        let slideInDirection = '';

        if (pathname === '/' && isGoingToProjects) {
            // Home -> Projects: slide left and play right animation
            slideOutClass = 'slide-out-left';
            starDirection = 'right';
            slideInDirection = 'right';
        } else if (pathname === '/' && isGoingToContact) {
            // Home -> Contact: slide left and play right animation
            slideOutClass = 'slide-out-left';
            starDirection = 'right';
            slideInDirection = 'right';
        } else if (pathname === '/projects' && isGoingHome) {
            // Projects -> Home: slide right and play left animation
            slideOutClass = 'slide-out-right';
            starDirection = 'left';
            slideInDirection = 'left';
        } else if (pathname === '/contact' && isGoingHome) {
            // Contact -> Home: slide right and play left animation
            slideOutClass = 'slide-out-right';
            starDirection = 'left';
            slideInDirection = 'left';
        } else if (pathname === '/projects' && isGoingToContact) {
            // Projects -> Contact: slide left and play right animation
            slideOutClass = 'slide-out-left';
            starDirection = 'right';
            slideInDirection = 'right';
        } else if (pathname === '/contact' && isGoingToProjects) {
            // Contact -> Projects: slide right and play left animation
            slideOutClass = 'slide-out-right';
            starDirection = 'left';
            slideInDirection = 'left';
        } else {
            // Default navigation
            router.push(href);
            isTransitioningRef.current = false;
            return;
        }

        // Apply animation and star effect
        content.classList.add(slideOutClass);
        if (slideInDirection) {
            sessionStorage.setItem('page-transition-direction', slideInDirection);
        }

        if (starDirection === 'right') {
            starRef.current?.moveStarsRight(15, 2);
        } else if (starDirection === 'left') {
            starRef.current?.moveStarsLeft(15, 2);
        }

        // Navigate after animation
        setTimeout(() => {
            router.push(href);
            isTransitioningRef.current = false;
        }, 700);
    };

    // Expose navigation handler globally for Navbar
    useEffect(() => {
        (window as any).__handlePageTransition = handleNavigation;
        return () => {
            delete (window as any).__handlePageTransition;
        };
    }, [pathname]);

    return (
        <div className="page-transition-wrapper">
            <StarBackground ref={starRef} />
            <Navbar />
            <div key={pathname} ref={contentRef} className={`page-content ${entryClass}`}>
                {children}
            </div>
        </div>
    );
}
