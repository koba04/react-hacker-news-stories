declare module "react-cache" {
  interface Resource<T> {
    read: (args: any) => T;
    preload: (args: any) => void;
  }
  function unstable_createResource<T, U>(
    fn: (args: U) => T,
    keyfn?: (arg: U) => string
  ): Resource<T>;
}
