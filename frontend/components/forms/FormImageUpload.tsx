import ImageWithOverlay from '../generic/ImageWithOverlay';
import Button from '../generic/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useField } from 'formik';
import { ChangeEvent } from 'react';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { compressImageThenConvertToBase64String } from '../../utils/image';

interface Props {
  name: string;
}

const FormImageUpload = ({ name }: Props) => {
  const [, { value, error, touched }, { setTouched, setValue, setError }] = useField(name);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files ? event.target.files[0] : null;
    if (!imageFile) {
      return;
    }

    compressImageThenConvertToBase64String(imageFile)
      .then((value) => {
        setTouched(true);
        setValue(value);
      })
      .catch((error) => {
        setTouched(true);
        setError(error.message);
      });
  };

  return (
    <>
      {value && <ImageWithOverlay imageSrc={value} shouldApplyOverlay={false} />}

      <Stack component="div" direction="row" spacing={2}>
        <Stack component="div">
          <Button actionType="secondary" isLabel startIcon={<AddPhotoAlternateIcon />}>
            Upload Image
            <input
              accept="image/png, image/jpg, image/jpeg"
              id={name}
              type="file"
              onChange={handleImageUpload}
              onClick={(e) => (e.currentTarget.value = '')}
              hidden
            />
          </Button>

          {touched && error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </Stack>

        {value && (
          <Button actionType="danger" startIcon={<DeleteIcon />} onClick={() => setValue(undefined)}>
            Remove Image
          </Button>
        )}
      </Stack>
    </>
  );
};

export default FormImageUpload;
