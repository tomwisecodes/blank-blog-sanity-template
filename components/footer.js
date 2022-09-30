import styled from "styled-components";

const FooterWrap = styled.footer`
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  width: 100%;
  position: relative;
`;

export default function Footer(props) {
  return (
    <FooterWrap>
      <p>
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </p>
    </FooterWrap>
  );
}
