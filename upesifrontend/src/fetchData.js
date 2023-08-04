export const fetchData = (endpoint, accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(endpoint, options)
    .then((res) => handleClaimsChallenge(res))
    .catch((err) => console.log(err));
};

const handleClaimsChallenge = (response) => {
  if (response.status === 200) {
    return response.json();
  } else if (response.status === 401) {
    if (response.headers.get("www-authenticate")) {
      const authenticateHeader = response.headers.get("www-authenticate");

      const claimsChallenge = authenticateHeader
        .split(" ")
        .find((entry) => entry.includes("claims="))
        .split('claims="')[1]
        .split('",')[0];

      sessionStorage.setItem("claimsChallenge", claimsChallenge);
      return;
    }

    throw new Error(`Error ${response.status}`);
  } else {
    throw new Error(`Error ${response.status}`);
  }
};
