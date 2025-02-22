import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography
} from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';

const SuggestionsList = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Suggested Combinations
      </Typography>
      <List>
        {suggestions.map((suggestion, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <ChairIcon />
            </ListItemIcon>
            <ListItemText
              primary={suggestion.type}
              secondary={suggestion.description}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SuggestionsList;
