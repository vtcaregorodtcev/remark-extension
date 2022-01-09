import { Component, createSignal } from "solid-js";

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
  const [apiPath, setApiPath] = createSignal("");
  const [apiXKey, setApiXKey] = createSignal("");

  const onSubmit = () =>
    onSave({
      apiPath: apiPath(),
      apiXKey: apiXKey(),
    });

  return (
    <form class="re-content" onSubmit={onSubmit}>
      <label class="re-label">
        It looks like this is your first time using the remark, let's add API
        config
      </label>
      <input
        class="re-input mb-3"
        type="text"
        placeholder="API path"
        onInput={(e) => setApiPath(e.currentTarget.value)}
      />
      <input
        class="re-input"
        type="text"
        placeholder="API x-key"
        onInput={(e) => setApiXKey(e.currentTarget.value)}
      />
      <button type="submit" class="mt-3 w-1/4 self-end re-box">
        Save
      </button>
    </form>
  );
};