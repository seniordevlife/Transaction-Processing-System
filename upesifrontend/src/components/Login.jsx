// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { useMsal } from "@azure/msal-react";
// import { useIsAuthenticated } from "@azure/msal-react";

// const Wrapper = styled.div`
//   width: 100%;
//   height: calc(100% - 4rem);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Button = styled.button`
//   height: 3rem;
//   width: 10rem;
//   font-size: 1.3rem;
//   padding: 0 0 0 10px;
// `;

// function Login({ currentState, setCurrentState }) {
//   const { instance } = useMsal();
//   const isAuthenticated = useIsAuthenticated();

//   const handleClick = () => {
//     instance.loginRedirect({
//       scopes: ["user.read"],
//     });
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       setCurrentState("start");
//     }
//   }, [isAuthenticated]);

//   return (
//     <Wrapper>
//       <Button onClick={handleClick}>Login</Button>
//     </Wrapper>
//   );
// }

// export default Login;
