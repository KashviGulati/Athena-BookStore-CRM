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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 8px",
  },
  meta: {
    display: "flex",
    gap: "16px",
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
      status === "launched"
        ? "#dcfce7"
        : status === "pending"
        ? "#fef9c3"
        : "#f3f4f6",
    color:
      status === "launched"
        ? "#15803d"
        : status === "pending"
        ? "#a16207"
        : "#4b5563",
  }),
  button: {
    padding: "8px 16px",
    background: "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const response = await api.get("/campaigns/");
    setCampaigns(response.data);
  };

  const launchCampaign = async (id) => {
    const response = await api.post(`/campaigns/${id}/launch/`);
    alert(`${response.data.communications_created} communications created`);
    await fetchCampaigns();
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Campaigns</h1>
        <p style={styles.subtitle}>{campaigns.length} campaigns total</p>
      </div>

      <div style={styles.list}>
        {campaigns.map((campaign) => (
          <div key={campaign.id} style={styles.card}>
            <div style={styles.cardLeft}>
              <p style={styles.cardTitle}>Campaign #{campaign.id}</p>
              <div style={styles.meta}>
                <span style={styles.metaItem}>
                  Goal: <span style={styles.metaValue}>{campaign.goal}</span>
                </span>
                <span style={styles.metaItem}>
                  Channel: <span style={styles.metaValue}>{campaign.channel}</span>
                </span>
                <span style={styles.statusBadge(campaign.status)}>
                  {campaign.status}
                </span>
              </div>
            </div>
            <button
              style={styles.button}
              onClick={() => launchCampaign(campaign.id)}
            >
              Launch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}