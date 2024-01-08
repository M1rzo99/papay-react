import { Member } from "./user";
import { MeLiked } from "./product";

export interface BoArticle {
  _id: string;
  art_subject: string;
  art_content: string;
  art_image?: string;
  bo_id: string;
  art_status: string;
  art_likes: number;
  art_views: number;
  mb_id: string;
  createdAt: Date;
  updateAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
}

export interface SearchArticlesObj {
  page: number;
  limit: number;
  bo_id: string;
  order?: number | null;
}

export interface SerchMemberArticlesObj {
  page: number;
  limit: number;
  mb_id: string;
}
