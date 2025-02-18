import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('Environment:', process.env.NODE_ENV); // Log the environment
        const apiUrl = process.env.NODE_ENV === 'development' 
            ? process.env.REACT_APP_API_URL_DEV 
            : process.env.REACT_APP_API_URL_PROD;
        fetch(apiUrl + '/')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{message}</p>
            </header>
        </div>
    );
};

export default App;
