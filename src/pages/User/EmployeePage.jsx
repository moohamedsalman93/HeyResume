import LaTeXRenderer from "../../lib/LaTeXRenderer";



function EmployeePage() {

    const exampleData = {
        selectedTemplate: 'TEMPLATE1',
        basics: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            location: { address: "123 Main St, Anytown, USA" },
            website: "https://johndoe.com"
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
    };

    return (
        <div className=" w-full h-full bg-blue-gray-200">
            <LaTeXRenderer data={exampleData} />
        </div>
    );
};

export default EmployeePage
