import styled from "styled-components";

const ContainerWrap = styled.section``;

export default function Container(props) {
  return <ContainerWrap>{props.children}</ContainerWrap>;
}
