import { Component } from "solid-js";
import { TopLabelsItem } from "./top-labels-item";

type RemarkedPageProps = {
  label: string;
};

export const RemarkedPage: Component<RemarkedPageProps> = ({ label }) => (
  <div class="re-content">
    <label class="re-label">This page is already remarked</label>
    <div>
      <TopLabelsItem canEdit label={label} />
    </div>
  </div>
);
