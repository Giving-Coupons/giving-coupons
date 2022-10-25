import { CharityListData } from '../../../types/charity';
import { InterestFormData } from './InterestForm';
import api from '../../../frontendApis';
import FormAutocomplete from '../../forms/FormAutocomplete';
import useSWR from 'swr';
import CharitiesAPI from '../../../frontendApis/charities';

interface Props {
  name: keyof InterestFormData;
  label: string;
  placeholder: string;
}

const InterestFormCharitySelector = ({ name, label, placeholder }: Props) => {
  const { data: charityOptions } = useSWR<CharityListData[]>(
    `${CharitiesAPI.CHARITIES_URL}/listCharityMinimalData`,
    () =>
      api.charities
        .list()
        .then((r) => r.payload ?? [])
        .then((arr) => arr.sort((a, b) => a.name.localeCompare(b.name))),
  );

  return (
    <FormAutocomplete multiple name={name} label={label} placeholder={placeholder} options={charityOptions ?? []} />
  );
};

export default InterestFormCharitySelector;
