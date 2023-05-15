import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const TypographyTheme = styled("div")(({ theme }) => ({
  fontFamily: "AngsanaUPC",
  textAlign: "center",
  textTransform: "uppercase",
}));

// const Link = styled(Link)(({theme})=>({
//   textDecoration  :'none',
//   // transition      :'all 0.75s linear',
//   backgroundColor     :'red',

//   '&:hover'       :{border:'10px solid blue'}
// }))

class RecipeCard extends Component {
  render() {
    const { name, thumbnail_url, cook_time_minutes, country, id } =
      this.props.item;
    return (
      <Link to={`/${id}`} style={{ textDecoration: "none" }}>
        <TypographyTheme>
          <Card sx={{ height: "480px" }}>
            <Box sx={{ bgcolor: "#FFB100" }}>
              <Typography
                component='div'
                fontFamily="inherit"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                variant="h6"
                px={1} 
              >
                {name}
                {/* ellipsis */}
              </Typography>
            </Box>

            <CardMedia
              image={thumbnail_url}
              component="img"
              alt={name}
              sx={{ height: "75%", width: "100%", pt: 0.5 }}
            />
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: green[500], mx: 1 }}>
                  {cook_time_minutes ? cook_time_minutes : 15}
                </Avatar>
                <Typography fontFamily="inherit" variant="h6">
                  Minutes
                </Typography>
              </Box>

              <Box px={6} py={0.5}>
                <Chip
                  fontFamily="inherit"
                  label={`${country}`}
                  color="secondary"
                />
              </Box>
            </CardContent>
          </Card>
        </TypographyTheme>
      </Link>
    );
  }
}

export default RecipeCard;
