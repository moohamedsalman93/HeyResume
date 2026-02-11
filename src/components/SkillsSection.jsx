import React, { useEffect, useState } from 'react'
import Button from './ui/Button';
import Input from './ui/Input';
import Typography from './ui/Typography';
import Card, { CardBody } from './ui/Card';
import IconButton from './ui/IconButton';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

function SkillsSection({ exampleData, setExampleData }) {
  const [noofContent, setNoofContent] = useState(0);

  useEffect(() => {
    setNoofContent(exampleData?.skills?.length);
  }, [exampleData]);


  const handleInputChange = (field, index) => (e) => {
    setExampleData(prevState => {
      const updatedskills = [...prevState.skills];
      updatedskills[index][field] = e.target.value; // Update specific field
      return {
        ...prevState,
        skills: updatedskills,
      };
    });
  };

  //x is outer loop and y is inner loop 
  //x is exampleData.skills[] loop and y is exampleData.skills.keywords loop[]

  const handleTextareaChange = (x, y) => (e) => {
    setExampleData(prevState => {
      const updatedskills = [...prevState.skills];
      updatedskills[x].keywords[y] = e.target.value;
      return {
        ...prevState,
        skills: updatedskills,
      };
    });
  };

  const handleAddskills = () => {
    setExampleData(prevState => ({
      ...prevState,
      skills: [...prevState.skills, { name: '', keywords: [""] }]
    }));
  };

  const handleAddkeywords = (index) => {
    setExampleData(prevState => {
      const updatedskills = [...prevState.skills];
      updatedskills[index]?.keywords?.push('');
      return {
        ...prevState,
        skills: updatedskills,
      };
    });
  }

  const handleRemoveskills = (index) => {
    setExampleData(prevState => {
      const updatedskills = prevState.skills.filter((_, i) => i !== index);
      return {
        ...prevState,
        skills: updatedskills,
      };
    });
  };

  const handleRemovekeywords = (x, y) => {
    setExampleData(prevState => {
      const updatedkeywords = prevState.skills[x].keywords.filter((_, i) => i !== y);
      return {
        ...prevState,
        skills: prevState.skills.map((skillsItem, index) =>
          index === x ? { ...skillsItem, keywords: updatedkeywords } : skillsItem // Update specific work item
        ),
      };
    });
  };


  return (
    <div className=' w-full h-full py-6 px-2 flex flex-col gap-4 '>

      {Array(noofContent).fill().map((_, i) => (
        <Card key={i} className="overflow-hidden border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardBody className="p-0">
            <div className=' px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center'>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <Typography variant="h6" className='text-gray-900'>
                  Skill Group
                </Typography>
              </div>

              <IconButton
                variant="ghost"
                color="red"
                onClick={() => handleRemoveskills(i)}
                className="h-8 w-8"
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <Input
                label="Skill Title"
                placeholder="e.g. Frameworks, Languages"
                value={exampleData.skills[i]?.name}
                onChange={handleInputChange('name', i)}
              />

              <div className='flex flex-col gap-4'>
                <Typography variant="small" className="font-bold text-gray-700 uppercase tracking-wider">
                  Skill Keywords
                </Typography>

                <div className="flex flex-wrap gap-4">
                  {exampleData.skills[i]?.keywords?.map((item, index) => (
                    <div key={index} className='flex items-center gap-2 group/item bg-gray-50 p-2 rounded-xl border border-gray-100 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all'>
                      <input
                        value={item}
                        placeholder="e.g. React"
                        onChange={handleTextareaChange(i, index)}
                        className='bg-transparent outline-none text-sm font-medium text-gray-700 w-24 focus:w-32 transition-all'
                      />
                      <div className='flex items-center gap-1'>
                        {exampleData.skills[i]?.keywords.length !== 1 && (
                          <IconButton
                            variant="ghost"
                            color="red"
                            onClick={() => handleRemovekeywords(i, index)}
                            className="h-6 w-6"
                          >
                            <MinusIcon className='w-3 h-3' />
                          </IconButton>
                        )}
                        {exampleData.skills[i]?.keywords.length === index + 1 && (
                          <IconButton
                            variant="ghost"
                            color="blue"
                            onClick={() => handleAddkeywords(i)}
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
          onClick={handleAddskills}
          className="group border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          {noofContent === 0 ? "Add First Skill Group" : "Add Another Skill Group"}
        </Button>
      </div>
    </div >
  )
}

export default SkillsSection



