import { IconButton, Navbar, Tooltip, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import getTemplateData from '../../lib/getTemplateData';
import latex from '../../lib/latext';
import { pdfjs, Document, Page } from 'react-pdf'
import { ArrowLeftIcon, ArrowRightIcon, ArrowsPointingInIcon, DocumentTextIcon, MinusIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import ProfileSection from '../../components/ProfileSection';
import TemplateSection from '../../components/TemplateSection'
import EducationSection from '../../components/EducationSection'
import WorkSection from '../../components/WorkSection'
import SkillsSection from '../../components/SkillsSection'
import ProjectSection from '../../components/ProjectSection'
import AwardSection from '../../components/AwardSection'
import { motion, AnimatePresence, useAnimation } from 'framer-motion';


const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc


function ResumePage() {
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

    const [exampleData, setExampleData] = useState()

    const [scale, setScale] = useState(1.0)
    const [openImage, setOpenImage] = useState('');
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const controls = useAnimation();


    useEffect(() => {
        if (exampleData) {
            localStorage.setItem('Data', JSON.stringify(exampleData));
        }
    }, [exampleData])

    useEffect(() => {
        const storedData = localStorage.getItem('Data');
        if (storedData) {
            setExampleData(JSON.parse(storedData));
        }
    }, [])

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
        const { texDoc, opts } = getTemplateData(exampleData);
        const pdfUrl = await latex(texDoc, opts);
        setPdfUrl(pdfUrl);
    };


    const zoomIn = () => {
        setScale(prevScale => Math.min(prevScale + 0.1, 3)); // Increase scale, max 3x zoom
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

    const handleDownload = () => {
        if (pdfUrl) {
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


    return (
        <div className=' w-full h-full overflow-hidden relative flex flex-col justify-start items-start'>
            <Navbar shadow={false} fullWidth className="border-0 !h-[7%]">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <div className=' flex items-center divide-x h-full space-x-2'>
                        <Typography color="blue-gray" className="text-2xl font-bold">
                            <span className=' text-green-500'>Hey </span>
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

                    <div className="hidden items-center gap-4 lg:flex">
                        <div className=' h-10 w-10 bg-blue-gray-50 border rounded-full'>

                        </div>

                    </div>

                </div>

            </Navbar>
            <div className=' w-full h-[93%] bg-green-50 p-2 flex '>

                <div className=' w-[15%] h-full'>
                    <div className=' p-5 bg-white gap-1  h-full flex flex-col justify-start    border-r '>

                        {
                            contentPages.map((item, index) =>
                                <div key={index} onClick={() => setSelectedPage(item)} className={` w-full h-10 py-2  rounded-lg relative flex justify-start items-center overflow-hidden cursor-pointer group`}>
                                    <Typography
                                        key={index}
                                        variant="paragraph"
                                        draggable
                                        className={`${selectedPage === item ? 'text-green-500' : 'text-blue-gray-700'} ml-8 z-20 absolute flex items-center gap-2 font-medium  group-hover:text-green-500`}
                                    >
                                        {item}
                                    </Typography>
                                    <div className={` w-full h-10 py-2 ${selectedPage === item ? 'inset-0 ' : '-inset-96'} duration-700 transition-all  bg-green-50 z-10 rounded-lg pl-5 absolute`}>

                                    </div>
                                </div>
                            )

                        }

                        <div>

                        </div>
                    </div>
                </div>

                <div className=' w-[45%] h-full bg-white '>
                    <div className=' h-[7.5%] w-full border-b flex items-center justify-between px-4'>
                        <Typography
                            variant="h6"
                            className='text-blue-gray-700'
                        >
                            {selectedPage} section
                        </Typography>

                        <div className=' flex items-center gap-6'>
                            <IconButton onClick={generatePDF}>
                                <DocumentTextIcon strokeWidth={2} className="h-4 w-4 text-white transition-all duration-500 " />
                            </IconButton>
                        </div>
                    </div>
                    <div className='h-[92.5%] w-full overflow-y-auto p-2 bg-white'>

                        {selectedPage === "Templates" && <TemplateSection exampleData={exampleData} setExampleData={setExampleData} handleImageClick={handleImageClick} />}
                        {selectedPage === "Profile" && <ProfileSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Education" && <EducationSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Work" && <WorkSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Skills" && <SkillsSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Projects" && <ProjectSection exampleData={exampleData} setExampleData={setExampleData} />}
                        {selectedPage === "Awards" && <AwardSection exampleData={exampleData} setExampleData={setExampleData}  />}

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

                            <div className=' w-6'></div>

                            <IconButton disabled={!pdfUrl} onClick={handleDownload} >
                                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4  text-white transition-all duration-500 " />
                            </IconButton>

                        </div>




                    </div>

                    <div className=' w-full h-full flex justify-center py-2 items-start overflow-auto relative'>
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

            </div>

            <AnimatePresence>
                {openImage != '' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-screen  absolute z-50 flex flex-col justify-center items-center bg-opacity-45 bg-black"
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

                            className="  flex justify-center items-center relative overflow-hidden"
                            style={{ position: 'absolute' }}
                        >
                            <motion.img initial={{ borderRadius: 999 }} whileInView={{ borderRadius: 10 }} src={openImage} alt="Selected" className="w-full  h-full object-cover" />
                            <button
                                onClick={closeImage}
                                className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1"
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
