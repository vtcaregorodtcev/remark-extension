import {
  Component,
  createResource,
  createSignal,
  For,
  onCleanup,
  Show,
} from "solid-js";
import Remark32Icon from "../icons/remark-32.svg";
import OkIcon from "../icons/ok.svg";

type MainFormProps = {
  topLabels: string[];
};

type TopLabelsItemProps = {
  label: string;
};

const Header: Component = () => (
  <header class="h-14 flex items-center px-8">
    <img src={Remark32Icon} alt="Remark" />
    <span class="px-3 text-2xl text-gray10">Remark</span>
  </header>
);

const Footer: Component = () => (
  <footer class="h-14 text-base flex items-center px-8 text-gray6">
    AI-powered AWS based bookmark manager
  </footer>
);

const APIConfigForm: Component = () => (
  <form class="re-content">
    <label class="re-label">
      It looks like this is your first time using the remark, let's add API
      config
    </label>
    <input class="re-input mb-3" type="text" placeholder="API path" />
    <input class="re-input" type="text" placeholder="API x-key" />
    <button type="submit" class="mt-3 w-1/4 self-end re-box">
      Save
    </button>
  </form>
);

const OkBtn: Component = () => (
  <div class="w-2/12 flex items-center justify-center">
    <button type="submit" class="re-ok">
      <img src={OkIcon} alt="Ok" />
    </button>
  </div>
);

const TopLabelsItem: Component<TopLabelsItemProps> = ({ label }) => (
  <div class="re-ok-form mb-3 last:mb-0 first:text-4xl">
    <span class="re-box-inverse w-max">{label}</span>
    <OkBtn />
  </div>
);

const fetchSuggestionsForNewLabel = async (label: string) => {
  return await ["label", "alphabet", "music", "movies", "treshold"].filter(
    (x) => x.includes(label)
  );
};

function clickOutside(el: Element, accessor: () => any) {
  const onClick = (e) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

const NewLabelForm: Component = () => {
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

const MainForm: Component<MainFormProps> = ({ topLabels }) => {
  return (
    <div class="re-content">
      <label class="re-label">Here is the TOP of possible labels</label>
      <div>
        <For each={topLabels}>{(label) => <TopLabelsItem label={label} />}</For>
      </div>
      <label class="re-label mt-6">
        Did I predict it wrong? Type a new label or pick one of yours
      </label>
      <NewLabelForm />
    </div>
  );
};

const Popup: Component = () => {
  return (
    <div class="flex flex-col w-96 h-max divide-y divide-gray2">
      <Header />
      <MainForm topLabels={["Solutions", "OSS", "Todos"]} />
      <Footer />
    </div>
  );
};

export default Popup;
