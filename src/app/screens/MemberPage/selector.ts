import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../types/screen";
import { MemberPage } from ".";

const selectMemberpage = (state: AppRootState) => state.memberPage;

export const retriveChosenMember = createSelector(
  selectMemberpage,
  (MemberPage) => MemberPage.chosenMember
);

export const retriveChosenMemberBoArticles = createSelector(
  selectMemberpage,
  (MemberPage) => MemberPage.chosenMemberBoArticles
);
export const retriveChosenSingleBoArticle = createSelector(
  selectMemberpage,
  (MemberPage) => MemberPage.chosenSingleBoArticle
);
export const retriveMemberFollowers = createSelector(
  selectMemberpage,
  (MemberPage) => MemberPage.memberFollowers
);
export const retriveMemberFollowings = createSelector(
  selectMemberpage,
  (MemberPage) => MemberPage.memberFollowings
);
