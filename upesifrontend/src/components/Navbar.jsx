import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 4rem;
  max-height: 4rem;
  background: #1fab89;
  position: fixed;
  top: 0;
`;

const Logo = styled.div`
  width: 40%;
  height: 100%;
  padding: 10px 10px 10px 20px;
`;

const LogoText = styled.h1`
  width: 100%;
  height: 100%;
  max-height: 100%;
`;

const Link = styled.a`
  width: 100%;
  height: 100%;
  max-height: 100%;
  cursor: pointer;
`;

function Navbar({ setCurrentState }) {
  const handleClick = (e) => {
    e.preventDefault();
    setCurrentState("home");
  };

  return (
    <Wrapper>
      <Logo>
        <Link onClick={handleClick}>
          <LogoText>Upesi Money</LogoText>
        </Link>
      </Logo>
    </Wrapper>
  );
}

export default Navbar;
