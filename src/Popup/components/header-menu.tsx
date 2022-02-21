import { Component, createSignal, Show } from "solid-js";
import { clickOutside } from "@src/utils/click-outside";
import { DOTS_MENU, DOTS_MENU_CLEAR_CONFIG } from "@tests/lib/testids";

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
      <button
        data-testid={DOTS_MENU}
        class="re-dots"
        onClick={() => setVisible((v) => !v)}
      >
        <div class="re-dot"></div>
        <div class="re-dot"></div>
        <div class="re-dot"></div>
      </button>
      <Show when={visible()}>
        <div class="re-menu">
          <div
            data-testid={DOTS_MENU_CLEAR_CONFIG}
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
