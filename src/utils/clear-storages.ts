export const clearStorages = () => {
  chrome?.storage?.local?.clear();
  chrome?.storage?.sync?.clear();
}