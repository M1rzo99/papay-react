import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { FreeMode, Navigation, Scrollbar, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../app/components/marginer";

const chosen_list = Array.from(Array(10).keys());
const chosen_list_swiper = Array.from(Array(10).keys());

export function ChosenDish() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((ele) => {
              const image_path = `/others/qovurma.jpeg`;
              return (
                <SwiperSlide>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={image_path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            className={"swiper_sw_info swiper-wrapper"}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            loop={true}
          >
            {chosen_list_swiper.map((value, numer) => {
              const image_path = `/others/qovurma.jpeg`;
              return (
                <SwiperSlide className={"events_info_frame"}>
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      height: "100%",
                    }}
                    src={image_path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className={"chosen_dish_info_container"}>
          <Box className={"chosen_dish_info_box"}>
            <strong className={"dish_txt"}>Sweet Sendwich</strong>
            <span className={"resto_name"}>Texas De Brazil</span>
            <Box className={"rating_box"}>
              <Rating name="half_rating" defaultValue={3.5} precision={0.5} />
              <div className={"evolution_box"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={true}
                  />
                  <span> 98 ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>1000 ta</span>
                </div>
              </div>
            </Box>
          </Box>
          <p className={"dish_desc_info"}>
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy.Ipsum as their
            default model text, and a search for 'lorem ipsum' will uncover many
            web sites still in their infancy.
          </p>
          <Marginer
            direction="horizontal"
            height="1"
            width="100%"
            bg="#000000"
          />
          <div className={"dish_price_box"}>
            <span>Narx:</span>
            <span>USD 17</span>
          </div>
          <div className={"button_box"}>
            <Button variant="contained">Savatga Qo'shish</Button>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
