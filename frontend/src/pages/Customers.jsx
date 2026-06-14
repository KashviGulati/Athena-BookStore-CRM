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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  th: {
    textAlign: "left",
    padding: "12px 20px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    background: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "14px 20px",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
  },
  tdName: {
    padding: "14px 20px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#111827",
    borderBottom: "1px solid #f3f4f6",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#e0e7ff",
    color: "#4f46e5",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "13px",
    marginRight: "10px",
    verticalAlign: "middle",
  },
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await api.get("/customers/");
    setCustomers(response.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Customers</h1>
        <p style={styles.subtitle}>{customers.length} total customers</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={styles.tdName}>
                <span style={styles.avatar}>
                  {customer.name?.charAt(0)?.toUpperCase() ?? "?"}
                </span>
                {customer.name}
              </td>
              <td style={styles.td}>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}