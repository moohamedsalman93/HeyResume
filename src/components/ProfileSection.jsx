import React, { useState } from 'react'
import Input from './ui/Input';
import Typography from './ui/Typography';
import { twMerge } from 'tailwind-merge';

function ProfileSection({ exampleData, setExampleData }) {


  const handleInputChange = (field) => (e) => {
    setExampleData(prevState => ({
      ...prevState,
      basics: {
        ...prevState?.basics,
        [field]: e.target.value
      }
    }));
  };

  return (
    <div className=' w-full h-full p-6 flex flex-col gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          placeholder="e.g. John Smith"
          value={exampleData?.basics?.name}
          onChange={handleInputChange('name')}
        />
        <Input
          label="Email Address"
          placeholder="e.g. john.doe@example.com"
          value={exampleData?.basics?.email}
          onChange={handleInputChange('email')}
        />
        <Input
          label="Phone Number"
          placeholder="e.g. +1 (123) 456-7890"
          value={exampleData?.basics?.phone}
          onChange={handleInputChange('phone')}
        />
        <Input
          label="Address / Location"
          placeholder="e.g. New York, USA"
          value={exampleData?.basics?.address}
          onChange={handleInputChange('address')}
        />
        <Input
          label="Portfolio / Website"
          placeholder="e.g. https://yourwebsite.com"
          value={exampleData?.basics?.website}
          onChange={handleInputChange('website')}
          className="md:col-span-2"
        />
      </div>

      <div className='flex flex-col gap-3'>
        <Typography variant="small" className="font-bold text-gray-700 uppercase tracking-wider ml-1">
          Professional Summary
        </Typography>
        <textarea
          placeholder="Briefly describe your professional background and key achievements..."
          value={exampleData?.basics?.summary}
          onChange={handleInputChange('summary')}
          className='w-full p-4 text-sm min-h-[10rem] bg-gray-50 border border-transparent rounded-2xl text-gray-600 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none'
        />
      </div>
    </div>
  )
}

export default ProfileSection
