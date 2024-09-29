import React, { useState } from 'react';

const UploadPracticeSet = ({ onClose, onUpload, username }) => {
    const [testname, setTestname] = useState(''); // State for test name
    const [subject, setSubject] = useState(''); // Subject input
    const [maxMark, setMaxMark] = useState(''); // Max marks input
    const [files, setFiles] = useState([]); // State to hold uploaded files
    const [uploading, setUploading] = useState(false); // State to manage the upload status

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // Set the selected files
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check that files are selected
        if (files.length === 0) {
            alert('Please select at least one file to upload.');
            return; // Early exit if no files are selected
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('testname', testname); // Append testname to formData
        formData.append('subject', subject); // Append subject to formData
        formData.append('maxMark', maxMark); // Append max marks to formData
        formData.append('username', username); // Append username to formData
        files.forEach(file => formData.append('files', file)); // Append each file to formData

        setUploading(true); // Set uploading state to true

        try {
            console.log('Sending files:', { username, subject, maxMark, files, testname }); // Log the data being sent
            const response = await fetch('http://localhost:5000/api/practice-sets', {
                method: 'POST',
                body: formData, // Send FormData as the request body
            });

            if (response.ok) {
                const newSet = await response.json(); // Parse the JSON response
                onUpload(newSet); // Pass new set to parent
                alert('Practice set uploaded successfully!'); // Alert success message
                onClose(); // Close the upload dialog/modal
            } else {
                const errorResponse = await response.text(); // Get the error response body
                console.error('Upload error response:', errorResponse); // Log the response for debugging
                alert(`Failed to upload practice set: ${response.status} - ${errorResponse}`); // Alert failure message with response status
            }
        } catch (error) {
            console.error('Error uploading practice set:', error); // Log error details
            alert('An error occurred while uploading the practice set'); // Alert error message
        } finally {
            setUploading(false); // Reset uploading state
        }
    };

    return (
        <div>
            <h2>Upload Practice Set</h2>
            <form onSubmit={handleSubmit}>
                {/* Test Name Input */}
                <input
                    type="text"
                    placeholder="Test Name"
                    value={testname}
                    onChange={(e) => setTestname(e.target.value)} // Update testname state
                    required
                />

                {/* Subject Dropdown */}
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)} // Update subject state
                    required
                >
                    <option value="" disabled>Select Subject</option>
                    <option value="Economics">Economics</option>
                    <option value="Math">Math</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Geography">Geography</option>
                </select>
                
                {/* Max Marks Input */}
                <input
                    type="number"
                    placeholder="Max Marks"
                    value={maxMark}
                    onChange={(e) => setMaxMark(e.target.value)} // Update maxMark state
                    required
                    min="0"
                />
                
                {/* File Input */}
                <input
                    type="file"
                    multiple
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange} // Handle file change
                    required
                />
                
                {/* Disable submit button if uploading */}
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
                
                {/* Cancel Button */}
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
            {uploading && <p>Please wait while your files are being uploaded.</p>} {/* Optional message during upload */}
        </div>
    );
};

export default UploadPracticeSet;