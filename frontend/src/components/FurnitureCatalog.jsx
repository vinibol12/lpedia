import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';

const FurnitureCatalog = ({ furniture = [], onSelect }) => {
  return (
    <Grid container spacing={3}>
      {furniture.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardActionArea onClick={() => onSelect(item)}>
              <CardMedia
                component="img"
                height="140"
                image={`/furniture-images/${item.type.toLowerCase()}.jpg`}
                alt={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FurnitureCatalog;
