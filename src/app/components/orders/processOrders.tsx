import React from "react";
import TabPanel from "@mui/joy/TabPanel";
import { Box, Button, Stack } from "@mui/material";

const processOrders = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];

export default function ProcessOrders(props: any) {
  return (
    <Stack>
      {processOrders?.map((order) => {
        return (
          <Box className={"order_main_box"}>
            <Box className={"order_box_scrol"}>
              {order.map((item) => {
                const image_path = "/others/qovurma.jpeg";
                return (
                  <Box className={"orderName_price"}>
                    <img src={image_path} className={"orderDishImg"} />
                    <p className={"title_Dish"}>Jarayondagi Ovqat</p>
                    <Box className={"priceBox"}>
                      <p style={{ marginLeft: "15px" }}>$11</p>
                      <img
                        style={{ marginLeft: "15px" }}
                        src={"/icons/Close.svg"}
                      />
                      <p style={{ marginLeft: "15px" }}>2</p>
                      <img
                        style={{ marginLeft: "15px" }}
                        src={"/icons/pause.svg"}
                      />
                      <p style={{ marginLeft: "15px" }}>$22</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className={"total_orice_box "} sx={{ bgcolor: "violet" }}>
              <Box className={"boxTotal "}>
                <p>mahsulot narxi</p>
                <p>$11</p>
                <p>yetkazish xizmati</p>
                <p>$2</p>
                <p>jami narx</p>
                <p>22$</p>
                <Button
                  style={{
                    background: "#1976d2",
                    color: "#ffffff",
                    cursor: "pointer",
                    borderRadius: "10px",
                    marginRight: "7px",
                  }}
                >
                  Yakunlash
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
