import { getStorage, StorageType } from "@src/utils/get-storage";
import { createStore, Store } from "solid-js/store";

export function useStorage(
  key: string,
  storageType: StorageType = "sync"
): [Store<{ value: string }>, (newValue: string) => void] {
  const storage = getStorage(storageType);

  const [store, setStore] = createStore({ value: "" });

  storage.get?.([key], (result) => setStore({ value: result[key] || "" }));

  const setNewValue = (newValue: string = "") => {
    storage.set({ [key]: newValue }, () => setStore({ value: newValue }));
  };

  return [store, setNewValue];
}
