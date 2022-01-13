import { ApiConfig } from "@src/Popup/components/api-config-form";
import { Bookmark } from "./create-bookmark";

export const updateBookmark = async (config: ApiConfig, bookmark: Bookmark): Promise<Bookmark> => {
  return await (await fetch(`${config.apiPath}/bookmarks/${bookmark.Id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify({
      ...bookmark
    }),
    headers: {
      'accept': '*/*',
      'x-api-key': config.apiXKey
    }
  })).json();
}