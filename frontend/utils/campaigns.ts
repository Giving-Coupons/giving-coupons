import moment, { Moment } from 'moment';
import { CampaignStatus } from '../types/campaigns';

export const getCampaignStatus = (start: Moment, end: Moment): CampaignStatus => {
  if (end.isBefore(moment().startOf('day'))) {
    return 'Completed';
  }

  if (start.isAfter(moment().endOf('day'))) {
    return 'Upcoming';
  }

  return 'Active';
};
