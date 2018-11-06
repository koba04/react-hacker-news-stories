import * as React from "react";

declare module "react" {
  interface SuspenseProps {
    fallback: React.ReactNode;
    maxDuration?: number;
  }

  function memo<T>(component: T): T;
  function lazy<T>(fn: () => Promise<any>): T;
  const Suspense: React.ComponentType<SuspenseProps>;
  function useState<T>(initialValue: T): [T, (value: T) => void];
  function useEffect(fn: Function, deps?: any[]): void;
  function useMemo<T>(fn: (args: any) => T, deps?: any[]): T;
  function useCallback<T>(
    fn: (args: T) => void,
    deps: any[]
  ): (args: T) => void;
}
