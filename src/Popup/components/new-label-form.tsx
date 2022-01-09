import { Component, createSignal, createResource, Show, For } from "solid-js";
import { clickOutside } from "@src/utils/click-outside";
import { OkBtn } from "./main-form";

async function fetchSuggestionsForNewLabel(label: string) {
  return await ["label", "alphabet", "music", "movies", "treshold"].filter(
    (x) => x.includes(label)
  );
}

export const NewLabelForm: Component = () => {
  const [newLabel, setNewLabel] = createSignal("New Label");
  const [suggestedLabels, { mutate: setSuggestions }] = createResource(
    newLabel,
    fetchSuggestionsForNewLabel
  );

  const onFocus = function () {
    // use function notation for 'this' access
    this.select();
  };

  return (
    <form
      class="re-ok-form relative"
      // @ts-ignore
      use:clickOutside={() => setSuggestions([])}
    >
      <Show when={suggestedLabels()?.length > 0}>
        <div class="re-suggestions">
          <For each={suggestedLabels()}>
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
      <OkBtn />
    </form>
  );
};
