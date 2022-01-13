import { Accessor, createSignal } from "solid-js";

export const useLoading = (): [
  Accessor<boolean>,
  (func: () => Promise<void>) => Promise<void>
] => {
  const [isLoading, setIsLoading] = createSignal(false);

  const loading = async (func: () => Promise<void>) => {
    setIsLoading(true);
    await func();
    setIsLoading(false);
  };

  return [isLoading, loading];
};
