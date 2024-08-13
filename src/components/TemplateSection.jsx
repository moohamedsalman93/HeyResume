import React from 'react'

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
        <div key={i} className=' flex flex-col gap-2 items-center cursor-pointer group py-3'>
          <img onClick={(e) => handleImageClick(`https://latexresu.me/static/${i + 1}.png`, e)} src={`https://latexresu.me/static/${i + 1}.png`} alt="" className=' cursor-zoom-in border rounded-lg shadow-sm group-hover:shadow-md group-hover:shadow-green-100 transition-shadow duration-500' />

          <div onClick={()=>handleTemplateSelect(i + 1)} className={` w-fit px-3 py-1 ${exampleData?.selectedTemplate == i + 1 ? ' bg-green-100 ' : ' group-hover:shadow '} transition-all duration-500 text-blue-gray-600 rounded-lg`}>
            Template {i + 1}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TemplateSection
