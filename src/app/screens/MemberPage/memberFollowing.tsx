import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowings } from "./slice";
import { retriveMemberFollowings } from "./selector";
import { Follower } from "../../../types/follow";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Follower[]) =>
    dispatch(setMemberFollowings(data)),
});

// REDUX SELECTOR
const memberFollowingsRetriver = createSelector(
  retriveMemberFollowings,
  (memberFollowing) => ({
    memberFollowing,
  })
);

const followings = [
  { mb_nick: "Down" },
  { mb_nick: "Up" },
  { mb_nick: "Center" },
];

export function MemberFollowing(props: any) {
  /* INITIALIZATION */
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowing } = useSelector(memberFollowingsRetriver);
  return (
    <Stack>
      {followings.map((following) => {
        const image_url = "/auth/default_user.svg";
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
              <span className="username_text">USER</span>
              <span className="name_text">{following.mb_nick}</span>
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
              >
                bekor qilish
              </Button>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
