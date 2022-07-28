import React, { useContext } from 'react';
import { GraphContext } from './Context';

const RunQuery = () => {
  const [info, setInfo] = useContext(GraphContext);

  function handleClick(e) {
    e.preventDefault();

    let APIURI = 'https://api.spacex.land/graphql/';

    const handleRequest = () => {
      fetch(`${APIURI}`, {
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
            response: 'Sorry, your request failed',
          }));
        });
    };

    // Function to handle invalid user input
    const handleInvalid = () => {
      setInfo(() => ({
        ...info,
        response: 'Please start with query or mutation',
      }));
    };

    // Validate Input
    if (
      info.body.substring(0, 5).toLowerCase() === 'query' ||
      info.body.substring(0, 8).toLowerCase() === 'mutation' ||
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
          id='submit'
          type='submit'
          onClick={handleClick}
      >
      Submit Query
      </button>
       </div>)
}

export default RunQuery;
