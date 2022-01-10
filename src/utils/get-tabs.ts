export const getTabs = () => chrome?.tabs || {
  query: (_, cb) => { cb([{ url: '/mock/url' }] as chrome.tabs.Tab[]) }
}