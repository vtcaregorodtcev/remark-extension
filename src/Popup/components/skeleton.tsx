import { Component } from "solid-js";

export const Skeleton: Component = () => (
  <div class="flex animate-pulse flex-col px-8 py-4 gap-4">
    <div class="w-full bg-gray2 h-6 rounded"></div>
    <div class="w-60 bg-gray2 h-16 rounded"></div>
    <div class="w-24 bg-gray2 h-8 rounded"></div>
    <div class="w-48 bg-gray2 h-8 rounded"></div>
    <div class="w-full bg-gray2 h-6 rounded mt-4"></div>
    <div class="w-full bg-gray2 h-12 rounded"></div>
  </div>
);
