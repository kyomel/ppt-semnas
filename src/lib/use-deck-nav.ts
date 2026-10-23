"use client";

import { useCallback, useEffect, useState } from "react";

const HASH_PREFIX = "#/slide/";

function readHash(total: number) {
  if (typeof window === "undefined") return 0;
  const raw = window.location.hash;
  if (!raw.startsWith(HASH_PREFIX)) return 0;
  const parsed = Number.parseInt(raw.slice(HASH_PREFIX.length), 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), total - 1);
}

function writeHash(index: number) {
  const hash = `${HASH_PREFIX}${index + 1}`;
  if (window.location.hash !== hash) {
    window.history.replaceState(null, "", hash);
  }
}

export function useDeckNav(total: number) {
  const [state, setState] = useState({ index: 0, direction: 1 });

  useEffect(() => {
    const sync = () => {
      const next = readHash(total);
      setState((prev) => ({
        index: next,
        direction: next >= prev.index ? 1 : -1,
      }));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [total]);

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.min(Math.max(target, 0), total - 1);
      setState({
        index: clamped,
        direction: clamped >= state.index ? 1 : -1,
      });
      writeHash(clamped);
    },
    [state.index, total],
  );

  const step = useCallback(
    (delta: number) => {
      const clamped = Math.min(Math.max(state.index + delta, 0), total - 1);
      setState({ index: clamped, direction: delta >= 0 ? 1 : -1 });
      writeHash(clamped);
    },
    [state.index, total],
  );

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);
  const first = useCallback(() => goTo(0), [goTo]);
  const last = useCallback(() => goTo(total - 1), [goTo, total]);

  return {
    index: state.index,
    direction: state.direction,
    goTo,
    next,
    prev,
    first,
    last,
  };
}
