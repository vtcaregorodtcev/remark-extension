import { ApiConfig } from "@src/Popup/components/api-config-form";

export type Bookmark = {
  Id: string;
  Label: string;
  Link: string;
  Name: string;
  BoW: string;
  TopLabels: string;
  IsRemarked: boolean;
}

export const createBookmark = async (config: ApiConfig, url: string): Promise<Bookmark> => {
  return await (await fetch(`${config.apiPath}/bookmarks`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      Name: url,
      Link: url,
      // -- will set on back -- 
      Label: 'MockLabel',
      TopLabels: 'MockLabel,Out,Test'
    }),
    headers: {
      'accept': '*/*',
      'x-api-key': config.apiXKey
    }
  })).json();
}