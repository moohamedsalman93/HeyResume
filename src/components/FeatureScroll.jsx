import React, { useState, useRef, useEffect } from 'react';
import Typography from "./ui/Typography";
import { motion, useInView } from 'framer-motion';

const FeatureScroll = ({ features }) => {
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <div className="w-full relative bg-surface-base">
            {/* Mobile View - Stacked */}
            <div className="md:hidden flex flex-col gap-12 px-4 py-12">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col gap-6">
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-white/[0.06] bg-surface-2">
                            <img src={feature.img} alt={feature.title} className="w-full h-auto object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                                    {React.createElement(feature.icon, { className: "w-6 h-6" })}
                                </div>
                                <Typography variant="h4" className="font-bold text-white">{feature.title}</Typography>
                            </div>
                            <Typography className="text-slate-400 text-lg leading-relaxed">{feature.description}</Typography>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View - Sticky Scroll */}
            <div className="hidden md:flex w-full max-w-7xl mx-auto gap-12 px-6 relative">
                {/* Text Content - Scrollable */}
                <div className="w-1/2 py-[10vh]">
                    {features.map((feature, index) => (
                        <FeatureText
                            key={index}
                            feature={feature}
                            index={index}
                            setActiveFeature={setActiveFeature}
                        />
                    ))}
                </div>

                {/* Image Content - Sticky */}
                <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center py-12">
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.06] bg-surface-2">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeFeature === index ? 1 : 0,
                                    zIndex: activeFeature === index ? 10 : 0
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0 flex items-center justify-center p-4"
                            >
                                <img
                                    src={feature.img}
                                    alt={feature.title}
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureText = ({ feature, index, setActiveFeature }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveFeature(index);
        }
    }, [isInView, index, setActiveFeature]);

    return (
        <div ref={ref} className="min-h-[60vh] flex flex-col justify-center p-6">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-surface-2/80 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.08] shadow-lg hover:border-white/[0.12] transition-all duration-300"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
                        {React.createElement(feature.icon, { className: "w-8 h-8" })}
                    </div>
                    <Typography variant="h2" className="font-bold text-white text-3xl">
                        {feature.title}
                    </Typography>
                </div>
                <Typography variant="lead" className="text-slate-400 leading-relaxed text-xl">
                    {feature.description}
                </Typography>
            </motion.div>
        </div>
    );
};

export default FeatureScroll;
