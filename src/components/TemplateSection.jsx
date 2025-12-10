import React from 'react'
import premiumIcon from "../assets/premium.png"

function TemplateSection({ exampleData, setExampleData, handleImageClick }) {

  const handleTemplateSelect = (index) => {
    setExampleData(prevState => ({
      ...prevState,
      selectedTemplate: index,
    }));
  }

  return (
    <div className=' w-full h-full grid grid-cols-2 gap-x-4 gap-y-6'>
      {Array(7).fill().map((_, i) => (
        <div key={i} className=' flex flex-col gap-2 items-center relative cursor-pointer group py-3'>

          <img onClick={(e) => handleImageClick(`https://latexresu.me/static/${i + 1}.png`, e)} src={`https://latexresu.me/static/${i + 1}.png`} alt="" className=' cursor-zoom-in border rounded-lg shadow-sm group-hover:shadow-md group-hover:shadow-indigo-600/20  transition-shadow duration-500' />

          <button disabled={(i != 0 && i != 1)} onClick={() => handleTemplateSelect(i + 1)} className={` space-x-2 flex w-fit px-3 py-1 ${exampleData?.selectedTemplate == i + 1 ? ' bg-blue-700/5 text-blue-700  ' : ' group-hover:shadow  text-blue-gray-600'} transition-all duration-500  rounded-lg`}>
            <p> Template {i + 1}</p>
            {(i != 0 && i != 1) && <img src={premiumIcon} alt="" className=' w-6 h-6 ' />}
          </button >


        </div>
      ))}
    </div>
  )
}

export default TemplateSection
