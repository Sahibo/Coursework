import styled from "styled-components";
import { Colors } from "./Colors";
import { CustomButtonProps } from "../../types/ButtonTypes";

export const BaseButton = styled.button<CustomButtonProps>`
  cursor: pointer;
  height: 50px;
  width: ${(props) => (props.width ? props.width + "px" : "100%")};
  text-align: center;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  transition: background-color 0.5s ease;
  border: 1px solid;
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${Colors.primaryDark};
  color: ${Colors.primaryLight};
  border-color: ${Colors.primaryDark};

  &:hover {
    background-color: ${Colors.grey90};
    color: ${Colors.primaryLight};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: ${Colors.primaryLight};
  color: ${Colors.primaryDark};
  border-color: ${Colors.primaryLight};

  &:hover {
    background-color: ${Colors.grey30};
    color: ${Colors.primaryDark};
  }
`;
