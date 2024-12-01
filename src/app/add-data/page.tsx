'use client';

import { useState } from 'react';
import axios from 'axios';

// Function to generate a random string (ID)
const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
};

const Page = () => {
    const [category, setCategory] = useState<string>('');
    const [data, setData] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    const handleSubmit = async () => {
        setLoading(true);
        setResponseMessage(''); // Reset response message before submitting
        try {
            // Creating the payload
            const payload = {
                documents: [data],
                ids: [generateRandomString()],
                metadatas: [{ category: category }],
            };

            // Send POST request to add data
            const response = await axios.post('https://blizhe.kz/back/add_data', payload);

            if (response.data.status === 'success') {
                setResponseMessage('Data successfully added.');
            } else {
                setResponseMessage('Failed to add data.');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            setResponseMessage('There was an error with your request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-semibold text-black text-center mb-4">Add New Data</h2>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-black">
                        Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
                        placeholder="Enter category"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="data" className="block text-sm font-medium text-black">
                        Data
                    </label>
                    <textarea
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
                        placeholder="Enter data"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Add Data
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

export default Page;
