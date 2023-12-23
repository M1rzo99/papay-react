import axios from "axios";
import assert from "assert";
import { serviceApi } from "../../lib/config";
import Definer from "../../lib/Definer";
import { Restaurant } from "../../types/user";
// import Definer

class RestaurantService {
  private readonly path: string;
  constructor() {
    this.path = serviceApi;
  }
  async getTopRestaurants() {
    try {
      const url = `/restaurants?page=1&limit=4&order=top`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);
      console.log("state", result.data.state);
      const top_restaurant: Restaurant[] = result.data.data;
      return top_restaurant;
    } catch (err: any) {
      console.log(`ERROR::: getTopRestaurants ${err.message}`);
      throw err;
    }
  }
}
export default RestaurantService;
