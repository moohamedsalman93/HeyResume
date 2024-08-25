import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react'
import DatePicker from './DatePicker';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';



function ProjectSection({ exampleData, setExampleData }) {
  const [noofContent, setNoofContent] = useState(0);
  const [isPresent, setIsPresent] = useState([])


  useEffect(() => {
    setNoofContent(exampleData.projects.length);
  }, [exampleData]);


  const handleInputChange = (field, index) => (e) => {
    setExampleData(prevState => {
      const updatedProjects = [...prevState.projects];
      updatedProjects[index][field] = e.target.value; // Update specific field
      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  };

  //x is outer loop and y is inner loop 
  //x is exampleData.projects[] loop and y is exampleData.projects.keywords loop[]

  const handleKeywordChange = (x, y) => (e) => {
    setExampleData(prevState => {
      const updatedprojects = [...prevState.projects];
      updatedprojects[x].keywords[y] = e.target.value;
      return {
        ...prevState,
        projects: updatedprojects,
      };
    });
  };

  const handleAddProjects = () => {
    setExampleData(prevState => ({
      ...prevState,
      projects: [...prevState.projects, { name: '', url: '', description: '', keywords: [""] }]
    }));
  };

  const handleAddKeywords = (index) => {
    setExampleData(prevState => {
      const updatedprojects = [...prevState.projects];
      updatedprojects[index]?.keywords?.push('');
      return {
        ...prevState,
        projects: updatedprojects,
      };
    });
  }

  const handleRemoveProject = (index) => {
    setExampleData(prevState => {
      const updatedProject = prevState?.projects?.filter((_, i) => i !== index);
      return {
        ...prevState,
        projects: updatedProject,
      };
    });
  };

  const handleRemoveKeywords = (x, y) => {
    setExampleData(prevState => {
      const updatedKeywords = prevState.projects[x].keywords.filter((_, i) => i !== y);
      return {
        ...prevState,
        projects: prevState.projects.map((projectsItem, index) =>
          index === x ? { ...projectsItem, keywords: updatedKeywords } : projectsItem // Update specific projects item
        ),
      };
    });
  };

  return (
    <div className=' w-full h-full py-6 px-2 flex flex-col gap-4 '>

      {Array(noofContent).fill().map((_, i) => (
        <div key={i} className={` flex flex-col md:grid grid-cols-2 gap-10  p-4 border rounded-md  py-4 bg-white shadow-lg`}>

          <div className=' h-10 w-full border-b flex justify-between items-center col-span-2'>
            <Typography
              variant="h6"
              className='text-blue-gray-700'
            >
              Project {i + 1}
            </Typography>

            <div className=' w-fit flex gap-4 h-full'>



              <Button onClick={() => handleRemoveProject(i)} variant="outlined" className=' h-7 items-center flex' color='red'>
                remove
              </Button>

            </div>

          </div>

          <Input
            variant="static"
            label="Project Name"
            placeholder="Resume Maker"
            value={exampleData.projects[i]?.name}
            onChange={handleInputChange('name', i)}

          />




          <Input
            variant="static"
            label="Project Link"
            placeholder="https://github.com"
            value={exampleData.projects[i]?.url}
            onChange={handleInputChange('url', i)}
          />

          <div className=' flex flex-col gap-4 justify-start col-span-2 '>
            <Typography className=" text-[#a2a2a2] text-sm font-normal">
              Description
            </Typography>

            <div className=' flex items-center gap-2 w-full '>
              <textarea placeholder="Resume maker is an web application , which helps to create ATS resume " value={exampleData.projects[i]?.description} onChange={handleInputChange('description', i)} className=' p-1 text-sm  min-h-[8rem]   w-full overflow-hidden transition-transform duration-500 border rounded-md text-[#475c66] border-[#b0bec5]' />
            </div>
          </div>

          <div className=' mb-4 flex flex-col gap-4 col-span-2 w-[20rem]'>
            <Typography className=" text-[#a2a2a2] text-sm font-normal">
              Tools Used
            </Typography>
            {exampleData.projects[i]?.keywords?.map((item, index) =>
              <div key={index} className=' flex items-center gap-2  ml-4'>
                <div className=' max-w-[19rem]'>
                  <Input
                    variant="static"

                    placeholder="Reactjs"
                    value={item}
                    onChange={handleKeywordChange(i, index)}
                    className=' '
                  />
                </div>
                <div className='flex gap-2'>

                  {exampleData.projects[i]?.keywords.length !== 1 &&
                    <MinusIcon onClick={() => handleRemoveKeywords(i, index)} className='w-6 h-6 cursor-pointer border-blue-gray-700 text-blue-gray-700 border hover:border-red-500 hover:text-red-500 rounded-full' />
                  }
                  {exampleData.projects[i]?.keywords.length == index + 1 &&
                    <PlusIcon onClick={() => handleAddKeywords(i)} className='w-6 h-6 cursor-pointer text-green-700 hover:text-green-100 hover:border-green-100 border border-green-700 rounded-full' />

                  }
                </div>
              </div>)

            }
          </div>

          <div className=' col-span-2 w-full flex justify-center items-center'>
            {noofContent == i + 1 &&
              < Button variant="outlined" color='green' className=' h-7 items-center flex  ' onClick={handleAddProjects}>
                Add another
              </Button>
            }
          </div>

        </div>
      ))
      }
      {
        <div className=' col-span-2 w-full flex justify-center items-center'>
          {noofContent == 0 &&
            < Button variant="outlined" color='green' className=' h-7 items-center flex  ' onClick={handleAddProjects}>
              Add Project
            </Button>
          }
        </div>
      }
    </div >
  )


}

export default ProjectSection



