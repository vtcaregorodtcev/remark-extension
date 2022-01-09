import { Component, createSignal, Show } from "solid-js";
import { clickOutside } from "@src/utils/click-outside";

type HeaderMenuProps = {
  onApiConfigClear: () => void;
};

export const HeaderMenu: Component<HeaderMenuProps> = ({
  onApiConfigClear,
}) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <div
      class="h-full flex items-center relative"
      // @ts-ignore
      use:clickOutside={() => setVisible(false)}
    >
      <button class="re-dots" onClick={() => setVisible((v) => !v)}>
        <div class="re-dot"></div>
        <div class="re-dot"></div>
        <div class="re-dot"></div>
      </button>
      <Show when={visible()}>
        <div class="re-menu">
          <div
            class="re-menu-option"
            onClick={() => {
              setVisible(false);
              onApiConfigClear();
            }}
          >
            Clear API config
          </div>
        </div>
      </Show>
    </div>
  );
};
