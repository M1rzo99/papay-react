import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../types/screen";

const selectorCommunityPage = (state: AppRootState) => state.communityPage;
export const retrivetargetBoArticles = createSelector(
  selectorCommunityPage,
  (CommunityPage) => CommunityPage.targetBoArticles
);
