import { SnackbarMessage, OptionsObject, SnackbarKey, VariantType } from 'notistack';
import { StatusMessage, StatusMessageType } from '../types/api';
import { Nullable } from '../types/utils';
import { Map } from 'immutable';

const statusMessageToVariantTypeMap = Map<StatusMessageType, VariantType>({
  [StatusMessageType.SUCCESS]: 'success',
  [StatusMessageType.ERROR]: 'error',
});

export const enqueueGCSnackbar = (
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
  statusMessage: Nullable<StatusMessage>,
): Nullable<SnackbarKey> => {
  if (!statusMessage) {
    return null;
  }

  const { message, type } = statusMessage;
  const variant = statusMessageToVariantTypeMap.get(type);

  return enqueueSnackbar(message, { variant });
};
