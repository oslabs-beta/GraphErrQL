import React from 'react';
import { SuccessResponseDropdown } from './styles/SuccessResponseBox.styled';

function SuccessResponseBox(props) {
  return (
    <div>
      <SuccessResponseDropdown>{props.response}</SuccessResponseDropdown>
    </div>
  );
}

export default SuccessResponseBox;
