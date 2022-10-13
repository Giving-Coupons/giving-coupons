import moment from 'moment';

export const isValidDate = (date: unknown) => date && moment(date).isValid();
