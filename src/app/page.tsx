'use client';

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);  // New loading state

    const handleSubmit = async () => {
        setLoading(true);  // Set loading to true when request starts
        setResponseMessage('');  // Clear previous response
        try {
            const response = await axios.post('https://blizhe.kz/get_data', {
                user_prompt: userPrompt,
            });

            if (response.data.response.choices && response.data.response.choices[0]) {
                setResponseMessage(response.data.response.choices[0].message.content);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponseMessage('There was an error with your request.');
        } finally {
            setLoading(false);  // Set loading to false when request completes
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-semibold text-black text-center mb-4">Ask Your Question</h2>

                <div className="mb-4">
                    <label htmlFor="userPrompt" className="block text-sm font-medium text-black">
                        Your Prompt
                    </label>
                    <input
                        id="userPrompt"
                        type="text"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
                        placeholder="Enter your question"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Ask
                </button>

                {/* Loader and Please wait text */}
                {loading && (
                    <div className="mt-4 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mr-2"></div>
                        <span className="text-black">Please wait...</span>
                    </div>
                )}

                {/* Displaying the response */}
                {responseMessage && !loading && (
                    <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-md">
                        <h3 className="text-lg font-semibold text-black">Response:</h3>
                        <p className="text-black">{responseMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
