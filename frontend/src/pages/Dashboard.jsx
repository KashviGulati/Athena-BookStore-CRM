import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    const response = await api.get(
      "/dashboard/"
    );

    setStats(
      response.data
    );
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            minWidth: "150px"
          }}
        >
          <h3>Customers</h3>
          <p>{stats.customers}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            minWidth: "150px"
          }}
        >
          <h3>Orders</h3>
          <p>{stats.orders}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            minWidth: "150px"
          }}
        >
          <h3>Personas</h3>
          <p>{stats.personas}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            minWidth: "150px"
          }}
        >
          <h3>Campaigns</h3>
          <p>{stats.campaigns}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            minWidth: "150px"
          }}
        >
          <h3>Communications</h3>
          <p>{stats.communications}</p>
        </div>

      </div>

    </div>
  );
}