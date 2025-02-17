import { Search } from '@mui/icons-material'
import { TextField } from '@mui/material'
import React from 'react'

interface SearchComponentProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ search, setSearch }) => {
  return (
 
     <TextField
              variant="outlined"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
                sx: {
                  borderRadius: 2,
                  width: "500px", // Ajusta la altura si es necesario
                },
              }}
            />
    
  
  )
}
