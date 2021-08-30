import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../logo";
import NavItems from "./navItems";

const NavbarContainer = styled.div`
  min-height: 68px;
  ${tw`
        w-full
        flex
        flex-row
        items-center
        lg:px-12
        justify-between
    `};
`;

const LogoContainer = styled.div``;

const NavBar = () => {
  return (
    <NavbarContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <NavItems />
    </NavbarContainer>
  );
};

export default NavBar;
