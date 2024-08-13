
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

function SkillsSection({ exampleData, setExampleData }) {
  const [noofContent, setNoofContent] = useState(1);

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
        <div key={i} className={` grid grid-cols-2 gap-10  p-4 border rounded-md  py-4 bg-white shadow-lg`}>

          <div className=' h-10 w-full border-b flex justify-between items-center col-span-2'>
            <Typography
              variant="h6"
              className='text-blue-gray-700'
            >
              Skill {i + 1}
            </Typography>

            <div className=' w-fit flex gap-4 h-full'>


              {noofContent != 1 &&
                <Button onClick={() => handleRemoveskills(i)} variant="outlined" className=' h-7 items-center flex' color='red'>
                  remove
                </Button>
              }
            </div>

          </div>

          <Input
            variant="static"
            label="Skill Title"
            placeholder="Framework"
            value={exampleData.skills[i]?.name}
            onChange={handleInputChange('name', i)}

          />


          <div className=' mb-4 flex flex-col gap-4 col-span-2 w-[20rem]'>
            <Typography className=" text-[#a2a2a2] text-sm font-normal">
              Skills
            </Typography>
            {exampleData.skills[i]?.keywords?.map((item, index) =>
              <div key={index} className=' flex items-center gap-2 w-full '>
                <textarea value={item} onChange={handleTextareaChange(i, index)} className=' p-1 text-sm !h-[3rem]  min-w-[19rem] transition-transform duration-500 border rounded-md text-[#475c66] border-[#b0bec5]' />
                <div className=' flex gap-2'>

                  {exampleData.skills[i]?.keywords.length !== 1 &&
                    <MinusIcon onClick={() => handleRemovekeywords(i, index)} className='w-6 h-6 cursor-pointer border-blue-gray-700 text-blue-gray-700 border hover:border-red-500 hover:text-red-500 rounded-full' />
                  }
                  {exampleData.skills[i]?.keywords.length == index + 1 &&
                    <PlusIcon onClick={() => handleAddkeywords(i)} className='w-6 h-6 cursor-pointer text-green-700 hover:text-green-100 hover:border-green-100 border border-green-700 rounded-full' />

                  }
                </div>
              </div>)

            }
          </div>

          <div className=' col-span-2 w-full flex justify-center items-center'>
            {noofContent == i + 1 &&
              < Button variant="outlined" color='green' className=' h-7 items-center flex  ' onClick={handleAddskills}>
                Add another
              </Button>
            }
          </div>

        </div>
      ))
      }
    </div >
  )
}

export default SkillsSection



