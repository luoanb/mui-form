export type FunWithPromise<T = unknown> = (resolve: (value: T) => void, reject: (value: any) => void) => void;
export const doPromise = <T>(fun: FunWithPromise<T>) => {
  return new Promise<T>((resolve, reject) => {
    fun(resolve, reject);
  });
};
