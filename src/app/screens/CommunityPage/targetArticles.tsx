import { ArticleTwoTone, Favorite } from "@mui/icons-material";
import { Stack, Link, Box } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { BoArticle } from "../../../types/boArticles";
import { serverApi } from "../../../lib/config";

export function TargetArticles(props: any) {
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/auth/df_user.jpeg";
        return (
          <Link
            className={"all_article_box"}
            sx={{ textDecoration: "none", marginBottom: "45px" }}
            href={``}
          >
            <Box
              className={"all_article_img"}
              sx={{ backgroundImage: `url(${art_image_url})` }}
            ></Box>

            <Box className={"all_article_container"} display={"flex"}>
              <Box alignItems={"center"}>
                <Box display={"flex"} alignItems={"center"}>
                  <img
                    src={"/auth/df_lucas.jpeg"}
                    width={"35px"}
                    height={"35px"}
                    style={{
                      borderRadius: "50%",
                      backgroundSize: "cover",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  />
                  <span className={"all_article_author_user"}>
                    {article?.member_data.mb_nick}
                  </span>
                </Box>
                <Box display={"flex"} sx={{ alignItems: "center" }}>
                  <span className={"all_article_ttle"}>{article?.bo_id}</span>

                  <p className={"all_article_txt"}>{article?.art_subject}</p>
                </Box>
              </Box>

              <Box
                className={"all_article_infos"}
                alignItems={"center"}
                display={"flex"}
                marginTop={"120px"}
              >
                <p className={"all_article_info_txt"}>
                  {moment().format("YY-MM-DD hh:mm")}
                </p>
                <div className={"evolution_box"} style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "#fff" }} />}
                      id={article._id}
                      checked={false}
                    />
                    <span style={{ color: "white", fontWeight: "600" }}>
                      {article?.art_likes}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RemoveRedEyeIcon sx={{ mr: "10px", color: "#fff" }} />
                    <span style={{ color: "white", fontWeight: "600" }}>
                      {article?.art_views}
                    </span>
                  </div>
                </div>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
