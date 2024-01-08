import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { FollowSerchObj, Follower, Following } from "../../types/follow";

class FollowApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getMemberFollowers(data: FollowSerchObj): Promise<Follower[]> {
    try {
      const url = `/follow/followers?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const followers: Follower[] = result.data.data;
      return followers;
    } catch (err: any) {
      console.log(`ERROR ::: getMemberFollowers ${err.message}`);
      throw err;
    }
  }

  public async getMemberFollowing(data: FollowSerchObj): Promise<Following[]> {
    try {
      const url = `/follow/followings?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const followings: Following[] = result.data.data;
      return followings;
    } catch (err: any) {
      console.log(`ERROR ::: getMemberFollowing ${err.message}`);
      throw err;
    }
  }

  public async subscribe(mb_id: string): Promise<boolean> {
    try {
      const result = await axios.post(
        this.path + "/follow/subscribe",
        { mb_id: mb_id },
        { withCredentials: true }
      );

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);

      return result.data.data === "subscribed";
    } catch (err: any) {
      console.log(`ERROR ::: subscribe ${err.message}`);
      throw err;
    }
  }

  public async unSubscribe(mb_id: string): Promise<boolean> {
    try {
      const result = await axios.post(
        this.path + "/follow/unsubscribe",
        { mb_id: mb_id },
        { withCredentials: true }
      );

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);

      return result.data.data === "unsubscribed";
    } catch (err: any) {
      console.log(`ERROR ::: unSubscribe ${err.message}`);
      throw err;
    }
  }
}
export default FollowApiService;
