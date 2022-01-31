import { Component, createSignal, Show, For, createEffect } from "solid-js";
import { clickOutside } from "@src/utils/click-outside";
import { RoundButton } from "./round-button";
import { parseArray } from "@src/utils/parse-array";
import { useSuggestions } from "@src/hooks/use-suggestions";

type NewLabelFormProps = {
  onSubmit: (label: string) => void;
};

export const NewLabelForm: Component<NewLabelFormProps> = ({ onSubmit }) => {
  const suggestedLabels = useSuggestions();

  const [visibleSuggestions, setVisibleSuggestions] = createSignal<string[]>(
    []
  );
  const [newLabel, setNewLabel] = createSignal("New Label");

  createEffect(() => {
    const labels = parseArray<string>(suggestedLabels.value);

    const filtered = labels.filter((label) => label.includes(newLabel()));
    setVisibleSuggestions(filtered);
  });

  const onFocus = function () {
    // use function notation for 'this' access
    this.select();
  };

  return (
    <form
      class="re-ok-form relative"
      // @ts-ignore
      use:clickOutside={() => setVisibleSuggestions([])}
      onSubmit={() => onSubmit(newLabel())}
    >
      <Show when={visibleSuggestions().length > 0}>
        <div class="re-suggestions">
          <For each={visibleSuggestions()}>
            {(label) => (
              <div
                class="p-2 odd:bg-gray1 hover:bg-gray2 cursor-pointer"
                onClick={() => setNewLabel(label)}
              >
                {label}
              </div>
            )}
          </For>
        </div>
      </Show>
      <input
        class="re-input w-10/12"
        type="text"
        placeholder="New Label"
        value={newLabel()}
        autofocus
        onInput={(e) => setNewLabel(e.currentTarget.value)}
        onFocus={onFocus}
      />
      <RoundButton />
    </form>
  );
};
