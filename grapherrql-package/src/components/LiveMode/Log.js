import { React, useState } from 'react';
import ErrorResponseBox from './ErrorResponseBox';
import { StyledSuccessLog, StyledErrorLogNoResponse, StyledErrorLogWithResponse } from './styles/Log.styled';

function Log(props) {
  const [errorResponseBox, setErrorResponseBox] = useState(false);

  const handleClickSuccess = () => {
    console.log(' Success clicked!');
  };
  const handleClickError = () => {
    setErrorResponseBox((current) => !current);
  };

  //}
  return (
    <div>
      {props.success ? (
        <div onClick={handleClickSuccess}>
          <StyledSuccessLog>
            SUCCESS: {props.success}
            &nbsp;
            {props.query}
            &nbsp;
            {props.response}
          </StyledSuccessLog>
        </div>
      ) : errorResponseBox ? (
        <div onClick={handleClickError}>
          <div>
            <StyledErrorLogWithResponse>
              ERROR: {props.success}
              &nbsp;
              {props.query}
            </StyledErrorLogWithResponse>
          </div>

          <div>
            {errorResponseBox && <ErrorResponseBox response={props.response} />}
          </div>
        </div>
      ) : (
        <div onClick={handleClickError}>
          <div>
            <StyledErrorLogNoResponse>
              ERROR: {props.success}
              &nbsp;
              {props.query}
            </StyledErrorLogNoResponse>
          </div>     
        </div>   
      )}
    </div>
  );
}

export default Log;
