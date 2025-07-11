import React, { useState } from "react";
// import Footer from "./Footer.js"

// Stripe error codes (https://docs.stripe.com/error-codes)
const errorCodes = {
  account_country_invalid: {
    description: "The country of the account is not supported.",
    macro:
      "I understand how frustrating this can be. It looks like your account's country isn't supported for payments. Let's check Stripe's supported countries together, or I can help you update your account details so you can continue with your payment.",
  },
  account_invalid: {
    description: "The account is invalid.",
    macro:
      "It appears the account information provided is invalid. Please double-check your details and try again. If you need help, I'm here for you.",
  },
  account_number_invalid: {
    description: "The bank account number is invalid.",
    macro:
      "Thank you for your patience. The bank account number entered seems to be invalid. Please double-check the details and try again. If you need help, I'm here to walk you through the process.",
  },
  alipay_upgrade_required: {
    description: "Alipay merchant account needs to be upgraded.",
    macro:
      "Your Alipay merchant account needs to be upgraded to process this payment. Please follow the instructions from Alipay or let me know if you need help.",
  },
  amount_too_large: {
    description: "The amount is too large to process.",
    macro:
      "The payment amount is too large for this transaction. Please try a smaller amount or contact your bank for more information. I'm here if you need help.",
  },
  amount_too_small: {
    description: "The amount is too small to process.",
    macro:
      "The payment amount is too small for this transaction. Please try a larger amount or let me know if you need help.",
  },
  api_key_expired: {
    description: "The API key provided has expired.",
    macro:
      "It looks like your API key has expired. Please generate a new key in your Stripe dashboard. If you need help, I'm here for you.",
  },
  balance_insufficient: {
    description: "Your Stripe balance is insufficient.",
    macro:
      "Your Stripe balance is insufficient to complete this transaction. Please add funds or contact Stripe support for assistance.",
  },
  bank_account_exists: {
    description: "The bank account already exists.",
    macro:
      "This bank account is already linked to your Stripe account. If you need to update or remove it, I can guide you through the process.",
  },
  bank_account_unusable: {
    description: "The bank account provided cannot be used.",
    macro:
      "The bank account provided cannot be used for this transaction. Please use a different account or contact your bank for more information.",
  },
  bank_account_unverified: {
    description: "The bank account is not verified.",
    macro:
      "Your bank account is not verified. Please complete the verification process or let me know if you need help.",
  },
  bank_account_verification_failed: {
    description: "Bank account verification failed.",
    macro:
      "Bank account verification failed. Please double-check your information and try again. If you need help, I'm here for you.",
  },
  bitcoin_upgrade_required: {
    description: "Bitcoin receiver needs to be upgraded.",
    macro:
      "Your Bitcoin receiver needs to be upgraded to process this payment. Please follow the instructions from your Bitcoin provider or let me know if you need help.",
  },
  charge_already_captured: {
    description: "The charge has already been captured.",
    macro:
      "This charge has already been captured. If you need to process another payment, please initiate a new transaction.",
  },
  charge_already_refunded: {
    description: "The charge has already been refunded.",
    macro:
      "This charge has already been refunded. If you have questions about your refund, I'm here to help.",
  },
  charge_disputed: {
    description: "The charge has been disputed.",
    macro:
      "This charge has been disputed. Please check your Stripe dashboard for more details or let me know if you need help resolving the dispute.",
  },
  charge_exceeds_source_limit: {
    description: "The charge exceeds the source's limit.",
    macro:
      "The charge amount exceeds the source's limit. Please try a smaller amount or use a different payment method.",
  },
  charge_expired_for_capture: {
    description: "The charge has expired and cannot be captured.",
    macro:
      "This charge has expired and cannot be captured. Please initiate a new payment if needed.",
  },
  // ... (Add all other error codes from Stripe docs here)
  card_declined: {
    description: "The card was declined.",
    macro:
      "I'm sorry your payment didn't go through. Sometimes banks decline payments for security reasons. Please check with your bank for more details, or try a different card. If you need help, I'm here to support you every step of the way.",
  },
  expired_card: {
    description: "The card has expired.",
    macro:
      "It looks like your card has expired. No worries—please use a valid card and try again. If you need help updating your payment method, I’m happy to guide you.",
  },
  incorrect_cvc: {
    description: "The CVC code is incorrect.",
    macro:
      "It appears the CVC code entered is incorrect. Please double-check and try again. If you’re unsure where to find your CVC, I can help you locate it.",
  },
  incorrect_number: {
    description: "The card number is incorrect.",
    macro:
      "The card number entered doesn’t match a valid card. Please verify the number and try again. If you need help, I’m here for you.",
  },
  insufficient_funds: {
    description: "The card has insufficient funds.",
    macro:
      "It seems there aren’t enough funds on your card to complete the payment. Please check with your bank or use a different card. If you’d like, I can help you explore other payment options.",
  },
  invalid_card_type: {
    description: "The card type is not accepted.",
    macro:
      "This card type isn’t accepted for this payment. Let’s try a different card or payment method. If you need suggestions, I’m happy to help.",
  },
  lost_card: {
    description: "The card is reported lost.",
    macro:
      "Your card has been reported lost. For your security, please use another card or contact your bank for more information. If you need help updating your payment details, I’m here to assist.",
  },
  stolen_card: {
    description: "The card is reported stolen.",
    macro:
      "Your card has been reported stolen. Please use another card or contact your bank for more information. I’m here if you need help.",
  },
  processing_error: {
    description: "An error occurred while processing the card.",
    macro:
      "There was a processing error with your card. Let’s try again or use a different payment method. If the issue persists, I’ll help you troubleshoot and find a solution.",
  },
  // Add all other codes from https://docs.stripe.com/error-codes as needed

  charge_failure_risk_threshold: {
    description: "The charge failed because it was flagged as high risk.",
    macro:
      "This charge was flagged as high risk and failed for security reasons. Please verify the transaction details or consider using another payment method.",
  },
  country_unsupported: {
    description: "The specified country is not supported.",
    macro:
      "The specified country is not supported for this operation. Please review the supported countries list or contact Stripe support for alternatives.",
  },
  customer_max_payment_attempts_exceeded: {
    description: "The customer exceeded the maximum allowed payment attempts.",
    macro:
      "The customer has attempted this payment too many times. Please wait a bit before trying again or use another card or method.",
  },
  expired_card: {
    description: "The card has expired.",
    macro:
      "It looks like your card has expired. Please update your payment method with a valid card. Let me know if you need help.",
  },
  incorrect_cvc: {
    description: "The CVC code is incorrect.",
    macro:
      "The CVC code entered appears to be incorrect. Please double-check and try again, or I can assist you further.",
  },
  incorrect_number: {
    description: "The card number is incorrect.",
    macro:
      "The card number entered doesn’t seem to be valid. Please check the number or try another card. I'm here if you need assistance.",
  },
  incorrect_zip: {
    description: "The ZIP/postal code is incorrect.",
    macro:
      "The postal code entered doesn't match your card's billing address. Please verify and try again. Let me know if you need guidance.",
  },
  insufficient_funds: {
    description: "The card has insufficient funds.",
    macro:
      "There aren’t enough funds to complete this transaction. Please use another card or contact your bank. I can help if needed.",
  },
  invalid_expiry_month: {
    description: "The expiration month is invalid.",
    macro:
      "The expiration month entered is invalid. Please check and re-enter the correct expiration date.",
  },
  invalid_expiry_year: {
    description: "The expiration year is invalid.",
    macro:
      "The expiration year entered is invalid. Please check the card's expiry and try again. Let me know if you need help.",
  },
  invalid_number: {
    description: "The card number is invalid.",
    macro:
      "The card number entered isn’t valid. Please double-check and try again with a valid card.",
  },
  invalid_cvc: {
    description: "The CVC is invalid.",
    macro:
      "The CVC code entered seems invalid. Please verify the code (usually on the back of your card) and try again.",
  },
  invalid_request_error: {
    description: "The request contains invalid parameters.",
    macro:
      "The request sent to Stripe contained invalid parameters. Please double-check the request format or values.",
  },
  missing: {
    description: "A required parameter is missing.",
    macro:
      "It looks like a required field wasn’t filled in. Please complete all required fields before submitting.",
  },
  processing_error: {
    description: "An error occurred while processing the card.",
    macro:
      "A processing error occurred. Please try again or use another payment method. I'm here to help troubleshoot if needed.",
  },
  rate_limit: {
    description: "Too many requests hit the API too quickly.",
    macro:
      "Too many requests were made too quickly. Please wait a few moments and try again. Let me know if this continues.",
  },
  resource_missing: {
    description: "The requested resource does not exist.",
    macro:
      "The resource you're trying to access wasn’t found. Please verify the request or resource ID.",
  },
  testmode_charges_only: {
    description: "A live charge was attempted using a test-mode key.",
    macro:
      "You're trying to make a real charge using a test-mode API key. Please switch to your live API key and try again.",
  },
};

// Stripe decline codes (https://docs.stripe.com/declines/codes#stripe-decline-codes)
const declineCodes = {
  authentication_required: {
    description: "The card was declined because authentication is required.",
    macro:
      "Your bank requires authentication for this payment (e.g. 3D Secure). Please follow any prompts, or contact your bank if unsure. I’m here if you need help.",
  },
  approve_with_id: {
    description:
      "The payment can’t be authorized without additional identification.",
    macro:
      "Your bank needs extra identification to approve this transaction. Please contact your bank and try again. I’m here if you need help.",
  },
  call_issuer: {
    description: "The card was declined for an unknown reason.",
    macro:
      "Your card was declined. Please contact your bank for more details and try again. Let me know if you need help choosing another payment option.",
  },
  card_not_supported: {
    description: "The card doesn’t support this type of purchase.",
    macro:
      "This card isn’t supported for this kind of payment. Please use a different card or contact your bank for more information.",
  },
  card_velocity_exceeded: {
    description: "The customer has exceeded the balance or credit limit.",
    macro:
      "This card has reached its usage or transaction limit. Please try again later or use a different payment method.",
  },
  currency_not_supported: {
    description: "The card doesn’t support the specified currency.",
    macro:
      "This card does not support the currency for this payment. Please try another card or payment method. I can help if needed.",
  },
  do_not_honor: {
    description: "The card was declined without any specific reason.",
    macro:
      "Your card was declined. Please contact your bank to understand why, or use another payment method. I’m here to assist if needed.",
  },
  do_not_try_again: {
    description: "The payment should not be retried.",
    macro:
      "Your bank declined this payment and recommends not trying again. Please use another card or method. Let me know if you’d like help.",
  },
  duplicate_transaction: {
    description: "A similar transaction has already been submitted.",
    macro:
      "This payment appears to be a duplicate. Please check your account before trying again. Let me know if you'd like assistance.",
  },
  expired_card: {
    description: "The card has expired.",
    macro:
      "This card has expired. Please use a valid card and try again. Let me know if you need help updating your payment method.",
  },
  fraudulent: {
    description: "The payment was declined as potentially fraudulent.",
    macro:
      "This transaction was flagged as possibly fraudulent. Please contact your bank for more info or use a different payment method.",
  },
  generic_decline: {
    description: "The card was declined for an unknown reason.",
    macro:
      "The transaction was declined, but no specific reason was provided. Please try a different card or contact your bank. I’m here to support you.",
  },
  incorrect_number: {
    description: "The card number is incorrect.",
    macro:
      "The card number entered seems incorrect. Please double-check and try again. I can guide you if you’d like.",
  },
  incorrect_cvc: {
    description: "The card’s security code is incorrect.",
    macro:
      "The CVC code doesn’t match. Please double-check the number and try again. I’m here to help if needed.",
  },
  incorrect_pin: {
    description: "The PIN entered is incorrect.",
    macro:
      "The PIN entered was incorrect. Please try again or check with your bank for the correct PIN.",
  },
  incorrect_zip: {
    description: "The ZIP or postal code is incorrect.",
    macro:
      "The postal code doesn’t match the billing address. Please review and update it. Let me know if you need help.",
  },
  insufficient_funds: {
    description: "The card has insufficient funds.",
    macro:
      "There are not enough funds on the card to complete this transaction. Please try a different card or contact your bank.",
  },
  invalid_account: {
    description: "The card or account is invalid.",
    macro:
      "The card or account used is invalid. Please check the details or use another payment method. I’m here if you need help.",
  },
  invalid_amount: {
    description: "The payment amount is invalid or too low.",
    macro:
      "The amount entered isn't valid for processing. Please try a different amount or contact your bank. I can assist if needed.",
  },
  invalid_cvc: {
    description: "The card's CVC code is invalid.",
    macro:
      "The security code entered is invalid. Please check and try again. I’m here to help if you’re unsure where to find it.",
  },
  invalid_expiry_year: {
    description: "The expiration year is invalid.",
    macro:
      "The expiry year entered is not valid. Please double-check and try again. Let me know if you need help.",
  },
  issuer_not_available: {
    description: "The card issuer is unavailable.",
    macro:
      "Your bank couldn’t be reached to approve this transaction. Please try again later or use another card.",
  },
  lost_card: {
    description: "The card has been reported lost.",
    macro:
      "This card has been reported lost and cannot be used. Please use another card or contact your bank for a replacement.",
  },
  merchant_blacklist: {
    description: "The merchant is blacklisted.",
    macro:
      "This transaction was blocked because the merchant is blacklisted. Please try another payment method. Let me know if you need help.",
  },
  new_account_information_available: {
    description: "Updated card information is available.",
    macro:
      "Your bank has new information on this card. Please update your payment method or use another card.",
  },
  no_action_taken: {
    description: "The decline reason is unknown.",
    macro:
      "The bank declined the payment without a specific reason. Please try again later or use a different method.",
  },
  not_permitted: {
    description: "The card cannot be used for this type of transaction.",
    macro:
      "This card isn’t permitted for this kind of purchase. Please use another payment method.",
  },
  pickup_card: {
    description: "The card cannot be used; it must be retrieved by the bank.",
    macro:
      "This card can’t be used. Please contact your bank immediately and use another card.",
  },
  processing_error: {
    description: "An error occurred while processing the card.",
    macro:
      "There was a processing error. Please try again or use another payment method. I’m here to help if needed.",
  },
  reenter_transaction: {
    description: "The transaction must be reentered.",
    macro:
      "Please try re-entering the transaction. Let me know if anything seems unclear.",
  },
  restricted_card: {
    description: "The card cannot be used for this transaction.",
    macro:
      "This card is restricted and cannot be used here. Please use another card or contact your bank.",
  },
  revocation_of_all_authorizations: {
    description: "The bank revoked all authorizations for this card.",
    macro:
      "Your bank has blocked all future transactions on this card. Please use another card or contact your bank for resolution.",
  },
  security_violation: {
    description: "The card was declined due to a security violation.",
    macro:
      "The transaction was declined due to a security policy. Please contact your bank or use a different card.",
  },
  service_not_allowed: {
    description: "The bank does not allow this type of transaction.",
    macro:
      "This card is not allowed to be used for this kind of payment. Please try another payment method.",
  },
  stolen_card: {
    description: "The card has been reported stolen.",
    macro:
      "This card has been reported stolen. For your security, please use another card or contact your bank immediately.",
  },
  stop_payment_order: {
    description: "The cardholder has requested a stop on this transaction.",
    macro:
      "The cardholder has placed a stop payment on this transaction. Please use another method or contact your bank.",
  },
  testmode_decline: {
    description: "A test card number was used outside of test mode.",
    macro:
      "Test card numbers can only be used in test mode. Please switch to a real card or change your mode.",
  },
  transaction_not_allowed: {
    description: "The card is not allowed for this transaction.",
    macro:
      "This card isn't allowed for this payment. Please try another card or contact your bank.",
  },
  try_again_later: {
    description: "Something went wrong; try again later.",
    macro:
      "There was a temporary error. Please try again shortly or use another card. Let me know if you need help.",
  },
  withdrawal_count_limit_exceeded: {
    description: "The customer has exceeded the withdrawal limit.",
    macro:
      "This card has exceeded its withdrawal limit. Please wait or use another payment method.",
  },
};
  
// const declineCodes = {
//   authentication_required: {
//     description: "Authentication is required for this transaction.",
//     macro:
//       "Your bank requires additional authentication for this payment. Please follow any prompts from your bank, or contact them if you need help. I’m here if you have questions or need guidance.",
//   },
//   approve_with_id: {
//     description: "The payment could be approved with identification.",
//     macro:
//       "Your bank may need additional identification to approve this payment. Please contact your bank for next steps, and let me know if you need support.",
//   },
//   call_issuer: {
//     description: "The card issuer needs to be called for approval.",
//     macro:
//       "Please contact your card issuer to approve this transaction. If you need help with what to ask, I’m happy to guide you.",
//   },
//   card_not_supported: {
//     description: "The card is not supported.",
//     macro:
//       "This card isn’t supported for this payment. Let’s try a different card or payment method. If you need help choosing one, I’m here for you.",
//   },
//   card_velocity_exceeded: {
//     description: "The card has exceeded its velocity limit.",
//     macro:
//       "Your card has reached its transaction limit. Please wait and try again later, or use another card. If you need more information, your bank can help and I’m here to assist.",
//   },
//   currency_not_supported: {
//     description: "The currency is not supported.",
//     macro:
//       "The currency for this payment isn’t supported by your card. Please try a different card or currency. Let me know if you need help.",
//   },
//   do_not_honor: {
//     description: "The card was declined for unspecified reasons.",
//     macro:
//       "Your card was declined by the bank. Please contact your bank for more details, or try a different card. I’m here if you need help.",
//   },
//   do_not_try_again: {
//     description: "Do not try the transaction again.",
//     macro:
//       "Your bank has declined this transaction and recommends not retrying. Please use another card or payment method. Let me know if you need help.",
//   },
//   duplicate_transaction: {
//     description: "The transaction is a duplicate.",
//     macro:
//       "This transaction appears to be a duplicate. Please check your statement or try again later. If you need help, I’m here for you.",
//   },
//   expired_card: {
//     description: "The card has expired.",
//     macro:
//       "Your card has expired. Please use a valid card and try again. If you need help updating your payment method, I’m happy to guide you.",
//   },
//   insufficient_funds: {
//     description: "Not enough funds.",
//     macro:
//       "There aren’t enough funds on your card to complete the payment. Please check with your bank or use a different card. If you need help, I’m here for you.",
//   },
//   lost_card: {
//     description: "The card is reported lost.",
//     macro:
//       "Your card has been reported lost. Please use another card or contact your bank for more information. Let me know if you need help updating your payment details.",
//   },
//   stolen_card: {
//     description: "The card is reported stolen.",
//     macro:
//       "Your card has been reported stolen. Please use another card or contact your bank for more information. I’m here if you need help.",
//   },
//   transaction_not_allowed: {
//     description: "The transaction is not allowed.",
//     macro:
//       "This transaction isn’t allowed by your bank. Please contact your bank for more information, or try a different card. Let me know if you need help.",
//   },
//   // Add all other decline codes from https://docs.stripe.com/declines/codes#stripe-decline-codes as needed
// };

const PaymentDetailsForm = () => {
  const [code, setCode] = useState("");
  const [declineCode, setDeclineCode] = useState("");
  const [macro, setMacro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let macroText = "";

    if (code && errorCodes[code]) {
      macroText += `Error Code: ${code}\nDescription: ${errorCodes[code].description}\nMacro: ${errorCodes[code].macro}\n\n`;
    } else if (code) {
      macroText += `Error Code: ${code}\nDescription: Not found in Stripe docs.\nMacro: Please refer to Stripe error code documentation.\n\n`;
    }

    if (declineCode && declineCodes[declineCode]) {
      macroText += `Decline Code: ${declineCode}\nDescription: ${declineCodes[declineCode].description}\nMacro: ${declineCodes[declineCode].macro}`;
    } else if (declineCode) {
      macroText += `Decline Code: ${declineCode}\nDescription: Not found in Stripe docs.\nMacro: Please refer to Stripe decline code documentation.`;
    }

    if (!macroText) {
      macroText =
        "No macro found for the provided codes. Please check the Stripe documentation.";
    }

    setMacro(macroText);
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
        <h2
          style={{
            marginBottom: "24px",
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "#2d3748",
          }}
        >
          Stripe Payment Issue Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="code"
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "6px",
              }}
            >
              Stripe Error Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. card_declined"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                marginBottom: "6px",
              }}
              autoComplete="off"
            />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="declineCode"
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "6px",
              }}
            >
              Stripe Decline Code
            </label>
            <input
              id="declineCode"
              type="text"
              value={declineCode}
              onChange={(e) => setDeclineCode(e.target.value)}
              placeholder="e.g. insufficient_funds"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                marginBottom: "6px",
              }}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(37,99,235,0.08)",
            }}
          >
            Get Macro
          </button>
        </form>
        {/* {macro && (
          <div
            style={{
              marginTop: "32px",
              background: "#f1f5f9",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              padding: "18px",
              fontSize: "1rem",
              color: "#334155",
              whiteSpace: "pre-line",
            }}
          >
            <strong style={{ color: "#2563eb" }}>Macro for Agent:</strong>
            <div>{macro}</div>
          </div>
        )} */}

        {macro && (
          <div
            style={{
              marginTop: "32px",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              padding: "20px",
              fontSize: "1rem",
              color: "#1e293b",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                color: "#2563eb",
                fontWeight: "600",
              }}
            >
              🎯 Macro for Agent
            </h3>

            {macro.split("\n").map((line, index) => {
              if (
                line.startsWith("Error Code:") ||
                line.startsWith("Decline Code:")
              ) {
                return (
                  <p
                    key={index}
                    style={{ fontWeight: "600", marginBottom: "6px" }}
                  >
                    🧾 {line}
                  </p>
                );
              } else if (line.startsWith("Description:")) {
                return (
                  <p
                    key={index}
                    style={{ marginBottom: "6px", fontStyle: "italic" }}
                  >
                    📘 {line}
                  </p>
                );
              } else if (line.startsWith("Macro:")) {
                return (
                  <div
                    key={index}
                    style={{
                      marginTop: "10px",
                      padding: "12px",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "6px",
                      whiteSpace: "pre-line",
                      borderLeft: "4px solid #2563eb",
                      color: "#334155",
                    }}
                  >
                    ✍️ {line.replace("Macro: ", "")}
                  </div>
                );
              } else {
                return <p key={index}>{line}</p>;
              }
            })}

            {/* <button
              onClick={() => navigator.clipboard.writeText(macro)}
              style={{
                marginTop: "16px",
                padding: "10px 16px",
                fontSize: "0.95rem",
                fontWeight: "500",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              📋 Copy Macro
            </button> */}
          </div>
        )}

        <div
          style={{
            marginTop: "28px",
            fontSize: "0.95em",
            color: "#64748b",
            textAlign: "center",
          }}
        >
          <a
            href="https://docs.stripe.com/error-codes"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Stripe Error Codes
          </a>
          {" | "}
          <a
            href="https://docs.stripe.com/declines/codes#stripe-decline-codes"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Stripe Decline Codes
          </a>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PaymentDetailsForm;
