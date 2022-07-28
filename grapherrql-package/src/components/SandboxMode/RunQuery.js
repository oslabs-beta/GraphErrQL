import React, { useContext } from 'react';
import { GraphContext } from './Context';

const RunQuery = () => {
  const [info, setInfo] = useContext(GraphContext);

  function handleClick(e) {
    e.preventDefault();

    let userURI = '';

    const handleRequest = () => {
      fetch(`${userURI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${info.body}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setInfo(() => ({
            ...info,
            response: res.data,
            extensions: res.extensions,
          }));
        })
        .catch((err) => {
          setInfo(() => ({
            ...info,
            response: 'Request to server failed.',
          }));
        });
    };

    // Function to handle invalid user input
    const handleInvalid = () => {
      setInfo(() => ({
        ...info,
        response: 'Invalid Syntax',
      }));
    };

    // Validate Input
    if (
      info.body.substring(0, 5).toLowerCase() === 'query' ||
      info.body.substring(0, 5).toLowerCase() === 'mutat' ||
      info.body[0] === '{'
    ) {
      handleRequest();
    } else {
      handleInvalid();
    }
  }

  return (
      <div>
      <button
          id='submit-query'
          className='btn-gray'
          type='submit'
          onClick={handleClick}
      >
      Submit
      </button>
       </div>)
}

export default RunQuery;
