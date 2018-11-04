declare module "react-cache" {
  interface Resource<T> {
    read: (args: any) => T;
  }
  function unstable_createResource<T>(fn: (args: any) => any): Resource<T>;
}
