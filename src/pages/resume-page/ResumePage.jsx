import IconButton from '../../components/ui/IconButton';
import Navbar from '../../components/ui/Navbar';
import Tooltip from '../../components/ui/Tooltip';
import Typography from '../../components/ui/Typography';
import Popover, { PopoverHandler, PopoverContent } from '../../components/ui/Popover';
import Progress from '../../components/ui/Progress';
import Dialog, { DialogHeader, DialogBody, DialogFooter } from '../../components/ui/Dialog';
import Button from '../../components/ui/Button';
import Tabs, { TabsHeader, Tab } from '../../components/ui/Tabs';
import Drawer from '../../components/ui/Drawer';
import Card from '../../components/ui/Card';
import List, { ListItem } from '../../components/ui/List';
import React, { useEffect, useState, useRef } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { ArrowLeftIcon, ArrowRightIcon, ArrowRightStartOnRectangleIcon, ArrowsPointingInIcon, Bars3Icon, ChevronRightIcon, ClockIcon, CursorArrowRaysIcon, DocumentTextIcon, KeyIcon, MinusIcon, PencilIcon, PencilSquareIcon, PlusIcon, RocketLaunchIcon, ShareIcon, ShoppingBagIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import ProfileSection from '../../components/ProfileSection';
import TemplateSection from '../../components/TemplateSection'
import EducationSection from '../../components/EducationSection'
import WorkSection from '../../components/WorkSection'
import SkillsSection from '../../components/SkillsSection'
import ProjectSection from '../../components/ProjectSection'
import AwardSection from '../../components/AwardSection'
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/Auth/SupabseAuth';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../components/FormateDate'
import Lottie from "lottie-react";
import loading from '../../assets/loading.json'
import nlp from 'compromise';
import { removeStopwords } from 'stopword';
import { sanitizeData } from '../../components/FilterText';
import { GripVertical, Ham, Menu } from 'lucide-react';
import latex from '../../lib/latext';
import getTemplateData from '../../lib/getTemplateData';
import { twMerge } from 'tailwind-merge';



const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc


function ResumePage({ isLoading, setIsLoading }) {
    const [userDetails, setUserDetails] = useState({
        uuid: "",
        name: "",
        email: "",
        profileImage: "",
    });
    const [pdfUrl, setPdfUrl] = useState(null);
    const [selectedPage, setSelectedPage] = useState("Templates");
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [previewName, setPreviewName] = useState("Preview");
    const [contentPages, setContentPages] = useState([
        "Templates",
        "Profile",
        "Education",
        "Work",
        "Skills",
        "Projects",
        "Awards",
    ])
    const [exampleData, setExampleData] = useState(null)
    const [scale, setScale] = useState(0.5)
    const [openImage, setOpenImage] = useState('');
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [historyOpen, setHistoryOpen] = useState(false);
    const [historyData, setHistoryData] = useState([])

    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [aiOpen, setAiOpen] = useState(false)
    const [keyOpen, setKeyOpen] = useState(false)
    const [confirmPopup, setConfirmPopup] = useState(-1);
    const [keywords, setKeywords] = useState([]);
    const [jobDescription, setJobDescription] = useState('');
    const [isDark, setDark] = useState(true);
    const [openSkillSelector, setOpenSkillSelector] = useState(-1)
    const [activeTab, setActiveTab] = useState("section");
    const controls = useAnimation();
    const navigate = useNavigate()
    const AddInPopRef = useRef();
    const [openHamburger, setOpenHamburger] = useState(false);
    const handleOpenHamburger = () => setOpenHamburger((cur) => !cur);



    const techKeywords = [
        'javascript', 'reactjs', 'react', 'nodejs', 'node', 'html', 'css',
        'firebase', 'mongodb', 'express', 'angular', 'vue', 'typescript', 'python',
        'java', 'flutter', 'dart', 'kotlin', 'swift', 'ios', 'android', 'aws',
        'azure', 'docker', 'kubernetes', 'graphql'
    ];

    const preData = {
        "selectedTemplate": 1,
        "basics": {
            "name": "",
            "email": "",
            "phone": "",
            "address": "",
            "website": "",
            "summary": ""
        },
        "education": [],
        "work": [],
        "skills": [],
        "projects": [],
        "awards": [],
        "headings": {
            "education": "Education",
            "work": "Experience",
            "skills": "Skills",
            "projects": "Projects",
            "awards": "Awards"
        },
        "sections": [
            "profile",
            "education",
            "work",
            "skills",
            "projects",
            "awards"
        ]
    }

    const TabData = [
        {
            label: "Section",
            value: "section",
        },
        {
            label: "Preview",
            value: "preview",
        },
    ];

    //#handleJobDesChange
    const handleJobDesChange = (e) => {
        setJobDescription(e.target.value)
        if (e.target.value) {
            extractKeywords()
        }
    }
    //#endregion

    //#region open history with data fetch
    const handleOpen = () => {
        setOpenHamburger(!openHamburger);
        setHistoryOpen(!historyOpen);
        setIsLoadingHistory(true)
        const fetchData = async () => {
            const { data, error } = await supabase.from('user_details').select('*').eq('uuid', userDetails?.uuid);
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setHistoryData(data);
            }
            setIsLoadingHistory(false)
        }

        fetchData();
    }
    //#endregion

    //#region view big image
    const handleImageClick = (imageUrl, event) => {
        const imgRect = event.target.getBoundingClientRect();
        setImagePosition({
            top: imgRect.top,
            left: imgRect.left,
            width: imgRect.width,
            height: imgRect.height,
        });
        setOpenImage(imageUrl);
        controls.start({
            top: '50%',
            left: '50%',
            width: '20rem',
            height: '20rem',
            x: '-50%',
            y: '-50%',
            transition: { duration: 0.5 },
        });
    };
    //#endregion

    //#region pdf page counter
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    //#endregion

    //#region save
    const generatePDF = async () => {
        try {
            const response = await fetch('/api/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exampleData),
            });

            if (!response.ok) {
                throw new Error('Failed to compile PDF');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error('PDF generation failed:', error);
        }
    };
    //#endregion

    //#region dark mode
    React.useEffect(() => {
        if (!isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDark]);
    //#endregion

    //#region edit from history
    const handleEdit = () => {
        setConfirmPopup(-1)
        // localStorage.setItem('Data', JSON.stringify(historyData[confirmPopup]?.content));
        setExampleData(JSON.parse(historyData[confirmPopup]?.content))
    }
    //#endregion

    //#region download pdf from history
    const generateAndDownload = async (index) => {
        const { texDoc, opts } = getTemplateData(JSON.parse(historyData[index]?.content));
        const pdfUrl = await latex(texDoc, opts);
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.setAttribute('download', historyData[index]?.pdf_name + '.pdf'); // You can specify the filename here
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            console.log('No PDF URL available');
        }
    }
    //#endregion

    //#region pdf zoom control
    const zoomIn = () => {
        setScale(prevScale => Math.min(prevScale + 0.1, 3)); // Increase scale, max 3x 
        console.log(scale)
    };

    const zoomOut = () => {
        setScale(prevScale => Math.max(prevScale - 0.1, 0.5)); // Decrease scale, min 0.5x zoom
    };
    //#endregion

    //#region change pdf page
    const next = () => {
        if (pageNumber === numPages) return;

        setPageNumber(pageNumber + 1);
    };

    const prev = () => {
        if (pageNumber === 1) return;

        setPageNumber(pageNumber - 1);
    };
    //#endregion

    //#region download pdf
    const handleDownload = async () => {
        if (!pdfUrl) {
            console.log('No PDF URL available');
            return;
        }

        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            // If logged in, save resume to history; guests can still download without saving.
            if (!error && user) {
                const { error: resumeError } = await supabase
                    .from('user_details')
                    .insert([
                        {
                            uuid: user.id,
                            pdf_name: previewName,
                            content: JSON.stringify(exampleData),
                        }
                    ])
                    .single();
                if (resumeError) {
                    console.error('Failed to save resume to database', resumeError);
                }
            }
        } catch (err) {
            console.error('Failed to handle resume download/save', err);
        }

        const link = document.createElement('a');
        link.href = pdfUrl;
        link.setAttribute('download', previewName + '.pdf'); // You can specify the filename here
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    //#endregion

    //#region close big image
    const closeImage = () => {
        setOpenImage('');
    };
    //#endregion

    //#region change completed page
    const hanldeFarward = () => {
        const getIndex = contentPages.indexOf(selectedPage)
        if (getIndex < contentPages.length - 1) {
            setSelectedPage(contentPages[getIndex + 1])
        }
        if (getIndex == contentPages.length - 1) {
            setActiveTab("preview")
        }
    }

    const hanldeBack = () => {
        const getIndex = contentPages.indexOf(selectedPage)
        if (getIndex > 0) {
            setSelectedPage(contentPages[getIndex - 1])
            generatePDF()
        }
    }
    //#endregion

    //#region keywords 
    const handleAddkeywordInSkill = (index2, item) => {
        setExampleData(prevState => {
            const updatedskills = [...prevState.skills];
            updatedskills[index2]?.keywords?.push(item);
            return {
                ...prevState,
                skills: updatedskills,
            };
        });

        setOpenSkillSelector(-1)
    }

    const extractKeywords = () => {
        let doc = nlp(jobDescription);

        // Extract nouns and verbs
        let skills = doc.nouns().out('array');
        let actions = doc.verbs().out('array');

        // Combine skills and actions, convert to lowercase
        let keywordList = [...skills, ...actions].map(word => word.toLowerCase());

        // Filter out unwanted characters like "-"
        keywordList = keywordList.map(word => word.replace(/[^a-zA-Z0-9\s]/g, ''));

        // Remove stop words
        keywordList = removeStopwords(keywordList);

        // Prioritize tech-related keywords
        let prioritizedKeywords = [];
        techKeywords.forEach(tech => {
            if (keywordList.includes(tech)) {
                prioritizedKeywords.push(tech);
            }
        });

        // Add remaining keywords that are not in the tech priority list
        let remainingKeywords = keywordList.filter(word => !prioritizedKeywords.includes(word));

        // Combine prioritized and remaining keywords, remove duplicates
        let finalKeywords = [...new Set([...prioritizedKeywords, ...remainingKeywords])];
        setKeywords(finalKeywords);
    };

    const handleRemoveKeyword = (keyword) => {
        setExampleData(prevState => {
            const updatedSkills = prevState.skills.map(skill => {
                return {
                    ...skill,
                    keywords: skill.keywords.filter(k => k !== keyword) // Remove the keyword from the skill
                };
            });
            return {
                ...prevState,
                skills: updatedSkills,
            };
        });
    };

    const handleClickOutside = (event) => {
        if (AddInPopRef.current && !AddInPopRef.current.contains(event.target)) {
            setOpenSkillSelector(-1);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //#endregion

    //#region logout
    const handleLogout = () => {
        supabase.auth.signOut();
        navigate('/');
    }
    //#endregion

    //#region check session useEffect (optional login)
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error || !user) {
                    // Allow anonymous users; just don't set user details.
                    setUserDetails({
                        uuid: "",
                        name: "",
                        email: "",
                        profileImage: "",
                    });
                    return;
                }

                const token = localStorage.getItem('sb-jiacmpdzhulppqaqsbkb-auth-token');
                if (token) {
                    try {
                        const tokenExpiry = JSON.parse(token)?.expires_at;
                        const isTokenExpired = new Date(tokenExpiry * 1000) < new Date();
                        if (isTokenExpired) {
                            // Token expired; sign out but keep user on the page.
                            await supabase.auth.signOut();
                            setUserDetails({
                                uuid: "",
                                name: "",
                                email: "",
                                profileImage: "",
                            });
                            return;
                        }
                    } catch (error) {
                        console.error('Invalid token:', error);
                        await supabase.auth.signOut();
                        setUserDetails({
                            uuid: "",
                            name: "",
                            email: "",
                            profileImage: "",
                        });
                        return;
                    }
                }

                setUserDetails({
                    uuid: user.id,
                    name: user.user_metadata.name,
                    email: user.user_metadata.email,
                    profileImage: user.user_metadata.avatar_url
                });
            } catch (err) {
                console.error('Failed to check session:', err);
                setUserDetails({
                    uuid: "",
                    name: "",
                    email: "",
                    profileImage: "",
                });
            }
        };
        checkSession();
    }, []);
    //#endregion

    //#region pdf resize useEffect
    useEffect(() => {
        const handleResize = () => {
            setScale(window.innerWidth < 960 ? 0.5 : 0.8); // Set scale based on screen size
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize); // Cleanup listener
    }, [])
    //#endregion

    //#region sync data with local storage
    useEffect(() => {
        const storedData = localStorage.getItem('Data');
        if (storedData && exampleData != null) {
            localStorage.setItem('Data', JSON.stringify(exampleData));
        }
        else if (storedData && exampleData == null) {
            setExampleData(JSON.parse(storedData))
        }
        else {
            localStorage.setItem('Data', JSON.stringify(preData));
            setExampleData(preData)
        }

    }, [exampleData])
    //#endregion


    return (
        <div className=' w-full h-screen overflow-hidden relative flex flex-col justify-start items-start saturate-150'>


            <div className=" w-full flex items-center justify-between min-h-[8%] shadow-md bg-white border p-2 px-3">
                <div className=' flex items-center gap-4 h-full'>
                    <Typography variant="h4" className="md:text-2xl font-bold">
                        <span className=' bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text'>Hey </span>
                        Resume !
                    </Typography>

                    <div className=' w-px h-6 bg-gray-200 hidden md:block'></div>

                    <div className=' bg-blue-50/50 border border-blue-100/50 rounded-full px-3 py-0.5 hidden md:flex'>
                        <Typography variant="tiny" className="text-blue-600 font-semibold tracking-normal lowercase">
                            Standard
                        </Typography>
                    </div>
                </div>


                <div className='flex'>
                    <Popover placement="bottom-end">
                        <PopoverHandler>
                            <div className=' flex items-center gap-3 cursor-pointer group'>
                                <div className=' h-10 w-10 bg-gray-100 border border-gray-100 rounded-full overflow-hidden group-hover:ring-2 ring-blue-500/20 transition-all'>
                                    <img src={userDetails?.profileImage} alt="" className=' w-full h-full object-cover' />
                                </div>
                                <div className=' md:flex flex-col hidden'>
                                    <Typography variant="h6" className='text-gray-900 group-hover:text-blue-600 transition-colors leading-none mb-1'>{userDetails?.name}</Typography>
                                    <Typography variant="small" className='text-gray-500 leading-none'>{userDetails?.email}</Typography>
                                </div>
                            </div>
                        </PopoverHandler>
                        <PopoverContent className="min-w-[14rem] p-1">
                            <div className=' p-2 hover:bg-gray-50 rounded-lg flex items-center justify-between text-gray-700 cursor-pointer transition-colors'>
                                <Typography variant="body" className="font-medium">Order</Typography>
                                <ShoppingBagIcon className=' h-4 w-4 text-gray-400' />
                            </div>
                            <div onClick={handleLogout} className=' p-2 hover:bg-red-50 rounded-lg flex items-center justify-between text-red-600 cursor-pointer transition-colors'>
                                <Typography variant="body" className="font-medium text-inherit">Log out</Typography>
                                <ArrowRightStartOnRectangleIcon className=' h-4 w-4' />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>

            <div className=' w-full h-[93%] bg-blue-700 bg-opacity-5 p-2 md:flex hidden dark:bg-[#14171d] '>

                <div className=' w-[15%] h-full'>
                    <div className=' p-5 bg-white dark:bg-[#14171d]gap-1  h-full flex flex-col justify-start    border-r '>

                        <div className=' mt-2 mb-4 px-2'>
                            <Typography variant="tiny" className="text-gray-400 font-bold tracking-widest">
                                Sections
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-1">
                            {contentPages.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedPage(item)}
                                    className={twMerge(
                                        'w-full py-2.5 px-4 rounded-xl relative flex justify-start items-center cursor-pointer transition-all duration-300 group overflow-hidden',
                                        selectedPage === item ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md ring-4 ring-blue-500/10' : 'hover:bg-gray-50'
                                    )}
                                >
                                    <Typography
                                        variant="body"
                                        className={twMerge(
                                            'z-20 font-semibold transition-all duration-300',
                                            selectedPage === item ? 'text-white translate-x-1' : 'text-gray-600 group-hover:text-blue-600'
                                        )}
                                    >
                                        {item}
                                    </Typography>
                                </button>
                            ))}
                        </div>

                        <div className=' mt-6'>
                            <Typography
                                variant="h6"
                                className={` flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text group-hover:text-transparent text-black`}
                            >
                                Other
                            </Typography>
                        </div>

                        <div onClick={handleOpen} className=' cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-indigo-600 duration-700 transition-all '>
                            <ClockIcon className=' group-hover:animate-spin ml-8  h-6 group-hover:text-indigo-600  text-[#21333c] ' />
                            <Typography

                                variant="paragraph"

                                className={` flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text group-hover:text-transparent text-[#21333c] font-medium l`}
                            >
                                History
                            </Typography>

                        </div>

                        <div onClick={() => setAiOpen(true)} className=' mt-2 cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-indigo-600 duration-700 transition-all '>
                            <RocketLaunchIcon className='  transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 ] ml-8  h-6 group-hover:text-indigo-600  text-[#21333c] ' />
                            <Typography

                                variant="paragraph"

                                className={`flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text group-hover:text-transparent text-[#21333c] font-medium l`}
                            >
                                AI Creation
                            </Typography>

                        </div>

                        <div onClick={() => setKeyOpen(true)} className=' mt-2 cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-indigo-600 duration-700 transition-all '>
                            <KeyIcon className=' transition-transform duration-500 group-hover:rotate-45 group-hover:-translate-x-3 ml-8  h-6 group-hover:text-indigo-600  text-[#21333c] ' />
                            <Typography

                                variant="paragraph"

                                className={`flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text group-hover:text-transparent text-[#21333c] font-medium l`}
                            >
                                Keywords
                            </Typography>

                        </div>

                    </div>

                </div>

                <div className=' w-[45%] h-full bg-white dark:bg-[#14171d] '>

                    <div className='h-[92.5%] w-full overflow-y-auto p-2 bg-white dark:bg-[#14171d] shadow-inner'>
                        <div className=' h-[7.5%] w-full border-b-2 flex items-center justify-between px-4'>
                            <Typography
                                variant="h6"
                                className='text-[#768499]'
                            >
                                {selectedPage} section
                            </Typography>
                        </div>

                        {selectedPage === "Templates" && <TemplateSection exampleData={exampleData} setExampleData={setExampleData} handleImageClick={handleImageClick} />}
                        {selectedPage === "Profile" && <ProfileSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Education" && <EducationSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Work" && <WorkSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Skills" && <SkillsSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Projects" && <ProjectSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Awards" && <AwardSection exampleData={exampleData} setExampleData={setExampleData} />}

                    </div>
                    <div className=' h-[7.5%] w-full border-t-2 flex gap-4 items-center justify-between px-4'>

                        <div className=' w-full gap-4 flex items-end select-none'>
                            <ChevronLeftIcon onClick={hanldeBack} className=' cursor-pointer hover:border h-8 w-8 hover:shadow-xl rounded-md' />
                            <div className="w-full">
                                <div className="mb-2 flex items-center justify-center gap-4">
                                    <Typography variant="paragraph" className=' text-[#768499]'>
                                        Completed
                                    </Typography>
                                </div>
                                <Progress value={contentPages.indexOf(selectedPage) / (contentPages.length - 1) * 100} />
                            </div>
                            <ChevronRightIcon onClick={hanldeFarward} className=' cursor-pointer hover:border h-8 w-8 hover:shadow-xl rounded-md' />
                        </div>



                    </div>
                </div>


                <div className=' w-[40%] h-full  overflow-hidden mx-4 bg-white dark:bg-[#14171d] flex flex-col justify-start items-center space-y-2'>
                    <div className='h-14 w-full flex  justify-between pr-4 items-center border-b py-3'>
                        <div className=' flex flex-col space-y-1 pl-2'>
                            {
                                isEditing ? (
                                    <input
                                        type="text"
                                        value={previewName}
                                        onChange={(e) => setPreviewName(e.target.value)}
                                        onBlur={() => setIsEditing(false)}
                                        className='text-[#768499] border-b border-blue-gray-300 w-[7rem] px-1 focus:ring-0 focus:border-0'
                                    />
                                ) : (<div className=' w-[10rem]  flex space-x-2 px-1 items-center' onClick={() => setIsEditing(true)}>
                                    <Typography
                                        className='text-[#768499] h-6 max-w-full overflow-hidden text-ellipsis items-center '
                                    >
                                        {previewName}
                                        <span>.pdf</span>
                                    </Typography>
                                    <PencilIcon className=' w-4 h-4 cursor-pointer items-center flex text-[#768499]' />
                                </div>)


                            }
                            <Typography
                                className='text-[#768499] pl-1 max-w-full overflow-hidden text-ellipsis items-center '
                                variant='small'
                            >
                                Template : {exampleData?.selectedTemplate}
                            </Typography>
                        </div>

                        <div className=' flex items-center gap-2'>
                            <Tooltip content="Zoom out">
                                <IconButton variant="ghost" onClick={zoomOut}>
                                    <MinusIcon className='w-5 h-5 text-gray-500' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip content="Zoom in">
                                <IconButton variant="ghost" onClick={zoomIn}>
                                    <PlusIcon className='w-5 h-5 text-gray-500' />
                                </IconButton>
                            </Tooltip>

                            <div className=' h-6 w-px bg-gray-200'></div>

                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={generatePDF}
                                className="py-2 px-3 h-9"
                            >
                                <Typography variant="small" className="font-semibold text-blue-600">Save</Typography>
                                <DocumentTextIcon className="h-4 w-4" />
                            </Button>

                            <IconButton
                                variant="filled"
                                color="blue"
                                disabled={!pdfUrl}
                                onClick={handleDownload}
                                className="h-9 w-9"
                            >
                                <ArrowDownTrayIcon className="h-4 w-4" />
                            </IconButton>
                        </div>


                    </div>

                    <div className=' w-full h-full flex justify-center py-2 items-start overflow-auto relative'>
                        {isLoading ? <div className=' flex flex-col justify-center items-center h-full'>
                            <Lottie animationData={loading} loop={true} className=' w-[7rem]' />
                        </div> :
                            (!pdfUrl ? <div className=' flex flex-col justify-center items-center h-full'>
                                <Typography
                                    className='overflow-hidden text-ellipsis items-center text-[#768499]'
                                    variant='h6'
                                >
                                    Click above save button to generate pdf
                                </Typography>

                            </div>
                                :
                                <Document file={pdfUrl || "/blank.pdf"} onLoadSuccess={onDocumentLoadSuccess} >

                                    <div className=' border shadow-md'>
                                        <Page
                                            scale={scale}
                                            pageNumber={pageNumber}
                                            renderAnnotationLayer={false}
                                            renderTextLayer={false}
                                            loading=""
                                        />
                                    </div>


                                </Document>
                            )
                        }

                    </div>

                    <div className='h-12 w-full flex justify-center items-center border-t border-gray-100 bg-gray-50/50'>
                        <div className="flex items-center gap-6">
                            <IconButton
                                variant="outlined"
                                onClick={prev}
                                disabled={pageNumber === 1}
                                className='h-8 w-8 rounded-lg'
                            >
                                <ArrowLeftIcon className="h-4 w-4" />
                            </IconButton>
                            <Typography variant="small" className="font-medium text-gray-600">
                                Page <span className="text-gray-900 font-bold">{pageNumber}</span> of{" "}
                                <span className="text-gray-900 font-bold">{numPages}</span>
                            </Typography>
                            <IconButton
                                variant="outlined"
                                onClick={next}
                                disabled={pageNumber === numPages}
                                className='h-8 w-8 rounded-lg'
                            >
                                <ArrowRightIcon className="h-4 w-4" />
                            </IconButton>
                        </div>
                    </div>

                </div>

                <Dialog size='sm' open={confirmPopup !== -1} handler={() => setConfirmPopup(-1)}>
                    <DialogHeader>Confirm Edit</DialogHeader>
                    <DialogBody>
                        <div className=' flex flex-col items-center text-center gap-2'>
                            <Typography variant="body" className="text-gray-600">
                                Your current unsaved changes will be lost.
                            </Typography>
                            <Typography variant='h6' className="text-gray-900">
                                Are you sure you want to edit "{historyData[confirmPopup]?.pdf_name}.pdf" from {formatDate(historyData[confirmPopup]?.created_at)}?
                            </Typography>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setConfirmPopup(-1)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleEdit}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </Dialog>

                <Dialog size='lg' open={aiOpen} handler={() => setAiOpen(false)}>
                    <DialogHeader className=' gap-2  flex'>

                        <Typography variant='h5' className=' text-[#344767] '>
                            AI Creation
                        </Typography>


                    </DialogHeader>
                    <DialogBody>
                        <div className=' flex flex-col gap-4 justify-start md:px-10 '>
                            <div className=' flex justify-between items-end'>
                                <Typography className=" text-[#a2a2a2] text-md font-normal">
                                    Describe about you
                                </Typography>
                                <Typography className=" bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text text-xs font-normal cursor-pointer">
                                    Example
                                </Typography>
                            </div>

                            <div className=' flex items-center gap-2 w-full '>
                                <textarea placeholder="Write the Description here " className=' p-1 text-sm  min-h-[8rem]   w-full overflow-hidden transition-transform duration-500 border rounded-md text-[#475c66] border-[#b0bec5]' />
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className=' gap-2'>

                        <Button variant="gradient" color="black" onClick={() => setAiOpen(false)}>
                            <span>{'Cancel'}</span>
                        </Button>

                        <Button disabled variant="gradient" color="green" onClick={() => setAiOpen(false)}>
                            <span>Upcomming</span>
                        </Button>

                    </DialogFooter>
                </Dialog>



            </div>

            <div className=' flex flex-col gap-2 md:hidden w-full justify-start items-start h-[92%] relative '>

                <div className=' w-full h-[7%] border-b-2 flex items-center justify-between px-4'>

                    <Popover open={openHamburger} handler={setOpenHamburger} placement="bottom-end">
                        <PopoverHandler>
                            <IconButton onClick={() => setOpenHamburger(!openHamburger)} variant='text'  >
                                <Menu className=' h-6 w-6' />
                            </IconButton>
                        </PopoverHandler>
                        <PopoverContent className=" divide-y-2 flex flex-col pl-5 shadow-lg  ">

                            <div className=' p-2 w-[12rem] bg-white dark:bg-[#14171d] gap-1 h-[32rem]  flex flex-col justify-start overflow-y-auto  '>

                                <div className=' mt-2 mb-4'>
                                    <Typography
                                        variant="h6"
                                        className={` flex items-center  text-black`}
                                    >
                                        Sections
                                    </Typography>
                                </div>

                                {
                                    contentPages.map((item, index) =>
                                        <div key={index} onClick={() => { setOpenHamburger(!openHamburger); setSelectedPage(item) }} className={`    w-full h-10 py-2  rounded-lg relative flex justify-start items-center overflow-hidden cursor-pointer group`}>
                                            {/* <GripVertical className='  h-4 w-4 group-hover:flex hidden absolute left-1 cursor-grab  ' /> */}
                                            <Typography
                                                key={index}
                                                variant="paragraph"
                                                draggable
                                                className={`${selectedPage === item ? 'text-[#ffffff]' : 'text-[#21333c]   group-hover:translate-x-4'} duration-400 transition-transform ease-in-out translate-x-0  ml-4 z-20 absolute flex items-center gap-2 font-medium  `}
                                            >

                                                {item}
                                            </Typography>
                                            <div className={` w-full h-10 py-2 ${selectedPage === item ? 'inset-0 ' : '-inset-96'} duration-700 transition-all  bg-[#1762df] z-10 rounded-lg pl-5 absolute`}>

                                            </div>
                                        </div>
                                    )
                                }

                                <div className=' mt-6'>
                                    <Typography
                                        variant="h6"
                                        className={` flex items-center  text-black`}
                                    >
                                        Other
                                    </Typography>
                                </div>

                                <div onClick={handleOpen} className=' cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-[#1762df] duration-700 transition-all '>
                                    <ClockIcon className=' group-hover:animate-spin ml-8  h-6 group-hover:text-[#1762df]  text-[#21333c] ' />
                                    <Typography

                                        variant="paragraph"

                                        className={` flex items-center  text-[#21333c] font-medium group-hover:text-[#1762df] `}
                                    >
                                        History
                                    </Typography>

                                </div>

                                <div onClick={() => { setOpenHamburger(!openHamburger); setAiOpen(true) }} className=' mt-2 cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-[#1762df] duration-700 transition-all '>
                                    <RocketLaunchIcon className='  transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2  ml-8  h-6 group-hover:text-[#1762df]  text-[#21333c] ' />
                                    <Typography

                                        variant="paragraph"

                                        className={`flex items-center  text-[#21333c] font-medium group-hover:text-[#1762df] `}
                                    >
                                        AI Creation
                                    </Typography>

                                </div>

                                <div onClick={() => { setOpenHamburger(!openHamburger); setKeyOpen(true) }} className=' mt-2 cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-[#1762df] duration-700 transition-all '>
                                    <KeyIcon className=' transition-transform duration-500 group-hover:rotate-45 group-hover:-translate-x-3 ml-8  h-6 group-hover:text-[#1762df]  text-[#21333c] ' />
                                    <Typography

                                        variant="paragraph"

                                        className={`flex items-center  text-[#21333c] font-medium group-hover:text-[#1762df] `}
                                    >
                                        Keywords
                                    </Typography>

                                </div>

                            </div>
                        </PopoverContent>
                    </Popover>


                    <Tabs value={activeTab} className=' py-2 min-h-[7%]  w-fit'>
                        <TabsHeader className=' z-0 border   bg-white' indicatorProps={{
                            className: "bg-black text-white",
                        }}>
                            {TabData.map(({ label, value }, index) => (
                                <Tab key={index} value={value} onClick={() => setActiveTab(value)}
                                    className={activeTab === value ? "text-white" : ""}>
                                    <div className="flex items-center gap-2 font-medium">
                                        {label}
                                    </div>
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>


                </div>

                {
                    activeTab == "section" ? (
                        <div className='  w-full h-[93%]  flex flex-col  justify-start items-start relative'>

                            <div className=' h-[7%] w-full border-b-2 flex items-center justify-between px-4'>
                                <Typography
                                    variant="h6"
                                    className='text-[#768499]'
                                >
                                    {selectedPage} section
                                </Typography>
                            </div>

                            <div className=' min-h-[81%] max-h-[81%] overflow-y-auto w-full p-4 '>
                                {selectedPage === "Templates" && <TemplateSection exampleData={exampleData} setExampleData={setExampleData} handleImageClick={handleImageClick} />}
                                {selectedPage === "Profile" && <ProfileSection exampleData={exampleData} setExampleData={setExampleData} />}
                                {selectedPage === "Education" && <EducationSection exampleData={exampleData} setExampleData={setExampleData} />}
                                {selectedPage === "Work" && <WorkSection exampleData={exampleData} setExampleData={setExampleData} />}
                                {selectedPage === "Skills" && <SkillsSection exampleData={exampleData} setExampleData={setExampleData} />}
                                {selectedPage === "Projects" && <ProjectSection exampleData={exampleData} setExampleData={setExampleData} />}
                                {selectedPage === "Awards" && <AwardSection exampleData={exampleData} setExampleData={setExampleData} />}

                            </div>


                            <div className=' h-[12%]  w-full border-t-2 flex gap-4 items-center justify-between  px-4'>

                                <div className=' w-full gap-4 flex items-end select-none'>
                                    <ChevronLeftIcon onClick={hanldeBack} className=' cursor-pointer hover:border h-8 w-8 hover:shadow-xl rounded-md' />
                                    <div className="w-full">
                                        <div className="mb-2 flex items-center justify-center gap-4">
                                            <Typography color="blue-gray" variant="h6">
                                                Completed
                                            </Typography>
                                        </div>
                                        <Progress value={contentPages.indexOf(selectedPage) / (contentPages.length - 1) * 100} />
                                    </div>
                                    <ChevronRightIcon onClick={hanldeFarward} className=' cursor-pointer hover:border h-8 w-8 hover:shadow-xl rounded-md' />
                                </div>

                            </div>
                        </div>

                    ) :
                        <div className=' h-full  overflow-hiddenpx-2 mx-auto md:mx-4 bg-white dark:bg-[#14171d] flex flex-col justify-start items-center space-y-2'>
                            <div className='h-14 w-full flex  justify-between md:pr-4 items-center border-b py-3'>
                                <div className='  flex flex-col space-y-1 '>
                                    {
                                        isEditing ? (
                                            <input
                                                type="text"
                                                value={previewName}
                                                onChange={(e) => setPreviewName(e.target.value)}
                                                onBlur={() => setIsEditing(false)}
                                                className='text-[#768499] border-b border-blue-gray-300 md:w-[7rem] px-1 focus:ring-0 focus:border-0'
                                            />
                                        ) : (<div className=' md:w-[10rem]  flex space-x-2 px-1 items-center' onClick={() => setIsEditing(true)}>
                                            <Typography
                                                className='text-[#768499] h-6 max-w-full overflow-hidden text-ellipsis items-center '
                                            >
                                                {previewName}
                                                <span>.pdf</span>
                                            </Typography>
                                            <PencilIcon className=' w-4 h-4 cursor-pointer items-center flex text-[#768499]' />
                                        </div>)


                                    }
                                    <Typography
                                        className='text-[#768499] pl-1 max-w-full overflow-hidden text-ellipsis items-center '
                                        variant='small'
                                    >
                                        Template : {exampleData?.selectedTemplate}
                                    </Typography>
                                </div>

                                <div className=' flex space-x-2 '>

                                    <Tooltip content="Zoom out">
                                        <IconButton color='white' onClick={zoomOut}>
                                            <MinusIcon className='w-6 h-6 cursor-pointer text-[#768499]' />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip content="Zoom in">
                                        <IconButton color='white' onClick={zoomIn}>
                                            <PlusIcon className='w-6 h-6 cursor-pointer text-[#768499]' />
                                        </IconButton>
                                    </Tooltip>

                                    <div className=' h-8 my-auto w-[0.5px] bg-blue-gray-300'></div>

                                    <div className=' flex items-center w-fit'>
                                        <Tooltip content="Save">
                                            <button onClick={generatePDF} className=' flex items-center gap-2 py-[0.6rem] px-2 bg-white dark:bg-[#14171d] rounded-lg hover:shadow-md  border duration-500 transition-all'>
                                                <Typography
                                                    className='overflow-hidden text-ellipsis items-center text-black'
                                                    variant='small'
                                                >
                                                    Save
                                                </Typography>
                                                <DocumentTextIcon strokeWidth={2} className="h-4 w-4 text-black transition-all duration-500 " />
                                            </button>
                                        </Tooltip>
                                    </div>

                                    <IconButton disabled={!pdfUrl} onClick={handleDownload} >
                                        <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4  text-white transition-all duration-500 " />
                                    </IconButton>

                                </div>


                            </div>

                            <div className=' w-full h-full flex justify-center py-2 items-start overflow-auto relative '>
                                {isLoading ? <div className=' flex flex-col justify-center items-center h-full'>
                                    <Lottie animationData={loading} loop={true} className=' w-[7rem]' />
                                </div> :
                                    (!pdfUrl ? <div className=' flex flex-col justify-center items-center h-full'>
                                        <Typography
                                            className='overflow-hidden text-ellipsis items-center text-[#768499]'
                                            variant='h6'
                                        >
                                            Click above save button to generate pdf
                                        </Typography>

                                    </div>
                                        :
                                        <Document file={pdfUrl || "/blank.pdf"} onLoadSuccess={onDocumentLoadSuccess} >

                                            <div className=' border shadow-md'>
                                                <Page
                                                    scale={scale}
                                                    pageNumber={pageNumber}
                                                    renderAnnotationLayer={false}
                                                    renderTextLayer={false}
                                                    loading=""
                                                />
                                            </div>


                                        </Document>
                                    )
                                }

                            </div>

                            <div className='h-12 w-full flex justify-center pr-4 items-center border-t p-2'>
                                <div className="flex items-center gap-8">
                                    <IconButton
                                        size="sm"
                                        variant="outlined"
                                        onClick={prev}
                                        disabled={pageNumber === 1}
                                    >
                                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                                    </IconButton>
                                    <Typography color="gray" className="font-normal">
                                        Page <strong className="text-gray-900">{pageNumber}</strong> of{" "}
                                        <strong className="text-gray-900">{numPages}</strong>
                                    </Typography>
                                    <IconButton
                                        size="sm"
                                        variant="outlined"
                                        onClick={next}
                                        disabled={pageNumber === 10}
                                    >
                                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                                    </IconButton>
                                </div>

                            </div>

                        </div>
                }



            </div>


            <AnimatePresence>
                {openImage != '' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full  absolute z-50 flex flex-col justify-center items-center bg-opacity-45 bg-black"
                        onClick={closeImage}
                    >
                        <motion.div
                            initial={{
                                top: imagePosition.top,
                                left: imagePosition.left,
                                width: imagePosition.width,
                                height: imagePosition.height
                            }}
                            animate={{
                                top: '50%',
                                left: '50%',
                                width: '35rem',
                                height: '50rem',
                                x: '-50%',
                                y: '-50%'
                            }}

                            className="  flex justify-center items-center relative overflow-hidden  h-full"
                            style={{ position: 'absolute' }}
                        >
                            <div className='relative flex justify-center items-center  overflow-hidden w-fit py-4 px-2'>
                                <motion.img initial={{ borderRadius: 999 }} whileInView={{ borderRadius: 10 }} src={openImage} alt="Selected" className="md:w-full w-[65%] h-[70%]  md:h-[90%] object-cover" />
                                <button
                                    onClick={closeImage}
                                    className="absolute  top-2 right-2 text-white bg-black/50 rounded-full p-1"
                                >
                                    ✕
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            <Drawer placement="right" open={keyOpen} onClose={() => setKeyOpen(false)} className='p-6 flex flex-col gap-8'>
                <div className='flex items-center justify-between'>
                    <div className=' flex items-center gap-4'>
                        <IconButton variant="ghost" onClick={() => setKeyOpen(false)}>
                            <ArrowLeftIcon className='text-gray-900 h-5 w-5' />
                        </IconButton>
                        <Typography variant='h5' className=' text-gray-900 '>
                            Keywords Picker
                        </Typography>
                    </div>

                    <Typography variant="tiny" className=" text-blue-600 font-bold cursor-pointer hover:underline">
                        EXAMPLE
                    </Typography>
                </div>

                <div className=' flex flex-col gap-2'>
                    <Typography variant="small" className="font-semibold text-gray-700">Job Description</Typography>
                    <textarea
                        placeholder="Paste Job Description here to generate keywords..."
                        value={jobDescription}
                        onChange={handleJobDesChange}
                        className='outline-none p-3 text-sm min-h-[10rem] w-full border border-gray-200 rounded-xl text-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all'
                    />
                </div>

                <div className='flex flex-wrap gap-2 overflow-y-auto pr-2'>
                    {keywords.map((item, index) => {
                        const isHighlighted = exampleData.skills.some(skill => skill.keywords.includes(item));
                        return (
                            <div key={index} className='relative'>
                                {isHighlighted && (
                                    <button
                                        onClick={() => handleRemoveKeyword(item)}
                                        className="absolute -top-1 -right-1 text-red-500 bg-white rounded-full p-0.5 shadow-sm hover:scale-110 transition-transform z-10"
                                    >
                                        <XCircleIcon className='h-4 w-4' />
                                    </button>
                                )}
                                <div
                                    onClick={() => setOpenSkillSelector(isHighlighted ? -1 : index)}
                                    className={twMerge(
                                        'cursor-pointer transition-all duration-200 py-1.5 px-4 rounded-lg text-sm font-medium border transition-colors',
                                        isHighlighted
                                            ? 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm'
                                            : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100 hover:text-gray-900'
                                    )}
                                >
                                    {item}
                                </div>
                                {openSkillSelector === index &&
                                    <div ref={AddInPopRef} className="absolute top-full mt-2 left-0 z-[1001] w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className=' px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1'>
                                            Add to section
                                        </div>
                                        <div className=' flex flex-col gap-0.5 max-h-[12rem] overflow-y-auto'>
                                            {exampleData?.skills.map(({ name }, index2) => (
                                                name && (
                                                    <button
                                                        key={index2}
                                                        className='w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium'
                                                        onClick={() => handleAddkeywordInSkill(index2, item)}
                                                    >
                                                        {index2 + 1}. {name}
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>
            </Drawer>


            <Drawer placement="right" open={historyOpen} onClose={() => setHistoryOpen(false)} className='p-6 flex flex-col gap-8'>
                <div className='flex items-center justify-between'>
                    <div className=' flex items-center gap-4'>
                        <IconButton variant="ghost" onClick={() => setHistoryOpen(false)}>
                            <ArrowLeftIcon className='text-gray-900 h-5 w-5' />
                        </IconButton>
                        <Typography variant='h5' className=' text-gray-900 '>
                            History
                        </Typography>
                    </div>

                    <Typography variant="tiny" className=" text-blue-600 font-bold cursor-pointer hover:underline">
                        REFRESH
                    </Typography>
                </div>

                {isLoadingHistory ? (
                    <div className=' flex flex-col justify-center items-center h-full w-full'>
                        <Lottie animationData={loading} loop={true} className=' w-[7rem]' />
                    </div>
                ) : (
                    <div className=' flex flex-col gap-3 h-full overflow-y-auto pr-2'>
                        {historyData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Typography variant="body" className="text-gray-400">No history found.</Typography>
                            </div>
                        ) : (
                            historyData.map((item, index) => (
                                <div key={index} className='p-4 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group'>
                                    <div className="flex justify-between items-start mb-2">
                                        <Typography variant="body" className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {item?.pdf_name}.pdf
                                        </Typography>
                                        <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <IconButton variant="ghost" className="h-8 w-8 text-blue-600" onClick={() => generateAndDownload(index)}>
                                                <ArrowDownTrayIcon className=' w-4 h-4' />
                                            </IconButton>
                                            <IconButton variant="ghost" className="h-8 w-8 text-blue-600" onClick={() => { setConfirmPopup(index); setHistoryOpen(false) }}>
                                                <PencilSquareIcon className=' w-4 h-4' />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Typography variant="tiny" className="text-gray-400 font-medium">
                                        {formatDate(item.created_at)}
                                    </Typography>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </Drawer>

        </div >
    )
}

export default ResumePage
