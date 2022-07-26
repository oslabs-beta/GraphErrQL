import { React, useContext } from 'react';
import styled from 'styled-components';
import { LiveContext } from '../LiveMode/LiveContext';

// all of these styled components just for display/info when testing incomming info, can make new ones
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

function LoggerBox() {
  const { liveQuery, liveResponse, dataLog } = useContext(LiveContext);

  // TODO
  // const errorList = [];

  // if (liveResponse.errors) {
  //   let i = 0;
  //   liveResponse.errors.forEach((error) => {
  //     errorList.push(<ErrorItem key={i}>{JSON.stringify(error)}</ErrorItem>);
  //   });
  // }

  const displayDataLog = dataLog.map((item) => {
    return (
      <>
        {/* can wrap each item in styled component  */}
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
          {/* can make style component to hold the displayDataLog value */}
          <h3>data log:</h3>
          <p>{displayDataLog}</p>
        </IncomingDataContainer>
        {/* <ErrorsDispay>{errorList}</ErrorsDispay> */}
      </DataContainer>
    </>
  );
}
export default LoggerBox;
