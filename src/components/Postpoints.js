import React, { useState } from 'react';

const ApiPostComponent = () => {
  // State variables to manage API responses, phone number input, success message, and error message
  const [responses, setResponses] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

   // Function to send POST request to the API
  const postData = async () => {
    try {
      // Sending POST request to the API endpoint
      const response = await fetch('https://chimpu.xyz/api/post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phonenumber: phoneNumber })
      });

      // Extracting response headers
      const headers = response.headers;
      // Convert headers to object
      const headersObj = {};
      headers.forEach((value, name) => {
        headersObj[name] = value;
      });

      // Add new response to the array
      setResponses([...responses, { headers: headersObj, phoneNumber: phoneNumber }]);
      console.log([...responses, { headers: headersObj, phoneNumber: phoneNumber }]);


      // Set success message
      setSuccessMessage('Data sent successfully to the API endpoint!');

      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle changes in the phone number input
  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    // Regular expression to match only digits
    const digitRegex = /^\d*$/;
    // Check if the input is only digits
    if (digitRegex.test(value)) {
      // Check if the length is already 10
      if (value.length <= 10) {
        // Update phone number
        setPhoneNumber(value);
        // Clear error message
        setErrorMessage('');
      } else {
        // If already 10 digits, prevent further changes
        e.preventDefault();
      }
    } else {
      // If input contains non-digit characters, clear phone number and show error message
      setPhoneNumber('');
      setErrorMessage('Please enter number digits only.');
    }
  };

  // Rendering the component
  return (
    <div className='task-container'>
      {/* Input field and button for sending POST request */}
      <div className='first-container'>
      <label>
       <b className='first-head'>Enter your phone number :</b> 
        <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
      </label>
      <button onClick={postData} className={phoneNumber.length === 10 ? '' : 'disabled'} disabled={phoneNumber.length !== 10}>Send POST Request</button>
      </div>

      {/* Displaying success and error messages */}
      <div className='msg-container'>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      
      {/* Displaying API responses */}
      <div className='second-container'>
      <h2>After Fetching the data from the API :</h2>
      {responses.map((response, index) => (
        <div key={index}>
          <h2>Phone Number:</h2>
          <p>{response.phoneNumber}</p>
          <h2>Response Headers:</h2>
          <ul>
            {Object.keys(response.headers).map(key => (
              <li key={key}>
                <strong>{key}:</strong> {response.headers[key]}
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ApiPostComponent;
