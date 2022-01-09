import { Component, For } from "solid-js";
import OkIcon from "@src/icons/ok.svg";
import { NewLabelForm } from "./new-label-form";

type MainFormProps = {
  topLabels: string[];
};

type TopLabelsItemProps = {
  label: string;
};

export const OkBtn: Component = () => (
  <div class="w-2/12 flex items-center justify-center">
    <button type="submit" class="re-ok">
      <img src={OkIcon} alt="Ok" />
    </button>
  </div>
);

const TopLabelsItem: Component<TopLabelsItemProps> = ({ label }) => (
  <div class="re-ok-form mb-3 last:mb-0 first:text-4xl">
    <span class="re-box-inverse w-max">{label}</span>
    <OkBtn />
  </div>
);

export const MainForm: Component<MainFormProps> = ({ topLabels }) => {
  return (
    <div class="re-content">
      <label class="re-label">Here is the TOP of possible labels</label>
      <div>
        <For each={topLabels}>{(label) => <TopLabelsItem label={label} />}</For>
      </div>
      <label class="re-label mt-6">
        Did I predict it wrong? Type a new label or pick one of yours
      </label>
      <NewLabelForm />
    </div>
  );
};
