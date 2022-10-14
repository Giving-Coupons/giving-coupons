import ImageWithOverlay from '../generic/ImageWithOverlay';
import Button from '../generic/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { Box, Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { compressImageThenConvertToBase64String } from '../../utils/image';
import { imageContainerSx } from '../../styles/components/forms/FormImageUploadStyles';
import { Nullable } from '../../types/utils';
import { MAX_IMAGE_SIZE_MB } from '../../utils/constants';

interface Props {
  name: string;
}

const FormImageUpload = ({ name }: Props) => {
  const [, { value, error, touched }, { setTouched, setValue }] = useField(name);
  const [uploadError, setUploadError] = useState<Nullable<string>>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files ? event.target.files[0] : null;
    if (!imageFile) {
      return;
    }
    if (imageFile.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setTouched(true);
      setValue(undefined);
      setUploadError(`The maximum file size is ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }

    compressImageThenConvertToBase64String(imageFile)
      .then((value) => {
        setUploadError(null);
        setTouched(true);
        setValue(value);
      })
      .catch((error) => {
        setTouched(true);
        setUploadError(error.message);
      });
  };

  return (
    <>
      <Box sx={imageContainerSx}>{value && <ImageWithOverlay imageSrc={value} shouldApplyOverlay={false} />}</Box>

      <Stack component="div">
        <Stack component="div" direction="row" spacing={2}>
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

          {value && (
            <Button actionType="danger" startIcon={<DeleteIcon />} onClick={() => setValue(undefined)}>
              Remove Image
            </Button>
          )}
        </Stack>

        {(uploadError || (touched && error)) && (
          <Typography variant="caption" color="error">
            {uploadError || error}
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default FormImageUpload;
