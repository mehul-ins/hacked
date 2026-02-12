// src/App.tsx
import { SpiralDemo } from "@/components/ui/spiral-demo";
import { useState, useEffect, lazy, Suspense } from 'react';
import { HeroSection } from "@/components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import UnstopButton from "./components/ui/UnstopButton";

// Lazy load below-fold components — these load on demand as user scrolls
const Schedule = lazy(() => import("./components/Schedule/Schedule"));
const Gallery = lazy(() => import("@/components/Past_Sponsor/GalleryDemo"));
const Sponsor = lazy(() => import("./components/Sponsor/Sposnor"));
const Prizes = lazy(() => import("./components/Prizes/Prizes"));
const Teams = lazy(() => import("@/components/Team/Team"));
const Footer = lazy(() => import("./components/Footer/Footer"));

function App() {
    const [showIntro, setShowIntro] = useState(true);

    const handleEnter = () => {
        setShowIntro(false);
    };

    useEffect(() => {
        if (!showIntro) {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';

            const root = document.getElementById('root');
            if (root) {
                root.style.overflow = '';
                root.style.height = '';
            }
        }
    }, [showIntro]);

    if (showIntro) {
        return <SpiralDemo onEnter={handleEnter} />;
    }

    return (
        <main>
            <UnstopButton />
            <Navbar logo={"./images/logo.png"} items={[
                { label: "Home", href: "#home" },
                { label: "Schedule", href: "#schedule" },
                { label: "Sponsors", href: "#sponsors" },
                { label: "Prizes", href: "#prizes" },
                { label: "Teams", href: "#teams" },
            ]} />
            <HeroSection />
            <Suspense fallback={null}>
                <Schedule />
                <Gallery />
                <Sponsor />
                <Prizes />
                <Teams />
                <Footer />
            </Suspense>
        </main>
    );
}

export default App;