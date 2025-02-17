import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface ClientFilterProps {
  onFilterChange: (search: string, status: string) => void;
}

const ClientFilter: React.FC<ClientFilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState("ALL");

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setStatus(value);
    onFilterChange("", value);
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 180,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "background.paper",
          },
        }}
      >
        <InputLabel
          sx={{
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          Status
        </InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={handleStatusChange}
          sx={{
            "& .MuiSelect-select": {
              py: 1.2,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: 2,
                mt: 1,
                boxShadow: 3,
              },
            },
          }}
        >
          <MenuItem
            value="ALL"
            sx={{
              fontWeight: status === "ALL" ? 600 : 400,
            }}
          >
            All
          </MenuItem>
          <MenuItem
            value="ACTIVE"
            sx={{
              fontWeight: status === "ACTIVE" ? 600 : 400,
            }}
          >
            Active
          </MenuItem>
          <MenuItem
            value="EXPIRED"
            sx={{
              fontWeight: status === "EXPIRED" ? 600 : 400,
            }}
          >
            Expired
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClientFilter;