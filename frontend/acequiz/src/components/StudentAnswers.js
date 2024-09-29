import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentAnswers = () => {
    const { testname } = useParams(); // Get the testname from the URL
    const [studentAnswers, setStudentAnswers] = useState([]);

    useEffect(() => {
        const fetchStudentAnswers = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/practice-sets/answers/${testname}`);
                if (response.ok) {
                    const data = await response.json();
                    setStudentAnswers(data);
                } else {
                    console.error('Failed to fetch student answers');
                }
            } catch (error) {
                console.error('Error fetching student answers:', error);
            }
        };

        fetchStudentAnswers();
    }, [testname]);

    return (
        <div>
            <h2>Student Answers for {testname}</h2>
            <ul>
                {studentAnswers.length > 0 ? studentAnswers.map((answer, index) => (
                    <li key={index}>
                        <strong>{answer.student_name}:</strong> {answer.answer}
                    </li>
                )) : <p>No answers found for this test.</p>}
            </ul>
        </div>
    );
};

export default StudentAnswers;