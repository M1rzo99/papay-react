import { Box, Stack } from "@mui/joy";
import { Avatar, Container } from "@mui/material";
import React, { useEffect } from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setBestBoArticles,
  setNewsBoArticles,
  setTrendBoArticles,
} from "./slice";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { BoArticle } from "../../../types/boArticles";
import { setTargetBoArticles } from "../CommunityPage/slice";
import {
  retrieveBestBoArticles,
  retrieveNewsBoArticles,
  retrieveTrendBoArticles,
} from "./selector";
import CommunityApiService from "../../apiServices/communityApiService";
import { serverApi } from "../../../lib/config";
import TViewer from "../../components/TuiEditor/TuiViwer";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBestBoArticles: (data: BoArticle[]) => dispatch(setBestBoArticles(data)),

  setTrendBoArticles: (data: BoArticle[]) => dispatch(setTrendBoArticles(data)),

  setNewsBoArticles: (data: BoArticle[]) => dispatch(setNewsBoArticles(data)),
});

// REDUX SELECTOR
const bestBoArticlesRetriver = createSelector(
  retrieveBestBoArticles,
  (bestBoArticles) => ({
    bestBoArticles,
  })
);
const trendBoArticlesRetriver = createSelector(
  retrieveTrendBoArticles,
  (trendBoArticles) => ({
    trendBoArticles,
  })
);
const newsBoArticlesRetriver = createSelector(
  retrieveNewsBoArticles,
  (newsBoArticles) => ({
    newsBoArticles,
  })
);
export function Recommindations() {
  /* INITIALIZATION */
  const { setBestBoArticles, setNewsBoArticles, setTrendBoArticles } =
    actionDispatch(useDispatch());
  const { bestBoArticles } = useSelector(bestBoArticlesRetriver);
  const { trendBoArticles } = useSelector(trendBoArticlesRetriver);
  const { newsBoArticles } = useSelector(newsBoArticlesRetriver);

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_views",
      })
      .then((data) => setBestBoArticles(data))
      .catch((err) => console.log(err));

    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_likes",
      })
      .then((data) => setTrendBoArticles(data))
      .catch((err) => console.log(err));

    communityService
      .getTargetArticles({
        bo_id: "celebrity",
        page: 1,
        limit: 2,
        order: "art_views",
      })
      .then((data) => setNewsBoArticles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="top_article_frame">
      <Container
        maxWidth="lg"
        sx={{ mb: "50px", mt: "60px" }}
        style={{ position: "relative" }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className={"category_title"}>Tavfsiya qilingan maqolalar</Box>
          <Stack className={"article_main"} flexDirection={"row"}>
            <Stack>
              <Stack className={"article_container"}>
                <Box className={"article_category"}>Ko'p ko'rilgan</Box>

                {bestBoArticles?.map((article: BoArticle) => {
                  const art_img_url = article?.art_image
                    ? `${serverApi}/${article?.art_image}`
                    : "/auth/default_user.svg";
                  return (
                    <Stack className={"article_box"} key={article._id}>
                      <Box
                        className={"article_img"}
                        sx={{
                          backgroundImage: `url(${art_img_url})`,
                        }}
                      ></Box>
                      <Box className={"article_info"}>
                        <Box className={"article_main_info"}>
                          <div className={"article_author"}>
                            <Avatar
                              src={
                                article?.member_data?.mb_image
                                  ? `${serverApi}/${article?.member_data?.mb_image}`
                                  : "/auth/default_user.svg"
                              }
                              sx={{ width: "35px", height: "35px" }}
                            />
                            <span className={"author_username"}>
                              {article?.member_data?.mb_nick}
                            </span>
                          </div>
                          <span className={"article_title"}>
                            {article?.art_subject}
                          </span>
                          <p className={"article_desc"}></p>
                        </Box>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>

              <Stack className={"article_container"} paddingTop={"20px"}>
                <Box className={"article_category"}>Ko'p yoqtirganlar</Box>

                {trendBoArticles?.map((article: BoArticle) => {
                  const art_img_url = article?.art_image
                    ? `${serverApi}/${article?.art_image}`
                    : "/auth/default_user.svg";
                  return (
                    <Stack className={"article_box"} key={article._id}>
                      <Box
                        className={"article_img"}
                        sx={{
                          backgroundImage: `url(${art_img_url})`,
                        }}
                      ></Box>
                      <Box className={"article_info"}>
                        <Box className={"article_main_info"}>
                          <div className={"article_author"}>
                            <Avatar
                              src={
                                article?.member_data?.mb_image
                                  ? `${serverApi}/${article?.member_data?.mb_image}`
                                  : "/auth/default_user.svg"
                              }
                              sx={{ width: "35px", height: "35px" }}
                            />
                            <span className={"author_username"}>
                              {article?.member_data?.mb_nick}
                            </span>
                          </div>
                          <span className={"article_title"}>
                            {article?.art_subject}
                          </span>
                          <p className={"article_desc"}></p>
                        </Box>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>

            <Stack className={"article_container"}>
              <Box className={"article_category"} paddingBottom={"15px"}>
                Mashhurlar
              </Box>
              {newsBoArticles?.map((article: BoArticle) => {
                return (
                  <Box className={"article_news"}>
                    <TViewer chosenSingleBoArticle={article} />
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
