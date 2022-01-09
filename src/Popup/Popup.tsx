import { Component } from "solid-js";
import Remark32Icon from "@src/icons/remark-32.svg";
import { MainForm } from "./components/main-form";

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

const Popup: Component = () => {
  return (
    <div class="flex flex-col w-96 h-max divide-y divide-gray2">
      <Header />
      <MainForm topLabels={["Solutions", "OSS", "Todos"]} />
      <Footer />
    </div>
  );
};

export default Popup;
