import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import CookiePageHeader from "@/components/Cookies/CookiePageHeader";

function Receipt() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleBack() {
    router.push("/cookies");
  }
  return (
    <Wrapper>
      <CookiePageHeader
        currentStep={2}
        totalSteps={3}
        handleBack={handleBack}
      />
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

const Wrapper = styled.div`
  height: 100%;
`;

export default Receipt;
