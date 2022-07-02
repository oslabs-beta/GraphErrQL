import { React, useState } from 'react';
import LoggerResponse from './LoggerResponse';
import { mockData } from './mockData';
import { Button } from './styles/LoggerBox.styled.js';

function LoggerBox() {
  const [arrayIndex, setArrayIndex] = useState(0);
  const [responseArray, setResponseArray] = useState([]);

  const updateIndex = () => {
    if (arrayIndex < 5) {
      setArrayIndex((num) => num + 1);

      setResponseArray((resArray) => [
        ...resArray,
        <LoggerResponse
          key={arrayIndex}
          successfail={mockData[arrayIndex].success}
          query={mockData[arrayIndex].query}
          response={mockData[arrayIndex].response}
        />,
      ]);
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          updateIndex();
        }}
      >
        <strong>Simulate Query!</strong>
      </Button>
      <div>{responseArray}</div>
    </>
  );
}
export default LoggerBox;
