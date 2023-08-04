import React, { useState } from "react";
import styled from "styled-components";
import { useMsal } from "@azure/msal-react";
import { makeTransaction, updateAtmBalance } from "../apiCalls";

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

const Section = styled.div`
  background: #d7fbe8;
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
`;

const ConfirmButton = styled.button`
  height: 3rem;
  width: 10rem;
  min-width: 6rem;
  margin: 50px 10px 0 10px;
  font-size: 1.3rem;
  color: ${(props) =>
    props.buttontype === "positive" ? "#f1f1f1" : "#3434343"};
  background: ${(props) =>
    props.buttontype === "positive"
      ? "#28df99"
      : props.buttontype === "neutral"
      ? "#dcdcdc"
      : "#e60023"};
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function Confirm({
  latestTransaction,
  availableAtmBranches,
  selectedAtmBranch,
  withdrawAmount,
  setCurrentState,
  currentState,
  receiptReq,
  setReceiptReq,
  myAccessToken,
  fundTransferAmount,
  selectedTransferCustomer,
  transferLatestTransaction,
  customer,
}) {
  const [step, setStep] = useState(1);
  const { instance } = useMsal();

  const handleConfirmClick = (e, action) => {
    e.preventDefault();
    if (step === 1) {
      if (action === "back") {
        setCurrentState("home");
      } else {
        // HANDLE WITHDRAWAL OF FUNDS
        if (currentState === "confirmation") {
          setStep(2);
          // process transaction
          const currentAtm = availableAtmBranches.find(
            (atm) => atm.id === selectedAtmBranch.value
          );
          const customerBalance = latestTransaction?.accountBalance;

          // apply 3% withdrawal fee
          const transactionData = {
            transactionType: "withdraw",
            amount: withdrawAmount,
            charge: (0.03 * withdrawAmount).toFixed(2), //round to 2 decimal places
            accountBalance:
              parseFloat(customerBalance) -
              parseFloat(withdrawAmount) -
              parseFloat((0.03 * withdrawAmount).toFixed(2)),
          };

          const updatedAtmData = {
            location: currentAtm.location,
            balance: currentAtm.balance - withdrawAmount,
          };

          makeTransaction(
            customer.customerId,
            currentAtm.id,
            myAccessToken,
            transactionData
          );

          updateAtmBalance(currentAtm.id, myAccessToken, updatedAtmData);
        }
        // HANDLE TRANSFER OF FUNDS
        else {
          setStep(2);
          // process transaction
          const currentAtm = availableAtmBranches.find(
            (atm) => atm.id === selectedAtmBranch.value
          );

          const customerBalance = latestTransaction?.accountBalance;

          // apply 2% transfer fee

          const senderTransactionData = {
            transactionType: "transfer",
            amount: fundTransferAmount,
            transferAccountNo: selectedTransferCustomer.accountNumber,
            charge: (0.05 * fundTransferAmount).toFixed(2), //round to 2 decimal places
            accountBalance:
              parseFloat(customerBalance) -
              parseFloat(fundTransferAmount) -
              parseFloat((0.05 * fundTransferAmount).toFixed(2)),
          };

          const receipientTransactionData = {
            transactionType: "recieve",
            amount: fundTransferAmount,
            transferAccountNo: customer.accountNumber,
            charge: 0, //round to 2 decimal places
            accountBalance:
              parseFloat(transferLatestTransaction.accountBalance) +
              parseFloat(fundTransferAmount),
          };

          // PROCESS SENDER AND RECEIPIENT TRANSACTION DATA
          makeTransaction(
            selectedTransferCustomer.customerId,
            currentAtm.id,
            myAccessToken,
            receipientTransactionData
          );

          makeTransaction(
            customer.customerId,
            currentAtm.id,
            myAccessToken,
            senderTransactionData
          );
        }
      }
    } else if (step === 2) {
      if (action === "receipt-yes") {
        setReceiptReq(true);
        setStep(3);
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      if (action === "transaction-no") {
        instance.logoutRedirect();
        setCurrentState("");
        window.alert("Karibu Tena.");
      } else {
        setCurrentState("home");
      }
    }
  };

  return (
    <Wrapper>
      <TextGuide>
        <Header>Processing Transaction</Header>
      </TextGuide>
      {step === 1 && (
        <Section>
          {currentState === "confirmation" ? (
            <Text>
              You have submitted a withdrawal request for ksh. {withdrawAmount}.
              Click confirm to complete the transaction.
            </Text>
          ) : (
            <Text>
              You have submitted a funds transfer request for ksh.
              {fundTransferAmount}. Click confirm to complete the transaction.
            </Text>
          )}
          <ButtonWrap>
            <ConfirmButton
              buttontype="positive"
              onClick={(e) => handleConfirmClick(e, "confirm")}
            >
              Confirm
            </ConfirmButton>
            <ConfirmButton
              buttontype="neutral"
              onClick={(e) => handleConfirmClick(e, "back")}
            >
              Back
            </ConfirmButton>
          </ButtonWrap>
        </Section>
      )}
      {step === 2 && (
        <Section>
          <Text>Would you like to receive a receipt?</Text>
          <ButtonWrap>
            <ConfirmButton
              buttontype="positive"
              onClick={(e) => handleConfirmClick(e, "receipt-yes")}
              type="yes"
            >
              Yes
            </ConfirmButton>
            <ConfirmButton
              buttontype="negative"
              onClick={(e) => handleConfirmClick(e, "receipt-no")}
              type="no"
            >
              No
            </ConfirmButton>
          </ButtonWrap>
        </Section>
      )}
      {step === 3 && (
        <Section>
          <Text>Would you like to make another transaction?</Text>
          <ButtonWrap>
            <ConfirmButton
              buttontype="positive"
              onClick={(e) => handleConfirmClick(e, "transaction-yes")}
              type="yes"
            >
              Yes
            </ConfirmButton>
            <ConfirmButton
              buttontype="neutral"
              onClick={(e) => handleConfirmClick(e, "transaction-no")}
              type="no"
            >
              Remove Card
            </ConfirmButton>
          </ButtonWrap>
        </Section>
      )}
    </Wrapper>
  );
}

export default Confirm;
