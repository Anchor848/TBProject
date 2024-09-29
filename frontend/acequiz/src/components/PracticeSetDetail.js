import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PracticeSetDetail = ({ testname }) => {
    const { id } = useParams(); 
    const [practiceSet, setPracticeSet] = useState(null);
    const [studentName, setStudentName] = useState(''); // Student name input
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPracticeSet = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/practice-sets/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPracticeSet(data);
                } else {
                    console.error('Failed to fetch practice set details');
                }
            } catch (error) {
                console.error('Error fetching practice set details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPracticeSet();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (studentName.trim() === '' || answer.trim() === '') {
            alert('Please enter both your name and an answer before submitting.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/practice-sets/submit-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testname: practiceSet.testname,
                    student_name: studentName, // Send student name
                    answer,
                }),
            });

            if (response.ok) {
                alert('Answer submitted successfully!');
                setAnswer('');
                setStudentName('');
            } else {
                alert('Failed to submit answer.');
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!practiceSet) {
        return <div>Practice set not found.</div>;
    }

    return (
        <div>
            <h2>{practiceSet.testname}</h2>
            {practiceSet.file_paths && practiceSet.file_paths.split(',').map((path, index) => (
                <div key={index}>
                    <img src={`http://localhost:5000/${path}`} alt={`Test ${index + 1}`} style={{ maxWidth: '100%' }} />
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Type your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    rows="5"
                    cols="50"
                />
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    );
};

export default PracticeSetDetail;