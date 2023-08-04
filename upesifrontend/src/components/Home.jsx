import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section`
  width: 100%;
  height: 20vh;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrap = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WelcomeText = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0 0 20px 0;
`;

const Text = styled.p`
  font-size: 1.2rem;
`;

const ServiceWrap = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ServiceButton = styled.button`
  height: 3rem;
  width: 12rem;
  min-width: 8rem;
  margin: 10px 10px 0 10px;
  font-size: 1.3rem;
  color: ${(props) =>
    props.buttontype === "positive" ? "#f1f1f1" : "#3434343"};
  background: #1e90ff;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

function Home({ setCurrentState, graphData }) {
  const handleClick = (e, button) => {
    e.preventDefault();
    setCurrentState(button);
  };

  return (
    <Wrapper>
      <Section>
        <TextWrap>
          <WelcomeText>Karibu {graphData && graphData.givenName}</WelcomeText>
          <Text>What would you like to do today?</Text>
        </TextWrap>
      </Section>
      <Section>
        <ServiceWrap>
          <ServiceButton
            buttontype="positive"
            onClick={(e) => handleClick(e, "balance")}
          >
            Check Balance
          </ServiceButton>
          <ServiceButton
            buttontype="positive"
            onClick={(e) => handleClick(e, "withdrawal")}
          >
            Make Withdrawal
          </ServiceButton>
          <ServiceButton
            buttontype="positive"
            onClick={(e) => handleClick(e, "transfer")}
          >
            Transfer funds
          </ServiceButton>
        </ServiceWrap>
      </Section>
    </Wrapper>
  );
}

export default Home;
