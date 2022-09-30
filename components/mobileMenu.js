import styled from "styled-components";
import Link from "next/link";
import { MenuContext } from "./context/menuContext";
import { useContext } from "react";

const Wrap = styled.nav`
  display: ${props => (props.menuOpen ? "flex" : "none")};
  position: fixed;
  left: 10%;
  right: 10%;
  top: 10%;
  bottom: 10%;
  flex-direction: column;
  background: black;
  color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 48px;
  a {
    color: white;
  }
`;

const Close = styled.button``;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Overlay = styled.div`
  display: ${props => (props.menuOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(225, 225, 225, 0.8);
`;

const MobileMenu = ({ menu }) => {
  const { menuOpen, setMenuOpen } = useContext(MenuContext);
  return (
    <>
      <Overlay menuOpen={menuOpen} />
      <Wrap menuOpen={menuOpen}>
        <MenuHeader>
          <p>Menu</p>
          <Close onClick={() => setMenuOpen(false)}>Close Menu</Close>
        </MenuHeader>

        {menu.map((item, index) => {
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
      </Wrap>
    </>
  );
};

export default MobileMenu;
