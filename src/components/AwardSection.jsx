
import React, { useEffect, useState } from 'react'
import { Button, Input, Typography } from '@material-tailwind/react'
import DatePicker from './DatePicker';
import { TrashIcon } from '@heroicons/react/24/outline';



function AwardSection({ exampleData, setExampleData }) {
  const [noofContent, setNoofContent] = useState(0);



  useEffect(() => {
    setNoofContent(exampleData.awards.length);
  }, [exampleData]);


  const handleInputChange = (field, index) => (e) => {
    setExampleData(prevState => {
      const updatedAward = [...prevState.awards];
      updatedAward[index][field] = e.target.value; // Update specific field
      return {
        ...prevState,
        awards: updatedAward,
      };
    });
  };

  const handleAddAward = () => {
    setExampleData(prevState => ({
      ...prevState,
      awards: [...prevState.awards, { title: '', awarder: '', date: '', summary: '' }]
    }));
  };


  const handleRemoveAward = (index) => {
    setExampleData(prevState => {
      const updatedAward = prevState.awards.filter((_, i) => i !== index);
      return {
        ...prevState,
        awards: updatedAward,
      };
    });
  };


  return (
    <div className=' w-full h-full py-6 px-2 flex flex-col gap-4 '>

      {Array(noofContent).fill().map((_, i) => (
        <div key={i} className={` grid grid-cols-2 gap-10  p-4 border rounded-md  py-4 bg-white shadow-lg min-h-[30rem]`}>

          <div className=' h-10 w-full border-b flex justify-between items-center col-span-2'>
            <Typography
              variant="h6"
              className='text-blue-gray-700'
            >
              Award and Acheivement {i + 1}
            </Typography>

            <div className=' w-fit flex gap-4 h-full'>

              <Button onClick={() => handleRemoveAward(i)} variant="outlined" className=' h-7 items-center flex' color='red'>
                remove
              </Button>
              {/* <TrashIcon onClick={() => handleRemoveAward(i)} className=' w-6 h-6 text-red-200 cursor-pointer hover:text-red-500 transition-colors duration-700'/> */}

            </div>

          </div>

          <Input
            variant="static"
            label="Title"
            placeholder=""
            value={exampleData.awards[i]?.title}
            onChange={handleInputChange('title', i)}

          />
          <Input
            variant="static"
            label="Provider"
            placeholder="Software Engineer"
            value={exampleData.awards[i]?.awarder}
            onChange={handleInputChange('awarder', i)}
          />




          <div className='col-span-2  flex justify-between'>
            <div className=' flex flex-col gap-1 justify-start  '>
              <Typography className=" text-[#a2a2a2] text-sm font-normal">
                Summary
              </Typography>

              <div className=' flex items-center gap-2 w-full '>
                <textarea placeholder="Resume maker is an web application , which helps to create ATS resume " value={exampleData.awards[i]?.summary} onChange={handleInputChange('summary', i)} className=' p-1 text-sm  min-h-[7rem]    w-[25rem] transition-transform duration-500 border rounded-md text-[#475c66] border-[#b0bec5]' />

              </div>
            </div>
            <DatePicker isDisable={false} key={1} title={"Date"} date={exampleData.awards[i]?.date || 'Jan-2024'} handleInputChange={handleInputChange} field={"date"} index={i} />
          </div>

          <div className=' col-span-2 w-full flex justify-center items-center'>
            {noofContent == i + 1 &&
              < Button variant="outlined" color='green' className=' h-7 items-center flex  ' onClick={handleAddAward}>
                Add another
              </Button>
            }
          </div>

        </div>
      ))
      }
      {noofContent == 0 &&
        <div className=' col-span-2 w-full flex justify-center items-center'>
          
            < Button variant="outlined" color='green' className=' h-7 items-center flex  ' onClick={handleAddAward}>
              Add Award
            </Button>
          
        </div>
      }
    </div >
  )
}

export default AwardSection
