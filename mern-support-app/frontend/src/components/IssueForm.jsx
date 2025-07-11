import React from "react";
import { useHistory } from "react-router-dom";
// import Footer from "./Footer.js"

const IssueForm = () => {
  const history = useHistory();

  const handleIssueSelection = (type) => {
    if (type === "Payment") {
      history.push("/payment-issue");
    } else {
      alert("Payout option is not implemented yet.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        // minHeight: "100vh",
        // background: "#f7f8fa",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          padding: "32px",
          maxWidth: "420px",
          width: "100%",
          marginTop: "48px",
        }}
      >
        <h1
          style={{
            marginBottom: "24px",
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "#2d3748",
          }}
        >
          What is the user's issue?
        </h1>
        <button
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "16px",
          }}
          onClick={() => handleIssueSelection("Payment")}
        >
          Payment
        </button>
        <button
          style={{
            width: "100%",
            padding: "14px",
            background: "#e2e8f0",
            color: "#334155",
            fontWeight: "600",
            fontSize: "1rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={() => handleIssueSelection("Payout")}
        >
          Payout
        </button>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default IssueForm;
