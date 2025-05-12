import { Outlet } from "react-router-dom";
import { NavLink } from "react-router";

export default function Layout() {
  return (
    <>
      <header>

        <section className="logo-section">
          <img src="/dfcu-logo.png" alt="DFCU Logo" />
        </section>

        <section className="nav-section">
          <nav>
            <ul>           
              <li>
                <NavLink to="/payments/initate">Initiate Payment</NavLink>
              </li>
              <li>
                <NavLink to="/payments/check-status">Check Payment Status</NavLink>
              </li>  
              <li>
                <NavLink to="/payments/reports">Reports</NavLink>
              </li>         
            </ul>
          </nav>
        </section>
        
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
