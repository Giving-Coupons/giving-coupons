export type Nullable<D> = D | null;

export type WithoutId<T> = Omit<T, 'id'>;

export type SelectOptionData = {
  id: number;
  name: string;
  logoUrl?: string;
};
