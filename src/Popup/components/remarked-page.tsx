import noop from "lodash.noop";
import { Component } from "solid-js";
import { TopLabelsItem } from "./top-labels-item";

type RemarkedPageProps = {
  label: string;
  onLabelEdit: () => void;
};

export const RemarkedPage: Component<RemarkedPageProps> = ({
  label,
  onLabelEdit = noop,
}) => (
  <div class="re-content">
    <label class="re-label">This page is already remarked</label>
    <div>
      <TopLabelsItem canEdit onEdit={onLabelEdit} label={label} />
    </div>
  </div>
);
