import { Input } from '@material-tailwind/react'
import React from 'react'

function ProfileSection({ exampleData, setExampleData}) {
  return (
    <div className=' w-full h-full p-10 flex flex-col gap-10'>
      <div >
        <Input variant="static" label="Full Name" placeholder="John Smith" value={exampleData.basics.name} />
      </div>
      <div >
        <Input variant="static" label="Email" placeholder="john.doe@example.com" />
      </div>
      <div >
        <Input variant="static" label="Phone Number" placeholder="123-456-7890" />
      </div>
      <div >
        <Input variant="static" label="Address" placeholder="123 Main St, Anytown, USA" />
      </div>
      <div >
        <Input variant="static" label="Link" placeholder="https://johndoe.com" />
      </div>

    </div>
  )
}

export default ProfileSection
