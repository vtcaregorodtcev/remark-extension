import { Component } from "solid-js";
import OkIcon from "@src/icons/ok.svg";
import PencilIcon from "@src/icons/pencil.svg";

type RoundButtonProps = {
  type?: "ok" | "pencil";
};

export const RoundButton: Component<RoundButtonProps> = ({ type = "ok" }) => (
  <div class="w-2/12 flex items-center justify-center">
    <button type="submit" class="re-ok">
      <img src={type === "ok" ? OkIcon : PencilIcon} alt="round button" />
    </button>
  </div>
);
