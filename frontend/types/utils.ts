export type Nullable<D> = D | null;

export type WithoutId<T> = Omit<T, 'id'>;

export type IdData = {
  id: number;
};

export type AutocompleteData = {
  label: string;
};

export type SelectOptionData = {
  id: number;
  name: string;
  logoBase64?: string;
};
