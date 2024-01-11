import React, { useEffect, useState } from "react";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers, setMemberFollowings } from "./slice";
import { retriveMemberFollowings } from "./selector";
import { FollowSerchObj, Follower, Following } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import assert from "assert";
import Definer from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { verifyMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});

// REDUX SELECTOR
const memberFollowingsRetriver = createSelector(
  retriveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

export function MemberFollowing(props: any) {
  /* INITIALIZATION */
  const history = useHistory();
  const { mb_id, setFollowRebuild, followRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriver);
  const [followingsSerchObj, setFollowingsSerchObj] = useState<FollowSerchObj>({
    page: 1,
    limit: 5,
    mb_id: mb_id,
  });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowing(followingsSerchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingsSerchObj, followRebuild]); // componentDidUpdate mantig'i

  //  Handler //
  const unSubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation(); // stopPropogation  bitaa tabelni bosganda ichiga click bolmasligi un
      assert.ok(verifyMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unSubscribe(id);

      await sweetTopSmallSuccessAlert("unSubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handlePaginationChange = (event: any, value: number) => {
    followingsSerchObj.page = value;
    setFollowingsSerchObj({ ...followingsSerchObj });
  };
  const visitMemberhandler = async (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
  };
  return (
    <Stack>
      {memberFollowings.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image
          ? `${serverApi}/${following.follow_member_data.mb_image} `
          : "/auth/default_user.svg";
        return (
          <Box className="follow_box">
            <Avatar
              alt={""}
              src={image_url}
              sx={{ width: 89, height: 89 }}
              onClick={() => visitMemberhandler(following?.follow_id)}
              style={{ cursor: "pointer" }}
            />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">
                {following?.follow_member_data?.mb_type}
              </span>
              <span
                className="name_text"
                onClick={() => visitMemberhandler(following?.follow_id)}
                style={{ cursor: "pointer" }}
              >
                {following?.follow_member_data?.mb_nick}
              </span>
            </div>
            {props.actions_enabled && (
              <Button
                variant="contained"
                className="follow_cancel_btn"
                startIcon={
                  <img
                    src="/icons/follow-icon.svg"
                    alt=""
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
                onClick={(e) => unSubscribeHandler(e, following?.follow_id)}
              >
                bekor qilish
              </Button>
            )}
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className="bottom_box">
          <Pagination
            count={
              followingsSerchObj.page >= 3 ? followingsSerchObj.page + 1 : 3
            }
            page={followingsSerchObj.page}
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
    </Stack>
  );
}
