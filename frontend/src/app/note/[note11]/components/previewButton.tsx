'use client'
import React from 'react'

const PreviewButton = ({filelink}:{filelink:string}) => {
  const handlePreview=()=>{
    window.open(filelink,'_blank')
  }
  return (
    <button onClick={handlePreview}className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Preview</button>
  )
}
export default PreviewButton
