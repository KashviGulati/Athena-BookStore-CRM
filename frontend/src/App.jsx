import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Customers from "./pages/Customers"
import Athena from "./pages/Athena"
import Campaigns from "./pages/Campaigns"
import Analytics from "./pages/Analytics"

function App() {
  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Dashboard</Link>{" | "}
        <Link to="/customers">Customers</Link>{" | "}
        <Link to="/athena">Athena</Link>{" | "}
        <Link to="/campaigns">Campaigns</Link>{" | "}
        <Link to="/analytics">Analytics</Link>
      </nav>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/athena"
          element={<Athena />}
        />

        <Route
          path="/campaigns"
          element={<Campaigns />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App