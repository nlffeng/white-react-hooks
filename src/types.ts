export interface Hook {
  memoizedState: any;
  queue: null | UpdateQueue<any, any>;
  next: null | Hook;
}

/** useState hook types */
export type UseState = <S>(initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];

export type Dispatch<A> = (value: A) => void;

export type SetStateAction<S> = S | ((prevState: S) => S);

export interface UpdateQueue<S, A> {
  pending: Update<S, A> | null;
  dispatch: ((value: A) => any) | null;
};

export interface Update<S, A> {
  action: A,
  next: null | Update<S, A>,
};
/** useState hook types */

/** useEffect hook types */
export type UseEffect = (effect: EffectCallback, deps?: DependencyList) => void

type EffectCallback = () => (void | (() => void | undefined));
type DependencyList = ReadonlyArray<any>;

export interface Effect {
  tag: Tag,
  create: Create,
  destroy: Destroy,
  deps: Deps,
  next: null | Effect,
}

export type Tag = 1 | 0
export type Create = () => Destroy | void
export type Destroy = (() => void) | void
export type Deps = Array<any> | void | null
/** useEffect hook types */
