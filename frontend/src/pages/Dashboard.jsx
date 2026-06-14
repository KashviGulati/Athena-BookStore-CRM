import { useEffect, useState } from "react";
import api from "../services/api";

const styles = {
  page: {
    padding: "32px 40px",
    fontFamily: "'Inter', sans-serif",
    background: "#f8f9fb",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "20px 24px",
    border: "1px solid #e5e7eb",
  },
  cardLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: 0,
  },
  cardValue: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#4f46e5",
    margin: "8px 0 0",
    lineHeight: 1,
  },
  loading: {
    padding: "40px",
    color: "#6b7280",
    fontFamily: "'Inter', sans-serif",
  },
};

const STAT_LABELS = {
  customers: "Customers",
  orders: "Orders",
  personas: "Personas",
  campaigns: "Campaigns",
  communications: "Communications",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const response = await api.get("/dashboard/");
    setStats(response.data);
  };

  if (!stats) {
    return <p style={styles.loading}>Loading dashboard…</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>AI-powered customer intelligence for BookWise</p>
      </div>

      <div style={styles.grid}>
        {Object.entries(STAT_LABELS).map(([key, label]) => (
          <div key={key} style={styles.card}>
            <p style={styles.cardLabel}>{label}</p>
            <p style={styles.cardValue}>{stats[key] ?? "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}