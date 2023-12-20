import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavbarHome(props: any) {
  // Instalizations
  const [count, setCount] = useState(0);

  return (
    <div className="format home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="./icons/Papay.svg" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/" activeClassName="underline">
                Bosh Sahifa
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/restaurant" activeClassName="underline">
                Oshxona
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/orders" activeClassName="underline">
                Buyurtma
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Jamiyat
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/help" activeClassName="underline">
                Yordam
              </NavLink>
            </Box>

            <Box className="hover-line">
              <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
              >
                <Badge badgeContent={3} color="secondary">
                  <img src={"/icons/shopping-cart.svg"} />
                </Badge>
              </IconButton>
            </Box>

            <Box>
              <Button
                variant="contained"
                style={{ color: "#ffffff", background: "#1976d2" }}
              >
                KIRISH
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Stack className="head_information" justifyContent={"rows"}>
          <Stack
            justifyContent={"column"}
            style={{ marginTop: "86px", marginLeft: "24px" }}
          >
            <Box>
              <img src="./icons/wellcome.svg" alt="" />
            </Box>
            <Box className="define_restaurant">
              The Authentic Restaurant & Cafe
            </Box>
            <Box className="timeline_service">
              {count} soat xizmatingizdamiz.
            </Box>
            <Box sx={{ mt: "90px" }}>
              <Button
                variant="contained"
                style={{
                  width: "210px",
                  height: "60px",
                  background: "#1976d2",
                  color: "#ffffff",
                }}
                onClick={() => setCount(count + 1)}
              >
                RO'HATDAN O'TISH
              </Button>
            </Box>
          </Stack>
          <Box>
            <div className="big_img"></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
