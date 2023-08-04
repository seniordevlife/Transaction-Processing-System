import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Header = styled.h2`
  width: 100%;
  text-align: center;
`;

const Shortcut = styled.div`
  height: 100%;
  width: 12rem;
  padding: 10px;
  background: #62d2a2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ShortcutLabels = styled.div`
  height: 100%;
  min-width: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Tab = styled.div`
  height: 22.5%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabButton = styled.button`
  height: 100px;
  width: 90%;
  background: #1e90ff;
  color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  border-radius: 15px;
  border: none;
  cursor: pointer;
`;

const MainTab = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.showForm ? "center" : "space-between")};
`;

const TextGuide = styled.div`
  width: 100%;
  position: fixed;
`;

const Text = styled.p`
  font-size: 1.3rem;
  width: 100%;
  text-align: center;
  padding: 0 10px 0 0;
  color: #727472;
`;

const WithdrawForm = styled.form`
  width: 60%;
  min-width: 200px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  height: 4rem;
  width: 100%;
  font-size: 1.3rem;
`;

const Input = styled.input`
  height: 3rem;
  width: ${(props) => (props.buttontype === "positive" ? "10rem" : "100%")};
  padding: 10px;
  font-size: 1.3rem;
  background: ${(props) => props.buttontype === "positive" && "#1e90ff"};
  border-radius: ${(props) => props.buttontype === "positive" && "20px"};
  border: ${(props) => props.buttontype === "positive" && "none"};
  margin: ${(props) => props.buttontype === "positive" && "20px 0 0 0"};
  cursor: pointer;
`;

function Withdraw({
  latestTransaction,
  setCurrentState,
  setWithdrawAmount,
  selectedAtmBranch,
  availableAtmBranches,
}) {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState(null);

  const showWithdrawalForm = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleInputChange = (e, amount) => {
    e.preventDefault();
    setAmount(amount);
  };

  const handleButtonClick = (e, amount) => {
    e.preventDefault();
    if (!showForm) {
      // check atm has requested amount
      const currentAtm = availableAtmBranches.find(
        (atm) => atm.id === selectedAtmBranch.value
      );

      if (amount > currentAtm.balance) {
        window.alert(
          `Whoaa! Your requested amount exceeds the withdrawal limit. Withdrawal limit is ksh. 50,000`
        );
        return;
      }

      // check customer has requested amount in account
      if (amount > latestTransaction?.accountBalance) {
        window.alert(`Sorry, you have insufficient funds in your account.`);
        return;
      }

      setWithdrawAmount(amount);
      setCurrentState("confirmation");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount % 100 === 0) {
      // check atm has requested amount
      const currentAtm = availableAtmBranches.find(
        (atm) => atm.id === selectedAtmBranch.value
      );

      if (amount > 50000) {
        window.alert(
          `Whoaa! Your requested amount exceeds the withdrawal limit. Withdrawal limit is ksh. 50,000`
        );
        return;
      }

      if (amount > currentAtm.balance) {
        window.alert(
          `OOps! Your requested amount exceeds the current ATM balance. Available balance is ${currentAtm.balance}`
        );
        return;
      }

      // check customer has requested amount in account
      if (amount > latestTransaction?.accountBalance) {
        window.alert(`Sorry, you have insufficient funds in your account.`);
        return;
      }

      setWithdrawAmount(amount);
      setCurrentState("confirmation");
    } else {
      window.alert("The withdrawal amount must be in denominations of 100");
    }
  };

  return (
    <Wrapper>
      <TextGuide>
        <Header>Choose an Amount to Withdraw.</Header>
      </TextGuide>
      <Shortcut>
        <Tab>
          <TabButton onClick={(e) => handleButtonClick(e, 200)}></TabButton>
        </Tab>
        <Tab>
          <TabButton onClick={(e) => handleButtonClick(e, 500)}></TabButton>
        </Tab>
        <Tab>
          <TabButton onClick={(e) => handleButtonClick(e, 1000)}></TabButton>
        </Tab>
        <Tab>
          <TabButton onClick={(e) => handleButtonClick(e, 2000)}></TabButton>
        </Tab>
      </Shortcut>
      <MainTab showForm={showForm}>
        {!showForm && (
          <ShortcutLabels>
            <Tab>
              <Text>ksh. 200</Text>
            </Tab>
            <Tab>
              <Text>ksh. 500</Text>
            </Tab>
            <Tab>
              <Text>ksh. 1,000</Text>
            </Tab>
            <Tab>
              <Text>ksh. 2,000</Text>
            </Tab>
          </ShortcutLabels>
        )}
        {showForm && (
          <WithdrawForm onSubmit={handleSubmit}>
            <Label>Amount(in ksh)</Label>
            <Input
              type="number"
              onChange={(e) => handleInputChange(e, e.target.value)}
            />
            <Input buttontype="positive" type="submit" value="Withdraw" />
          </WithdrawForm>
        )}
        {!showForm && (
          <ShortcutLabels>
            <Tab>
              <Text>ksh. 5,000</Text>
            </Tab>
            <Tab>
              <Text>ksh. 10,000</Text>
            </Tab>
            <Tab>
              <Text>ksh. 15,000</Text>
            </Tab>
            <Tab>
              <Text>Other</Text>
            </Tab>
          </ShortcutLabels>
        )}
      </MainTab>
      <Shortcut>
        <Tab>
          <TabButton onClick={(e) => handleButtonClick(e, 5000)}></TabButton>
        </Tab>
        <Tab>
          <TabButton onClick={(e) => handleButtonClick(e, 10000)}></TabButton>
        </Tab>
        <Tab>
          <TabButton onClick={(e) => handleButtonClick(e, 15000)}></TabButton>
        </Tab>
        <Tab>
          <TabButton onClick={showWithdrawalForm}></TabButton>
        </Tab>
      </Shortcut>
    </Wrapper>
  );
}

export default Withdraw;
