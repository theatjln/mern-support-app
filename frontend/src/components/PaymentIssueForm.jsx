import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import Footer from "./Footer.js"

const PaymentIssueForm = () => {
  const [issue, setIssue] = useState("");
  const history = useHistory();

  const handleIssueChange = (event) => {
    setIssue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push("/payment-details");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        // minHeight: "auto",
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
        <h2
          style={{
            marginBottom: "24px",
            fontWeight: "600",
            fontSize: "1.3rem",
            color: "#2d3748",
          }}
        >
          What is the issue with the payment?
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              <input
                type="radio"
                value="Decline"
                checked={issue === "Decline"}
                onChange={handleIssueChange}
                style={{ marginRight: "8px" }}
              />
              Decline
            </label>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              <input
                type="radio"
                value="Failed"
                checked={issue === "Failed"}
                onChange={handleIssueChange}
                style={{ marginRight: "8px" }}
              />
              Failed
            </label>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              <input
                type="radio"
                value="Blocked"
                checked={issue === "Blocked"}
                onChange={handleIssueChange}
                style={{ marginRight: "8px" }}
              />
              Blocked
            </label>
          </div>
          <button
            type="submit"
            disabled={!issue}
            style={{
              width: "100%",
              padding: "12px",
              background: issue ? "#2563eb" : "#cbd5e1",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              border: "none",
              borderRadius: "6px",
              cursor: issue ? "pointer" : "not-allowed",
            }}
          >
            Next
          </button>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PaymentIssueForm;
