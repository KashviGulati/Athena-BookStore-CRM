import { useState } from "react";
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
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    background: "#ffffff",
    color: "#111827",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  resultCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    borderBottom: "1px solid #f3f4f6",
    paddingBottom: "16px",
  },
  sectionLast: {
    paddingBottom: 0,
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: "0 0 6px",
  },
  sectionValue: {
    fontSize: "14px",
    color: "#111827",
    margin: 0,
    lineHeight: "1.6",
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    background: "#e0e7ff",
    color: "#4338ca",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
  audienceBadge: {
    display: "inline-block",
    padding: "3px 10px",
    background: "#f0fdf4",
    color: "#15803d",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
};

export default function Athena() {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(null);

  const generateCampaign = async () => {
    const response = await api.post("/athena/generate-campaign/", { goal });
    setResult(response.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Athena Agent</h1>
        <p style={styles.subtitle}>Describe a goal and Athena will plan the campaign</p>
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Re-engage customers who haven't bought in 60 days"
        />
        <button style={styles.button} onClick={generateCampaign}>
          Generate Campaign
        </button>
      </div>

      {result && (
        <div style={styles.resultCard}>
          <div style={styles.section}>
            <p style={styles.sectionLabel}>Segment</p>
            <span style={styles.badge}>{result.segment}</span>
            {result.audience_size != null && (
              <span style={{ ...styles.audienceBadge, marginLeft: "8px" }}>
                {result.audience_size} readers
              </span>
            )}
          </div>

          <div style={styles.section}>
            <p style={styles.sectionLabel}>Reasoning</p>
            <p style={styles.sectionValue}>{result.reasoning}</p>
          </div>

          <div style={styles.section}>
            <p style={styles.sectionLabel}>Channel</p>
            <p style={styles.sectionValue}>{result.channel}</p>
          </div>

          <div style={styles.sectionLast}>
            <p style={styles.sectionLabel}>Message</p>
            <p style={styles.sectionValue}>{result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}