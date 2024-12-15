import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  TableHead,
  Box,
  CssBaseline,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { LEAD } from "../GraphQL/Queries";

const GetUser: React.FC = () => {
  // Extract the `service` parameter from the route
  const { service } = useParams<{ service: string }>();

  type QueryResponse = {
    service: string;
    count: number;
    users: [
      {
        id: number;
        name: string;
        lastname: string;
        email: string;
        mobile: string;
        postcode: string;
      }
    ];
  };

  const { error, loading, data } = useQuery(LEAD, {
    variables: { service: service },
  });
  const [lead, setLead] = useState<QueryResponse>();
  const [postcodes, setPostcodes] = useState<[]>([]);

  useEffect(() => {
    if (data) {
      setLead(data.lead);

      // Get user count per postcode
      const countPerPostcode = data.lead.users.reduce((acc: any, item: any) => {
        acc[item.postcode] = (acc[item.postcode] || 0) + 1;
        return acc;
      }, {});

      setPostcodes(countPerPostcode);
    }
  }, [data]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <div>
            <h2 style={{ textAlign: "center" }}>{service}</h2>
          </div>
          <div>
            <h3 style={{ textAlign: "center" }}>Summary</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Number of Interested Users</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{service}</TableCell>
                    <TableCell>{lead && lead.count}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <h3 style={{ textAlign: "center" }}>Per Postcode Data</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Postcode</TableCell>
                    <TableCell>Users Interested in {service}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(postcodes).map((postcode) => {
                    return (
                      <TableRow>
                        <TableCell>{postcode[0]}</TableCell>
                        <TableCell>{postcode[1]}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <h3 style={{ textAlign: "center" }}>Users Data</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Lastname</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Postcode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lead?.users.map((user) => {
                    return (
                      <TableRow>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobile}</TableCell>
                        <TableCell>{user.postcode}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default GetUser;
