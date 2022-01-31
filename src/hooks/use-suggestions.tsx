import { fetchBookmarks } from "@src/api/fetch-bookmarks";
import { API_CONFIG_SS_K, BOOKMARK_LABELS_SS_K } from "@src/constants";
import { isApiConfig } from "@src/Popup/components/api-config-form";
import { toRecord } from "@src/utils/to-record";
import uniq from "lodash.uniq";
import { createEffect } from "solid-js";
import { useStorage } from "./use-storage";

export const useSuggestions = () => {
  const [apiConfig] = useStorage(API_CONFIG_SS_K);
  const [suggestions, setSuggestions] = useStorage(
    BOOKMARK_LABELS_SS_K,
    "local"
  );

  createEffect(() => {
    const apiConf = toRecord(apiConfig.value);
    const apiReady = isApiConfig(apiConf);

    if (apiReady) {
      fetchBookmarks(apiConf).then((bookmarks) => {
        const labels = bookmarks.map((b) => b.Label);

        setSuggestions(JSON.stringify(uniq(labels)));
      });
    }
  });

  return suggestions;
};
