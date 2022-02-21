export const getScripting = () => chrome.scripting && process.env.NODE_ENV !== 'test' ? chrome.scripting : {
  executeScript: (_, cb: (result: chrome.scripting.InjectionResult[]) => void) => { cb([{ frameId: 0, result: "Some Text" }]) }
}