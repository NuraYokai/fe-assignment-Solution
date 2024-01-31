import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import { Platform } from "react-native";

export const SortPicker = styled(Picker).attrs((props) => ({
  width: props.width,
}))`
  width: ${(props) =>
    Platform.select({
      android: "37%",
      web: "auto",
    })};

  margin-right: 10px;
  background-color: yellow;
`;
//props.width * 0.13581
