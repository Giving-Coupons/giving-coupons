import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { imageContainerSx } from '../../styles/components/forms/FormImageUploadStyles';
import { Nullable } from '../../types/utils';
import { MAX_IMAGE_SIZE_MB } from '../../utils/constants';
import { compressImageThenConvertToBase64String } from '../../utils/image';
import Button from '../generic/Button';
import ImageWithOverlay from '../generic/ImageWithOverlay';
interface Props {
  name: string;
  label: string;
}

const FormImageUpload = ({ name, label }: Props) => {
  const [, { value, error, touched }, { setTouched, setValue }] = useField(name);
  const [uploadError, setUploadError] = useState<Nullable<string>>(null);

  const app = getApp();
  const firebaseStorage = getStorage(app);

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
        const storageRef = ref(firebaseStorage, `images/${uuidv4()}`);
        return uploadString(storageRef, value, 'data_url');
      })
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((downloadUrl) => {
        setUploadError(null);
        setTouched(true);
        setValue(downloadUrl);
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
            {label}
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
