import {apiClient} from "../../../config/axios";

export const getPosts = async () => {
   return  apiClient.get(`/posts`);
};