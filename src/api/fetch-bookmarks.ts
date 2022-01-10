import { ApiConfig } from "@src/Popup/components/api-config-form";
import { Bookmark } from "./create-bookmark";

export const fetchBookmarks = async (config: ApiConfig): Promise<Bookmark[]> => {
  const { data } = await (await fetch(`${config.apiPath}/bookmarks`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'accept': '*/*',
      'x-api-key': config.apiXKey
    }
  })).json();

  return data;
}