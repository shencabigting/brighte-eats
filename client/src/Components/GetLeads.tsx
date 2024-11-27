import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@apollo/client";
import { LEADS } from "../GraphQL/Queries";

const GetLeads: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (userId: number) => {
    navigate(`/lead/${userId}`);
  };

  type QueryResponse = {
    id: number;
    name: string;
    email: string;
    mobile: string;
    postcode: string;
    services: string[];
  };
  const { error, loading, data } = useQuery(LEADS);
  const [users, setUsers] = useState<QueryResponse[]>([]);
  useEffect(() => {
    if (data) {
      setUsers(data.leads);
    }
  }, [data]);
  return (
    <div>
      <h2>Leads Page</h2>
      <Table>
        {users.map((user) => {
          return (
            <TableRow onClick={() => handleRowClick(user.id)}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>{user.postcode}</TableCell>
              <TableCell>{user.services.join(", ")}</TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
};

export default GetLeads;
