import React, { useEffect, useState } from 'react';

const ScoreHistory = ({ studentName }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/scores/${studentName}`);
                if (response.ok) {
                    const data = await response.json();
                    setScores(data);
                } else {
                    console.error('Failed to fetch scores');
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        if (studentName) {
            fetchScores(); // Fetch scores only if studentName is provided
        }
    }, [studentName]);

    return (
        <div>
            <h3>Student Test Score History</h3>
            {scores.length === 0 ? <p>No scores available.</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Subject</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.student_name}</td>
                                <td>{s.subject}</td>
                                <td>{s.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ScoreHistory;