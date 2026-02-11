import React, { useEffect, useState } from 'react'
import Button from './ui/Button';
import Input from './ui/Input';
import Typography from './ui/Typography';
import Card, { CardBody } from './ui/Card';
import IconButton from './ui/IconButton';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';



function ProjectSection({ exampleData, setExampleData }) {
  const [noofContent, setNoofContent] = useState(0);
  const [isPresent, setIsPresent] = useState([])


  useEffect(() => {
    setNoofContent(exampleData.projects.length);
  }, [exampleData]);


  const handleInputChange = (field, index) => (e) => {
    setExampleData(prevState => {
      const updatedProjects = [...prevState.projects];
      updatedProjects[index][field] = e.target.value;
      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  };

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
          index === x ? { ...projectsItem, keywords: updatedKeywords } : projectsItem
        ),
      };
    });
  };

  return (
    <div className=' w-full h-full py-6 px-2 flex flex-col gap-4 '>

      {Array(noofContent).fill().map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardBody className="p-0">
            <div className='px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] flex justify-between items-center'>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-violet-500/20">
                  {i + 1}
                </div>
                <Typography variant="h6" className='text-slate-200'>
                  Project
                </Typography>
              </div>

              <IconButton
                variant="ghost"
                color="red"
                onClick={() => handleRemoveProject(i)}
                className="h-8 w-8"
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Project Name"
                placeholder="e.g. Resume Maker"
                value={exampleData.projects[i]?.name}
                onChange={handleInputChange('name', i)}
              />
              <Input
                label="Project Link"
                placeholder="e.g. https://github.com/..."
                value={exampleData.projects[i]?.url}
                onChange={handleInputChange('url', i)}
              />

              <div className='flex flex-col gap-2 md:col-span-2'>
                <Typography variant="small" className="font-bold text-slate-400 uppercase tracking-wider">
                  Description
                </Typography>
                <textarea
                  placeholder="Describe your project, features, and impact..."
                  value={exampleData.projects[i]?.description}
                  onChange={handleInputChange('description', i)}
                  className='w-full p-3 text-sm min-h-[8rem] bg-white/5 border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-600 focus:bg-white/[0.07] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none'
                />
              </div>

              <div className='flex flex-col gap-4 md:col-span-2'>
                <Typography variant="small" className="font-bold text-slate-400 uppercase tracking-wider">
                  Tools & Technologies
                </Typography>

                <div className="flex flex-wrap gap-4">
                  {exampleData.projects[i]?.keywords?.map((item, index) => (
                    <div key={index} className='flex items-center gap-2 group/item bg-white/5 p-2 rounded-xl border border-white/10 focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10 transition-all'>
                      <input
                        value={item}
                        placeholder="e.g. React"
                        onChange={handleKeywordChange(i, index)}
                        className='bg-transparent outline-none text-sm font-medium text-slate-200 placeholder:text-slate-600 w-24 focus:w-32 transition-all'
                      />
                      <div className='flex items-center gap-1'>
                        {exampleData.projects[i]?.keywords.length !== 1 && (
                          <IconButton
                            variant="ghost"
                            color="red"
                            onClick={() => handleRemoveKeywords(i, index)}
                            className="h-6 w-6"
                          >
                            <MinusIcon className='w-3 h-3' />
                          </IconButton>
                        )}
                        {exampleData.projects[i]?.keywords.length === index + 1 && (
                          <IconButton
                            variant="ghost"
                            color="blue"
                            onClick={() => handleAddKeywords(i)}
                            className="h-6 w-6"
                          >
                            <PlusIcon className='w-3 h-3' />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}

      <div className='flex justify-center py-4'>
        <Button
          variant="outline"
          onClick={handleAddProjects}
          className="group border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          {noofContent === 0 ? "Add First Project" : "Add Another Project"}
        </Button>
      </div>
    </div >
  )


}

export default ProjectSection
