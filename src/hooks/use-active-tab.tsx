import { getTabs } from "@src/utils/get-tabs";
import { createStore } from "solid-js/store";

const tabs = getTabs();

export function useActiveTab() {
  const [store, setStore] = createStore({ value: {} as chrome.tabs.Tab });

  tabs.query({ active: true, currentWindow: true }, (tabs) =>
    setStore({ value: tabs[0] })
  );

  return store;
}
