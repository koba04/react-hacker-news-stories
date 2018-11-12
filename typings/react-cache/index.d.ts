declare module "react-cache" {
  interface Resource<T> {
    read: (args: any) => T;
    preload: (args: any) => void;
  }
  function unstable_createResource<T>(
    fn: (args: any) => any,
    keyfn?: (arg: T) => string
  ): Resource<T>;
}
