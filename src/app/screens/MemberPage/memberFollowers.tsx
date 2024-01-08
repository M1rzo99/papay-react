import {
  Avatar,
  Box,
  Button,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "./slice";
import { retriveMemberFollowers } from "./selector";
import { FollowSerchObj, Follower } from "../../../types/follow";
import { useEffect, useState } from "react";
import FollowApiService from "../../apiServices/followApiService";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import Definer from "../../../lib/Definer";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});

// REDUX SELECTOR
const memberFollowersRetriver = createSelector(
  retriveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

export function MemberFollowers(props: any) {
  // Initializations
  const { mb_id, setFollowRebuild, followRebuild } = props;
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriver);
  const [followersSerchObj, setFollowersSerchObj] = useState<FollowSerchObj>({
    page: 1,
    limit: 5,
    mb_id: mb_id,
  });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers(followersSerchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [followersSerchObj, followRebuild]); // componentDidUpdate mantig'i

  //  Handler //

  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation(); // stopPropogation  bitaa tabelni bosganda ichiga click bolmasligi un
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.subscribe(id);

      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    followersSerchObj.page = value;
    setFollowersSerchObj({ ...followersSerchObj });
  };

  return (
    <Stack>
      {memberFollowers.map((follower: Follower) => {
        const image_url = follower?.subscriber_member_data?.mb_image
          ? `${serverApi}/${follower.subscriber_member_data.mb_image} `
          : "/auth/default_user.svg";
        return (
          <Box className="follow_box">
            <Avatar alt={""} src={image_url} sx={{ width: 89, height: 89 }} />
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
                {follower?.subscriber_member_data?.mb_type}
              </span>
              <span className="name_text">
                {follower?.subscriber_member_data?.mb_nick}
              </span>
            </div>
            {props.actions_enabled &&
              (follower?.me_followed &&
              follower.me_followed[0]?.my_following ? (
                <Button
                  variant="contained"
                  className="following_already"
                  disabled
                >
                  following
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={
                    <img
                      src="/icons/follow-icon.svg"
                      alt=""
                      style={{ width: "40px" }}
                    />
                  }
                  className="follow_btn"
                  onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                >
                  follow back
                </Button>
              ))}
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
            count={followersSerchObj.page >= 3 ? followersSerchObj.page + 1 : 3}
            page={followersSerchObj.page}
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
