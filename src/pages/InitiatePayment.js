import { set, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";

export default function InitiatePayment() {
  const [paymentInitiateResponse, setPaymentInitiateResponse] = useState();
  const [paymentInitiateError, setPaymentInitiateError] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    axios
      .post(
        "http://127.0.0.1:5000/api/payments",
        {
          payerAccountNumber: data.payer,
          payeeAccountNumber: data.payee,
          amount: data.amount,
          currency: data.amount,
          payerReference: data.payerReference,
        },
        {
          headers: {
            "X-API-Key":
              "1WlgIV1W80rXmp2Txq3BcZsBFoR7NoshNnBXsw36HAQgam1mHsOfkATz4nQsg9al",
          },
        }
      )
      .then(function (response) {
        setPaymentInitiateError(null);
        setPaymentInitiateResponse(response.data);
      })
      .catch(function (error) {
        setPaymentInitiateResponse(null);
        setPaymentInitiateError(error.response.data);
        console.log(error.response.data);
      });
  };

  return (
    <section className="main-section">
      <section className="form-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Payer</span>
            <input
              type="number"
              {...register("payer", {
                required: "Payer is required.",
                minLength: {
                  value: 10,
                  message: "Payer account number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Payer account number must be 10 digits",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="payer"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p className="form-error" key={type}>
                    {message}
                  </p>
                ))
              }
            />
          </label>

          <br />

          <label>
            <span>Payee</span>
            <input
              type="number"
              {...register("payee", {
                required: "Payee is required.",
                minLength: {
                  value: 10,
                  message: "Payee account number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Payee account number must be 10 digits",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="payee"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p className="form-error" key={type}>
                    {message}
                  </p>
                ))
              }
            />
          </label>

          <br />

          <label>
            <span>Amount</span>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required.",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="amount"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p className="form-error" key={type}>
                    {message}
                  </p>
                ))
              }
            />
          </label>

          <br />

          <label>
            <span>Select currency</span>
            <select {...register("currency")}>
              <option value="UGX">UGX</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </label>

          <br />

          <label>
            <span>Payer Reference</span>
            <textarea {...register("payerReference", { required: false })} />
          </label>

          <br />

          <div className="submit-btn-wrapper">
            <input type="submit" />
          </div>
        </form>
      </section>

      <section className="form-results-section">
        {paymentInitiateResponse && (
          <InitiatePaymentResponse
            transactionReference={paymentInitiateResponse.transactionReference}
            statusCode={paymentInitiateResponse.statusCode}
            responseMessage={paymentInitiateResponse.responseMessage}
          />
        )}

        {paymentInitiateError && (
          <InitiatePaymentError message={paymentInitiateError.message} />
        )}
      </section>
    </section>
  );
}

function InitiatePaymentResponse(props) {
  return (
    <>
      <h2>Transaction Response Details</h2>
      <p>
        <span>Transaction Reference:</span>{" "}
        <span>{props.transactionReference}</span>
      </p>
      <p>
        <span>Status:</span> <span>{props.statusCode}</span>
      </p>
      <p>
        <span>Response Message:</span> <span>{props.responseMessage}</span>
      </p>
    </>
  );
}

function InitiatePaymentError(props) {
  return (
    <>
      <p>{props.message}</p>
    </>
  );
}
