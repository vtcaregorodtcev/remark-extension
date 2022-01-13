import { batch, Component, createEffect, createSignal, Show } from "solid-js";
import Remark32Icon from "@src/icons/remark-32.svg";
import { MainForm } from "./components/main-form";
import { useStorage } from "@src/hooks/use-storage";
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
import { updateBookmark } from "@src/api/update-bookmark";
import { toArray } from "@src/utils/to-array";
import { clearStorages } from "@src/utils/clear-storages";

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

  const [apiConfig, setApiConfig] = useStorage(API_CONFIG_SS_K);
  const [bookmarks, setBookmarks] = useStorage(BOOKMARKS_SS_K, "local");

  const updateCurrentBookmark = (bookmark: Bookmark) => {
    const bookmarksCache = toRecord(bookmarks.value);
    bookmarksCache[bookmark.Link] = bookmark;

    batch(() => {
      setBookmark(bookmark);
      setBookmarks(JSON.stringify(bookmarksCache));
    });
  };

  createEffect(async () => {
    const newUrl = activeTab.value.url;
    const config: ApiConfig = toRecord(apiConfig.value);
    const apiReady = isApiConfig(config);

    setApiReady(apiReady);

    if (apiReady && newUrl && text.value) {
      const bookmarksCache = toRecord(bookmarks.value);

      const bookmark =
        bookmarksCache[newUrl] ||
        (await createBookmark(config, newUrl, text.value));

      updateCurrentBookmark(bookmark);
    }
  });

  const onConfigSave = (config?: ApiConfig) =>
    setApiConfig(JSON.stringify(config));

  const onLabelSubmit = async (Label: string) => {
    const bMark = bookmark();

    const newBMark = {
      ...bMark,
      Label,
      IsRemarked: true,
    };

    const updated = await updateBookmark(toRecord(apiConfig.value), newBMark);

    updateCurrentBookmark(updated);
  };

  const onLabelEdit = async () => {
    const bMark = bookmark();
    const topLabels = toArray(bMark.TopLabels);

    topLabels.pop();
    topLabels.unshift(bMark.Label);

    const newBMark = {
      ...bMark,
      TopLabels: topLabels.join(),
      IsRemarked: false,
    };

    const updated = await updateBookmark(toRecord(apiConfig.value), newBMark);

    updateCurrentBookmark(updated);
  };

  return (
    <div class="flex flex-col w-96 h-max divide-y divide-gray2">
      <Header>
        <HeaderMenu
          onApiConfigClear={() => {
            onConfigSave();
            clearStorages();
          }}
        />
      </Header>
      <Show
        when={isApiReady()}
        fallback={<APIConfigForm onSave={onConfigSave} />}
      >
        <Show
          when={!bookmark().IsRemarked}
          fallback={
            <RemarkedPage onLabelEdit={onLabelEdit} label={bookmark().Label} />
          }
        >
          <Show when={Boolean(bookmark().Name)} fallback={<Skeleton />}>
            <MainForm bookmark={bookmark()} onLabelSubmit={onLabelSubmit} />
          </Show>
        </Show>
      </Show>
      <Footer />
    </div>
  );
};

export default Popup;
