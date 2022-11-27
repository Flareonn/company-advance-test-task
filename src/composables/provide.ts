import type DateService from "@/services/date.service";
import { inject, InjectionKey } from "vue";

export const DateServiceKey: InjectionKey<DateService> = Symbol("DateService");

export function injectStrict<T>(key: InjectionKey<T>) {
  const resolved = inject(key);
  if (!resolved) {
    throw new Error(`Could now resolve ${key.description}`);
  }
  return resolved;
}
