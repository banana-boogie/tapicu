import React, { useState } from "react";
import styled from "styled-components";

function Receipt() {
  const [email, setEmail] = useState("");
  return (
    <Wrapper>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Receipt;
