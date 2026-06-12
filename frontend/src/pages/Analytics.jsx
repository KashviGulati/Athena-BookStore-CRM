import { useEffect, useState } from "react";
import api from "../services/api";

export default function Analytics() {

  const [campaigns, setCampaigns] = useState([]);

  const [campaignId, setCampaignId] = useState("");

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {

    const response = await api.get(
      "/campaigns/"
    );

    setCampaigns(
      response.data
    );
  };

  const fetchAnalytics = async () => {

    if (!campaignId) return;

    const response = await api.get(
      `/campaigns/${campaignId}/analytics/`
    );

    setAnalytics(
      response.data
    );
  };

  return (
    <div>

      <h2>Campaign Analytics</h2>

      <select
        value={campaignId}
        onChange={(e) =>
          setCampaignId(e.target.value)
        }
      >

        <option value="">
          Select Campaign
        </option>

        {campaigns.map((campaign) => (

          <option
            key={campaign.id}
            value={campaign.id}
          >
            Campaign #{campaign.id} - {campaign.segment_name}
          </option>

        ))}

      </select>

      <button
        onClick={fetchAnalytics}
      >
        Load Analytics
      </button>

      {analytics && (

        <div
          style={{
            marginTop: "20px",
            border: "1px solid gray",
            padding: "15px"
          }}
        >

          <h3>
            Campaign #{analytics.campaign_id}
          </h3>

          <p>
            <strong>Sent:</strong>{" "}
            {analytics.sent}
          </p>

          <p>
            <strong>Delivered:</strong>{" "}
            {analytics.delivered}
          </p>

          <p>
            <strong>Failed:</strong>{" "}
            {analytics.failed}
          </p>

          <p>
            <strong>Opened:</strong>{" "}
            {analytics.opened}
          </p>

          <p>
            <strong>Clicked:</strong>{" "}
            {analytics.clicked}
          </p>

        </div>

      )}

    </div>
  );
}