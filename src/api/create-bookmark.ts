import { ApiConfig } from "@src/Popup/components/api-config-form";

export type Bookmark = {
  Id: string;
  Label: string;
  Link: string;
  Name: string;
  Text: string;
  TopLabels: string;
  IsRemarked: boolean;
}

export const createBookmark = async (config: ApiConfig, bookmark: Partial<Bookmark>): Promise<Bookmark> => {
  return await (await fetch(`${config.apiPath}/bookmarks`, {
    method: 'POST',
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