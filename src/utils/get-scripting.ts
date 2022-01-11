export const getScripting = () => chrome.scripting || {
  executeScript: (_, cb: (result: chrome.scripting.InjectionResult[]) => void) => { cb([{ frameId: 0, result: "Some Text" }]) }
}