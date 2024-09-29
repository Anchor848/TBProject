import React from 'react';

const PracticeSets = ({ sets, onTestSelect }) => {
    return (
        <div>
            <h3>Available Practice Sets</h3>
            {sets.map(({ subject, tests }) => (
                <div key={subject}>
                    <h4>{subject}</h4>
                    <ul>
                        {tests.map((test) => (
                            <li key={test.id}>
                                <button onClick={() => onTestSelect(test.testname)}>
                                    {test.testname || 'Unnamed Test'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PracticeSets;