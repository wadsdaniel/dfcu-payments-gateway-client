import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import axios from 'axios';
import { useState, useEffect } from "react";
import { use } from "react";

export default function Reports() {

  const [reportData, setReportData] = useState();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/report', {
      headers: {
        'X-API-Key': '1WlgIV1W80rXmp2Txq3BcZsBFoR7NoshNnBXsw36HAQgam1mHsOfkATz4nQsg9al'
      }
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
  }
  , []);

    return (
      <section className="main-section">

      <section className="form-section">
      </section>
     
      <section className="form-results-section">
      {
        reportData && <DisplayReportData successfulPayments={reportData.successfulPayments} pendingPayments={reportData.pendingPayments} failedPayments={reportData.failedPayments}/>
      }
      </section>
     
      </section>
    );
}

function DisplayReportData(props){
  return (
    <> 
      <h2>Payments Report Data</h2>
      <p><span>Successful:</span> <span>{props.successfulPayments}</span></p>
      <p><span>Pending:</span> <span>{props.pendingPayments}</span></p>
      <p><span>Failed:</span> <span>{props.failedPayments}</span></p>
      <hr></hr>
      <p><span>Total Payments:</span> <span>{props.successfulPayments + props.pendingPayments + props.failedPayments}</span></p>
      <hr></hr>
    </>
  )
}