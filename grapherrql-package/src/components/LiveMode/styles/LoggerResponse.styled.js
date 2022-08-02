import styled from 'styled-components';

export const StyledErrorNoResponse = styled.pre`
  background-color: #e9eef0;
  border: 7px solid #ff1616;
  color: black;
  border-radius: 20px;
  padding: 15px 15px;
  font-size: 1.25em;
`;

export const StyledErrorWithResponse = styled.pre`
  background-color: #e9eef0;
  border: 7px solid #ff1616;
  color: black;
  border-radius: 20px 20px 0px 0px;
  padding: 15px 15px;
  margin-bottom: 0px;
  font-size: 1.25em;
`;

export const StyledSuccessNoResponse = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 87.25vw;
  background-color: #e9eef0;
  border: 7px solid #5a79af;
  color: black;
  border-radius: 20px;
  padding: 15px 15px;
`;

export const StyledSuccessWithResponse = styled.pre`
  background-color: #e9eef0;
  border: 7px solid #078aa8;
  color: black;
  border-radius: 20px 20px 0px 0px;
  padding: 15px 15px;
  margin-bottom: 0px;
  font-size: 1.25em;
`;
