import React from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";

interface ClientsHeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const ClientsHeader: React.FC<ClientsHeaderProps> = ({ search, setSearch }) => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: "white", 
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        borderBottom: "1px solid #e2e8f0",
        color: "text.primary"
      }}
    >
      <Toolbar sx={{ 
        justifyContent: "space-between", 
        px: { xs: 2, sm: 6 },
        minHeight: "80px!important"
      }}>
        {/* Título con gradiente */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            flexGrow: 1,
            background: "linear-gradient(45deg, #6b8cff 0%, #a063ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Clients
        </Typography>

        {/* Búsqueda y Botón */}
        <Box display="flex" gap={2} alignItems="center">
          {/* Campo de búsqueda */}
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            variant="outlined"
            size="small"
            sx={{
              width: 240,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#f8fafc",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#a063ff" },
                "&.Mui-focused fieldset": { 
                  borderColor: "#6b8cff",
                  boxShadow: "0 0 0 2px rgba(107, 140, 255, 0.2)"
                },
              },
            }}
            InputProps={{
              startAdornment: <Search sx={{ color: "#94a3b8", mr: 1 }} />
            }}
          />

          {/* Botón de agregar cliente */}
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              background: "linear-gradient(45deg, #6b8cff 0%, #a063ff 100%)",
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                opacity: 0.9,
                background: "linear-gradient(45deg, #5a7be0 0%, #8a52d9 100%)"
              }
            }}
          >
            + New Client
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientsHeader;