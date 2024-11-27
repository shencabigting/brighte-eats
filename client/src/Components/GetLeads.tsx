import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { LEADS } from "../GraphQL/Queries";

const GetLeads: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (service: string) => {
    navigate(`/lead/${service}`);
  };

  type QueryResponse = {
    service: string;
    count: number;
  };
  const { error, loading, data } = useQuery(LEADS);
  const [leads, setLeads] = useState<QueryResponse[]>([]);

  useEffect(() => {
    if (data) {
      setLeads(data.leads);
    }
  }, [data]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Leads Page</h2>
      <p style={{ textAlign: "center" }}>Click on item for more information.</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Number of Interested Users</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => {
              return (
                <TableRow
                  onClick={() => handleRowClick(lead.service)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ddeef0",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{lead.service}</TableCell>
                  <TableCell>{lead.count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetLeads;
