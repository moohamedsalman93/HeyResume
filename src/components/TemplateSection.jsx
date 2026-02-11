import React from 'react'
import premiumIcon from "../assets/premium.png"
import Typography from './ui/Typography';
import { twMerge } from 'tailwind-merge';

function TemplateSection({ exampleData, setExampleData, handleImageClick }) {

  const handleTemplateSelect = (index) => {
    setExampleData(prevState => ({
      ...prevState,
      selectedTemplate: index,
    }));
  }

  return (
    <div className=' w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {Array(7).fill().map((_, i) => (
        <div
          key={i}
          onClick={() => handleTemplateSelect(i + 1)}
          className={twMerge(
            'flex flex-col gap-4 items-center relative cursor-pointer p-4 rounded-2xl border transition-all duration-300 group',
            exampleData?.selectedTemplate == i + 1
              ? 'bg-indigo-500/10 border-indigo-500/30 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20'
              : 'bg-surface-2/60 border-white/[0.06] hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/20'
          )}
        >
          <div className="relative overflow-hidden rounded-xl border border-white/[0.06]">
            <img
              onClick={(e) => { e.stopPropagation(); handleImageClick(`https://latexresu.me/static/${i + 1}.png`, e); }}
              src={`https://latexresu.me/static/${i + 1}.png`}
              alt={`Template ${i + 1}`}
              className='cursor-zoom-in transition-transform duration-500 group-hover:scale-105'
            />
            {(i != 0 && i != 1) && (
              <div className="absolute top-2 right-2 bg-surface-2/90 backdrop-blur-sm p-1 rounded-lg border border-amber-500/20 shadow-sm">
                <img src={premiumIcon} alt="Premium" className='w-4 h-4' />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Typography variant="small" className={twMerge(
              'font-bold transition-colors',
              exampleData?.selectedTemplate == i + 1 ? 'text-indigo-400' : 'text-slate-500'
            )}>
              Template {i + 1}
            </Typography>
            {exampleData?.selectedTemplate == i + 1 && (
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-lg shadow-indigo-500/50" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TemplateSection
