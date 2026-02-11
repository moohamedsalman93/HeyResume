import React, { useEffect, useState } from 'react'
import {
    KeyIcon,
    ClockIcon,
    RocketLaunchIcon
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPageImg from '../assets/landingPageImg.png'
import { supabase } from '../lib/Auth/SupabseAuth';
import keywordImg from '../assets/keywords.png'
import historyImg from '../assets/history.png'
import FeatureScroll from '../components/FeatureScroll';

// Custom UI Components
import Button from '../components/ui/Button';
import Navbar, { NavBrand, NavContent, NavMobile } from '../components/ui/Navbar';
import Typography from '../components/ui/Typography';
import Card, { CardBody } from '../components/ui/Card';

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleStartWithoutLogin = () => {
        navigate('/resume');
    };

    useEffect(() => {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                navigate('/resume');
            }
        };
        checkSession();

        const handleResize = () => {
            if (window.innerWidth >= 960) setIsMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [navigate]);

    async function signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error('Error signing in:', error.message);
    }

    const cardData = [
        {
            icon: KeyIcon,
            title: "ATS Keywords",
            img: keywordImg,
            description: "Generate a new resume with all the relevant keywords in just a few steps. Let us do the heavy lifting while you prepare for interviews."
        },
        {
            icon: RocketLaunchIcon,
            title: "AI Creation",
            img: "https://unicorn-cdn.b-cdn.net/c3b88c0e-670e-4705-a02b-2b9cebb01add/resume-analysis.png?width=1440&height=900",
            description: "Describe yourself, and our AI will automatically generate a tailored resume for you. Simplify your resume creation process."
        },
        {
            icon: ClockIcon,
            title: "History",
            img: historyImg,
            description: "Edit or download your old resumes in PDF format. Keep track of your progress and make improvements over time."
        },
    ]

    return (
        <div className='min-h-screen bg-surface-base text-slate-200'>
            {/* Header / Navbar */}
            <Navbar className="fixed top-0 z-50">
                <div className="flex items-center justify-between">
                    <NavBrand>
                        <Typography variant="h4" className="flex items-center gap-1">
                            <span className='bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text font-black'>Hey</span>
                            <span className="font-black text-white">Resume</span>
                            <span className="text-indigo-400 font-black">!</span>
                        </Typography>
                    </NavBrand>

                    <NavContent>
                        <Button variant="ghost" onClick={handleStartWithoutLogin} className="text-sm font-semibold">
                            Build without login
                        </Button>
                        <Button onClick={signInWithGoogle} className="group px-8 relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Sign In
                                <img
                                    src="https://www.material-tailwind.com/logos/logo-google.png"
                                    alt="Google"
                                    className="h-4 w-4 brightness-0 invert"
                                />
                            </span>
                        </Button>
                    </NavContent>

                    <button
                        className="md:hidden p-2 text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>

                <NavMobile open={isMenuOpen}>
                    <Button variant="ghost" onClick={handleStartWithoutLogin} className="w-full">
                        Build without login
                    </Button>
                    <Button onClick={signInWithGoogle} className="w-full">
                        Sign In with Google
                    </Button>
                </NavMobile>
            </Navbar>

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-8 border border-indigo-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Trusted by 100,000+ Professionals & Students
                        </span>

                        <Typography variant="h1" className="mb-6 max-w-4xl mx-auto !leading-[1.15]">
                            Land your <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 text-transparent bg-clip-text">dream job</span> interview with a premium resume.
                        </Typography>

                        <Typography variant="lead" className="mb-10 max-w-2xl mx-auto text-slate-500">
                            Only a few resumes get to the hiring manager. Make yours tell the right story and pass the ATS with flying colors.
                        </Typography>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Button onClick={handleStartWithoutLogin} className="w-full sm:w-auto px-10 py-4 text-lg">
                                Build My Resume
                            </Button>
                            <Button variant="secondary" onClick={signInWithGoogle} className="w-full sm:w-auto px-10 py-4 text-lg">
                                Sign In to Save
                            </Button>
                        </div>

                        <Typography variant="small" className="text-slate-600">
                            ATS-friendly format • No credit card required • Unlimited downloads
                        </Typography>
                    </motion.div>
                </section>

                {/* Main Feature Section */}
                <section className="container mx-auto px-4 mb-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                <KeyIcon className="h-6 w-6" />
                            </div>
                            <Typography variant="h2">Get Hired Faster with ATS-Optimized Content</Typography>
                            <Typography variant="body" className="text-lg text-slate-500">
                                Build a resume that passes the Applicant Tracking System (ATS) while impressing both the recruiters and hiring managers. Our templates are designed for maximum readability and impact.
                            </Typography>
                            <ul className="grid sm:grid-cols-2 gap-4 pt-4">
                                {['Smart Keyword Analysis', 'Real-time Preview', 'One-click PDF Export', 'AI-Powered Content'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-slate-300 font-medium">
                                        <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
                            <img
                                src={LandingPageImg}
                                alt="Dashboard Preview"
                                className="relative rounded-2xl shadow-2xl shadow-black/40 border border-white/[0.08]"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Templates Preview Section */}
                <section className="bg-surface-1/50 py-32 mb-32 border-y border-white/[0.04]">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative h-[500px] flex items-center justify-center"
                            >
                                <motion.img
                                    initial={{ x: -60, rotate: -5 }}
                                    whileInView={{ x: -80, rotate: -10 }}
                                    src="https://latexresu.me/static/1.png"
                                    className="absolute w-64 rounded-xl shadow-xl shadow-black/40 border border-white/10 z-10"
                                />
                                <motion.img
                                    initial={{ y: 0 }}
                                    src="https://latexresu.me/static/2.png"
                                    className="absolute w-64 rounded-xl shadow-2xl shadow-black/50 border border-white/10 z-20 scale-110"
                                />
                                <motion.img
                                    initial={{ x: 60, rotate: 5 }}
                                    whileInView={{ x: 80, rotate: 10 }}
                                    src="https://latexresu.me/static/3.png"
                                    className="absolute w-64 rounded-xl shadow-xl shadow-black/40 border border-white/10 z-10"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <Typography variant="h2">Professional LaTeX Templates</Typography>
                                <Typography variant="body" className="text-lg text-slate-500">
                                    Building professional LaTeX resumes has never been easier. Use our rich-text editor to focus on your story, and we handle the complex formatting automatically.
                                </Typography>
                                <Button className="px-8" onClick={handleStartWithoutLogin}>Explore Templates</Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Carousel/Scroll */}
                <section className="container mx-auto px-4 mb-32">
                    <div className="text-center mb-16">
                        <Typography variant="h2" className="mb-4">Everything you need to succeed</Typography>
                        <Typography variant="lead" className="text-slate-500">Powerful features to help you build your best resume yet</Typography>
                    </div>
                    <FeatureScroll features={cardData} />
                </section>

                {/* Footer */}
                <footer className="container mx-auto px-4 pt-20 border-t border-white/[0.06]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10">
                        <div className="text-center md:text-left">
                            <Typography variant="h5" className="mb-2">
                                <span className='bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text font-black'>Hey</span>
                                <span className="font-black text-white">Resume</span>
                                <span className="text-indigo-400 font-black">!</span>
                            </Typography>
                            <Typography variant="small" className="text-slate-600">
                                © 2024 HeyResume by DivCode Tech. All rights reserved.
                            </Typography>
                        </div>

                        <div className="flex gap-8">
                            <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-400 transition-colors">Privacy</a>
                            <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-400 transition-colors">Terms</a>
                            <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-400 transition-colors">Contact</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}

export default LandingPage
