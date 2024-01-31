import styled from "styled-components/native";
import { Platform, TextInput } from "react-native";

export const SearchTextInput = styled(TextInput).attrs((props) => ({
  width: props.width,
}))`
  width: ${(props) =>
    Platform.select({
      android: 44,
      web: 30,
    })}%;
  margin-left: ${(props) =>
    Platform.select({
      android: 2,
      web: 1,
    })}%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
