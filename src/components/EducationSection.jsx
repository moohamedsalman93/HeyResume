import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Input, Textarea, Typography } from '@material-tailwind/react'
import DatePicker from './DatePicker';

function EducationSection({ exampleData, setExampleData }) {

    const [noofContent, setNoofContent] = useState(1);
    const [isPresent, setIsPresent] = useState([])


    useEffect(() => {
        const presentStatus = exampleData.education.map(edu => edu.endDate === "present");
        setIsPresent(presentStatus);
        setNoofContent(exampleData?.education?.length);
    }, [exampleData]);


    const handleInputChange = (field, index) => (e) => {
        setExampleData(prevState => {
            const updatedEducation = [...prevState.education];
            updatedEducation[index][field] = e.target.value; // Update specific field
            return {
                ...prevState,
                education: updatedEducation,
            };
        });
    };

    const handleAddEducation = () => {
        setExampleData(prevState => ({
            ...prevState,
            education: [...prevState.education, { institution: '', studyType: '', area: '', score: '', startDate: '', endDate: '' }]
        }));
    };

    const handleRemoveEducation = (index) => {
        setExampleData(prevState => {
            const updatedEducation = prevState.education.filter((_, i) => i !== index);
            return {
                ...prevState,
                education: updatedEducation,
            };
        });
        setNoofContent(noofContent - 1); // Decrease the count of education entries
    };


    const handleCheck = (index) => {
        handleInputChange("endDate", index)({ target: { value: isPresent[index] ? '' : 'present' } })
    }

    return (
        <div className=' w-full h-full p-6 flex flex-col gap-4'>

            {Array(noofContent).fill().map((_, i) => (
                <div key={i} className={`grid grid-cols-2 gap-10  p-4 border rounded-md place-items-center  py-4 bg-white shadow-md relative w-full`}>

                    <div className=' h-10 w-full border-b flex justify-between items-center col-span-2'>
                        <Typography
                            variant="h6"
                            className='text-blue-gray-700'
                        >
                            Education {i + 1}
                        </Typography>

                        <div className=' w-fit flex gap-4 h-full'>

                            {noofContent != 1 &&
                                <Button onClick={() => handleRemoveEducation(i)} variant="outlined" className=' h-7 items-center flex' color='red'>
                                    remove
                                </Button>
                            }
                        </div>

                    </div>

                    <Input
                        variant="static"
                        label="Institute"
                        placeholder="Jamal Mohamed Collage"
                        value={exampleData.education[i]?.institution}
                        onChange={handleInputChange('institution', i)}
                    />
                    <Input
                        variant="static"
                        label="Degree"
                        placeholder="Bachelor of Science"
                        value={exampleData.education[i]?.studyType}
                        onChange={handleInputChange('studyType', i)}
                    />
                    <Input
                        variant="static"
                        label="Major"
                        placeholder="123-456-7890"
                        value={exampleData.education[i]?.area}
                        onChange={handleInputChange('area', i)}
                    />
                    <Input
                        variant="static"
                        label="CGPA"
                        placeholder="123 Main St, Anytown, USA"
                        value={exampleData.education[i]?.score}
                        onChange={handleInputChange('score', i)}
                    />

                    <div className='  flex justify-between col-span-2 w-full'>
                        <DatePicker isDisable={false} key={1} title={"Start Date"} date={exampleData.education[i]?.startDate || 'Jan-2014'} handleInputChange={handleInputChange} field={"startDate"} index={i} />
                        <div >
                            <DatePicker key={2} isDisable={isPresent[i]} title={"End Date"} date={exampleData.education[i]?.endDate || 'Jan-2014'} handleInputChange={handleInputChange} field={"endDate"} index={i} />
                            <div className='flex justify-start gap-2 items-center'>
                                <Checkbox checked={isPresent[i]} onChange={() => handleCheck(i)} />
                                <Typography className=' text-[#475c66] text-sm'>
                                    Present
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className=' col-span-2 w-full flex justify-center items-center'>
                        {noofContent == i + 1 &&
                            < Button variant="outlined" color='green' className=' h-7 items-center flex  ' onClick={handleAddEducation}>
                                Add another
                            </Button>
                        }
                    </div>

                </div>
            ))
            }
        </div >
    )
}

export default EducationSection
