import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AtmBranch from "./components/AtmBranch";
import Withdraw from "./components/Withdraw";
import Confirm from "./components/Confirm";
import AccountBalance from "./components/AccountBalance";
import FundTransfer from "./components/FundTransfer";
import {
  getCustomerByEmail,
  getLatestCustomerTransaction,
  getCustomers,
} from "./apiCalls";

import {
  MsalProvider,
  useMsal,
  useIsAuthenticated,
  useMsalAuthentication,
} from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";
import { fetchData } from "./fetchData";
import { getAtmBranches } from "./apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: end;
`;

const Content = styled.div`
  height: calc(100vh - 4rem);
  width: 100%;
  background: #9df3c4;
`;

function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <PageRender />
    </MsalProvider>
  );
}

const PageRender = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [availableAtmBranches, setAvailableAtmBranches] = useState([]);
  const [allCustomerAccounts, setAllCustomerAccounts] = useState([]);
  const [currentState, setCurrentState] = useState("");
  const [selectedAtmBranch, setSelectedAtmBranch] = useState(null);
  const [selectedTransferCustomer, setSelectedTransferCustomer] =
    useState(null);
  const [transferLatestTransaction, setTransferLatestTransaction] =
    useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [fundTransferAmount, setFundTransferAmount] = useState(0);
  const [graphData, setGraphData] = useState(null);
  const [customer, setCustomer] = useState({});
  const [receiptReq, setReceiptReq] = useState(false);
  const [myAccessToken, setMyAccessToken] = useState("");
  const [latestTransaction, setLatestTransaction] = useState(null);

  const { result, error } = useMsalAuthentication(InteractionType.Popup, {
    scopes: ["user.read"],
    claims: sessionStorage.getItem("claimsChallenge")
      ? window.atob(sessionStorage.getItem("claimsChallenge"))
      : undefined,
  });

  useEffect(() => {
    getLatestCustomerTransaction(
      customer.customerId,
      myAccessToken,
      setLatestTransaction
    );
  }, [myAccessToken, customer, currentState]);

  useEffect(() => {
    if (!!selectedTransferCustomer) {
      getLatestCustomerTransaction(
        selectedTransferCustomer.customerId,
        myAccessToken,
        setTransferLatestTransaction
      );
    }
  }, [myAccessToken, customer, currentState, selectedTransferCustomer]);

  useEffect(() => {
    if (!!graphData) {
      getCustomerByEmail(graphData.mail, myAccessToken, setCustomer);
    }
  }, [graphData, myAccessToken]);

  useEffect(() => {
    getAtmBranches(myAccessToken, setAvailableAtmBranches);
  }, [myAccessToken]);

  useEffect(() => {
    getCustomers(myAccessToken, setAllCustomerAccounts);
  }, [myAccessToken]);

  useEffect(() => {
    if (!!graphData) {
      return;
    }

    if (!!error) {
      return;
    }

    if (result) {
      const { accessToken } = result;
      setMyAccessToken(accessToken);
      fetchData("https://graph.microsoft.com/v1.0/me", accessToken)
        .then((res) => setGraphData(res))
        .catch((err) => console.log(err));
    }
  }, [graphData, result, error]);

  let RenderComponent;

  switch (currentState) {
    case "withdrawal":
      RenderComponent = Withdraw;
      break;
    case "home":
      RenderComponent = Home;
      break;
    case "branch":
      RenderComponent = AtmBranch;
      break;
    case "balance":
      RenderComponent = AccountBalance;
      break;
    case "confirmation":
      RenderComponent = Confirm;
      break;
    case "transferprocessing":
      RenderComponent = Confirm;
      break;
    case "transfer":
      RenderComponent = FundTransfer;
      break;
    default:
      RenderComponent = AtmBranch;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      instance
        .ssoSilent({
          scopes: ["user.read"],
          loginHint: "",
        })
        .then((res) => {
          instance.setActiveAccount(res.account);
        })
        .catch((err) => {
          if (err instanceof InteractionRequiredAuthError) {
            instance.loginRedirect({
              scopes: ["user.read"],
            });
          }
        });
    }
  }, [isAuthenticated, instance]);

  return (
    <Container>
      <Navbar setCurrentState={setCurrentState} />
      <Content>
        {
          <RenderComponent
            customer={customer}
            graphData={graphData}
            receiptReq={receiptReq}
            setReceiptReq={setReceiptReq}
            myAccessToken={myAccessToken}
            currentState={currentState}
            selectedAtmBranch={selectedAtmBranch}
            setSelectedAtmBranch={setSelectedAtmBranch}
            availableAtmBranches={availableAtmBranches}
            setCurrentState={setCurrentState}
            withdrawAmount={withdrawAmount}
            latestTransaction={latestTransaction}
            setLatestTransaction={setLatestTransaction}
            setWithdrawAmount={setWithdrawAmount}
            fundTransferAmount={fundTransferAmount}
            setFundTransferAmount={setFundTransferAmount}
            selectedTransferCustomer={selectedTransferCustomer}
            setSelectedTransferCustomer={setSelectedTransferCustomer}
            allCustomerAccounts={allCustomerAccounts}
            setAllCustomerAccounts={setAllCustomerAccounts}
            transferLatestTransaction={transferLatestTransaction}
          />
        }
      </Content>
    </Container>
  );
};

export default App;
