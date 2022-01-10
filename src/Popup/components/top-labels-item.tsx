import { Component } from "solid-js";
import { RoundButton } from "./round-button";

type TopLabelsItemProps = {
  label: string;
  canEdit?: boolean;
};

export const TopLabelsItem: Component<TopLabelsItemProps> = ({
  label,
  canEdit,
}) => (
  <div class="re-ok-form mb-3 last:mb-0 first:text-4xl">
    <span class="re-box-inverse w-max">{label}</span>
    <RoundButton type={canEdit ? "pencil" : "ok"} />
  </div>
);
