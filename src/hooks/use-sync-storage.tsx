import { createStore, Store } from "solid-js/store";

export function useSyncStorage(
  key: string
): [Store<{ value: string }>, (newValue: string) => void] {
  const [store, setStore] = createStore({ value: "" });

  chrome?.storage?.sync?.get?.([key], (result) =>
    setStore({ value: result[key] || "" })
  );

  const setNewValue = (newValue: string = "") => {
    chrome.storage.sync.set({ [key]: newValue }, () =>
      setStore({ value: newValue })
    );
  };

  return [store, setNewValue];
}
