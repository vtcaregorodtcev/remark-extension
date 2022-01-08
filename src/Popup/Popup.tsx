import type { Component } from "solid-js";
import Remark32Icon from "../icons/remark-32.svg";

const Header: Component = () => (
  <header class="h-14 flex items-center px-8">
    <img src={Remark32Icon} alt="Remark" />
    <span class="px-3 text-2xl text-gray10">Remark</span>
  </header>
);

const Footer: Component = () => (
  <footer class="h-14 text-base flex items-center px-8 text-gray6">
    AI-powered AWS based bookmark manager
  </footer>
);

const APIConfigForm: Component = () => (
  <form class="flex flex-col px-8 py-4">
    <label class="text-base text-gray7">
      It looks like this is your first time using the remark, let's add API
      config
    </label>
    <input class="my-3 p-3 border rounded" type="text" placeholder="API path" />
    <input class="p-3 border rounded" type="text" placeholder="API x-key" />
    <button
      type="submit"
      class="mt-3 p-2 w-1/4 self-end bg-gray6 text-white border rounded"
    >
      Save
    </button>
  </form>
);

const Popup: Component = () => {
  return (
    <div class="flex flex-col w-96 h-max divide-y divide-gray2">
      <Header />
      <APIConfigForm />
      <Footer />
    </div>
  );
};

export default Popup;
