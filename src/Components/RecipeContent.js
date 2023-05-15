import React, { Component } from "react";
import API_RecipeList from "./API";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Rating,
  CardMedia,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import PageNotFound from "./PageNotFound";

const CardTheme = styled("div")(({ theme }) => ({
  fontFamily: "AngsanaUPC",
  textTransform: "uppercase",
  fontWeight: "6px",
  fontSize: "30px",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    fontSize: "40px",
  },
  background: "#B7B7B7",
}));

const TimeIcon = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  marginLeft: "25px",
  letterSpacing: 1.5,
}));

const IngredientTheme = styled("div")(({ theme }) => ({
  fontFamily: "Segoe UI",
  fontSize: "20px",
  textAlign: "justify",
  lineHeight: 2,
  color: "rgba(98,94,96,1)",
  display: "flex",
  justifyItems: "center",
  marginTop: "20px",
}));

const IngredientTextTheme = styled("div")(({ theme }) => ({
  fontFamily: "brandon-grotesque",
  fontWeight: "bold",
  letterSpacing: 1,
}));

class RecipeContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeBaseId: null,
    };
  }
  async componentDidMount() {
    const url = window.location.pathname.split("/")[1];
    const recipes = await API_RecipeList(
      "https://tasty.p.rapidapi.com/recipes/get-more-info",
      { id: `${url}` }
    );
    console.log(recipes, recipes.status);
    if (recipes.status === 200) {
      this.setState({
        recipeBaseId: recipes.data,
      });
    } else {
      this.setState({
        recipeBaseId: [],
      });
    }
  }
  render() {
    const { recipeBaseId } = this.state;
    console.log(recipeBaseId, "render method");
    if (!recipeBaseId) {
      return (
        <Box py={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
    if (!recipeBaseId.name) {
      return <PageNotFound />;
    }
    const {
      cook_time_minutes,
      // id,
      instructions,
      name,
      // nutrition,
      // country,
      original_video_url,
      sections,
      thumbnail_url,
      user_ratings,
    } = recipeBaseId;
    const minute = cook_time_minutes ? cook_time_minutes : 25;

    return (
      <>
        <Card
          sx={{ width: { xs: "90%", md: "70%" }, m: "40px auto", pb: "25px" }}
        >
          <CardTheme>
            <Typography
              fontSize="inherit"
              fontFamily="inherit"
              fontWeight="inherit"
            >
              {name}
            </Typography>

            <Box display="flex" justifyContent="center" p={2}>
              <Rating
                name="read-only"
                value={user_ratings.score * 5}
                readOnly
              />
              <Typography fontFamily="inherit">
                {`(${
                  user_ratings.count_negative + user_ratings.count_positive
                } Votes) `}
              </Typography>
            </Box>

            <CardMedia
              component="div"
              image={thumbnail_url}
              alt={name}
              sx={{
                width: "90%",
                height: { xs: "500px", md: "600px" },
                mx: "auto",
              }}
            />
            <TimeIcon sx={{ p: 2 }}>
              <AccessTimeIcon sx={{ pr: 2 }} />
              <Typography letterSpacing="inherit">
                Ready In : {minute} mins
              </Typography>
            </TimeIcon>
          </CardTheme>
        </Card>

        <Grid container spacing={2}>
          <Grid item xs={10} lg={5} mx="auto">
            <IngredientTextTheme>
              <Chip label="INGREDIENTS" color="secondary" />
            </IngredientTextTheme>
            {sections.map((ingredient1) => {
              return ingredient1.components.map((ingredient2, ind) => {
                return (
                  <IngredientTheme key={ind}>
                    <StarIcon sx={{ p: 1.2 }} />
                    <Typography
                      fontFamily="inherit"
                      fontSize="inherit"
                      lineHeight={2}
                    >
                      {ingredient2.raw_text}
                    </Typography>
                  </IngredientTheme>
                );
              });
            })}
          </Grid>

          <Grid item xs={10} lg={5} mx="auto">
            <IngredientTextTheme>
              <Chip label="INSTRUCTIONS" color="secondary" />
            </IngredientTextTheme>
            {instructions.map((instructs,ind) => {
              return (
                <IngredientTheme key={ind} >
                  <StarIcon sx={{ p: 1.2 }} />
                  <Typography
                    fontFamily="inherit"
                    fontSize="inherit"
                    textAlign="inherit"
                    lineHeight="inherit"
                  >
                    {instructs.display_text}
                  </Typography>
                </IngredientTheme>
              );
            })}
          </Grid>
        </Grid>

        <Card sx={{ width: { xs: "90%", md: "70%" }, m: "60px auto" }}>
          <Box textAlign={"center"}>
            <video
              height="400px"
              width="100%"
              src={original_video_url}
              controls
            ></video>
          </Box>
        </Card>
      </>
    );
  }
}

export default RecipeContent;