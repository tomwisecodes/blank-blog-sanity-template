import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  column-gap: ${props => props.theme.space[4]};
  row-gap: ${props => props.theme.space[4]};
`;
export const GridItem = styled.div`
    grid-column: ${props =>
      Array.isArray(props.width) ? props.width[2] : props.width}};
    @media(max-width: 769px) {
      grid-column: ${props =>
        Array.isArray(props.width) ? props.width[1] : props.width}};
    }
    @media(max-width: 550px) {
      grid-column: ${props =>
        Array.isArray(props.width) ? props.width[0] : props.width}};
    }
  `;
