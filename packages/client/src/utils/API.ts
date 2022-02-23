import axios from "axios";

import { CONFIG } from "../config";

export default axios.create({
  baseURL: `${CONFIG.HOST_URL}/api/`,
  responseType: "json",
});
