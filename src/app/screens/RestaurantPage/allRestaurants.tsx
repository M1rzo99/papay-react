import {
  Card,
  IconButton,
  Link,
  Typography,
  AspectRatio,
  CardOverflow,
} from "@mui/joy";
import {
  Box,
  Button,
  Pagination,
  PaginationItem,
  Container,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { CssVarsProvider } from "@mui/joy/styles";
import { Favorite } from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retriveTargetRestaurants } from "../../screens/RestaurantPage/selector";
import { Restaurant } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetRestaurants } from "../../screens/RestaurantPage/slice";

//  REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispach(setTargetRestaurants(data)),
});

// REDUX SELECTOR
const targetRestaurantsretriver = createSelector(
  retriveTargetRestaurants,
  (targetRestaurants) => ({
    targetRestaurants,
  })
);

const order_list = Array.from(Array(8).keys());

export function AllRestaurants() {
  // INITIALIZATIONS
  const { setTargetRestaurants } = actionDispatch(useDispatch());
  const { targetRestaurants } = useSelector(targetRestaurantsretriver);

  useEffect(() => {
    // TODO: Retrieve  targetRestaurants
  }, []);
  return (
    <div className="all_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"fil_search_box"}>
            <Box className={"fil_box"}>
              <a href="">Zo'r</a>
              <a href="">Mashhur</a>
              <a href="">Trentdagi</a>
              <a href="">Yangi</a>
            </Box>

            <Box className={"search_big_box"}>
              <form className={"search_form"} action={" "} method={" "}>
                <input
                  type={"search"}
                  className={"searchInput"}
                  name={"resSearch"}
                  placeholder={"Qidiruv"}
                />
                <Button
                  className={"button_search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                  Izlash
                </Button>
              </form>
            </Box>
          </Box>

          <Stack className={"all_res_box"}>
            <CssVarsProvider>
              {order_list.map((ele) => {
                return (
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 483,
                      minWidth: 300,
                      mr: "15px",
                      bgcolor: "white",
                      mt: "15px",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={1}>
                        <img src={"/restaurant/burak.jpeg"} alt="" />
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,0.4)",
                        }}
                      >
                        <Favorite style={{ color: "white" }} />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                      Texas De Brazil restaurant
                    </Typography>

                    <Typography level="body-md" sx={{ mt: 0.5, mb: 1 }}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
                      >
                        Tashkent, Yunus Abad 4-1
                      </Link>
                    </Typography>

                    <Typography level="body-md" sx={{ mb: 2 }}>
                      <Link
                        href=""
                        startDecorator={<CallIcon />}
                        textColor="neutral.700"
                      >
                        +99890 7314578
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid ",
                        backgroundColor: "neutral.100",
                      }}
                    >
                      <Typography display={"flex"} gap={"10px"}>
                        <Typography
                          level="body-md"
                          sx={{
                            fontWeight: "md",
                            color: "text.secondary",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          11{" "}
                          <Visibility
                            sx={{ fontSize: 20, marginLeft: "5px" }}
                          />
                        </Typography>
                        <Box sx={{ width: 2, bgcolor: "divider" }} />
                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "text.secondary",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <div>9</div>
                          <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                        </Typography>
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className={"bottom_box"}>
            <img
              className={"line_img_two"}
              src={"/restaurant/line.svg"}
              alt="#"
            />
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
            />
            <img
              className={"line_img"}
              src={"/restaurant/line.svg"}
              alt="line"
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
