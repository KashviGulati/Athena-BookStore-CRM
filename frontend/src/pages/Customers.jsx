import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers = async () => {

    const response = await api.get(
      "/customers/"
    );

    setCustomers(
      response.data
    );
  };

  return (
    <div>

      <h2>Customers</h2>

      {customers.map(customer => (

        <div key={customer.id}>

          <h4>{customer.name}</h4>

          <p>{customer.email}</p>

        </div>

      ))}

    </div>
  );
}