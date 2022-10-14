import moment from 'moment';
import { DATE_FORMAT } from './constants';

export const isValidDate = (date: unknown) => date && moment(date).isValid();

export const formatDate = (isoString: string) => moment(isoString).format(DATE_FORMAT);
