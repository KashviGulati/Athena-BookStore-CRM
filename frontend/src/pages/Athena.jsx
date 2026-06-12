import { useState } from "react";
import api from "../services/api";

export default function Athena() {

  const [goal, setGoal] = useState("");

  const [result, setResult] = useState(null);

  const generateCampaign = async () => {

    const response = await api.post(
      "/athena/generate-campaign/",
      {
        goal
      }
    );

    setResult(
      response.data
    );
  };

  return (
    <div>

      <h2>Athena Agent</h2>

      <input
        type="text"
        value={goal}
        onChange={(e) =>
          setGoal(e.target.value)
        }
        placeholder="Enter marketing goal"
      />

      <button
        onClick={generateCampaign}
      >
        Generate Campaign
      </button>

      {result && (

        <div>

          <h3>Segment</h3>
          <p>{result.segment}</p>

          <p>
            <strong>Audience Size:</strong>{" "}
            {result.audience_size}
          </p>
          <h3>Reasoning</h3>
          <p>{result.reasoning}</p>

          <h3>Channel</h3>
          <p>{result.channel}</p>

          <h3>Message</h3>
          <p>{result.message}</p>

        </div>

      )}

    </div>
  );
}