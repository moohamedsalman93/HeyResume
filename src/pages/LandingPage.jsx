import React, { useEffect, useState } from 'react'
import {
    Navbar,
    Collapse,
    Button,
    IconButton,
    Typography,
    Input,
    Card,
    CardBody,
    Textarea,
    Checkbox,
} from "@material-tailwind/react";
import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    Squares2X2Icon,
    HeartIcon,
    EnvelopeIcon, PhoneIcon,
    InboxStackIcon
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPageImg from '../assets/landingPageImg.png'




function NavItem({ children }) {
    return (
        <li>
            <Typography
                as="a"
                href="#"
                variant="paragraph"
                color="blue-gray"
                className="text-blue-gray-700 flex items-center gap-2 font-medium"
            >
                {children}
            </Typography>
        </li>
    );
}

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

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (token) {
    //         try {
    //             const decryptedToken = JSON.parse(atob(token.split('.')[1]));
    //             const tokenExpiry = decryptedToken.exp;
    //             const userRole = decryptedToken.role;

    //             const isTokenExpired = new Date(tokenExpiry * 1000) < new Date();

    //             if (!isTokenExpired) {

    //                 if (userRole === 'admin') {
    //                     navigate('/admin-page');
    //                 } else {
    //                     navigate('/user-page');
    //                 }
    //             } else {

    //                 navigate('/login');
    //                 localStorage.clear()
    //             }
    //         } catch (error) {
    //             console.error('Invalid token:', error);

    //             navigate('/login');
    //         }
    //     } else {

    //     }
    // }, []);

    //#region Card Data
    const cardData = [
        {
            title: "ATS Keywords",
            description: "Generate a new resume with all the relevant keywords in just a few steps. Let us do the heavy lifting while you prepare for interviews."
        },
        {
            title: "Resume Analysis",
            description: "Don't lose out on an interview due to avoidable mistakes. Analyze your resume and be confident when you apply."
        },
        {
            title: "Smart Suggestions",
            description: "Make your resume stand out by taking inspiration from pre-made bullet points. Search by job title to find the right experience point and quickly add to your resume"
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
        <div className=''>
            <Navbar shadow={false} fullWidth className="border-0">
                <div className="container mx-auto flex items-center justify-between">
                    <Typography color="blue-gray" className="text-lg font-bold">
                        Hey Resume !
                    </Typography>
                    <ul className="ml-10 hidden items-center gap-6 lg:flex">
                        <NavItem>
                            <RectangleStackIcon className="h-5 w-5" />
                            Pricing
                        </NavItem>
                        <NavItem>
                            <UserCircleIcon className="h-5 w-5" />
                            About Us
                        </NavItem>
                    </ul>
                    <div className="hidden items-center gap-4 lg:flex">

                        <div onClick={() => navigate('/login')} className="w-full mx-auto px-4 bg-[#212121] md:w-[6rem] overflow-clip h-10 group relative flex flex-col justify-center items-center rounded-[1.2rem] hover:shadow-md cursor-pointer">
                            <div className='md:w-[6rem] bg-green-500 absolute h-12 z-20 rounded-2xl inset-x-52 group-hover:inset-0 duration-700 transition-all'></div>
                            <div className=' absolute z-40 text-green-500 duration-700 hover:text-black items-center flex justify-center bg-white h-9 rounded-2xl w-[5.7rem]'>Sign In</div>
                        </div>
                    </div>
                    <IconButton
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="ml-auto inline-block lg:hidden"
                    >
                        {open ? (
                            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                        ) : (
                            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                        )}
                    </IconButton>
                </div>
                <Collapse open={open}>
                    <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">
                        <ul className="flex flex-col gap-4">
                            <NavItem>
                                <RectangleStackIcon className="h-5 w-5" />
                                Pricing
                            </NavItem>
                            <NavItem>
                                <UserCircleIcon className="h-5 w-5" />
                                About Us
                            </NavItem>

                        </ul>
                        <div className="mt-6 mb-4 flex items-center gap-4">

                            <Button color="gray">Sign in</Button>
                        </div>
                    </div>
                </Collapse>
            </Navbar>
            <div className="bg-white p-8 grid mt-16 min-h-[82vh] w-full lg:h-[54rem] md:h-[34rem] relative place-items-stretch bg-[url('/image/bg-hero-17.svg')] bg-center bg-contain bg-no-repeat gap-20">

                <div className="container mx-auto px-4 text-center">
                    <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
                        Trusted by 100,000+ Professionals & Students. 🚀
                    </Typography>
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
                    >
                        Land your{" "}
                        <span className="text-green-500 leading-snug ">
                            dream job
                        </span>{" "}
                        interview.
                    </Typography>
                    <Typography
                        variant="lead"
                        className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
                    >
                        Only a few resumes get to the hiring manager. Make yours tell the right story.
                    </Typography>
                    <div className="mt-8  w-full place-items-start md:justify-center">


                        <div onClick={() => navigate('/login')} className="w-full mx-auto px-4  md:w-[12rem] overflow-clip border h-10 group relative flex flex-col justify-center items-center rounded-[0.6rem] hover:shadow-none shadow-md shadow-green-100 cursor-pointer">
                            <div className='md:w-[12rem] bg-green-500 absolute h-12 z-20 rounded-[0.6rem] inset-y-52 group-hover:inset-0 duration-700 transition-all'></div>
                            <div className=' absolute z-40 text-green-500 font-semibold duration-700 hover:text-black items-center flex justify-center bg-white h-9 rounded-[0.5rem] w-[11.7rem]'>Build My Resume</div>
                        </div>

                        {/* <div className="w-full mx-auto bg-green-500 px-4 md:w-[12rem] overflow-clip h-12 group relative flex flex-col justify-center items-center rounded-md cursor-pointer">
                            <div className='md:w-[12rem] bg-[#212121] absolute h-12 z-20 rounded-md inset-x-52 group-hover:inset-0 duration-700 transition-all'></div>
                            <div className=' absolute z-40 text-white'>Build My Resume</div>
                        </div> */}


                        <Typography
                            // variant='paragraph'
                            className=" w-full !text-gray-500 lg:text-sm text-base mt-2"
                        >
                            ATS-friendly format!
                        </Typography>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-evenly items-center">
                    <div className="max-w-xl">
                        <i className="fa-solid fa-clipboard-check text-4xl text-gray-900" />
                        <Typography className="mt-6" variant="h4">
                            Get Hired Faster
                        </Typography>
                        <Typography
                            className="mt-3 mb-14 text-base font-medium text-gray-500"
                            variant="leading"
                        >
                            {'Build a resume that passes the ATS (Applicant Tracking System) while impressing both the recruiters and hiring managers.'}
                        </Typography>
                    </div>



                    <div className=' w-[30rem] h-[30rem] '>
                        <img src={LandingPageImg} alt="" />
                    </div>

                </div>

                <div className="px-4 grid grid-cols-3 place-items-center place-content-start gap-6">

                    {cardData.map((item, index) =>
                        <Card key={index} className=' hover:shadow-green-500 hover:shadow-md hover:border-none transition-all duration-300 border-green-500 border shadow-none'>
                            <CardBody className="max-w-sm md:p-5 h-[20rem]">
                                <HeartIcon className="w-14 h-14 text-gray-900" />
                                <Typography
                                    color="blue-gray"
                                    className="mb-4 !mt-4 "
                                    variant="h4"
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="lead"
                                    className="leading-8 text-gray-500"
                                >
                                    {item.description}
                                </Typography>

                            </CardBody>
                        </Card>
                    )
                    }
                </div>

                <div className="container mx-auto my-auto flex flex-row justify-evenly items-center">

                    <div className=' w-[30rem] h-[30rem] '>
                        <img src={LandingPageImg} alt="" />
                    </div>

                    <div className="max-w-xl ">
                        <i className="fa-solid fa-clipboard-check text-4xl text-gray-900" />

                        <Typography className="mt-6" variant="h4">
                            Resume template that stands out
                        </Typography>
                        <Typography
                            className="mt-3 mb-14 text-base font-medium text-gray-500"
                            variant="leading"
                        >
                            Building LaTeX resumes have never been easier. Make use of our rich-text editor and generate LaTeX resumes for every application.  </Typography>
                    </div>



                </div>





                <div className="grid grid-cols-12 items-center lg:gap-x-10 gap-y-10 rounded-2xl bg-green-50 lg:p-12 p-6 h-[45rem] w-full">
                    <div className="col-span-full lg:col-span-7 lg:max-w-lg mx-auto">
                        <Typography
                            variant="h2"

                            className="mb-4 text-3xl lg:text-4xl"
                        >
                            Get in Touch
                        </Typography>
                        <Typography
                            variant="lead"

                            className="opacity-70 mb-12"
                        >
                            You need more information? Check what other persons are saying about
                            our product. They are very happy with their purchase.
                        </Typography>
                        <div className="flex items-start gap-6 mb-14">
                            <EnvelopeIcon className="h-6 w-6 " />
                            <div>
                                <Typography
                                    variant="h5"
                                    className="mb-4 text-2xl font-bold"
                                >
                                    Find us at the office
                                </Typography>
                                <Typography

                                    className="font-normal leading-8 opacity-80"
                                >
                                    Bld Mihail Kogalniceanu, nr. 8,
                                    <br /> 7652 Bucharest, <br /> Romania
                                </Typography>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <PhoneIcon className="h-6 w-6 " />
                            <div>
                                <Typography
                                    variant="h5"
                                    className="mb-4 text-2xl font-bold"
                                >
                                    Give us a ring
                                </Typography>
                                <Typography

                                    className="font-normal opacity-80"
                                >
                                    Michael Jordan <br /> +40 762 321 762 <br /> Mon - Fri,
                                    8:00-22:00
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <Card className="bg-white col-span-full lg:col-span-5 rounded-xl py-8 px-8 lg:px-16 lg:py-16">
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="mb-8 !text-2xl lg:!text-3xl"
                        >
                            Contact us
                        </Typography>
                        <form action="#" className="flex flex-col gap-4">
                            <div className="grid gap-4 grid-cols-2">
                                <Input
                                    color="gray"
                                    size="lg"
                                    label="First Name"
                                    name="first-name"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                />
                                <Input
                                    color="gray"
                                    size="lg"
                                    label="Last Name"
                                    name="last-name"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                />
                            </div>
                            <Input
                                color="gray"
                                type="email"
                                size="lg"
                                label="Email"
                                name="email"
                            />
                            <Textarea
                                rows={7}
                                color="gray"
                                size="lg"
                                label="Message"
                                name="message"
                            />
                            <Checkbox
                                color="gray"
                                label={
                                    <Typography className="font-normal text-base !text-gray-500 -mt-2">
                                        You agree to our{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-gray-700 hover:text-gray-900"
                                        >
                                            Privacy Policy
                                        </a>
                                        .
                                    </Typography>
                                }
                                containerProps={{
                                    className: "-ml-2.5 -mt-2",
                                }}
                            />
                            <Button size="lg" color="gray" className="mt-6" fullWidth>
                                send message
                            </Button>
                        </form>
                    </Card>
                </div>


                <div className=' w-full '>
                    <div className=" container grid min-h-full place-items-center">
                        <div className="container mx-auto max-w-3xl px-8">
                            <div className="grid place-items-center py-20 text-center">
                                <Typography variant="h2" color="blue-gray">
                                    Choose a plan
                                </Typography>
                                <Typography variant="lead" className="mt-2 !text-gray-500">
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
                </div>

                <div className="px-8 py-28">
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                            <Typography className="!text-sm font-medium text-gray-500 lg:text-left text-center">
                                All rights reserved. Copyright &copy; 2024 <br /> Hey Resume.
                            </Typography>
                            <div className="flex lg:ml-auto place-content-center gap-2">
                                <a href="#buttons-with-link">
                                    <IconButton variant="text" size="sm">
                                        <InboxStackIcon className="fa-brands fa-twitter text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
                                    </IconButton>
                                </a>
                                <a href="#buttons-with-link">
                                    <IconButton variant="text" size="sm">
                                        <i className="fa-brands fa-youtube text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
                                    </IconButton>
                                </a>
                                <a href="#buttons-with-link">
                                    <IconButton variant="text" size="sm">
                                        <i className="fa-brands fa-instagram text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
                                    </IconButton>
                                </a>
                                <a href="#buttons-with-link">
                                    <IconButton variant="text" size="sm">
                                        <i className="fa-brands fa-github text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
                                    </IconButton>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


export default LandingPage
