import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { MenuContext } from "./context/menuContext";
import { useContext } from "react";

const Header = styled.header`
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  z-index: 50;
`;

const NavWrap = styled.nav`
  a {
    margin-right: ${props => props.theme.space[3]};
  }
  @media (max-width: 769px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  @media (max-width: 769px) {
    display: block;
  }
`;

export default function Navbar(props) {
  const { setMenuOpen } = useContext(MenuContext);
  return (
    <Header>
      <Link href="/">
        <a>{props.logoalt ? null : <span>Template Logo</span>}</a>
      </Link>
      <NavWrap>
        {props.menu.map((item, index) => {
          if (
            item.link.includes("http") ||
            item.link.includes("www")
          ) {
            return (
              <Link href={item.link} key={index}>
                <a target="_blank">{item.label}</a>
              </Link>
            );
          }
          return (
            <Link href={item.link} key={index}>
              <a>{item.label}</a>
            </Link>
          );
        })}
      </NavWrap>
      <MobileMenuButton onClick={() => setMenuOpen(true)}>
        Menu
      </MobileMenuButton>
    </Header>
  );
}
