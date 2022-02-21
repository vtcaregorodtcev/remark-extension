import { HTTPRequest } from "puppeteer";

const baseResponse = {
  content: 'application/json',
  headers: { "Access-Control-Allow-Origin": "*" },
}

export const API_PATH = 'http://example.com';
export const API_KEY = 'example-key';

export const mockAPI = (request: HTTPRequest) => {
  const url = request.url();
  const method = request.method();

  console.log('>>', method, url);

  switch (true) {
    // fetch bookmarks
    case url.endsWith('/bookmarks') && method === 'GET':
      return request.respond({
        ...baseResponse,
        body: JSON.stringify({ data: [] })
      });
    // create bookmark
    case url.endsWith('/bookmarks') && method === 'POST':
      return request.respond({
        ...baseResponse,
        body: JSON.stringify({
          Id: 'new-bookmark',
          Label: 'mock-label',
          TopLabels: 'mock-label,test,third',
          IsRemarked: false,
          ...JSON.parse(request.postData())
        })
      })
    // TODO: add update case
  }
};