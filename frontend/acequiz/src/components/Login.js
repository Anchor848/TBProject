import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit handler called:', username, password);

        // Example credentials
        const validCredentials = {
            teacher: { username: 'mcq', password: '1024', user_type: 'teacher' },
            student: { username: 'zhuyiren', password: 'nico1', user_type: 'student' },
        };

        // Check credentials
        const userType = Object.keys(validCredentials).find(key =>
            validCredentials[key].username === username &&
            validCredentials[key].password === password
        );

        if (userType) {
            const { user_type } = validCredentials[userType];
            onLogin(user_type, username); // Call the onLogin function
            console.log('Calling onLogin with:', user_type, username);

            // Redirect to the dashboard based on user type
            navigate(user_type === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
        } else {
            setMessage('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;