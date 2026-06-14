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
    marginBottom: "24px",
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
  button: {
    padding: "9px 18px",
    background: "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "24px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "18px 24px",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 10px",
  },
  meta: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  metaItem: {
    fontSize: "13px",
    color: "#6b7280",
  },
  metaValue: {
    fontWeight: "500",
    color: "#374151",
  },
  statusBadge: (status) => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    background:
      status === "delivered"
        ? "#dcfce7"
        : status === "failed"
        ? "#fee2e2"
        : status === "pending"
        ? "#fef9c3"
        : "#f3f4f6",
    color:
      status === "delivered"
        ? "#15803d"
        : status === "failed"
        ? "#b91c1c"
        : status === "pending"
        ? "#a16207"
        : "#4b5563",
  }),
};

export default function ChannelSimulator() {
  const [communications, setCommunications] = useState([]);

  const loadCommunications = async () => {
    const response = await api.get("/channel/pending/");
    setCommunications(response.data);
  };

  const simulate = async () => {
    await api.post("/channel/simulate/");
    loadCommunications();
  };

  useEffect(() => {
    loadCommunications();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Channel Simulator</h1>
        <p style={styles.subtitle}>
          Simulates delivery provider callbacks back into the CRM
        </p>
      </div>

      <button style={styles.button} onClick={simulate}>
        Process Pending Messages
      </button>

      <div style={styles.list}>
        {communications.map((c) => (
          <div key={c.id} style={styles.card}>
            <p style={styles.cardTitle}>Communication #{c.id}</p>
            <div style={styles.meta}>
              <span style={styles.metaItem}>
                Customer: <span style={styles.metaValue}>{c.customer}</span>
              </span>
              <span style={styles.metaItem}>
                Campaign: <span style={styles.metaValue}>{c.campaign}</span>
              </span>
              <span style={styles.statusBadge(c.status)}>{c.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}