// import { publicRequest, userRequest } from "./requestMethods";
import axios from "axios";

export const getCustomers = (token, stateSetter) => {
  const apiRequest = axios.create({
    baseURL: "http://20.22.159.96/api",
    headers: {
      "Content-Type": "application/json",
      Token: `Bearer ${token}`,
    },
  });

  apiRequest
    .get("Customers")
    .then((res) => stateSetter(res.data))
    .catch((err) => console.log(err));
};

export const getAtmBranches = (token, stateSetter) => {
  const apiRequest = axios.create({
    baseURL: "http://20.22.159.96/api",
    headers: {
      "Content-Type": "application/json",
      Token: `Bearer ${token}`,
    },
  });

  apiRequest
    .get("Atms")
    .then((res) => stateSetter(res.data))
    .catch((err) => console.log(err));
};

export const getCustomerByEmail = (email, token, stateSetter) => {
  const apiRequest = axios.create({
    baseURL: "http://20.22.159.96/api",
    headers: {
      "Content-Type": "application/json",
      Token: `Bearer ${token}`,
    },
  });

  apiRequest
    .get(`Customers?email=${email}`)
    .then((res) => stateSetter(res.data))
    .catch((err) => console.log(err));
};

export const getLatestCustomerTransaction = (
  customerId,
  token,
  stateSetter
) => {
  const apiRequest = axios.create({
    baseURL: "http://20.22.159.96/api",
    headers: {
      "Content-Type": "application/json",
      Token: `Bearer ${token}`,
    },
  });

  apiRequest
    .get(`Transactions/latest?customerId=${customerId}`)
    .then((res) => stateSetter(res.data))
    .catch((err) => console.log(err));
};

export const makeTransaction = (customerId, atmId, token, postData) => {
  const apiRequest = axios.create({
    baseURL: "http://20.22.159.96/api",
    headers: {
      "Content-Type": "application/json",
      Token: `Bearer ${token}`,
    },
  });

  apiRequest
    .post(`Transactions?atmId=${atmId}&customerId=${customerId}`, postData)
    .then((res) => console.log("Transfer successful"))
    .catch((err) => console.log("Transfer error"));
};

export const updateAtmBalance = (atmId, token, updateData) => {
  const apiRequest = axios.create({
    baseURL: "http://20.22.159.96/api",
    headers: {
      "Content-Type": "application/json",
      Token: `Bearer ${token}`,
    },
  });

  apiRequest
    .put(`Atms?atmId=${atmId}`, updateData)
    .then((res) => console.log("Transfer successful"))
    .catch((err) => console.log("Transfer error"));
};
