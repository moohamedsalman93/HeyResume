import {
    IconButton, Navbar, Tooltip, Typography, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Popover,
    PopoverHandler,
    PopoverContent,
    Progress,
} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import getTemplateData from '../../lib/getTemplateData';
import latex from '../../lib/latext';
import { pdfjs, Document, Page } from 'react-pdf'
import { ArrowLeftIcon, ArrowRightIcon, ArrowRightStartOnRectangleIcon, ArrowsPointingInIcon, ChevronRightIcon, ClockIcon, DocumentTextIcon, MinusIcon, PencilIcon, PencilSquareIcon, PlusIcon, RocketLaunchIcon, ShareIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
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
import { json, useNavigate } from 'react-router-dom';
import formatDate from '../../components/FormateDate'
import Lottie from "lottie-react";
import loading from '../../assets/loading.json'



const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc


function ResumePage() {
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
    const [scale, setScale] = useState(0.8)
    const [openImage, setOpenImage] = useState('');
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [open, setOpen] = useState(false);
    const [historyData, setHistoryData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const handleOpen = () => {
        setOpen(!open);
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
    const controls = useAnimation();
    const navigate = useNavigate()

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


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const generatePDF = async () => {
        setIsLoading(true)
        try {
            const { texDoc, opts } = getTemplateData(exampleData);
            const pdfUrl = await latex(texDoc, opts);
            setPdfUrl(pdfUrl);
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }

    };

    const handleEdit = (index) => {
        localStorage.setItem('Data', JSON.stringify(historyData[index]?.data));
    }

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


    const zoomIn = () => {
        setScale(prevScale => Math.min(prevScale + 0.1, 3)); // Increase scale, max 3x 
        console.log(scale)
    };

    const zoomOut = () => {
        setScale(prevScale => Math.max(prevScale - 0.1, 0.5)); // Decrease scale, min 0.5x zoom
    };


    const next = () => {
        if (pageNumber === numPages) return;

        setPageNumber(pageNumber + 1);
    };

    const prev = () => {
        if (pageNumber === 1) return;

        setPageNumber(pageNumber - 1);
    };

    const handleDownload = async () => {
        if (pdfUrl) {

            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                console.error('Failed to fetch user data');
                return;
            }
            const { data, error: resumeError } = await supabase
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


            const link = document.createElement('a');
            link.href = pdfUrl;
            link.setAttribute('download', previewName + '.pdf'); // You can specify the filename here
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            console.log('No PDF URL available');
        }
    };

    const closeImage = () => {
        setOpenImage('');
    };

    const hanldeFarward = () => {
        const getIndex = contentPages.indexOf(selectedPage)
        if (getIndex < contentPages.length - 1) {
            setSelectedPage(contentPages[getIndex + 1])
        }
    }

    const hanldeBack = () => {
        const getIndex = contentPages.indexOf(selectedPage)
        if (getIndex > 0) {
            setSelectedPage(contentPages[getIndex - 1])
            generatePDF()
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                navigate('/');
            } else {
                const token = localStorage.getItem('sb-jiacmpdzhulppqaqsbkb-auth-token');
                if (token) {
                    try {
                        setUserDetails({
                            uuid: user.id,
                            name: user.user_metadata.name,
                            email: user.user_metadata.email,
                            profileImage: user.user_metadata.avatar_url
                        })
                        const tokenExpiry = JSON.parse(token)?.expires_at;
                        const isTokenExpired = new Date(tokenExpiry * 1000) < new Date();
                        if (isTokenExpired) {
                            navigate('/');
                        }

                    } catch (error) {
                        console.error('Invalid token:', error);
                        navigate('/');
                    }
                }
            }
        };
        checkSession();
    }, []);


    const handleLogout = () => {
        supabase.auth.signOut();
        navigate('/');
    }

    return (
        <div className=' w-full h-full overflow-hidden relative flex flex-col justify-start items-start'>
            <Navbar shadow={false} fullWidth className="border-0 !h-[7%]">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <div className=' flex items-center divide-x h-full space-x-2'>
                        <Typography color="blue-gray" className="text-2xl font-bold">
                            <span className=' text-[#5e72e4]'>Hey </span>
                            Resume !
                        </Typography>

                        <div className=' w-[1.5px] h-full bg-blue-gray-300'>

                        </div>

                        <div className=' bg-blue-50 rounded-full px-3 py-1'>
                            <Typography className="text-sm font-light text-blue-300">
                                Standard
                            </Typography>
                        </div>
                    </div>


                    <Popover placement="bottom-end">
                        <PopoverHandler>
                            <div className=' flex items-center gap-2 cursor-pointer'>
                                <div className=' h-10 w-10 bg-blue-gray-50 border rounded-full overflow-clip'>
                                    <img src={userDetails?.profileImage} alt="" className=' w-full h-full object-cover' />
                                </div>
                                <div className=' flex flex-col w-[10rem]'>
                                    <Typography className='text-blue-gray-700  w-[10rem] overflow-hidden text-ellipsis' variant='h6'>{userDetails?.name}</Typography>
                                    <Typography className='text-blue-gray-700 w-[10rem] overflow-hidden text-ellipsis' variant='small'>{userDetails?.email}</Typography>
                                </div>

                            </div>

                        </PopoverHandler>
                        <PopoverContent className="w-[12rem] divide-y-2 flex flex-col pl-10">
                            <div className=' h-10 flex  items-center w-[5.5rem] justify-between hover:text-blue-gray-900 cursor-pointer transition-colors duration-700'>
                                <Typography >
                                    Order
                                </Typography>
                                <ShoppingBagIcon className=' h-4 w-4' />
                            </div>
                            <div onClick={() => handleLogout()} className=' h-10 flex  items-center w-[5.5rem] justify-between hover:text-red-500 cursor-pointer  transition-colors duration-700'>
                                <Typography  >
                                    Log out
                                </Typography>
                                <ArrowRightStartOnRectangleIcon className=' h-4 w-4' />
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>

            </Navbar>
            <div className=' w-full h-[93%] bg-[#5e72e4] bg-opacity-5 p-2 flex '>

                <div className=' w-[15%] h-full'>
                    <div className=' p-5 bg-white gap-1  h-full flex flex-col justify-start    border-r '>

                        <div className=' mt-2 mb-4'>
                            <Typography
                                variant="h6"
                                className={` flex items-center group-hover:text-[#5e72e4] text-black`}
                            >
                                Sections
                            </Typography>
                        </div>

                        {
                            contentPages.map((item, index) =>
                                <div key={index} onClick={() => setSelectedPage(item)} className={` w-full h-10 py-2  rounded-lg relative flex justify-start items-center overflow-hidden cursor-pointer group`}>
                                    <Typography
                                        key={index}
                                        variant="paragraph"
                                        draggable
                                        className={`${selectedPage === item ? 'text-[#ffffff]' : 'text-blue-gray-700 group-hover:text-[#5e72e4]'} ml-8 z-20 absolute flex items-center gap-2 font-medium  `}
                                    >
                                        {item}
                                    </Typography>
                                    <div className={` w-full h-10 py-2 ${selectedPage === item ? 'inset-0 ' : '-inset-96'} duration-700 transition-all  bg-[#5e72e4] z-10 rounded-lg pl-5 absolute`}>

                                    </div>
                                </div>
                            )

                        }

                        <div className=' mt-6'>
                            <Typography
                                variant="h6"
                                className={` flex items-center group-hover:text-[#5e72e4] text-black`}
                            >
                                Other
                            </Typography>
                        </div>

                        <div onClick={handleOpen} className=' cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-[#5e72e4] duration-700 transition-all '>
                            <ClockIcon className=' ml-8  h-6 w-6 group-hover:text-[#5e72e4] text-blue-gray-700 ' />
                            <Typography

                                variant="paragraph"

                                className={` flex items-center group-hover:text-[#5e72e4] text-blue-gray-700 font-medium l`}
                            >
                                History
                            </Typography>

                        </div>

                        <div onClick={handleOpen} className=' cursor-pointer w-full h-11  rounded-xl flex items-center gap-2 hover:border group hover:border-[#5e72e4] duration-700 transition-all '>
                            <RocketLaunchIcon className=' ml-8  h-6 w-6 group-hover:text-[#5e72e4] text-blue-gray-700 ' />
                            <Typography

                                variant="paragraph"

                                className={`flex items-center group-hover:text-[#5e72e4] text-blue-gray-700 font-medium l`}
                            >
                                AI Creation
                            </Typography>

                        </div>

                    </div>

                </div>

                <div className=' w-[45%] h-full bg-white '>

                    <div className='h-[92.5%] w-full overflow-y-auto p-2 bg-white shadow-inner'>
                        <div className=' h-[7.5%] w-full border-b-2 flex items-center justify-between px-4'>
                            <Typography
                                variant="h6"
                                className='text-blue-gray-700'
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


                <div className=' w-[40%] h-full  overflow-hidden mx-4 bg-white flex flex-col justify-start items-center space-y-2'>
                    <div className='h-14 w-full flex  justify-between pr-4 items-center border-b py-3'>
                        <div className=' flex flex-col space-y-1 pl-2'>
                            {
                                isEditing ? (
                                    <input
                                        type="text"
                                        value={previewName}
                                        onChange={(e) => setPreviewName(e.target.value)}
                                        onBlur={() => setIsEditing(false)}
                                        className='text-blue-gray-700 border-b border-blue-gray-300 w-[7rem] px-1 focus:ring-0 focus:border-0'
                                    />
                                ) : (<div className=' w-[10rem]  flex space-x-2 px-1 items-center' onClick={() => setIsEditing(true)}>
                                    <Typography
                                        className='text-blue-gray-700 h-6 max-w-full overflow-hidden text-ellipsis items-center '
                                    >
                                        {previewName}
                                        <span>.pdf</span>
                                    </Typography>
                                    <PencilIcon className=' w-4 h-4 cursor-pointer items-center flex text-blue-gray-700' />
                                </div>)


                            }
                            <Typography
                                className='text-blue-gray-700 pl-1 max-w-full overflow-hidden text-ellipsis items-center '
                                variant='small'
                            >
                                Template : {exampleData?.selectedTemplate}
                            </Typography>
                        </div>

                        <div className=' flex space-x-4 '>

                            <Tooltip content="Zoom out">
                                <IconButton color='white' onClick={zoomOut}>
                                    <MinusIcon className='w-6 h-6 cursor-pointer text-blue-gray-700' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip content="Zoom in">
                                <IconButton color='white' onClick={zoomIn}>
                                    <PlusIcon stroke={2} className='w-6 h-6 cursor-pointer text-blue-gray-700' />
                                </IconButton>
                            </Tooltip>

                            <div className=' h-8 my-auto w-[0.5px] bg-blue-gray-300'></div>

                            <div className=' flex items-center w-fit'>
                                <Tooltip content="Save">
                                    <button onClick={generatePDF} className=' flex items-center gap-2 py-[0.6rem] px-2 bg-white rounded-lg hover:shadow-md  border duration-500 transition-all'>
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

                    <div className=' w-full h-full flex justify-center py-2 items-start overflow-auto relative'>
                        {isLoading ? <div className=' flex flex-col justify-center items-center h-full'>
                            <Lottie animationData={loading} loop={true} className=' w-[7rem]' />
                        </div> :
                            (!pdfUrl ? <div className=' flex flex-col justify-center items-center h-full'>
                                <Typography
                                    className='overflow-hidden text-ellipsis items-center text-blue-gray-700'
                                    variant='h6'
                                >
                                    Click save button to generate pdf
                                </Typography>
                                <div className=' flex items-center gap-2 py-[0.6rem] px-2 '>
                                    <Typography
                                        className='overflow-hidden text-ellipsis items-center text-black'
                                        variant='small'
                                    >
                                        Save
                                    </Typography>
                                    <DocumentTextIcon strokeWidth={2} className="h-4 w-4 text-black transition-all duration-500 " />
                                </div>
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

                <Dialog size='lg' open={open} handler={handleOpen}>
                    <DialogHeader>

                        <Typography variant='h5' className=' text-[#344767] '>
                            History
                        </Typography>
                    </DialogHeader>
                    <DialogBody>
                        {isLoadingHistory ? <div className=' flex flex-col justify-center items-center h-full w-full'>
                            <Lottie animationData={loading} loop={true} className=' w-[7rem]' />
                        </div> :
                            <div className=' h-[30rem] px-5 flex flex-col items-center'>
                                <div className=' h-12 grid grid-cols-3 w-full border-b place-content-center px-10  '>
                                    <Typography className=' text-sm text-[#acb6c7] '>
                                        Name
                                    </Typography>
                                    <Typography className=' text-sm text-[#acb6c7] '>
                                        Created                                </Typography>
                                    <Typography className=' text-sm text-[#acb6c7] '>
                                        Actions

                                    </Typography>
                                </div>
                                <div className=' h-full  w-full pt-2 divide-y-0'>
                                    {historyData.map((item, index) =>
                                        <div key={index} className=' h-14 grid grid-cols-3 w-full place-content-center px-10 '>
                                            <Typography className=' text-sm text-[#344767] '>
                                                {item?.pdf_name}
                                            </Typography>
                                            <Typography className=' text-sm text-[#344767] '>
                                                {formatDate(item.created_at)}
                                            </Typography>
                                            <div className=' gap-4 flex text-[#5e72e4] '>
                                                <ArrowDownTrayIcon onClick={() => generateAndDownload(index)} className=' w-6 h-6 cursor-pointer  hover:text-[#5e72e45a]' />
                                                <PencilSquareIcon onClick={() => handleEdit(index)} className=' w-6 h-6 cursor-pointer hover:text-[#5e72e45a] ' />

                                            </div>
                                        </div>
                                    )

                                    }
                                </div>

                            </div>
                        }
                    </DialogBody>
                    <DialogFooter>

                        <Button variant="gradient" color="green" onClick={handleOpen}>
                            <span>Close</span>
                        </Button>
                    </DialogFooter>
                </Dialog>

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

                            className="  flex justify-center items-center relative overflow-hidden py-4 h-full"
                            style={{ position: 'absolute' }}
                        >
                            <motion.img initial={{ borderRadius: 999 }} whileInView={{ borderRadius: 10 }} src={openImage} alt="Selected" className="w-full  h-[90%] object-cover" />
                            <button
                                onClick={closeImage}
                                className="absolute top-[7%] right-2 text-white bg-black/50 rounded-full p-1"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}

export default ResumePage
