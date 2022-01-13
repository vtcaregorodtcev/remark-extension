import { Component } from "solid-js";
import OkIcon from "@src/icons/ok.svg";
import PencilIcon from "@src/icons/pencil.svg";
import noop from "lodash.noop";

type RoundButtonProps = {
  type?: "ok" | "pencil";
  onClick?: () => void;
};

export const RoundButton: Component<RoundButtonProps> = ({
  type = "ok",
  onClick = noop,
}) => (
  <div class="w-2/12 flex items-center justify-center">
    <button type="submit" class="re-ok" onClick={onClick}>
      <img src={type === "ok" ? OkIcon : PencilIcon} alt="round button" />
    </button>
  </div>
);
