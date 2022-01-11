import { Component, createEffect, createSignal, Show } from "solid-js";
import Remark32Icon from "@src/icons/remark-32.svg";
import { MainForm } from "./components/main-form";
import { useSyncStorage } from "@src/hooks/use-sync-storage";
import {
  ApiConfig,
  APIConfigForm,
  isApiConfig,
} from "./components/api-config-form";
import { HeaderMenu } from "./components/header-menu";
import { API_CONFIG_SS_K, BOOKMARKS_SS_K } from "@src/constants";
import { useActiveTab } from "@src/hooks/use-active-tab";
import { Bookmark, createBookmark } from "@src/api/create-bookmark";
import { toRecord } from "@src/utils/to-record";
import { Skeleton } from "./components/skeleton";
import { RemarkedPage } from "./components/remarked-page";
import { usePageText } from "@src/hooks/use-page-text";

const Header: Component = ({ children }) => (
  <header class="h-14 flex items-center justify-between px-8">
    <div class="flex items-center">
      <img src={Remark32Icon} alt="Remark" />
      <span class="px-3 text-2xl text-gray10">Remark</span>
    </div>
    <div class="h-full">{children}</div>
  </header>
);

const Footer: Component = () => (
  <footer class="h-14 text-base flex items-center px-8 text-gray6">
    AI-powered AWS based bookmark manager
  </footer>
);

const Popup: Component = () => {
  const [isApiReady, setApiReady] = createSignal(false);
  const [bookmark, setBookmark] = createSignal({} as Bookmark);

  const text = usePageText();
  const activeTab = useActiveTab();

  const [bookmarks, setBookmarks] = useSyncStorage(BOOKMARKS_SS_K);
  const [apiConfig, setApiConfig] = useSyncStorage(API_CONFIG_SS_K);

  createEffect(async () => {
    const newUrl = activeTab.value.url;
    const config: ApiConfig = toRecord(apiConfig.value);
    const apiReady = isApiConfig(config);

    setApiReady(apiReady);

    if (apiReady && newUrl && text.value) {
      const newUrl = activeTab.value.url;
      const bookmarksCache: Record<string, Bookmark> = toRecord(
        bookmarks.value
      );

      const bookmark =
        bookmarksCache[newUrl] ||
        (await createBookmark(config, newUrl, text.value));
      setBookmark(bookmark);

      bookmarksCache[newUrl] = bookmark;
      setBookmarks(JSON.stringify(bookmarksCache));
    }
  });

  const onConfigSave = (config?: ApiConfig) =>
    setApiConfig(JSON.stringify(config));

  return (
    <div class="flex flex-col w-96 h-max divide-y divide-gray2">
      <Header>
        <HeaderMenu onApiConfigClear={onConfigSave} />
      </Header>
      <Show
        when={isApiReady()}
        fallback={<APIConfigForm onSave={onConfigSave} />}
      >
        <Show
          when={!bookmark().IsRemarked}
          fallback={<RemarkedPage label={bookmark().Label} />}
        >
          <Show when={Boolean(bookmark().Name)} fallback={<Skeleton />}>
            <MainForm bookmark={bookmark()} />
          </Show>
        </Show>
      </Show>
      <Footer />
    </div>
  );
};

export default Popup;
