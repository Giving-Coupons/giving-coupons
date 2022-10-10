import { Stack, SxProps } from '@mui/system';
import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { Form, Formik, FormikValues, useFormikContext } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { CampaignSearchFormData } from '../types/campaigns';
import { useEffect } from 'react';

const headerSx: SxProps = {
  alignItems: 'center',
};

interface Props<T extends FormikValues> {
  handleChange: (values: T) => void;
}

const FormikValuesListener = <T extends FormikValues>({ handleChange }: Props<T>) => {
  const { values } = useFormikContext<T>() ?? {};

  useEffect(() => {
    handleChange(values);
  }, [values]);

  return <></>;
};

const Search = () => {
  const initialValues: CampaignSearchFormData = {
    name: undefined,
    status: {
      isActive: true,
      isUpcoming: false,
      isCompleted: false,
    },
    startDate: {
      from: null,
      to: null,
    },
    endDate: {
      from: null,
      to: null,
    },
  };

  // TODO: Replace with API call once set up
  const handleChange = (values: CampaignSearchFormData) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => undefined}>
      {({ values, setFieldValue }) => (
        <Form>
          <FormikValuesListener handleChange={handleChange} />
          <Stack component="div" spacing={2}>
            <Stack sx={headerSx} component="div" direction="row">
              <SearchIcon />

              <Typography>Search</Typography>
            </Stack>

            <TextField
              name="name"
              label="Campaign name"
              variant="standard"
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
            />

            <Stack component="div">
              <Typography>Status</Typography>

              <FormControlLabel
                name="status.isActive"
                control={<Checkbox onChange={(e) => setFieldValue('status.isActive', e.target.checked)} />}
                label="Active"
                checked={values.status.isActive}
              />

              <FormControlLabel
                name="status.isUpcoming"
                control={<Checkbox onChange={(e) => setFieldValue('status.isUpcoming', e.target.checked)} />}
                label="Upcoming"
                checked={values.status.isUpcoming}
              />

              <FormControlLabel
                name="status.isCompleted"
                control={<Checkbox onChange={(e) => setFieldValue('status.isCompleted', e.target.checked)} />}
                label="Completed"
                checked={values.status.isCompleted}
              />
            </Stack>

            <Stack component="div">
              <Typography>Campaign Start date</Typography>

              <DesktopDatePicker
                onChange={(date) => setFieldValue('startDate.from', date)}
                value={values.startDate.from}
                renderInput={(params) => (
                  <TextField name="startDate.from" label="From" variant="standard" {...params} />
                )}
              />

              <DesktopDatePicker
                onChange={(date) => setFieldValue('startDate.to', date)}
                value={values.startDate.to}
                renderInput={(params) => <TextField name="startDate.to" label="To" variant="standard" {...params} />}
              />
            </Stack>

            <Stack component="div">
              <Typography>Campaign End date</Typography>

              <DesktopDatePicker
                onChange={(date) => setFieldValue('endDate.from', date)}
                value={values.endDate.from}
                renderInput={(params) => <TextField name="endDate.from" label="From" variant="standard" {...params} />}
              />

              <DesktopDatePicker
                onChange={(date) => setFieldValue('endDate.to', date)}
                value={values.endDate.to}
                renderInput={(params) => <TextField name="endDate.to" label="To" variant="standard" {...params} />}
              />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
