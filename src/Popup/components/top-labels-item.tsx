import noop from "lodash.noop";
import { Component } from "solid-js";
import { RoundButton } from "./round-button";

type TopLabelsItemProps = {
  label: string;
  canEdit?: boolean;
  onSubmit?: (label: string) => void;
  onEdit?: () => void;
};

export const TopLabelsItem: Component<TopLabelsItemProps> = ({
  label,
  canEdit,
  onSubmit = noop,
  onEdit = noop,
}) => (
  <div class="re-ok-form mb-3 last:mb-0 first:text-4xl">
    <span class="re-box-inverse w-max">{label}</span>
    <RoundButton
      onClick={() => (canEdit ? onEdit() : onSubmit(label))}
      type={canEdit ? "pencil" : "ok"}
    />
  </div>
);
