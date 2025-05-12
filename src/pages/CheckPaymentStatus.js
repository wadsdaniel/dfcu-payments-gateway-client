import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";

export default function CheckPaymentStatus() {
  const [paymentStatusResponse, setPaymentStatusResponse] = useState();
  const [paymentStatusError, setPaymentStatusError] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/payments/${data.transactionReference}`,
        {
          headers: {
            "X-API-Key": process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then(function (response) {
        // handle success
        console.log(response);
        setPaymentStatusError(null);
        setPaymentStatusResponse(response.data.data);
      })
      .catch(function (error) {
        setPaymentStatusResponse(null);
        setPaymentStatusError(error);
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <section className="main-section">
      <section className="form-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Transaction Reference</span>
            <input
              type="number"
              {...register("transactionReference", {
                required: "Please enter the transaction reference.",
                minLength: {
                  value: 12,
                  message: "Transaction reference must be 12 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Transaction reference must be 12 digits",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="transactionReference"
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

          <div className="submit-btn-wrapper">
            <input type="submit" />
          </div>
        </form>
      </section>

      <section className="form-results-section">
        {paymentStatusResponse && (
          <PaymentStatusResponse
            responseMessage={paymentStatusResponse.response_message}
          />
        )}

        {paymentStatusError && <PaymentStatusError />}
      </section>
    </section>
  );
}

function PaymentStatusResponse(props) {
  return (
    <>
      <h2>Payment Status Details</h2>
      <p>
        <span>Status:</span> <span>{props.responseMessage}</span>
      </p>
    </>
  );
}

function PaymentStatusError() {
  return (
    <p className="error-text">
      <span>Error:</span> <span>Transaction reference not found.</span>
    </p>
  );
}
