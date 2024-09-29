import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PracticeSets from './PracticeSets';
import PracticeSetDetail from './PracticeSetDetail';

const StudentDashboard = ({ username, studentId }) => {
    const [practiceSets, setPracticeSets] = useState([]);

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

    return (
        <div>
            <h2>Student Dashboard</h2>
            <Routes>
                <Route path="/" element={<PracticeSets sets={practiceSets} />} />
                <Route path="practice-set/:id" element={<PracticeSetDetail studentId={studentId} />} />
            </Routes>
        </div>
    );
};

export default StudentDashboard;