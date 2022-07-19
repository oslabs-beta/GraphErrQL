import { React, useState } from 'react';
import ErrorResponseBox from './ErrorResponseBox';
import {
  StyledSuccessWithResponse,
  StyledSuccessNoResponse,
  StyledErrorNoResponse,
  StyledErrorWithResponse,
} from './styles/LoggerResponse.styled';
import SuccessResponseBox from './SuccessResponseBox';

function LoggerResponse(props) {
  const [errorResponseBox, setErrorResponseBox] = useState(false);
  const [successResponse, setSuccessResponse] = useState(false);

  const handleClickSuccess = () => {
    setSuccessResponse((current) => !current);
  };
  const handleClickError = () => {
    setErrorResponseBox((current) => !current);
  };

  //}
  return (
    <div>
      {props.successfail && successResponse ? (
        <div onClick={handleClickSuccess}>
          <div>
            <StyledSuccessWithResponse>
              <strong> SUCCESS: &nbsp; </strong> <br />
              {props.query}
            </StyledSuccessWithResponse>
            <SuccessResponseBox response={props.response} />
          </div>
        </div>
      ) : props.successfail ? (
        <div onClick={handleClickSuccess}>
          <div>
            <StyledSuccessNoResponse>
              <strong> SUCCESS: &nbsp; </strong> <br />
              {props.query}
            </StyledSuccessNoResponse>
          </div>
        </div>
      ) : errorResponseBox ? (
        <div onClick={handleClickError}>
          <div>
            <StyledErrorWithResponse>
              <strong> ERROR: &nbsp; </strong> <br />
              {props.query}
            </StyledErrorWithResponse>
            <ErrorResponseBox response={props.response} />
          </div>
        </div>
      ) : (
        <div onClick={handleClickError}>
          <StyledErrorNoResponse>
            <strong> ERROR: &nbsp; </strong> <br />
            {props.query}
          </StyledErrorNoResponse>
        </div>
      )}
    </div>
  );
}

export default LoggerResponse;
