import { useEffect, useState } from "react";
import api from "../services/api";

export default function Campaigns() {

  const [campaigns, setCampaigns] = useState([]);

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

  const launchCampaign = async (id) => {

    const response = await api.post(
      `/campaigns/${id}/launch/`
    );

    alert(
      `${response.data.communications_created} communications created`
    );
    await fetchCampaigns();
  };

  return (
    <div>

      <h2>Campaigns</h2>

      {campaigns.map((campaign) => (

        <div
          key={campaign.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >

          <h3>
            Campaign #{campaign.id}
          </h3>

          <p>
            <strong>Goal:</strong>{" "}
            {campaign.goal}
          </p>

          <p>
            <strong>Channel:</strong>{" "}
            {campaign.channel}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {campaign.status}
          </p>

          <button
            onClick={() =>
              launchCampaign(campaign.id)
            }
          >
            Launch Campaign
          </button>

        </div>

      ))}

    </div>
  );
}