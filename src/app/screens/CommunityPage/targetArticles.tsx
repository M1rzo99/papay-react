import React from "react";
import { Box, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";
import { BoArticle } from "../../../types/boArticles";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";

export function TargetArticles(props: any) {
  // Handlers
  const { setArticlesRebuild } = props;

  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

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
                  <span className={"all_article_ttle"}>{article?.bo_id} -</span>

                  <p className={"all_article_txt"}>{article?.art_content}</p>
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
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article._id}
                      onClick={targetLikeHandler}
                      checked={
                        article?.me_liked && article.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
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
