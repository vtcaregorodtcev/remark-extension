import { getSyncStorage } from "@src/utils/get-sync-storage";
import { createStore, Store } from "solid-js/store";

const syncStorage = getSyncStorage();

export function useSyncStorage(
  key: string
): [Store<{ value: string }>, (newValue: string) => void] {
  const [store, setStore] = createStore({ value: "" });

  syncStorage.get?.([key], (result) => setStore({ value: result[key] || "" }));

  const setNewValue = (newValue: string = "") => {
    syncStorage.set({ [key]: newValue }, () => setStore({ value: newValue }));
  };

  return [store, setNewValue];
}
