import { useContext } from 'react';

import { LiveContext } from '../LiveMode/LiveContext';
import {
  StyledSuccessNoResponse,
  DataContainer,
  IncomingDataContainer,
  TextContainer,
  ErrorTextContainer,
  CurrentQueryResponse,
  LogContainer,
} from './styles/LoggerResponse.styled';

function LoggerBox() {
  const { liveQuery, liveResponse, dataLog } = useContext(LiveContext);

  const regexRemove = /"/g;
  const regexColon = /:/g;

  const liveQueryParsed = liveQuery
    .slice(13)
    .replace(regexRemove, ``)
    .replace(regexColon, ` `);
  const liveResponseParsed = liveResponse
    .slice(13)
    .replace(regexRemove, ``)
    .replace(regexColon, ` `);

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
  let logCounter = 0;
  const displayDataLog = groupedQueryResponses
    .slice(0, -1)
    .reverse()
    .map((qR) => {
      const queryResponse = qR.map((item) => {
<<<<<<< HEAD
=======
        console.log(`ITEM: ${JSON.stringify(item)}`);
        console.log(`DATE: ${parseInt(String(item).slice(0, 13))}`);
        const timestamp = new Date(
          parseInt(String(item).slice(0, 13))
        ).toString();

>>>>>>> c2dbebca10bb0b4f8f31ba5f23c5c2b11b662c23
        logCounter++;
        //for this return, if string is query give it a style component that is clickable
        //if string is success response (data) then give it style component with success border - this container appears if query is clicked
        // if the response string is an error (message) then give it the style component with error border
        //can we discern in the query if it is an error? or is there a way to check if query's child component is an error and give it a border based on that?
        return (
          <>
<<<<<<< HEAD
            {String(item).slice(2, 7) === 'query' ? (
              <TextContainer>
                {logCounter / 2 === 0 ? (
                  <div>
                    <p>{item}</p>
                    <hr></hr>
                  </div>
                ) : (
                  <p>{item}</p>
                )}
              </TextContainer>
            ) : String(item).slice(2, 9) === 'message' ? (
              <ErrorTextContainer>
                <p>{item}</p>
=======
            {String(item).slice(15, 20) === 'query' ? (
              <TextContainer>
                <div>
                  <p>{timestamp}</p>
                  <p>{item.slice(13)}</p>
                </div>
              </TextContainer>
            ) : String(item).slice(15, 22) === 'message' ? (
              <ErrorTextContainer>
                <p>{item.slice(13)}</p>
                <br></br>
>>>>>>> c2dbebca10bb0b4f8f31ba5f23c5c2b11b662c23
                <hr></hr>
              </ErrorTextContainer>
            ) : (
              <TextContainer>
<<<<<<< HEAD
                <p>{item}</p>
=======
                <p>{item.slice(13)}</p>
                <br></br>
>>>>>>> c2dbebca10bb0b4f8f31ba5f23c5c2b11b662c23
                <hr></hr>
              </TextContainer>
            )}
          </>
        );
      });
      return (
        <>
          <div></div>
          <StyledSuccessNoResponse>{queryResponse}</StyledSuccessNoResponse>
        </>
      );
    });
  return (
    <>
      <DataContainer>
        <IncomingDataContainer>
          <CurrentQueryResponse>
            <TextContainer>
              {liveResponse.length > 8 ? (
                <p>
                  Query Processing Time:{' '}
                  {(liveResponse.slice(0, 13) - liveQuery.slice(0, 13)) / 1000}{' '}
                  seconds
                </p>
              ) : (
                <p>Waiting for Events from Host App...</p>
              )}
            </TextContainer>
            <TextContainer>
              <p>{liveQueryParsed}</p>
            </TextContainer>
            {String(liveResponseParsed).slice(1, 8) === 'message' ? (
              <ErrorTextContainer>{liveResponse.slice(13)}</ErrorTextContainer>
            ) : (
              <TextContainer>
                <p>{liveResponseParsed}</p>
              </TextContainer>
            )}
          </CurrentQueryResponse>
          <h3>Past Logs</h3>
          <p>{displayDataLog}</p>
        </IncomingDataContainer>
      </DataContainer>
    </>
  );
}
export default LoggerBox;
