import React, { useEffect, useState } from 'react'
import Button from './ui/Button';
import Input from './ui/Input';
import Typography from './ui/Typography';
import Card, { CardBody } from './ui/Card';
import IconButton from './ui/IconButton';
import DatePicker from './DatePicker';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';



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
        <Card key={i} className="overflow-hidden border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardBody className="p-0">
            <div className=' px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center'>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                  <PlusIcon className=" h-4 w-4" />
                </div>
                <Typography variant="h6" className='text-gray-900'>
                  Award & Achievement
                </Typography>
              </div>

              <IconButton
                variant="ghost"
                color="red"
                onClick={() => handleRemoveAward(i)}
                className="h-8 w-8"
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Title"
                placeholder="e.g. Employee of the Month"
                value={exampleData.awards[i]?.title}
                onChange={handleInputChange('title', i)}
              />
              <Input
                label="Awarder / Organization"
                placeholder="e.g. Google"
                value={exampleData.awards[i]?.awarder}
                onChange={handleInputChange('awarder', i)}
              />

              <div className='md:col-span-2'>
                <DatePicker
                  title="Date Received"
                  date={exampleData.awards[i]?.date}
                  handleInputChange={handleInputChange}
                  field="date"
                  index={i}
                />
              </div>

              <div className='flex flex-col gap-2 md:col-span-2'>
                <Typography variant="small" className="font-bold text-gray-700 uppercase tracking-wider">
                  Summary
                </Typography>
                <textarea
                  placeholder="Describe the award and your achievement..."
                  value={exampleData.awards[i]?.summary}
                  onChange={handleInputChange('summary', i)}
                  className='w-full p-3 text-sm min-h-[7rem] bg-gray-50 border border-transparent rounded-xl text-gray-600 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none'
                />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}

      <div className='flex justify-center py-4'>
        <Button
          variant="outline"
          onClick={handleAddAward}
          className="group border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          {noofContent === 0 ? "Add First Award" : "Add Another Award"}
        </Button>
      </div>
    </div >
  )
}

export default AwardSection
