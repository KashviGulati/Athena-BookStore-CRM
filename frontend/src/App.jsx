import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Athena from "./pages/Athena";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";
import ChannelSimulator from "./pages/ChannelSimulator";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#e2e8f0",
        }}
      >
        <aside
          style={{
            width: "240px",
            background: "#111827",
            color: "white",
            padding: "24px",
          }}
        >
          <h2
            style={{
              marginBottom: "30px",
            }}
          >
            Athena CRM
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              Dashboard
            </Link>

            <Link
              to="/customers"
              style={{ color: "white", textDecoration: "none" }}
            >
              Customers
            </Link>

            <Link
              to="/athena"
              style={{ color: "white", textDecoration: "none" }}
            >
              Athena Agent
            </Link>

            <Link
              to="/campaigns"
              style={{ color: "white", textDecoration: "none" }}
            >
              Campaigns
            </Link>

            <Link
              to="/analytics"
              style={{ color: "white", textDecoration: "none" }}
            >
              Analytics
            </Link>
            <Link to="/channel"
            style={{ color: "white", textDecoration: "none" }}
            >
             Channel Service
            </Link>
          </div>
        </aside>

        <main
          style={{
            flex: 1,
            padding: "32px",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/athena" element={<Athena />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/channel" element={<ChannelSimulator />}
/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;