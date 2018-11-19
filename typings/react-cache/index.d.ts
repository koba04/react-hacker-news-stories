declare module "react-cache" {
  interface Resource<T> {
    read: (args: any) => T;
    preload: (args: any) => void;
  }
  function unstable_createResource<T>(
    fn: (args: any) => Promise<T>,
    keyfn?: (arg: any) => string
  ): Resource<T>;
}
