import React from "react";
import moment from "moment";
import { Box, Checkbox, Stack } from "@mui/material";
// import { TabContext, TabList, TabPanel } from "@mui/lab"
// import Tab from "@mui/material/Tab"
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { BoArticle } from "../../../types/boArticles";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import Definer from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifyMemberData } from "../../apiServices/verify";

export function MemberPosts(props: any) {
  const {
    chosenMemberBoArticles,
    renderChosenArticleHandler,
    setArticlesRebuild,
  } = props;

  // targetLikeHandler
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifyMemberData, Definer.auth_err1);
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
  // chosenArticle starting point

  return (
    <Box className="post_content">
      {chosenMemberBoArticles.map((article: BoArticle) => {
        const image_path = article.art_image
          ? `${serverApi}/${article.art_image}`
          : "/auth/df_lucas.jpeg";
        return (
          <Stack
            className="all_article_box"
            sx={{ cursor: "pointer" }}
            onClick={() => renderChosenArticleHandler(article?._id)}
            // shu mantiq orqali pagenni ichidagi tableni xphlagan joyiga bossak o'sha page olib o'tadi
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${image_path})` }}
            ></Box>
            <Box className="all_article_container">
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src={
                    article?.member_data?.mb_image
                      ? `${serverApi}/${article.member_data.mb_image}`
                      : "/auth/df_lucas.jpeg"
                  }
                  width={"35px"}
                  height={"35px"}
                  alt=""
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className="all_article_author_user">
                  {article?.member_data?.mb_nick}
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">{article?.bo_id}</span>
                <p className="all_article_desc"> {article?.art_subject}</p>
              </Box>
              <Box>
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                  sx={{ mb: "10px" }}
                >
                  <Box
                    className="article_share_main"
                    style={{
                      color: "#fff",
                      marginLeft: "150px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {moment(article?.createdAt).format("YY-MM-DD HH:mm")}
                    </span>
                    <Checkbox
                      sx={{ ml: "40px" }}
                      icon={<FavoriteBorder />}
                      id={article?._id}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      checked={
                        article?.me_liked && article.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                      onClick={targetLikeHandler}
                    />
                    <span style={{ marginRight: "18px" }}>
                      {article?.art_likes}
                    </span>
                    <RemoveRedEye />
                    <span style={{ marginLeft: "18px" }}>
                      {article?.art_views}
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}
