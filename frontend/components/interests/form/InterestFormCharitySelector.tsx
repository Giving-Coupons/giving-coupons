import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import { CharityListData, CharityMinimalData } from '../../../types/charity';
import { InterestFormData } from './InterestForm';
import LogoBase64 from '../../generic/LogoBase64';

interface Props {
  name: keyof InterestFormData;
  label: string;
  placeholder: string;
}

const InterestFormCharitySelector = ({ name, label, placeholder }: Props) => {
  const [, { error, touched }, { setValue, setTouched }] = useField<CharityMinimalData[]>(name);
  // TODO: These are placeholders and will be removed once the charity API is up.
  // Tracked in https://github.com/Giving-Coupons/giving-coupons/issues/132
  const charities: CharityListData[] = [1, 2, 3, 4, 5].flatMap((v) => [
    {
      id: 1 * v,
      name: 'Ark ' + v,
      logoBase64:
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLnZPNi1JhFMbvKtoHBa1atgmCtv0VrVq0aCkGCn6mYH47ip8IflAKhibpRke00BnnKiKoiKA7qSkF08FvvToak/f0ngu2qBYzXngu3Jf3+b3nPee5VCAQcPj9/ucAQB0iyufzPXS73Wd2u/3RQQB8Wa1Wiclkqms0mrsHAQwGwy21Wn2qUCjOxGLxHVyrVCpHpVKJpWmazeVy20wmQyeTyaf/BaAKhcIrkUh04XA4vhSLxTIxX5IHULMCDd+PkxCLxbaRSETxD6DVamUbjcavWq22LZfLMBqNgGEYuJgs4TxbhG9PHnManuQgGAyypOnv/wCazaat2+1yJ735pOCMy+USBuMFvPzIwosPAMW3xzDwemA+HHL78vk82Gy2Iw5APtZoms/nHGCv2WwGP4Zz6AwWsFgsYLVacUI47jUajTvS9GcUaQ6LgL/Ne3U6HSBVgtPpZFHT6ZSrst1ug1Kp/EolEokdUveGPWAymUA2m4V0Og1kD5AxX1osFo1er2fxGpvNBiQSCVDxeJzp9/tcWWjEcsfjMVSrVUilUth5IEYgo/6Md1apVDSu46FCoRCoaDR6gp1HIwLQ7PV6ezKZbMnj8YBoKZVKUzqd7h4C5HL5bZKVU4FAMOHz+U4qHA6/RiJOAgFIJvFmrp3EUCj0gMyVqdfr0Ov1YL1eg8vl2t0oyh6P5x2JKZAwAQkVNuznjQDkb7xPgnFuNpuvyHyvtFpt+bqA3zDZAQQexaeGAAAAAElFTkSuQmCC',
    },
    {
      id: 2 * v,
      name: 'Bork ' + v,
      logoBase64:
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK2SURBVBgZBcHLjxN1AADg79eZttvddttll+WxIGrAV4QYTbxoYsSLgjc5arx68qCGf8G7J+NBEg8e9GqURDEmEiOJAWNUwIi8sryWDbSdmc60Mx2/Lxw78caZ1fXVo1EUAYAAACAIgICymrt/7/6P8er66tHPPzklNIJyPgNAENRqAWSzBEFdN9TzWq3y0ckPj8ZRFKmUwuxL6fcXrJzJbJ18xFKv6/LlX1xMP3Nra6jXW3Z3eyiKm0Zp7t1jtWYcaQAMh9uGT7eMkkR2+m9JcluSJEJxQTEZm2Rj00liMkmUeSqEOYI4APr9ndQzi+/v4OPz2m+tWd+zV2d2xaQ8pDfoaUUNcbMlyXIhFAgaQDAcDiXJ2MP1ymilNPn6X6q5OvvZrEhk49SsyBR5alpkQqhBDNDvr1PPDPrLhu89Y+XTbeUre7TXCo9MtzW7+y22I81W0zibYkSgQQB5XkiTzHA0NF6qPHiC/Iv/1FWuMf1WPklMi1SeJubTVABBHACdzkB3OdVfXgbNtx/V+eCsuDpg7+pf8s7ERvcP7daW6eSaqPGOgDgAxsNUkhRI/bZ5x41Zw66DlSdPXbZ5PLUr+kYx+slg8Yj2uW1hNRPQEIKA5cFuFgZ+z0rXpk2DwU53XjtgX7xisrXXoDuycX1B54dLbrQqdbMFYqjr2rmbV13YvKTb7cnzXJKkkqLw61MNh7+6Ijl/3eZK0+3nHzdqBvtbbRAHZGVqq5ppt7qWOn15MdVd6Or/ed2+W5lWkwfPHnbzsZZ2e8HStKCuQUwQQkPPsknItKuOxdC16+I9rc2Jqy8dURxMvHz2oX/27xa1m5irZqWAuCwrVVXZ2PGcjVUCCMIhvMpaCCC8OPdCNBMttESNSDWvlFUlvHni+Hc719dej5oxggAIAAAIAIGyrGzd3Tr9P5JrNp8Zt4rCAAAAAElFTkSuQmCC',
    },
  ]);

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={charities}
      renderOption={(props, { name, logoBase64 }) => (
        <li {...props}>
          <Chip avatar={<LogoBase64 base64Src={logoBase64} />} label={name} variant="outlined" />
        </li>
      )}
      getOptionLabel={(option) => option.name}
      defaultValue={[]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={touched && Boolean(error)}
          helperText={touched && error}
          // Ensures placeholder is always visible.
          InputLabelProps={{ shrink: true }}
        />
      )}
      isOptionEqualToValue={(option: CharityListData, value: CharityListData) => option.id === value.id}
      onChange={(_event, value) => Promise.resolve(setValue(value, true)).then(() => setTouched(true))}
    />
  );
};

export default InterestFormCharitySelector;
