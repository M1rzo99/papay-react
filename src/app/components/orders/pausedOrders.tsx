import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifyMemberData } from "../../apiServices/verify";

// REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export default function PausedOrders(props: any) {
  // INITIALIZATIONS
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  // Handlers for bekorQilish
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };
      if (!verifyMemberData) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm(
        "Buyurtmani bekor qilishni xohlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrdersStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  // Handlers for To'lsh
  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!verifyMemberData) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm(
        "Buyurtmangizni to'lashni  tasdiqlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        orderService.updateOrdersStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product?.product_images[0]}`;
                  return (
                    <Box className="ordersName_price">
                      <img src={image_path} className={"orderDishImg"} />
                      <p className="titleDish">{product?.product_name}</p>
                      <Box className="priceBox">
                        <p>${item.item_price}</p>
                        <img src="/icons/Close.svg" />
                        <p>{item.item_quentity}</p>
                        <img src="/icons/pause.svg" />
                        <p style={{ marginLeft: "15px" }}>
                          $ {item.item_quentity * item.item_price}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box black_solid">
                <Box className="boxTotal">
                  <p>mahsulot narxi = </p>
                  <p>
                    $ {order.order_total_amount - order.order_delivery_cost}
                  </p>
                  <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                  <p>Yetkazish hizmati</p>
                  <p>${order.order_delivery_cost}</p>
                  <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                  <p>jami narxi</p>
                  <p>${order.order_total_amount}</p>
                </Box>
                <Button
                  value={order._id}
                  onClick={deleteOrderHandler}
                  variant="contained"
                  color={"secondary"}
                  style={{ borderRadius: "10px" }}
                >
                  BEKOR QILISH
                </Button>
                <Button
                  value={order._id}
                  onClick={processOrderHandler}
                  variant="contained"
                  sx={{
                    background: "rgb(2, 136, 209)",
                    color: "rgb(255, 255, 255)",
                    borderRadius: "10px",
                  }}
                >
                  TO'LASH
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
