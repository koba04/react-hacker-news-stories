import * as React from "react";

declare module "react" {
  interface SuspenseProps {
    fallback: React.ReactNode;
    maxDuration: number;
  }

  function memo<T>(component: T): T;
  function lazy<T>(fn: () => Promise<any>): T;
  const Suspense: React.ComponentType<SuspenseProps>;
  function useState<T>(initialValue: T): [T, (value: T) => void];
}
