import { MonetizationOn } from "@mui/icons-material";
import { Box } from "@mui/joy";
import { Container, Stack } from "@mui/material";
import { url } from "inspector";
import React from "react";

export function BestDishes() {
  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trentdagi Ovqatlar</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            {[1, 2, 3, 4].map(() => {
              return (
                <Box className="dish_box" sx={{ ml: "30px" }}>
                  <Stack
                    className="dish_img"
                    sx={{
                      backgroundImage: `url(
                        https://www.cookerru.com/wp-content/uploads/2021/07/ganjang-guksu-ingredients-web-scaled.jpg
                  )`,
                    }}
                  >
                    <div className={"dish_sale"}>normal size</div>
                    <div className={"view_btn"}>
                      Batafsil ko'rish{" "}
                      <img
                        src={"/icons/arrow_right.svg"}
                        style={{ marginLeft: "9px" }}
                        alt=""
                      />
                    </div>
                  </Stack>

                  <Stack className={"dish_desc"}>
                    <span className={"dish_title_text"}>Natural Oil</span>
                    <span className={"dish_desc_text"}>
                      <MonetizationOn />
                      11
                    </span>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
