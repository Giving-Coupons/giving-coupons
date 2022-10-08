export type Nullable<D> = D | null;

export type WithoutId<T> = Omit<T, 'id'>;
