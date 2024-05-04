import styled from "styled-components";
import { Colors } from "./Colors";

export const BaseInput = styled.input`
  padding: 15px;
  width: 100%;
  height: 50px;
  background: transparent;
  border-color: ${Colors.borderColor};
  border-width: 1px;
  color: ${(props) => (props.color ? props.color : Colors.grey50)};
  font-size: 14px;
  line-height: 24px;

  &:focus {
    border-color: ${Colors.borderColor};
    outline: none;
  }
`;

export const SelectInput = styled.select`
  padding: 15px;
  width: 100%;
  height: 50px;
  background: transparent;
  border-color: ${Colors.borderColor};
  border-width: 1px;
  color: ${(props) => (props.color ? props.color : Colors.grey50)};
  font-size: 14px;
  line-height: 24px;

  &:focus {
    border-color: ${Colors.borderColor};
    outline: none;
  }
`;
