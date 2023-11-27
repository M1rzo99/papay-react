import React from "react";
import TabPanel from "@mui/joy/TabPanel";
import { Box, Button, Stack } from "@mui/material";

const pauseOrders = [
  [1, 2, 3],
  [1, 2, 3],
];

export default function PauseOrders(props: any) {
  return (
    <Stack>
      {pauseOrders?.map((order) => {
        return (
          <Box className={"order_main_box"}>
            <Box className={"order_box_scrol"}>
              {order.map((item) => {
                const image_path = "/others/qovurma.jpeg";
                return (
                  <Box className={"orderName_price"}>
                    <img src={image_path} className={"orderDishImg"} />
                    <p className={"title_Dish"}>Buyurtmadagi Ovqatlar Ovqat</p>
                    <Box className={"priceBox"}>
                      <p style={{ marginLeft: "15px" }}>$19</p>
                      <img
                        style={{ marginLeft: "15px" }}
                        src={"/icons/Close.svg"}
                      />
                      <p style={{ marginLeft: "15px" }}>3</p>
                      <img
                        style={{ marginLeft: "15px" }}
                        src={"/icons/pause.svg"}
                      />
                      <p style={{ marginLeft: "15px" }}>$57</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className={"total_orice_box "} sx={{ bgcolor: "gray" }}>
              <Box className={"boxTotal"}>
                <p>mahsulot narxi</p>
                <p>$6</p>
                <img src="/icons/Plus.svg" />
                <p>yetkazish xizmati</p>
                <p>$3</p>
                <p>jami narx</p>
                <img src="/icons/Pause.svg" />
                <p>18$</p>
                <Button
                  style={{
                    background: "#1976d2",
                    color: "#ffffff",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "red",
                  }}
                >
                  bekor qilish
                </Button>
                <Button
                  style={{
                    background: "#1976d2",
                    color: "#ffffff",
                    cursor: "pointer",
                    borderRadius: "10px",
                    marginRight: "7px",
                  }}
                >
                  to'lash
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
