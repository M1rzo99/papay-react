import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import {
  SearchArticlesObj,
  BoArticle,
  SerchMemberArticlesObj,
  BoArticlesInput,
} from "../../types/boArticles";

class CommunityApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createArticle(data: BoArticlesInput) {
    try {
      const result = await axios.post(this.path + "/community/create", data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR::: createArticle ${err.message}`);
      throw err;
    }
  }

  public async getTargetArticles(data: SearchArticlesObj) {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR::: getTargetArticles ${err.message}`);
      throw err;
    }
  }

  public async getMemberCommunityArticles(data: SerchMemberArticlesObj) {
    try {
      let url = `/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR::: getMemberCommunityArticles ${err.message}`);
      throw err;
    }
  }
  //2024/01/08
  public async getChosenArticle(art_id: string) {
    try {
      let url = `/community/single-article/${art_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR::: getChosenArticle ${err.message}`);
      throw err;
    }
  }

  public async uploadImageToServer(image: any) {
    try {
      let formData = new FormData();
      formData.append("community_image", image);
      console.log(image);
      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const image_name: string = result.data.data;
      return image_name;
    } catch (err: any) {
      console.log(`ERROR::: uploadImageToServer ${err.message}`);
      throw err;
    }
  }
}
export default CommunityApiService;
