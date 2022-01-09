import { Component, Show } from "solid-js";
import Remark32Icon from "@src/icons/remark-32.svg";
import { MainForm } from "./components/main-form";
import { useSyncStorage } from "@src/hooks/use-sync-storage";
import {
  ApiConfig,
  APIConfigForm,
  isApiConfig,
} from "./components/api-config-form";
import { HeaderMenu } from "./components/header-menu";

const API_CONFIG_SYNC_STORAGE_KEY = "API_CONFIG_SYNC_STORAGE_KEY";

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
  const [apiConfig, setApiConfig] = useSyncStorage(API_CONFIG_SYNC_STORAGE_KEY);

  const onConfigSave = (config?: ApiConfig) =>
    setApiConfig(JSON.stringify(config));

  return (
    <div class="flex flex-col w-96 h-max divide-y divide-gray2">
      <Header>
        <HeaderMenu onApiConfigClear={onConfigSave} />
      </Header>
      <Show
        when={isApiConfig(JSON.parse(apiConfig.value || "{}"))}
        fallback={<APIConfigForm onSave={onConfigSave} />}
      >
        <MainForm topLabels={["Solutions", "OSS", "Todos"]} />
      </Show>
      <Footer />
    </div>
  );
};

export default Popup;
