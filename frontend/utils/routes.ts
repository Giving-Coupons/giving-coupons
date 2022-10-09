import { OrderedMap } from 'immutable';

export const navigationTextPathMap = OrderedMap({
  'How it works': '/',
  'Find a campaign': '/campaigns',
  'Start a campaign': '/interest',
});

export const isTabForCurrentPage = (tabPath: string, currentPath: string) => {
  const pathParts = currentPath.split('/');
  const pathSubdirectory = pathParts.length > 1 ? '/' + pathParts[1] : '/';
  return tabPath === pathSubdirectory;
};
