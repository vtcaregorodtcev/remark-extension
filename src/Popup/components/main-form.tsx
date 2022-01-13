import { Component, For } from "solid-js";
import { NewLabelForm } from "./new-label-form";
import { Bookmark } from "@src/api/create-bookmark";
import { toArray } from "@src/utils/to-array";
import { TopLabelsItem } from "./top-labels-item";

type MainFormProps = {
  bookmark: Bookmark;
  onLabelSubmit: (label: string) => void;
};

export const MainForm: Component<MainFormProps> = ({
  bookmark,
  onLabelSubmit,
}) => {
  return (
    <div class="re-content">
      <label class="re-label">Here is the TOP of possible labels</label>
      <div>
        <For each={toArray(bookmark.TopLabels)}>
          {(label) => <TopLabelsItem onSubmit={onLabelSubmit} label={label} />}
        </For>
      </div>
      <label class="re-label mt-6">
        Did I predict it wrong? Type a new label or pick one of yours
      </label>
      <NewLabelForm />
      <label class="re-label mt-6">The name of your Bookmark</label>
      <input
        class="re-input"
        type="text"
        placeholder={bookmark.Name}
        value={bookmark.Name}
      />
    </div>
  );
};
