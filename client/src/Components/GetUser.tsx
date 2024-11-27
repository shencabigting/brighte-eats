import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@apollo/client";
import { USER } from "../GraphQL/Queries";

const GetUser: React.FC = () => {
  // Extract the `id` parameter from the route
  const { id } = useParams<{ id: string }>();
  type QueryResponse = {
    name: string;
    email: string;
    mobile: string;
    postcode: string;
  };

  const { error, loading, data } = useQuery(USER, {
    variables: { leadId: id },
  });
  const [user, setUser] = useState<QueryResponse>();

  useEffect(() => {
    if (data) {
      setUser(data.lead);
    }
  }, [data]);

  return (
    <div>
      <h2>User Preferrence Page</h2>
      <Table>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>{id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>{user && user.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>{user && user.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Postcode</TableCell>
          <TableCell>{user && user.postcode}</TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default GetUser;
