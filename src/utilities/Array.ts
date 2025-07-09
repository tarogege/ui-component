import React, { Key, ReactNode } from "react";

export function toArray(children: ReactNode) {
  const ret: ReactNode[] = [];
  React.Children.forEach(children, function each(c) {
    ret.push(c);
  });
  return ret;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const areArraysEqual = (arr1: any[], arr2: any[]) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export function arrDel(list: Key[], value: Key) {
  if (!list) return [];
  const clone = list.slice();
  const index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

export function arrAdd(list: Key[], value: Key) {
  const clone = (list || []).slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}
