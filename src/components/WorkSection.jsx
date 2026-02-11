import React, { useEffect, useState } from 'react'
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import Input from './ui/Input';
import Typography from './ui/Typography';
import Card, { CardBody } from './ui/Card';
import IconButton from './ui/IconButton';
import DatePicker from './DatePicker';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';


function WorkSection({ exampleData, setExampleData }) {
  const [noofContent, setNoofContent] = useState(0);
  const [isPresent, setIsPresent] = useState([])


  useEffect(() => {
    const presentStatus = exampleData.work.map(edu => edu.endDate === "present");
    setIsPresent(presentStatus);
    setNoofContent(exampleData.work.length);
  }, [exampleData]);


  const handleInputChange = (field, index) => (e) => {
    setExampleData(prevState => {
      const updatedEducation = [...prevState.work];
      updatedEducation[index][field] = e.target.value;
      return {
        ...prevState,
        work: updatedEducation,
      };
    });
  };

  const handleTextareaChange = (x, y) => (e) => {
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
    setNoofContent(noofContent - 1);
  };

  const handleRemoveHighlights = (x, y) => {
    setExampleData(prevState => {
      const updatedHighlights = prevState.work[x].highlights.filter((_, i) => i !== y);
      return {
        ...prevState,
        work: prevState.work.map((workItem, index) =>
          index === x ? { ...workItem, highlights: updatedHighlights } : workItem
        ),
      };
    });
  };


  const handleCheck = (index) => {
    handleInputChange("endDate", index)({ target: { value: isPresent[index] ? '' : 'present' } })
  }

  return (
    <div className=' w-full h-full py-6 md:px-2 flex flex-col gap-4 '>

      {Array(noofContent).fill().map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardBody className="p-0">
            <div className='px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] flex justify-between items-center'>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
                  {i + 1}
                </div>
                <Typography variant="h6" className='text-slate-200'>
                  Experience
                </Typography>
              </div>

              <IconButton
                variant="ghost"
                color="red"
                onClick={() => handleRemoveEducation(i)}
                className="h-8 w-8"
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company Name"
                placeholder="e.g. Google"
                value={exampleData.work[i]?.name}
                onChange={handleInputChange('name', i)}
              />
              <Input
                label="Job Title"
                placeholder="e.g. Software Engineer"
                value={exampleData.work[i]?.position}
                onChange={handleInputChange('position', i)}
              />
              <Input
                label="Job Location"
                placeholder="e.g. Mountain View, CA"
                value={exampleData.work[i]?.location}
                onChange={handleInputChange('location', i)}
                className="md:col-span-2"
              />

              <div className='flex flex-wrap gap-6 md:col-span-2'>
                <DatePicker
                  title="Start Date"
                  date={exampleData.work[i]?.startDate}
                  handleInputChange={handleInputChange}
                  field="startDate"
                  index={i}
                />
                <div className="flex flex-col gap-2">
                  <DatePicker
                    isDisable={isPresent[i]}
                    title="End Date"
                    date={exampleData.work[i]?.endDate}
                    handleInputChange={handleInputChange}
                    field="endDate"
                    index={i}
                  />
                  <Checkbox
                    label="I currently work here"
                    checked={isPresent[i]}
                    onChange={() => handleCheck(i)}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-4 md:col-span-2'>
                <div className="flex items-center justify-between">
                  <Typography variant="small" className="font-bold text-slate-400 uppercase tracking-wider">
                    Highlights & Achievements
                  </Typography>
                </div>

                <div className="flex flex-col gap-3">
                  {exampleData.work[i]?.highlights?.map((item, index) => (
                    <div key={index} className='flex gap-3 group/item'>
                      <div className="flex-1">
                        <textarea
                          value={item}
                          placeholder="Describe your impact..."
                          onChange={handleTextareaChange(i, index)}
                          className='w-full p-3 text-sm min-h-[5rem] bg-white/5 border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-600 focus:bg-white/[0.07] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none'
                        />
                      </div>
                      <div className='flex flex-col gap-2 pt-1 opacity-0 group-hover/item:opacity-100 transition-opacity'>
                        {exampleData.work[i]?.highlights.length !== 1 && (
                          <IconButton
                            variant="ghost"
                            color="red"
                            onClick={() => handleRemoveHighlights(i, index)}
                            className="h-8 w-8"
                          >
                            <MinusIcon className='w-4 h-4' />
                          </IconButton>
                        )}
                        {exampleData.work[i]?.highlights.length === index + 1 && (
                          <IconButton
                            variant="ghost"
                            color="blue"
                            onClick={() => handleAddHighlights(i)}
                            className="h-8 w-8"
                          >
                            <PlusIcon className='w-4 h-4' />
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
          onClick={handleAddEducation}
          className="group border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          {noofContent === 0 ? "Add First Experience" : "Add Another Experience"}
        </Button>
      </div>
    </div >
  )
}

export default WorkSection
