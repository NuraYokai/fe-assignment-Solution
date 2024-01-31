import { Platform, ScrollView } from "react-native";
import styled from "styled-components/native";

export const ScrollViewContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    justifyContent: Platform.select({
      web: "",
      android: "space-between",
    }),
  },
})`
  flex: 1;
  scroll-behavior: smooth;
  padding: 10px;
  flex-wrap: wrap;
`;

export const ViewMovies = styled.View.attrs((props) => ({
  width: props.width,
}))`
  width: ${(props) =>
    Platform.select({
      android: "100%",
      web: "60%",
    })};
  box-sizing: border-box;
`;

export const ViewSearchSort = styled.View`
  flex-flow: row nowrap;
  padding: 2px;
  width: auto;
  margin-bottom: 20px;
`;

export const MovieDetailsView = styled.View`
  width: 50%;
  box-sizing: border-box;
  margin-top: 20px;
`;
