import React, { useState, useEffect } from "react";
import { Box, Container, Input, Stack } from "@mui/material";
import "../../../css/orders.css";
import ProcessOrders from "../../components/orders/processOrders";
import PauseOrders from "../../components/orders/pausedOrders";
import FinishedOreders from "../../components/orders/finishedOrders";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import Marginer from "../../components/marginer";

import { useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setPauseorders,
  setProcessOrders,
  setFinishedorders,
} from "../../screens/OrdersPage/slice";
import { Order } from "../../../types/order";

//REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPauseorders: (data: Order[]) => dispatch(setPauseorders(data)),

  setProcessOrders: (data: Order) => dispatch(setProcessOrders(data)),

  setFinishedorders: (data: Order[]) => dispatch(setFinishedorders(data)),
});
export function OrdersPage() {
  /* INITIALIZATION */
  const { setPauseorders, setProcessOrders, setFinishedorders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  console.log("passed here");
  console.log("value", value);

  useEffect(() => {}, []);

  /*    HANDLERS   */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order_page">
      <Container
        maxWidth="lg"
        style={{ display: "flex", flexDirection: "row" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label={"basic tabs example"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "30px",
                  }}
                >
                  <Tab label="Buyurtmalarim" value="1" />
                  <Tab
                    sx={{ ml: "150px", mr: "150px" }}
                    label="Jarayon"
                    value="2"
                  />
                  <Tab label="Yakunlangan" value="3" />
                </TabList>

                <Marginer
                  direction="horizontal"
                  height="1"
                  width="100%"
                  bg="#ffffff"
                />
              </Box>
            </Box>

            <Stack className={"order_main_content"}>
              <TabPanel value="1">
                <PauseOrders />
              </TabPanel>
              <TabPanel value="2">
                <ProcessOrders />
              </TabPanel>
              <TabPanel value="3">
                <FinishedOreders />
              </TabPanel>
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order_right"}>
          <Box className={"order_info_box"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <div className={"order_use_img"}>
                <img
                  src={"/auth/df_user.jpeg"}
                  className={"order_user_avatar"}
                />
                <Box className={"order_user_icon"}>
                  <img
                    src={"/icons/def_usr.svg"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </div>
              <strong>Mirzo Shomuratov</strong>
              <p>Foydalanuvchi</p>
              <Box className={"Marginer"}></Box>
              <Box sx={{ display: "flex", marginRight: "80%" }}>
                <img src={"/icons/location.svg"} />
                <p>Seoul</p>
              </Box>
            </Box>
          </Box>

          <Box marginTop={"13px"} className={"order_info_box"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <input
                className={"for_order_inputs"}
                type="text"
                placeholder="Card Number: 5423 2325 4847 0011"
              />
              <Box height={"auto"} display={"flex"} gap={"8px"}>
                <input
                  className={"orders_inputs"}
                  type="data"
                  placeholder="07/24"
                />
                <input
                  className={"orders_inputs"}
                  type="text"
                  placeholder="CVV: 010"
                />
              </Box>
              <input
                className={"for_order_inputs"}
                type="text"
                placeholder="Mirzo Shomuratov"
              />
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={"15px"}
                mt={"35px"}
                mb={"16px"}
              >
                <img className="cart_img" src={"/others/union.png"} />
                <img className="cart_img" src={"/others/paypal.png"} />
                <img className="cart_img" src={"/others/visa.png"} />
                <img className="cart_img" src={"/others/master.png"} />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
