import React, { useEffect, useState } from "react";
import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Favorite,
  FavoriteBorder,
  MonetizationOn,
  RemoveRedEye,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { useHistory, useParams } from "react-router-dom";
// SwiperCore.use([Autoplay, Navigation, Pagination]);
import { ProductSerchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenRestaurants,
  retrieveRandomRestaurants,
  retrieveTargetProducts,
} from "../../screens/RestaurantPage/selector";
import { Restaurant } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setRandomRestaurants,
  setChosenRestaurants,
  setTargetProducts,
} from "../../screens/RestaurantPage/slice";
import { verifyMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setRandomRestaurants: (data: Restaurant[]) =>
    dispatch(setRandomRestaurants(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurants(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

// REDUX SELECTOR
const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants,
  })
);
const chosenRestaurantsRetriever = createSelector(
  retrieveChosenRestaurants,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);
const targetRestaurantsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

export function OneRestaurant(props: any) {
  // INITIALIZATIONS
  const history = useHistory();
  let { restaurant_id } = useParams<{ restaurant_id: string }>();
  const { setRandomRestaurants, setChosenRestaurant, setTargetProducts } =
    actionDispatch(useDispatch());
  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantsRetriever);
  const { targetProducts } = useSelector(targetRestaurantsRetriever);
  const [chosenRestaurantId, setChosenRestaurantId] =
    useState<string>(restaurant_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSerchObj>({
      page: 1,
      limit: 8,
      order: "createdAt",
      restaurant_mb_id: restaurant_id,
      product_collection: "dish",
    });

  // const refs: any = useRef([]);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getRestaurants({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomRestaurants(data))
      .catch((err) => console.log(err));

    restaurantService
      .getChosenRestaurant(chosenRestaurantId)
      .then((data) => setChosenRestaurant(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenRestaurantId, productRebuild]);

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [, targetProductSearchObj]);

  /** HANDLERS */
  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId(id);
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/restaurant/${id}`);
  };

  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  };

  const targetLikeProduct = async (e: any) => {
    try {
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(verifyMemberData, Definer.auth_err1);
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar_big_box"}>
            <Box className={"top_text"}>
              <p style={{ marginLeft: "10px" }}>
                {chosenRestaurant?.mb_nick} Restaurant{" "}
              </p>
              <Box className={"single_search_big_box"}>
                <form className={"single_search_form"} action={""} method={""}>
                  <input
                    type="search"
                    className="single_searchInput"
                    name="single_resSearch"
                    placeholder="Qidiruv"
                  />
                  <Button
                    className="single_button_search"
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Izlash
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className="prev_btn restaurant-prev">
              <ArrowBackIosIcon
                sx={{ fontSize: 40 }}
                style={{ color: "white" }}
              />
            </Box>
            <Swiper
              className="restaurant_avatars_wrapper"
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
            >
              {randomRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className={"restaurant_avatars"}
                  >
                    <img src={image_path} alt="" />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className="next_btn restaurant-next"
              style={{ color: "white" }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>

          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            width={"90%"}
            sx={{ mt: "65px" }}
          >
            <Box className={"dishs_filter_btn"}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("createdAt")}
              >
                new
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("product_price")}
              >
                price
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("product_likes")}
              >
                likes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("product_views")}
              >
                views
              </Button>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex", minHeight: "600px" }}
            flexDirection={"row"}
          >
            <Stack className="dish_category_box">
              <div className="dish_category_main">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("etc")}
                >
                  boshqa
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("dessert")}
                >
                  desert
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("drink")}
                >
                  ichimlik
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("salad")}
                >
                  salad
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("dish")}
                >
                  ovqatlar
                </Button>
              </div>
            </Stack>

            <Stack className={"dish_wrapper"}>
              {targetProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                const size_volume =
                  product.product_collection === "drink"
                    ? product.product_volume + " l"
                    : product.product_size + " size";
                return (
                  <Box
                    onClick={() => chosenDishHandler(product?._id)}
                    sx={{ cursor: "pointer" }}
                    className={"dish_box"}
                    key={product._id}
                  >
                    <Box
                      className={"dish_img"}
                      sx={{ backgroundImage: `url(${image_path})` }}
                    >
                      <div className={"dish_sale"}>{size_volume}</div>
                      <Button
                        className={"like_view_btn"}
                        style={{ left: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_likes}
                          color={"primary"}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            onClick={targetLikeProduct}
                            /*@ts-ignore*/
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button
                        className="view_btn"
                        onClick={(e) => {
                          props.onAdd(product);
                          e.stopPropagation();
                        }}
                      >
                        <img
                          src="/icons/shopping_cart.svg"
                          style={{ display: "flex" }}
                        />
                      </Button>
                      <Button
                        className="like_view_btn"
                        style={{ right: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_views}
                          color={"primary"}
                        >
                          <Checkbox
                            icon={<RemoveRedEye style={{ color: "white" }} />}
                            checked={false}
                          />
                        </Badge>
                      </Button>
                    </Box>
                    <Box className="dish_desc">
                      <span className="dish_title_text">
                        {product.product_name}
                      </span>
                      <div className="dish_desc_text">
                        <MonetizationOn />
                        {product.product_price}
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className={"review_for_restaurant"}>
        <Container
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="category_title">Oshxona haqida fikrlar</Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {Array.from(Array(4).keys()).map((ele, index) => {
              return (
                <Box className="review_box" key={`${index}`}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img
                      src="/community/cute_girl.jpeg"
                      className="review_img"
                    />
                  </Box>
                  <span className="review_name">Rayhon Asadova</span>
                  <span className="review_prof">Foydalanuvchi</span>
                  <p className="review_desc">
                    Menga bu oshxonaning taomi juda yoqadi. Hammaga tavsiya
                    qilaman!!!
                  </p>
                  <div className="review_stars">
                    <StarIcon style={{ color: "#f2bd57" }} />
                    <StarIcon style={{ color: "#f2bd57" }} />
                    <StarIcon style={{ color: "#f2bd57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </div>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </div>

      <Container className="member_reviews">
        <Box className="category_title">Oshxona haqida</Box>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          width="90%"
          sx={{ mt: "70px" }}
        >
          <Box
            className="about_left"
            sx={{
              backgroundImage: `url(${serverApi}/${chosenRestaurant?.mb_image})`,
            }}
          >
            <div className="about_left_desc">
              <span>{chosenRestaurant?.mb_nick}</span>
              <p>{chosenRestaurant?.mb_description}</p>
            </div>
          </Box>
          <Box className="about_right">
            {Array.from(Array(3).keys()).map((ele, index) => {
              return (
                <Box display={"flex"} justifyContent={"row"} key={`${index}`}>
                  <div className="about_right_img"></div>
                  <div className="about_right_desc">
                    <span>Bizning mohir oshpazlarimiz</span>
                    <p>
                      Bizni oshxonamizni dunyo taniydigan oliygohlarda malaka
                      oshirib kelishgan!
                    </p>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack
          sx={{ mt: "60px" }}
          style={{
            display: "felx",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="category_title">Oshxona Manzili</Box>
          <iframe
            style={{ marginTop: "60px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
            width={"1320"}
            height={"500"}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
