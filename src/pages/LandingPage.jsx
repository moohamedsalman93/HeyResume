import React, { useEffect, useState } from 'react'
import {
    Navbar,
    Collapse,
    Button,
    IconButton,
    Typography,
    Input,
    Card,
    Textarea,
    Checkbox,
    CardBody,
} from "@material-tailwind/react";
import {
    EnvelopeIcon, PhoneIcon,
    InboxStackIcon,
    KeyIcon,
    ClockIcon,
    RocketLaunchIcon
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPageImg from '../assets/landingPageImg.png'
import { supabase } from '../lib/Auth/SupabseAuth';
import keywordImg from '../assets/keywords.png'
import historyImg from '../assets/history.png'
import FeatureScroll from '../components/FeatureScroll';



function LandingPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, [])


    const navigate = useNavigate();


    useEffect(() => {
        const checkSession = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user) {
                navigate('/resume');
            }
        };
        checkSession();
    }, []);


    //#region signin
    async function signInWithGoogle() {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            console.log('Signed in as:', user);
        }
    }

    //#endregion

    //#region Card Data
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
    //#endregion

    //#region Price Card
    const priceCards = [
        {
            color: "white",
            actionColor: "gray",
            bg: false,
            title: "Basic",
            price: "Rs:0",
            options: ["Unlimited Downloads", "ATS Résumé Template", "Job Keyword Search ", "Résumé Share Links"],
            buttonAction: { title: "Get started free", link: "" }
        },
        {
            color: "gray",
            actionColor: "white",
            bg: true,
            title: "premium",
            price: "Rs:299",
            options: ["Everything in Basic", "No Watermark", "AI powered feedback", "ATS Premium Keywords"],
            buttonAction: { title: "Buy Now", link: "" }
        },
    ];
    //#endregion
    return (
        <div className=' overflow-y-auto h-full bg-gradient-to-b from-blue-50 to-white saturate-150 '>
            <Navbar shadow={false} fullWidth className="border-0 fixed z-50 ">
                <div className="container mx-auto flex items-center justify-between">
                    <Typography color="blue-gray" className="text-3xl font-bold">
                        <span className=' bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text'>Hey </span>
                        Resume !
                    </Typography>


                    <div className="hidden items-center gap-4 lg:flex">

                        <div onClick={() => signInWithGoogle()} className="w-full mx-auto px-4 bg-white text-white  md:w-[6rem] overflow-clip h-10 group relative flex flex-col justify-center items-center rounded-[1.2rem] hover:shadow-md cursor-pointer">
                            <div className='md:w-[6rem] bg-gradient-to-r from-blue-600 to-indigo-600 absolute h-12 z-20 rounded-2xl inset-x-52 group-hover:inset-0 duration-700 transition-all'></div>
                            <div className=' space-x-1 absolute z-40 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text duration-700 hover:text-white items-center flex justify-center bg-white h-9 rounded-2xl w-[5.7rem]'>
                                <p>Sign in</p>

                                <img
                                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                    alt="google"
                                    className="h-4 w-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Collapse open={open}>
                    <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">

                        <div onClick={() => signInWithGoogle()} className=" mx-auto px-4 bg-[#212121] w-[6rem] overflow-clip h-10 group relative flex flex-col justify-center items-center rounded-[1.2rem] hover:shadow-md cursor-pointer">
                            <div className='w-[6rem] bg-gradient-to-r from-blue-600 to-indigo-600 absolute h-12 z-20 rounded-2xl inset-x-52 group-hover:inset-0 duration-700 transition-all'></div>
                            <div className=' space-x-1 absolute z-40 font-semibold text-[#2dce89] duration-700 hover:text-black items-center flex justify-center bg-white h-9 rounded-2xl w-[5.7rem]'>
                                <p>Sign in</p>

                                <img
                                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                    alt="google"
                                    className="h-4 w-4"
                                />
                            </div>
                        </div>
                    </div>
                </Collapse>
            </Navbar>
            <div className="bg-white pt-24  px-4 md:p-8 grid mt-4 md:mt-16  w-full l relative place-items-stretch  gap-20">

                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="container mx-auto md:px-4 text-center ">
                    <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
                        Trusted by 100,000+ Professionals & Students. 🚀
                    </Typography>
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
                    >
                        Land your{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text leading-snug ">
                            dream job
                        </span>{" "}
                        interview.
                    </Typography>
                    <Typography
                        variant="lead"
                        className="mx-auto w-full !text-[#768499] lg:text-lg text-base"
                    >
                        Only a few resumes get to the hiring manager. Make yours tell the right story.
                    </Typography>
                    <div className="mt-8  w-full place-items-start md:justify-center">

                        <div onClick={() => signInWithGoogle()} className="  mx-auto px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white  w-[10rem] overflow-clip h-10 group relative flex flex-col justify-center items-center rounded-[1.2rem] hover:shadow-md cursor-pointer">
                            <div className='w-[10rem] bg-white absolute h-12 z-20 rounded-2xl inset-x-52 group-hover:inset-0 duration-700 transition-all'></div>
                            <div className=' space-x-1 absolute z-40 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-transparent hover:bg-clip-text duration-700 text-white items-center flex justify-center bg-white h-9 rounded-2xl w-[9.7rem]'>
                                <p>Build My Resume</p>
                            </div>
                        </div>

                        <Typography
                            // variant='paragraph'
                            className=" w-full !text-[#768499] lg:text-sm text-base mt-2  "
                        >
                            ATS-friendly format!
                        </Typography>
                    </div>
                </motion.div>

                <div className="w-full flex flex-col md:flex-row justify-evenly items-center saturate-[0.6]">

                    <div className="max-w-xl">
                        <i className="fa-solid fa-clipboard-check text-4xl text-gray-900" />
                        <Typography className="mt-6" variant="h4">
                            Get Hired Faster
                        </Typography>
                        <Typography
                            className="mt-3 mb-14 text-base font-medium text-[#768499]"
                            variant="lead"
                        >
                            {'Build a resume that passes the ATS (Applicant Tracking System) while impressing both the recruiters and hiring managers.'}
                        </Typography>
                    </div>



                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className=' md:w-[30rem] md:h-[30rem]  '>
                        <img src={LandingPageImg} alt="" />
                    </motion.div>

                </div>

                <div className="container mx-auto my-auto flex flex-col-reverse md:flex-row justify-evenly items-center">

                    <div className=' w-full h-[30rem] md:w-[30rem] md:h-[30rem] relative overflow-clip flex justify-end items-end'>
                        <motion.img initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} src={`https://latexresu.me/static/1.png`} alt="" className=' inset-x-2 absolute border-2 rounded-lg w-[15rem] h-[24rem]' />
                        <motion.img initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} src={`https://latexresu.me/static/2.png`} alt="" className=' inset-x-32 inset-y-16 absolute border-2 rounded-lg w-[15rem] h-[24rem]' />
                        <motion.img initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }} src={`https://latexresu.me/static/3.png`} alt="" className=' inset-x-56 inset-y-4  absolute border-2 rounded-lg w-[15rem] h-[24rem]' />

                    </div>

                    <div className="max-w-xl ">
                        <i className="fa-solid fa-clipboard-check text-4xl text-gray-900" />

                        <Typography className="mt-6" variant="h4">
                            Resume template that stands out
                        </Typography>
                        <Typography
                            className="mt-3 mb-14 text-base font-medium text-[#768499]"
                            variant="leading"
                        >
                            Building LaTeX resumes have never been easier. Make use of our rich-text editor and generate LaTeX resumes for every application.  </Typography>
                    </div>



                </div>

                <div className='w-full'>
                    <FeatureScroll features={cardData} />
                </div>


                {/* <div className=' w-full '>
                    <div className=" container grid min-h-full place-items-center">
                        <div className="container mx-auto max-w-3xl px-8">
                            <div className="grid place-items-center py-20 text-center">
                                <Typography variant="h2" color="blue-gray">
                                    Choose a plan
                                </Typography>
                                <Typography variant="lead" className="mt-2 !text-[#768499]">
                                    Students or professionals? We've got you covered.
                                </Typography>
                            </div>
                            <div className="col-span-2">
                                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 lg:px-10">
                                    {priceCards.map(({ color, bg, title, price, options, actionColor, buttonAction }, key) => (
                                        <Card variant="gradient" color={color} key={key}>
                                            {bg && (
                                                <div className="absolute inset-0 rounded-lg bg-gray-900 bg-cover bg-no-repeat opacity-60" />
                                            )}
                                            <CardBody className="relative z-10 py-10 text-center">
                                                <Typography
                                                    variant="h6"
                                                    color={bg ? "white" : "blue-gray"}
                                                    className="mb-14 uppercase"
                                                >
                                                    {title}
                                                </Typography>
                                                <Typography
                                                    variant="h1"
                                                    color={bg ? "white" : "blue-gray"}
                                                    className="mb-2 mt-8 flex justify-center"
                                                >
                                                    {price}
                                                    <Typography
                                                        as="span"
                                                        variant="h5"
                                                        color={bg ? "white" : "blue-gray"}
                                                        className="-translate-y-1 self-end font-normal"
                                                    >
                                                        /month
                                                    </Typography>
                                                </Typography>

                                                <div className="flex justify-center pt-6 pb-14">
                                                    <ul className="flex w-full flex-col px-8">
                                                        {options.map((option, key) => (
                                                            <div className="w-full " key={key}>
                                                                <Typography
                                                                    as="li"
                                                                    color={bg ? "white" : "blue-gray"}
                                                                    className={`flex items-center justify-center py-4 font-normal ${options.length - 1 !== key
                                                                        ? "!border-b"
                                                                        : "!border-none"
                                                                        } border-blue-gray-100 `}
                                                                >
                                                                    {option}
                                                                </Typography>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <Button variant="gradient" color={actionColor}>
                                                    {buttonAction.title}
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="px-8  pb-9 md:py-14 border-t">
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                            <Typography className="!text-sm font-medium text-[#768499] lg:text-left text-center">
                                All rights reserved. Copyright &copy; 2024 <br /> DivCode Tech <br />

                            </Typography>
                            <div className="flex lg:ml-auto place-content-center gap-2">
                                <Typography color="blue-gray" className="text-2xl font-bold">
                                    <span className=' bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text'>Hey </span>
                                    Resume !
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


export default LandingPage
