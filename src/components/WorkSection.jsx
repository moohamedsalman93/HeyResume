
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react'
import DatePicker from './DatePicker';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';


function WorkSection({ exampleData, setExampleData }) {
  const [noofContent, setNoofContent] = useState(1);
  const [isPresent, setIsPresent] = useState([])


  useEffect(() => {
    const presentStatus = exampleData.work.map(edu => edu.endDate === "present");
    setIsPresent(presentStatus);
    setNoofContent(exampleData.work.length);
  }, [exampleData]);


  const handleInputChange = (field, index) => (e) => {
    setExampleData(prevState => {
      const updatedEducation = [...prevState.work];
      updatedEducation[index][field] = e.target.value; // Update specific field
      return {
        ...prevState,
        work: updatedEducation,
      };
    });
  };

  //x is outer loop and y is inner loop 
  //x is exampleData.work[] loop and y is exampleData.work.highlights loop[]

  const handleTextareaChange = (x,y) => (e) => {
    setExampleData(prevState => {
      const updatedWork = [...prevState.work];
      updatedWork[x].highlights[y] = e.target.value;
      return {
        ...prevState,
        work: updatedWork,
      };
    });
  };

  const handleAddEducation = () => {
    setExampleData(prevState => ({
      ...prevState,
      work: [...prevState.work, { name: '', position: '', location: '', startDate: '', endDate: '', highlights: [""] }]
    }));
  };

  const handleAddHighlights = (index) => {
    setExampleData(prevState => {
      const updatedWork = [...prevState.work];
      updatedWork[index]?.highlights?.push('');
      return {
        ...prevState,
        work: updatedWork,
      };
    });
  }

  const handleRemoveEducation = (index) => {
    setExampleData(prevState => {
      const updatedEducation = prevState.work.filter((_, i) => i !== index);
      return {
        ...prevState,
        work: updatedEducation,
      };
    });
    setNoofContent(noofContent - 1); // Decrease the count of education entries
  };

  const handleRemoveHighlights = (x, y) => {
    setExampleData(prevState => {
      const updatedHighlights = prevState.work[x].highlights.filter((_, i) => i !== y);
      return {
        ...prevState,
        work: prevState.work.map((workItem, index) =>
          index === x ? { ...workItem, highlights: updatedHighlights } : workItem // Update specific work item
        ),
      };
    });
  };


  const handleCheck = (index) => {
    handleInputChange("endDate", index)({ target: { value: isPresent[index] ? '' : 'present' } })
  }

  return (
    <div className=' w-full h-full py-6 px-2 flex flex-col gap-4 '>

      {Array(noofContent).fill().map((_, i) => (
        <div key={i} className={` grid grid-cols-2 gap-10  p-4 border rounded-md  py-4 bg-white shadow-lg`}>

          <div className=' h-10 w-full border-b flex justify-between items-center col-span-2'>
            <Typography
              variant="h6"
              className='text-blue-gray-700'
            >
              Experience {i + 1}
            </Typography>

            <div className=' w-fit flex gap-4 h-full'>
              {noofContent == i + 1 &&
                < Button variant="outlined" color='green' className=' h-7 items-center flex' onClick={handleAddEducation}>
                  add
                </Button>
              }

              {noofContent != 1 &&
                <Button onClick={() => handleRemoveEducation(i)} variant="outlined" className=' h-7 items-center flex' color='red'>
                  remove
                </Button>
              }
            </div>

          </div>

          <Input
            variant="static"
            label="Company Name"
            placeholder="Google"
            value={exampleData.work[i]?.name}
            onChange={handleInputChange('name', i)}

          />
          <Input
            variant="static"
            label="Job Title"
            placeholder="Software Engineer"
            value={exampleData.work[i]?.position}
            onChange={handleInputChange('position', i)}
          />
          <Input
            variant="static"
            label="Job Location"
            placeholder="Mountain View, CA"
            value={exampleData.work[i]?.location}
            onChange={handleInputChange('location', i)}
          />


          <div className='  flex justify-evenly col-span-2'>
            <DatePicker isDisable={false} key={1} title={"Start Date"} date={exampleData.work[i]?.startDate || 'Jan-2014'} handleInputChange={handleInputChange} field={"startDate"} index={i} />
            <div >
              <DatePicker key={2} isDisable={isPresent[i]} title={"End Date"} date={exampleData.work[i]?.endDate || 'Jan-2014'} handleInputChange={handleInputChange} field={"endDate"} index={i} />
              <div className='flex justify-start gap-2 items-center'>
                <Checkbox checked={isPresent[i]} onChange={() => handleCheck(i)} />
                <Typography className=' text-[#475c66] text-sm'>
                  Present
                </Typography>
              </div>
            </div>
          </div>

          <div className=' mb-4 flex flex-col gap-4 col-span-2 w-[20rem]'>
            <Typography className=" text-[#a2a2a2] text-sm font-normal">
              Highlights
            </Typography>
            {exampleData.work[i]?.highlights?.map((item, index) =>
              <div key={index} className=' flex items-center gap-2 w-full '>
                <textarea value={item} onChange={ handleTextareaChange(i, index)} className=' p-1 text-sm !h-[3rem]  min-w-[19rem] transition-transform duration-500 border rounded-md text-[#475c66] border-[#b0bec5]' />
                <div className=' flex gap-2'>

                  {exampleData.work[i]?.highlights.length !== 1 &&
                    <MinusIcon onClick={() => handleRemoveHighlights(i, index)} className='w-6 h-6 cursor-pointer border-blue-gray-700 text-blue-gray-700 border hover:border-red-500 hover:text-red-500 rounded-full' />
                  }
                  {exampleData.work[i]?.highlights.length == index + 1 &&
                    <PlusIcon onClick={() => handleAddHighlights(i)} className='w-6 h-6 cursor-pointer text-green-700 hover:text-green-100 hover:border-green-100 border border-green-700 rounded-full' />

                  }
                </div>
              </div>)

            }
          </div>
        </div>
      ))
      }
    </div >
  )
}

export default WorkSection
