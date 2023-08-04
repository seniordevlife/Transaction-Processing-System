import React, { useState, useRef } from "react";
import styled from "styled-components";

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
const Header = styled.h2`
  width: 100%;
  text-align: center;
`;

const Section = styled.section`
  width: 100%;
  height: 25vh;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomerForm = styled.form`
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

function FundTransfer({
  customer,
  latestTransaction,
  allCustomerAccounts,
  setSelectedTransferCustomer,
  setCurrentState,
  setFundTransferAmount,
}) {
  const inputRef = useRef();
  const [transferAccount, setTransferAccount] = useState();
  const [transferAmount, setTransferAmount] = useState();
  const [transferState, setTransferState] = useState("initialize");

  const handleInputChange = (e, num) => {
    e.preventDefault();
    if (transferState === "initialize") {
      setTransferAccount(num);
    } else if (transferState === "setamount") {
      setTransferAmount(num);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transferState === "initialize") {
      // find customer by account number
      const fundsReceipient = allCustomerAccounts.find(
        (customer) => customer.accountNumber === parseInt(transferAccount)
      );

      if (fundsReceipient !== customer && !!fundsReceipient) {
        setSelectedTransferCustomer(fundsReceipient);
        setTransferState("setamount");
        inputRef.current.value = "";
      } else {
        window.alert("Incorrect account number.");
      }
    } else if (transferState === "setamount") {
      if (transferAmount > latestTransaction?.accountBalance) {
        window.alert("You have insufficient funds.");
        return;
      }

      setFundTransferAmount(transferAmount);
      setCurrentState("transferprocessing");
    }
  };

  return (
    <Wrapper>
      <TextGuide>
        <Header>Transfer funds</Header>
      </TextGuide>
      <Section>
        {transferState === "initialize" ? (
          <CustomerForm onSubmit={handleSubmit}>
            <Label>Enter Account Number to Transfer</Label>
            <Input
              ref={inputRef}
              type="number"
              onChange={(e) => handleInputChange(e, e.target.value)}
            />
            <Input buttontype="positive" type="submit" value="Confirm" />
          </CustomerForm>
        ) : transferState === "setamount" ? (
          <CustomerForm onSubmit={handleSubmit}>
            <Label>Enter Amount to Transfer</Label>
            <Input
              ref={inputRef}
              type="number"
              onChange={(e) => handleInputChange(e, e.target.value)}
            />
            <Input buttontype="positive" type="submit" value="Confirm" />
          </CustomerForm>
        ) : (
          <></>
        )}
      </Section>
    </Wrapper>
  );
}

export default FundTransfer;
