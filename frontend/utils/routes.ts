import { OrderedMap } from 'immutable';

export const adminPathPrefix = '/admin';

export const defaultNavigationTextPathMap = OrderedMap({
  'How it works': '/',
  'Find a campaign': '/campaigns',
  'Start a campaign': '/interest',
});

export const adminNavigationTextPathMap = OrderedMap({
  'Manage interests': '/admin/interests',
  'Manage campaigns': '/admin/campaigns',
  'Manage charities': '/admin/charities',
});

export const isTabForCurrentPage = (tabPath: string, currentPath: string) => {
  return tabPath === '/' ? currentPath === tabPath : currentPath.startsWith(tabPath);
};
