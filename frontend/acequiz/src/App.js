import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import PracticeSetDetail from './components/PracticeSetDetail'; 
import StudentAnswers from './components/StudentAnswers'; // Add StudentAnswers import

const App = () => {
    const [userType, setUserType] = useState(null);
    const [username, setUsername] = useState('');
    const [studentId, setStudentId] = useState(null);

    const handleLogin = (type, user, id) => {
        setUserType(type);
        setUsername(user);
        setStudentId(id); 
    };

    return (
        <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route
                path="/student-dashboard/*"
                element={userType === 'student' ? <StudentDashboard username={username} studentId={studentId} /> : <Navigate to="/" />}
            />
            <Route
                path="/teacher-dashboard/*"
                element={userType === 'teacher' ? <TeacherDashboard username={username} /> : <Navigate to="/" />}
            />
            <Route
                path="/practice-set/:id"
                element={<PracticeSetDetail />} 
            />
            <Route 
                path="/teacher-dashboard/student-answers/:testname"
                element={<StudentAnswers />} // Route for viewing student answers
            />
        </Routes>
    );
};

export default App;