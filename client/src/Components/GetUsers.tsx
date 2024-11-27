import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@apollo/client";
import { USERS } from "../GraphQL/Queries";

const GetUsers: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  type QueryResponse = {
    id: number;
    name: string;
    email: string;
    mobile: string;
    postcode: string;
  };
  const { error, loading, data } = useQuery(USERS);
  const [users, setUsers] = useState<QueryResponse[]>([]);
  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  return (
    <div>
      <h2>Users Page</h2>
      <Table>
        {users.map((user) => {
          return (
            <TableRow onClick={() => handleRowClick(user.id)}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>{user.postcode}</TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
};

export default GetUsers;
