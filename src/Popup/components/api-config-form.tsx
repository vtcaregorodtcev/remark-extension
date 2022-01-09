import { Component } from "solid-js";

export const APIConfigForm: Component = () => (
  <form class="re-content">
    <label class="re-label">
      It looks like this is your first time using the remark, let's add API
      config
    </label>
    <input class="re-input mb-3" type="text" placeholder="API path" />
    <input class="re-input" type="text" placeholder="API x-key" />
    <button type="submit" class="mt-3 w-1/4 self-end re-box">
      Save
    </button>
  </form>
);
