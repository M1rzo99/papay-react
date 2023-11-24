import TabPanel from "@mui/joy/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

const finishedOreders = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];

export default function FinishedOreders(props: any) {
  return (
    <Stack>
      {finishedOreders?.map((order) => {
        return (
          <Box className={"order_main_box"}>
            <Box className={"order_box_scrol"}>
              {order.map((item) => {
                const image_path = "/others/qovurma.jpeg";
                return (
                  <Box className={"orderName_price"}>
                    <img src={image_path} className={"orderDishImg"} />
                    <p className={"title_Dish"}>Qabul qilingan Ovqatlar</p>
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
            <Box className={"total_orice_box "} sx={{ bgcolor: "crimson" }}>
              <Box className={"boxTotal"}>
                <p>mahsulot narxi</p>
                <p>$11</p>
                <p>yetkazish xizmati</p>
                <p>$2</p>
                <p>jami narx</p>
                <p>22$</p>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
