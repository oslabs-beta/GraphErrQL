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
  const groupQueryResponse = (arr) => {
    const result = [];
    let i = 0;
    while (i < arr.length) {
      const innerArray = [];
      innerArray.push(arr[i]);
      ++i;
      innerArray.push(arr[i]);
      result.push(innerArray);
      i++;
    }
    return result;
  };

  const groupedQueryResponses = groupQueryResponse(dataLog);

  const displayDataLog = groupedQueryResponses.map((qR) => {
    const queryResponse = qR.map((item) => {
      return (
        <>
          <>{item}</> {/*should be a styled query container, onClick will trigger if response will show or hide */}
          <div>**************{/*should be a styled response container with state for show: true or false */}</div>
        </>
      );
    });
    return (
      <>
        {/* can wrap each item in styled component  */}
        <div></div>
        {queryResponse}
        <div>-----------------</div>
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
