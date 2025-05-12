import "./App.css";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import InitiatePayment from "./pages/InitiatePayment";
import NoPage from "./pages/NoPage";
import CheckPaymentStatus from "./pages/CheckPaymentStatus";
import Reports from "./pages/Reports";
// import 'dotenv/config'

export default function App() {

  // console.log("Environment Variables");
  // console.log(process.env)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InitiatePayment />} />
          <Route path="payments/initate" element={<InitiatePayment />} />
          <Route path="payments/check-status" element={<CheckPaymentStatus />} />
          <Route path="payments/reports" element={<Reports />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
