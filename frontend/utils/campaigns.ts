import { Moment } from 'moment';
import { CampaignStatus } from '../types/campaigns';

export const getCampaignStatus = (start: Moment, end: Moment): CampaignStatus => {
  if (end.isBefore()) {
    return 'Completed';
  }

  if (start.isAfter()) {
    return 'Upcoming';
  }

  return 'Active';
};
