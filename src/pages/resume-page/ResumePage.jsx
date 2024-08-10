import { Navbar, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import getTemplateData from '../../lib/getTemplateData';
import latex from '../../lib/latext';
import { pdfjs, Document, Page } from 'react-pdf'
import pdf from './blank.pdf'

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.js",
//     import.meta.url
// ).toString();



function ResumePage() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [selectedPage, setSelectedPage] = useState("Templates");
    const [contentPages, setContentPages] = useState([
        "Templates",
        "Profile",
        "Eductaion",
        "Work",
        "Skills",
        "Projects",
        "Awards",
    ])
    const [exampleData, setExampleData] = useState({
        selectedTemplate: 'TEMPLATE1',
        basics: {
            name: "",
            email: "",
            phone: "",
            location: { address: "" },
            website: ""
        },
        education: [
            {
                institution: "University of Example",
                location: "Example City",
                studyType: "Bachelor's",
                area: "Computer Science",
                score: "3.8",
                startDate: "2015",
                endDate: "2019"
            }
        ],
        work: [
            {
                name: "Example Corp",
                position: "Software Engineer",
                location: "Example City",
                startDate: "2019",
                endDate: "Present",
                highlights: ["Developed web applications", "Led a team of 5 engineers"]
            }
        ],
        skills: [
            {
                name: "Programming Languages",
                keywords: ["JavaScript", "Python", "Java"]
            },
            {
                name: "Frameworks",
                keywords: ["React", "Node.js", "Django"]
            }
        ],
        projects: [
            {
                name: "Project Alpha",
                description: "A web application for managing tasks.",
                keywords: ["React", "Node.js"],
                url: "https://github.com/johndoe/project-alpha"
            }
        ],
        awards: [
            {
                title: "Best Developer Award",
                summary: "Awarded for outstanding performance in software development.",
                date: "2020",
                awarder: "Example Corp"
            }
        ],
        headings: {
            education: "Education",
            work: "Experience",
            skills: "Skills",
            projects: "Projects",
            awards: "Awards"
        },
        sections: ["profile", "education", "work", "skills", "projects", "awards"]
    })

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        const generatePDF = async () => {
            const { texDoc, opts } = getTemplateData(exampleData);
            const pdfUrl = await latex(texDoc, opts);

            setPdfUrl(pdfUrl);
            console.log(pdfUrl)
        };

        generatePDF();
    }, [exampleData]);


    return (
        <div className=' w-full h-full overflow-hidden relative flex flex-col justify-end items-center'>
            <Navbar shadow={false} fullWidth className="border-0 ">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <div className=' flex items-center divide-x h-full space-x-2'>
                        <Typography color="blue-gray" className="text-lg font-bold">
                            <span className=' text-green-500'>Hey </span>
                            Resume !
                        </Typography>

                        <div className=' w-[1.5px] h-full bg-blue-gray-300'>

                        </div>

                        <div className=' bg-blue-100 rounded-full px-3 py-1'>
                            <Typography color="blue-gray" className="text-md">
                                Basic
                            </Typography>
                        </div>
                    </div>

                    <div className="hidden items-center gap-4 lg:flex">

                        
                    </div>

                </div>

            </Navbar>
            <div className=' w-full h-full bg-green-50 p-2 flex '>
                <div className=' w-full h-full bg-white '>

                </div>
                <div className=' h-full w-4 bg-green-50'></div>
                <div className=' w-full h-full bg-white '>
                    {/* <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>

                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />

                    </Document> */}
                </div>
            </div>

            <div className=' px-10 py-5 bg-white rounded-2xl flex flex-col justify-evenly absolute bottom-2 shadow-2xl border shadow-green-500'>

                <div className=' flex gap-10'>
                    {
                        contentPages.map((item, index) =>
                            <Typography
                                key={index}
                                variant="paragraph"
                                draggable
                                className={`${selectedPage === item ? 'text-green-500' : 'text-blue-gray-700'} flex items-center gap-2 font-medium cursor-pointer hover:text-green-500`} onClick={() => setSelectedPage(item)}
                            >
                                {item}
                            </Typography>
                        )

                    }
                </div>

                <div>

                </div>
            </div>

        </div>
    )
}

export default ResumePage
