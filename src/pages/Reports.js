import axios from "axios";
import { useState, useEffect } from "react";

export default function Reports() {
  const [reportData, setReportData] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/report`, {
        headers: {
          "X-API-Key": process.env.REACT_APP_API_KEY,
        },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setReportData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <section className="main-section">
      <section className="form-section"></section>

      <section className="form-results-section">
        {reportData && (
          <DisplayReportData
            successfulPayments={reportData.successfulPayments}
            pendingPayments={reportData.pendingPayments}
            failedPayments={reportData.failedPayments}
          />
        )}
      </section>
    </section>
  );
}

function DisplayReportData(props) {
  return (
    <>
      <h2>Payments Report Data</h2>
      <p>
        <span>Successful:</span> <span>{props.successfulPayments}</span>
      </p>
      <p>
        <span>Pending:</span> <span>{props.pendingPayments}</span>
      </p>
      <p>
        <span>Failed:</span> <span>{props.failedPayments}</span>
      </p>
      <hr></hr>
      <p>
        <span>Total Payments:</span>{" "}
        <span>
          {props.successfulPayments +
            props.pendingPayments +
            props.failedPayments}
        </span>
      </p>
      <hr></hr>
    </>
  );
}
