import { BOOKMARKS_SS_K } from "@src/constants";

let mock = JSON.parse(localStorage.getItem('mock') || '{}');

const BookmarksMock = {
  "/mock/url": {
    "Link": "/mock/url",
    "Label": "MockLabel",
    "Text": "some text to preceed",
    "Id": "1aaee2c5-5ec2-44f7-b38c-bcf48728abd5",
    "TopLabels": "MockLabel,Out,Test",
    "Name": "/mock/url"
  }
}

mock[BOOKMARKS_SS_K] = JSON.stringify(BookmarksMock);

export type StorageType = 'sync' | 'local';

export const getStorage = (type: StorageType = 'sync') => chrome?.storage?.[type] || {
  get: ([key]: string[], cb: (result: Record<string, string>) => void) => { cb(mock) },
  set: (setObj: Record<string, string>, cb: Function) => {
    mock = { ...mock, ...setObj };

    cb();

    localStorage.setItem('mock', JSON.stringify(mock));
  }
}