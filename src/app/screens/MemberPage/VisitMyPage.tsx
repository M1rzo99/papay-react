import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import {
  ArrowBack,
  ArrowForward,
  Facebook,
  Instagram,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import { TuiEditor } from "../../components/TuiEditor/TuiEditor";
import TuiViwer from "../../components/TuiEditor/TuiViwer";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import {
  retriveChosenMember,
  retriveChosenMemberBoArticles,
  retriveChosenSingleBoArticle,
} from "./selector";
import { BoArticle, SerchMemberArticlesObj } from "../../../types/boArticles";
import { Member } from "../../../types/user";
import { retrivetargetBoArticles } from "../CommunityPage/selector";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { verifyMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});

// REDUX SELECTOR
const chosenMemberRetriver = createSelector(
  retriveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);

const ChosenMemberBoArticlesRetriver = createSelector(
  retriveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);

const chosenSingleBoArticleRetriver = createSelector(
  retriveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);

export function VisitMyPage(props: any) {
  // Initialization//

  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());

  const { chosenMember } = useSelector(chosenMemberRetriver);
  const { chosenMemberBoArticles } = useSelector(
    ChosenMemberBoArticlesRetriver
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriver);
  const [value, setValue] = useState("1");
  const [memberArticleSerchObj, setMemberArticleSerchObj] =
    useState<SerchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 4 });
  const [articlesRebuild, setArticlesRebuild] = useState<boolean>(false);
  const [followRebuild, setFollowRebuild] = useState<Date>(new Date()); // follow pageidagilarni refresh bosganda qayta qurib beradi

  useEffect(() => {
    if (!verifyMemberData) {
      sweetFailureProvider("Please login first!", true, true);
    }
    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();

    // setChosenMemberBoArticle
    communityService
      .getMemberCommunityArticles(memberArticleSerchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));

    // setChosenMember
    memberService
      .getChosenMember(verifyMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberArticleSerchObj, articlesRebuild]);

  // Handlers//
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSerchObj.page = value;
    setMemberArticleSerchObj({ ...memberArticleSerchObj });
  };

  //  renderChosenArticleHandler
  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className="my_page_left">
              <Box display="flex" flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className="menu_name">Mening Maqolalarim</Box>
                  <Box className="menu_content">
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className="bottom_box">
                        <Pagination
                          count={
                            memberArticleSerchObj.page >= 3
                              ? memberArticleSerchObj.page + 1
                              : 3
                          }
                          page={memberArticleSerchObj.page}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBack,
                                next: ArrowForward,
                              }}
                              {...item}
                              color={"secondary"}
                            />
                          )}
                          onChange={handlePaginationChange}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value={"2"}>
                  <Box className="menu_name">Followers</Box>
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enabled={true}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={verifyMemberData?._id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className="menu_name">Following</Box>
                  <Box className="menu_content">
                    <MemberFollowing
                      actions_enabled={true}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={verifyMemberData?._id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className="menu_name">Maqola Yozish</Box>
                  <Box className="write_content">
                    <TuiEditor
                      setValue={setValue}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"5"}>
                  <Box className="menu_name">Tanlangan Maqolalar</Box>
                  <Box className="menu_content">
                    <TuiViwer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>

                <TabPanel value={"6"}>
                  <Box className="menu_name">Malumotlarni o'zgartirish</Box>
                  <Box className="menu_content">
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className="my_page_right">
              <Box className="order_info_box">
                <a onClick={() => setValue("6")} className="settings_btn">
                  <SettingsIcon />
                </a>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className="order_user_img">
                    <img
                      style={{ objectFit: "cover" }}
                      src={verifyMemberData?.mb_image}
                      className="order_user_avatar"
                    />
                    <div className="order_user_icon_box">
                      <img
                        src={
                          chosenMember?.mb_type === "RESTAURANT"
                            ? "/icons/star.png"
                            : "/icons/def_usr.svg"
                        }
                      />
                    </div>
                  </div>
                  <span className="order_user_name">
                    {chosenMember?.mb_nick}
                  </span>
                  <span className="order_user_prof">
                    {chosenMember?.mb_type}
                  </span>
                </Box>
                <Box className="user_media_box">
                  <Facebook />
                  <Instagram />
                  <Telegram />
                  <YouTube />
                </Box>
                <Box className="user_media_box">
                  <p className="follows">
                    Followers: {chosenMember?.mb_subscriber_cnt}
                  </p>
                  <p className="follows">
                    Followings: {chosenMember?.mb_follow_cnt}
                  </p>
                </Box>
                <p className="user_desc">
                  {chosenMember?.mb_description ??
                    "Qo'shimcha Malumot Kiritilmagan"}
                </p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "1px" }}
                >
                  <TabList onChange={handleChange}>
                    <Tab
                      style={{ flexDirection: "column" }}
                      value="4"
                      component={() => (
                        <Button
                          variant="contained"
                          onClick={() => setValue("4")}
                        >
                          Maqola Yozish
                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>

              <Box className="my_page_menu">
                <TabList
                  orientation="vertical"
                  variant="scrollable"
                  onChange={handleChange}
                  aria-label="tabs API tabs example"
                  sx={{ borderRight: 1, borderColor: "divider", width: "95%" }}
                >
                  <Tab
                    value={"1"}
                    style={{ flexDirection: "column" }}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("1")}
                      >
                        <img src="/icons/post.svg" />
                        <span>Maqolalarim</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("2")}
                      >
                        <img src="/icons/follower.svg" />
                        <span>Followers</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("3")}
                      >
                        <img src="/icons/following.svg" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
