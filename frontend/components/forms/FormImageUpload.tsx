import ImageWithOverlay from '../generic/ImageWithOverlay';
import Button from '../generic/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useField } from 'formik';
import { ChangeEvent } from 'react';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  name: string;
}

const FormImageUpload = ({ name }: Props) => {
  const [, { value }, { setTouched, setValue }] = useField(name);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files ? event.target.files[0] : null;
    if (!imageFile) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      setTouched(true);
      setValue(reader.result);
    };
  };

  return (
    <>
      {value && <ImageWithOverlay imageSrc={value} shouldApplyOverlay={false} />}

      <Stack component="div" direction="row" spacing={2}>
        <Button actionType="secondary" isLabel startIcon={<AddPhotoAlternateIcon />}>
          Upload Image
          <input accept="image/*" id={name} type="file" onChange={handleImageUpload} hidden />
        </Button>

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
