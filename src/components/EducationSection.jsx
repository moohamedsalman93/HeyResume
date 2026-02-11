import React, { useEffect, useState } from 'react'
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import Input from './ui/Input';
import Typography from './ui/Typography';
import Card, { CardBody } from './ui/Card';
import IconButton from './ui/IconButton';
import DatePicker from './DatePicker';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

function EducationSection({ exampleData, setExampleData }) {

    const [noofContent, setNoofContent] = useState(0);
    const [isPresent, setIsPresent] = useState([])


    useEffect(() => {
        const presentStatus = exampleData?.education.map(edu => edu.endDate === "present");
        setIsPresent(presentStatus);
        setNoofContent(exampleData?.education?.length);
    }, [exampleData]);


    const handleInputChange = (field, index) => (e) => {
        setExampleData(prevState => {
            const updatedEducation = [...prevState?.education];
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
            education: [...prevState?.education, { institution: '', studyType: '', area: '', score: '', startDate: '', endDate: '' }]
        }));
    };

    const handleRemoveEducation = (index) => {
        setExampleData(prevState => {
            const updatedEducation = prevState?.education.filter((_, i) => i !== index);
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
        <div className=' w-full h-fit md:p-6  flex flex-col gap-4'>
            {Array(noofContent).fill().map((_, i) => (
                <Card key={i} className="overflow-hidden border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardBody className="p-0">
                        <div className=' px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center'>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                                    {i + 1}
                                </div>
                                <Typography variant="h6" className='text-gray-900'>
                                    Education
                                </Typography>
                            </div>

                            <IconButton
                                variant="ghost"
                                color="red"
                                onClick={() => handleRemoveEducation(i)}
                                className="h-8 w-8"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </IconButton>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Institution"
                                placeholder="e.g. Jamal Mohamed College"
                                value={exampleData?.education[i]?.institution}
                                onChange={handleInputChange('institution', i)}
                                className="md:col-span-2"
                            />
                            <Input
                                label="Degree"
                                placeholder="e.g. Bachelor of Science"
                                value={exampleData?.education[i]?.studyType}
                                onChange={handleInputChange('studyType', i)}
                            />
                            <Input
                                label="Major"
                                placeholder="e.g. Computer Science"
                                value={exampleData?.education[i]?.area}
                                onChange={handleInputChange('area', i)}
                            />
                            <Input
                                label="CGPA / Score"
                                placeholder="e.g. 8.5/10"
                                value={exampleData?.education[i]?.score}
                                onChange={handleInputChange('score', i)}
                            />

                            <div className='flex flex-wrap gap-6 md:col-span-2'>
                                <DatePicker
                                    title="Start Date"
                                    date={exampleData?.education[i]?.startDate}
                                    handleInputChange={handleInputChange}
                                    field="startDate"
                                    index={i}
                                />
                                <div className="flex flex-col gap-2">
                                    <DatePicker
                                        isDisable={isPresent[i]}
                                        title="End Date"
                                        date={exampleData?.education[i]?.endDate}
                                        handleInputChange={handleInputChange}
                                        field="endDate"
                                        index={i}
                                    />
                                    <Checkbox
                                        label="Currently studying here"
                                        checked={isPresent[i]}
                                        onChange={() => handleCheck(i)}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}

            <div className='flex justify-center py-4'>
                <Button
                    variant="outline"
                    onClick={handleAddEducation}
                    className="group border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                    <PlusIcon className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    {noofContent === 0 ? "Add First Education" : "Add Another Education"}
                </Button>
            </div>

        </div >
    )
}

export default EducationSection
