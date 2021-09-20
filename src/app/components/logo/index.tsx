import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useThemeContext } from "../../../context/ThemeContext";
import { Color } from "../../../models/color.modle";

import WebLogoImgLight from "../../../assets/images/logo-light.png";
import WebLogoImgDark from "../../../assets/images/logo-dark.png";

const LogoContainer = styled.div`
  ${tw`
flex
items-center
`}
`;

const LogoText = styled.div`
  ${tw`
    text-xl
    md:text-2xl
    font-bold
    text-black
    mx-1
`};
`;

const Image = styled.div`
  width: auto;
  min-width: 150px;
  ${tw`
    h-7
    md:h-9
    ml-1
`} img {
    width: auto;
    height: 100%;
  }
`;

function Logo() {
  const { currentTheme } = useThemeContext();

  return (
    <Link to={"/home"}>
      <LogoContainer>
        {currentTheme == Color.WHITE && (
          <Image>
            <img src={WebLogoImgLight} alt="web logo" />
          </Image>
        )}
        {currentTheme == Color.GREY && (
          <Image>
            <img src={WebLogoImgDark} alt="web logo" />
          </Image>
        )}
      </LogoContainer>
    </Link>
  );
}

export default Logo;
