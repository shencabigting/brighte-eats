import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { LEADS } from "../GraphQL/Queries";

function GetLeads() {
  const { error, loading, data } = useQuery(LEADS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.leads);
    }
  }, [data]);
  return (
    <div>
      {users.map((user) => {
        return user["name"];
      })}
    </div>
  );
}

export default GetLeads;
