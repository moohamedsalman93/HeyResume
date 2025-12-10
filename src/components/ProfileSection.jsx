import { Input, Textarea, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'

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
    <div className=' w-full h-full md:p-10 flex flex-col gap-10'>

      <Input
        variant="static"
        label="Full Name"
        placeholder="John Smith"
        value={exampleData?.basics?.name}
        onChange={handleInputChange('name')}
      />
      <Input
        variant="static"
        label="Email"
        placeholder="john.doe@example.com"
        value={exampleData?.basics?.email}
        onChange={handleInputChange('email')}
      />
      <Input
        variant="static"
        label="Phone Number"
        placeholder="123-456-7890"
        value={exampleData?.basics?.phone}
        onChange={handleInputChange('phone')}
      />
      <Input
        variant="static"
        label="Address"
        placeholder="123 Main St, Anytown, USA"
        value={exampleData?.basics?.address}
        onChange={handleInputChange('address')}
      />
      <Input
        variant="static"
        label="Link"
        placeholder="https://johndoe.com"
        value={exampleData?.basics?.website}
        onChange={handleInputChange('website')}
      />


      <div className=' flex flex-col gap-4 justify-start col-span-2 '>
        <Typography className=" text-[#a2a2a2] text-sm font-normal">
          Summary
        </Typography>

        <div className=' flex items-center gap-2 w-full '>
          <textarea placeholder="Write the summary here " value={exampleData?.basics?.summary} onChange={handleInputChange('summary')} className=' p-1 text-sm  min-h-[8rem]   w-full overflow-hidden transition-transform duration-500 border rounded-md text-[#475c66] border-[#b0bec5]' />
        </div>
      </div>

    </div>
  )
}

export default ProfileSection
