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
import { useLoading } from "@src/hooks/use-loading";

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
    AI-powered AWS-based bookmark manager
  </footer>
);

const Popup: Component = () => {
  const [isLoading, loading] = useLoading();

  const [isApiReady, setApiReady] = createSignal(false);
  const [bookmark, setBookmark] = createSignal({} as Bookmark);

  const pageText = usePageText();
  const activeTab = useActiveTab();

  const [apiConfig, setApiConfig] = useStorage(API_CONFIG_SS_K);
  const [bookmarks, setBookmarks] = useStorage(BOOKMARKS_SS_K, "local");

  const updateView = (bookmark: Bookmark) => {
    const bookmarksCache = toRecord(bookmarks.value);
    bookmarksCache[bookmark.Link] = bookmark;

    batch(() => {
      setBookmark(bookmark);
      setBookmarks(JSON.stringify(bookmarksCache));
    });
  };

  createEffect(async () => {
    const Text = pageText.value;
    const Link = activeTab.value.url;

    const config: ApiConfig = toRecord(apiConfig.value);
    const apiReady = isApiConfig(config);

    setApiReady(apiReady);

    if (apiReady && Text && Link) {
      const bookmarksCache = toRecord(bookmarks.value);

      loading(async () => {
        const bookmark =
          bookmarksCache[Link] ||
          (await createBookmark(config, { Link, Text, Name: Link }));

        updateView(bookmark);
      });
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

    loading(async () => {
      const updated = await updateBookmark(toRecord(apiConfig.value), newBMark);

      updateView(updated);
    });
  };

  const onLabelEdit = async () => {
    const bMark = bookmark();
    const topLabels = toArray(bMark.TopLabels);

    topLabels.unshift(bMark.Label);

    if (topLabels.length > 3) {
      topLabels.pop();
    }

    const newBMark = {
      ...bMark,
      TopLabels: topLabels.join(),
      IsRemarked: false,
    };

    loading(async () => {
      const updated = await updateBookmark(toRecord(apiConfig.value), newBMark);

      updateView(updated);
    });
  };

  const onNameChange = (Name: string) =>
    setBookmark((bookmark) => ({ ...bookmark, Name }));

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
        <Show when={!isLoading()} fallback={<Skeleton />}>
          <Show
            when={!bookmark().IsRemarked}
            fallback={
              <RemarkedPage
                label={bookmark().Label}
                onLabelEdit={onLabelEdit}
              />
            }
          >
            <MainForm
              bookmark={bookmark()}
              onLabelSubmit={onLabelSubmit}
              onNameChange={onNameChange}
            />
          </Show>
        </Show>
      </Show>
      <Footer />
    </div>
  );
};

export default Popup;
