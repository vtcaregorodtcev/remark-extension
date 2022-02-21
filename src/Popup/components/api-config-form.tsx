import { API_PATH_SS_K, API_XKEY_SS_K } from "@src/constants";
import { useStorage } from "@src/hooks/use-storage";
import {
  API_PATH_INPUT,
  API_XKEY_INPUT,
  SUBMIT_API_CONFIG,
} from "@tests/lib/testids";
import { Component } from "solid-js";

export type ApiConfig = {
  apiPath: string;
  apiXKey: string;
};

export const isApiConfig = (config: ApiConfig) =>
  "apiXKey" in config && "apiPath" in config;

export type APIConfigFormProps = {
  onSave: (config: ApiConfig) => void;
};

export const APIConfigForm: Component<APIConfigFormProps> = ({ onSave }) => {
  const [apiPath, setApiPath] = useStorage(API_PATH_SS_K);
  const [apiXKey, setApiXKey] = useStorage(API_XKEY_SS_K);

  const onSubmit = (e: Event) => {
    // to prevent reloading
    e.preventDefault();

    onSave({
      apiPath: apiPath.value,
      apiXKey: apiXKey.value,
    });

    setApiPath("");
    setApiXKey("");
  };

  return (
    <form class="re-content" onSubmit={onSubmit}>
      <label class="re-label">
        It looks like this is your first time using the remark, let's add API
        config
      </label>
      <input
        data-testid={API_PATH_INPUT}
        class="re-input mb-3"
        type="text"
        placeholder="API path"
        value={apiPath.value}
        onInput={(e) => setApiPath(e.currentTarget.value)}
      />
      <input
        data-testid={API_XKEY_INPUT}
        class="re-input"
        type="text"
        placeholder="API x-key"
        value={apiXKey.value}
        onInput={(e) => setApiXKey(e.currentTarget.value)}
      />
      <button
        data-testid={SUBMIT_API_CONFIG}
        disabled={!apiPath.value || !apiXKey.value}
        type="submit"
        class="mt-3 w-1/4 self-end re-box"
      >
        Save
      </button>
    </form>
  );
};
