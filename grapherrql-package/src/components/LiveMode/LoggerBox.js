import { useContext } from 'react';

import { LiveContext } from '../LiveMode/LiveContext';
import {
  DataContainer,
  IncomingDataContainer,
  TextContainer,
  ErrorTextContainer,
  CurrentLog,
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

  let logQueue = [];
  const displayDataLog = dataLog
    .slice(0, -2)
    .reverse()
    .map((qR) => {
      logQueue.push(qR);
      console.log(`LOGQUEUE UPDATE: ${JSON.stringify(logQueue)}`);
      if (logQueue.length === 2) {
        const items = logQueue;
        logQueue = [];
        const timestamp = new Date(
          parseInt(String(items[0]).slice(0, 13))
        ).toString();
        return (
          <div>
            <LogContainer>
              {String(items[1]).slice(15, 20) === 'query' ? (
                <TextContainer>
                  <div>
                    <p>{timestamp}</p>
                    <p>{items[1].slice(13)}</p>
                  </div>
                </TextContainer>
              ) : String(items[1]).slice(15, 22) === 'message' ? (
                <ErrorTextContainer>
                  <p>{items[1].slice(13)}</p>
                </ErrorTextContainer>
              ) : (
                <TextContainer>
                  <p>{items[1].slice(13)}</p>
                </TextContainer>
              )}
              {String(items[0]).slice(15, 20) === 'query' ? (
                <TextContainer>
                  <div>
                    <p>{timestamp}</p>
                    <p>{items[0].slice(13)}</p>
                  </div>
                </TextContainer>
              ) : String(items[0]).slice(15, 22) === 'message' ? (
                <ErrorTextContainer>
                  <p>{items[0].slice(13)}</p>
                </ErrorTextContainer>
              ) : (
                <TextContainer>
                  <p>{items[0].slice(13)}</p>
                </TextContainer>
              )}
            </LogContainer>
            <br></br>
          </div>
        );
      } else return <></>;
    });
  return (
    <>
      <DataContainer>
        <IncomingDataContainer>
          <h3>Latest Log from {document.cookie.slice(10, -7)}</h3>
          <CurrentLog>
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
          </CurrentLog>
          <h3>Past Logs</h3>
          <p>{displayDataLog}</p>
        </IncomingDataContainer>
      </DataContainer>
    </>
  );
}
export default LoggerBox;
