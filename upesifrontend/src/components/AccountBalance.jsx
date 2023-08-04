import React from "react";
import styled from "styled-components";
import { useMsal } from "@azure/msal-react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TextGuide = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
`;

const Section = styled.div`
  background: #d7fbe8;
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Column = styled.div`
  flex: 1;
`;

const Row = styled.div`
  height: 3rem;
  min-height: 3rem;
  width: 100%;
`;

const Header = styled.h2`
  width: 100%;
  text-align: center;
`;

const Text = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ConfirmButton = styled.button`
  height: 3rem;
  width: 12rem;
  min-width: 8rem;
  margin: 50px 10px 0 10px;
  font-size: 1.3rem;
  color: ${(props) =>
    props.buttontype === "positive" ? "#f1f1f1" : "#3434343"};
  background: ${(props) =>
    props.buttontype === "positive"
      ? "#1e90ff"
      : props.buttontype === "neutral"
      ? "#dcdcdc"
      : "#e60023"};
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

function AccountBalance({
  setCurrentState,
  myAccessToken,
  customer,
  latestTransaction,
}) {
  const { instance } = useMsal();
  // const [receiptReq, setReceiptReq] = useState(false);

  const handleClick = (e, action) => {
    e.preventDefault();
    if (action === "remove") {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie =
        "my_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      instance.logoutRedirect();
      setCurrentState("");
      window.alert("Karibu Tena.");
    } else {
      setCurrentState("withdrawal");
    }
  };

  return (
    <Wrapper>
      <TextGuide>
        <Header>My Account</Header>
      </TextGuide>
      <Section>
        <Column>
          <Row>
            <Text></Text>
          </Row>
          <Row>
            <Text>Checking balance</Text>
          </Row>
          <Row>
            <Text>Available for withdrawal</Text>
          </Row>
        </Column>
        <Column>
          <Row>
            <Text>Balance</Text>
          </Row>
          <Row>
            {latestTransaction && (
              <Text>ksh. {latestTransaction.accountBalance}</Text>
            )}
          </Row>
          <Row>
            {latestTransaction && (
              <Text>ksh. {Math.floor(latestTransaction.accountBalance)}</Text>
            )}
          </Row>
        </Column>
      </Section>
      <ButtonWrap>
        <ConfirmButton
          buttontype="positive"
          onClick={(e) => handleClick(e, "withdrawal")}
        >
          Make Withdrawal
        </ConfirmButton>
        <ConfirmButton
          buttontype="neutral"
          onClick={(e) => handleClick(e, "remove")}
        >
          Remove Card
        </ConfirmButton>
      </ButtonWrap>
    </Wrapper>
  );
}

export default AccountBalance;
