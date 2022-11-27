import type { Ref } from "vue";
export const sortingDecorator = <T>(
  arr: Ref<T[]>,
  cb: (a: T, b: T) => number
) => {
  let isOrderASC = true;
  return () => {
    arr.value.sort(cb);
    if (!isOrderASC) {
      arr.value = arr.value.reverse();
    }
    isOrderASC = !isOrderASC;
  };
};
