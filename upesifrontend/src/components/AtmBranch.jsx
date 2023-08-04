import "../index.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";

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
  height: 25vh;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  height: 3rem;
  width: 10rem;
  min-width: 6rem;
  margin: 50px 10px 0 10px;
  font-size: 1.3rem;
  color: ${(props) =>
    props.buttontype === "positive" ? "#f1f1f1" : "#3434343"};
  background: #1e90ff;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    borderColor: state.isFocused ? "green" : "gray",
    boxShadow: state.isFocused ? "0 0 0 1px blue" : null,
    "&:hover": { borderColor: "blue" },
    minWidth: "15rem",
    maxWidth: "25rem",
    fontSize: "1.3rem",
    height: "3rem",
    cursor: "pointer",
  }),
};

function AtmBranch({
  selectedAtmBranch,
  setSelectedAtmBranch,
  setCurrentState,
  availableAtmBranches,
}) {
  const [branchOptions, setBranchOptions] = useState([]);

  const handleChange = (option) => {
    setSelectedAtmBranch(option);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!!selectedAtmBranch) {
      setCurrentState("home");
    } else {
      window.alert("Please choose an ATM Branch");
    }
  };

  const createBranchOptions = (branches) => {
    return branches.map((branch) => ({
      value: branch.id,
      label: branch.location,
    }));
  };

  useEffect(() => {
    if (!!availableAtmBranches) {
      setBranchOptions(createBranchOptions(availableAtmBranches));
    }
  }, [availableAtmBranches]);

  return (
    <Wrapper>
      <Section>
        <Select
          styles={customStyles}
          value={selectedAtmBranch}
          onChange={handleChange}
          options={branchOptions}
          placeholder="Select your preferred branch"
        />
        <ButtonWrap>
          <Button buttontype="positive" onClick={handleClick}>
            Proceed
          </Button>
        </ButtonWrap>
      </Section>
    </Wrapper>
  );
}

export default AtmBranch;
