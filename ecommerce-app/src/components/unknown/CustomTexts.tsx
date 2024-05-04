import styled from "styled-components";
import { Colors } from "./Colors";
import { ColorProps } from "../../types/ComponentsTypes";
// import { nunito } from "@/fonts/fonts";

export const BaseText = styled.p<ColorProps>`
  color: ${(props) => (props.color ? props.color : Colors.black)};
  font-weight: 400;
  /* font-family: nunito, sans-serif; */
`;

export const TextXSmall = styled(BaseText)`
  font-size: 14px;
  line-height: 20px;
`;

export const TextSmall = styled(BaseText)`
  font-size: 16px;
  line-height: 24px;
`;

export const TextMedium = styled(BaseText)`
  font-size: 18px;
  line-height: 26px;
`;

export const TextLarge = styled(BaseText)`
  font-size: 20px;
  line-height: 28px;
`;

export const BaseHeader = styled.h1`
  color: ${(props) => (props.color ? props.color : Colors.black)};
  font-weight: 800;
`;

export const H1 = styled(BaseHeader)`
  font-size: 28px;
  line-height: 38px;
`;

export const H2 = styled(BaseHeader)`
  font-size: 20px;
  line-height: 27px;
`;

export const H3 = styled(BaseHeader)`
  font-size: 16px;
  line-height: 22px;
`;

export const H4 = styled(BaseHeader)`
  font-size: 12px;
  line-height: 16px;
`;