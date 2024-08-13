import { Input, Textarea } from '@material-tailwind/react'
import React, { useState } from 'react'

function ProfileSection({ exampleData, setExampleData }) {

  
  const handleInputChange = (field) => (e) => {
    setExampleData(prevState => ({
      ...prevState,
      basics: {
        ...prevState.basics,
        [field]: e.target.value
      }
    }));
  };

  return (
    <div className=' w-full h-full p-10 flex flex-col gap-10'>

      <Input
        variant="static"
        label="Full Name"
        placeholder="John Smith"
        value={exampleData.basics.name}
        onChange={handleInputChange('name')}
      />
      <Input
        variant="static"
        label="Email"
        placeholder="john.doe@example.com"
        value={exampleData.basics.email}
        onChange={handleInputChange('email')}
      />
      <Input
        variant="static"
        label="Phone Number"
        placeholder="123-456-7890"
        value={exampleData.basics.phone}
        onChange={handleInputChange('phone')}
      />
      <Input
        variant="static"
        label="Address"
        placeholder="123 Main St, Anytown, USA"
        value={exampleData.basics.address}
        onChange={handleInputChange('address')}
      />
      <Input
        variant="static"
        label="Link"
        placeholder="https://johndoe.com"
        value={exampleData.basics.website}
        onChange={handleInputChange('website')}
      />
      <Textarea
        variant="static"
        label="Summary"
        placeholder="Write the summary here"
        className='h-[5rem]'
        value={exampleData.basics.summary}
        onChange={handleInputChange('summary')}
      />

    </div>
  )
}

export default ProfileSection
