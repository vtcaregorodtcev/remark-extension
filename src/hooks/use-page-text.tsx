import { getScripting } from "@src/utils/get-scripting";
import { getTabs } from "@src/utils/get-tabs";
import { onMount } from "solid-js";
import { createStore } from "solid-js/store";

const tabs = getTabs();
const scripting = getScripting();

const tabsQuery = { active: true, currentWindow: true };

const preprocess = (s: string) => {
  const lower = s.toLowerCase();
  const alphanums = lower
    .replace(/[^a-zA-Z]+/g, " ") // only characters
    .replace(/http\S+/g, "") // without urls
    .replace(/\s\s+/g, " "); // without multiple spaces

  return alphanums;
};

export const usePageText = () => {
  const [store, setStore] = createStore({ value: "" });

  onMount(() => {
    tabs.query(tabsQuery, function (tabs) {
      const { id: tabId } = tabs[0];

      scripting.executeScript(
        {
          target: { tabId, allFrames: true },
          func: () => document.body.innerText,
        },
        ([data]) => setStore({ value: preprocess(String(data.result)) })
      );
    });
  });

  return store;
};
