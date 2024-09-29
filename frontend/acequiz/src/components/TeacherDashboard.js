import React, { useState, useEffect } from 'react';
import PracticeSets from './PracticeSets';
import ScoreHistory from './ScoreHistory';
import UploadPracticeSet from './UploadPracticeSet';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = ({ username }) => {
    const [studentName, setStudentName] = useState(''); // Use studentName instead of username
    const [subject, setSubject] = useState(''); 
    const [score, setScore] = useState(''); 
    const [isUploadVisible, setUploadVisible] = useState(false); 
    const [practiceSets, setPracticeSets] = useState([]); 
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [fetchScores, setFetchScores] = useState(false); // Control when to fetch scores

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPracticeSets = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/practice-sets/all');
                if (response.ok) {
                    const data = await response.json();
                    setPracticeSets(data);
                } else {
                    console.error('Failed to fetch practice sets');
                }
            } catch (error) {
                console.error('Error fetching practice sets:', error);
            }
        };

        fetchPracticeSets();
    }, []);

    const handleSubmitScore = async (e) => {
        e.preventDefault();
        const scoreData = {
            student_name: studentName, 
            subject,
            score: parseFloat(score),
        };

        try {
            const response = await fetch('http://localhost:5000/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scoreData),
            });

            if (response.ok) {
                setSubmissionMessage('Score submitted successfully!');
                setFetchScores(true); // Trigger score fetching after submission
                setStudentName('');
                setSubject('');
                setScore('');
            } else {
                setSubmissionMessage('Failed to submit score. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting score:', error);
            setSubmissionMessage('An error occurred. Please try again later.');
        }
    };

    const handleUpload = (newSet) => {
        setPracticeSets((prevSets) => {
            const subjectSet = prevSets.find(set => set.subject === newSet.subject);
            if (subjectSet) {
                const updatedSets = { ...subjectSet, sets: [...subjectSet.sets, newSet] };
                return prevSets.map(set => set.subject === newSet.subject ? updatedSets : set);
            } else {
                return [...prevSets, { subject: newSet.subject, sets: [newSet] }];
            }
        });
        setUploadVisible(false);
    };

    const handleTestSelect = (testname) => {
        navigate(`/teacher-dashboard/student-answers/${testname}`); 
    };

    return (
        <div>
            <h2>Teacher Dashboard</h2>

            <h3>Submit Student Scores</h3>
            <form onSubmit={handleSubmitScore}>
                {/* Input for Student Name */}
                <input
                    type="text"
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                />

                {/* Dropdown for Subjects */}
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Subject</option>
                    <option value="Economics">Economics</option>
                    <option value="Math">Math</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Geography">Geography</option>
                </select>

                {/* Input for Score */}
                <input
                    type="number"
                    placeholder="Score (%)"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                    min="0"
                    max="100"
                />
                <button type="submit">Submit Score</button>
            </form>

            {submissionMessage && <p>{submissionMessage}</p>}

            <button onClick={() => setUploadVisible(true)}>Upload Test</button>
            {isUploadVisible && (
                <UploadPracticeSet 
                    username={studentName}
                    onClose={() => setUploadVisible(false)}
                    onUpload={handleUpload}
                />
            )}

            <h3>Available Practice Sets</h3>
            <PracticeSets sets={practiceSets} onTestSelect={handleTestSelect} /> 
            {fetchScores && <ScoreHistory studentName={studentName} />} {/* Fetch scores only after submission */}
        </div>
    );
};

export default TeacherDashboard;