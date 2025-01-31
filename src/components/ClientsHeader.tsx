import React from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";

interface ClientsHeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const ClientsHeader: React.FC<ClientsHeaderProps> = ({ search, setSearch }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black", boxShadow: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 6 } }}>
        {/* Título */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "red", flexGrow: 1 }}
        >
          Clients
        </Typography>

        {/* Búsqueda y Botón */}
        <Box display="flex" gap={2}>
          {/* Campo de búsqueda */}
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            variant="outlined"
            size="small"
            sx={{
              input: { color: "white", backgroundColor: "gray", borderRadius: 1 },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
            }}
          />

          {/* Botón de agregar cliente */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            + Add Client
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientsHeader;
