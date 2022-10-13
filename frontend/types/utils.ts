export type Nullable<D> = D | null;

export type WithoutId<T> = Omit<T, 'id'>;

export type IdData = {
  id: number;
};

export type AutocompleteData = {
  label: string;
};
