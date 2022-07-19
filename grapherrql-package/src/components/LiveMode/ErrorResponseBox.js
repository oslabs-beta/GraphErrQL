import React from 'react';
import { ErrorResponseDropdown } from './styles/ErrorResponseBox.styled';

function ErrorResponseBox(props) {
  return (
    <div>
      <ErrorResponseDropdown>{props.response}</ErrorResponseDropdown>
    </div>
  );
}

export default ErrorResponseBox;
