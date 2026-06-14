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
  controls: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "28px",
  },
  select: {
    padding: "9px 14px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    background: "#ffffff",
    color: "#111827",
    outline: "none",
    minWidth: "260px",
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
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "14px",
  },
  statCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "18px 20px",
  },
  statLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: 0,
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
    margin: "6px 0 0",
    lineHeight: 1,
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    margin: "0 0 14px",
  },
};

const STAT_FIELDS = [
  { key: "sent", label: "Sent" },
  { key: "delivered", label: "Delivered" },
  { key: "failed", label: "Failed" },
  { key: "opened", label: "Opened" },
  { key: "clicked", label: "Clicked" },
];

export default function Analytics() {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignId, setCampaignId] = useState("");
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const response = await api.get("/campaigns/");
    setCampaigns(response.data);
  };

  const fetchAnalytics = async () => {
    if (!campaignId) return;
    const response = await api.get(`/campaigns/${campaignId}/analytics/`);
    setAnalytics(response.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Analytics</h1>
        <p style={styles.subtitle}>Campaign performance breakdown</p>
      </div>

      <div style={styles.controls}>
        <select
          style={styles.select}
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        >
          <option value="">Select a campaign…</option>
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              Campaign #{campaign.id} — {campaign.segment_name}
            </option>
          ))}
        </select>
        <button style={styles.button} onClick={fetchAnalytics}>
          Load Analytics
        </button>
      </div>

      {analytics && (
        <>
          <p style={styles.sectionTitle}>Campaign #{analytics.campaign_id}</p>
          <div style={styles.statsGrid}>
            {STAT_FIELDS.map(({ key, label }) => (
              <div key={key} style={styles.statCard}>
                <p style={styles.statLabel}>{label}</p>
                <p style={styles.statValue}>{analytics[key] ?? "—"}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}