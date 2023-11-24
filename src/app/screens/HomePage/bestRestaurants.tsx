import {
  Favorite,
  LocalActivityOutlined,
  LocationOnRounded,
  Visibility,
} from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  IconButton,
  Link,
  Typography,
} from "@mui/joy";
import { Box, Button, Container, Stack } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";

import React from "react";

export function BestRestaurants() {
  return (
    <div className="best_restaurant_frame">
      <img
        src={"icons/lines.svg"}
        style={{
          position: "absolute",
          left: "6%",
          // transform: "rotate(360deg)",
        }}
      />
      <Container sx={{ paddingTop: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Zo'r Restaurantlar</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            <CssVarsProvider>
              {[1, 2, 3, 4].map(() => {
                return (
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 483,
                      minWidth: 320,
                      mr: "35px",
                      bgcolor: "white",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={1}>
                        <img src={"restaurant/burak.jpeg"} alt="" />
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
                          color: "rgba(0,0,0,.4)",
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
                          100{" "}
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
                          <div>500</div>
                          <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                        </Typography>
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Button
              style={{
                background: "#1976d2",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Barchasini ko'rish
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
