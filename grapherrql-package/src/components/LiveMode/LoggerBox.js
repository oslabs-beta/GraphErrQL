import { React, useState, useContext } from 'react';
import styled from 'styled-components';
import { LiveContext } from '../LiveMode/LiveContext';

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const IncomingDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ErrorsDispay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QueryDisplay = styled.div`
  display: flex;
  font-weight: 900;
`;
const ResponseDisplay = styled.div`
  display: flex;
`;

const ErrorItem = styled.h3`
  color: #ff1616;
`;
// import LoggerResponse from './LoggerResponse';
// import { Button } from './styles/LoggerBox.styled.js';
//
// import { mockData } from './mockData';

function LoggerBox() {
  const { liveQuery, liveResponse, dataLog } = useContext(LiveContext);

  const errorList = [];

  if (liveResponse.errors) {
    let i = 0;
    liveResponse.errors.forEach((error) => {
      errorList.push(<ErrorItem key={i}>{JSON.stringify(error)}</ErrorItem>);
    });
  }

  const displayDataLog = dataLog.map((item) => {
    return (
      <>
        <div></div>
        {item}
        <div>*************</div>
      </>
    );
  });
  return (
    <>
      <DataContainer>
        <IncomingDataContainer>
          <QueryDisplay>{liveQuery}</QueryDisplay>
          <ResponseDisplay>{liveResponse}</ResponseDisplay>
          data log:
          <h1>{displayDataLog}</h1>
        </IncomingDataContainer>
        <ErrorsDispay>{errorList}</ErrorsDispay>
      </DataContainer>

      {/* <Button
        onClick={() => {
          updateIndex();
        }}
      >
        <strong>Simulate Query!</strong>
      </Button>
      <div>{responseArray}</div> */}
    </>
  );
}
export default LoggerBox;
