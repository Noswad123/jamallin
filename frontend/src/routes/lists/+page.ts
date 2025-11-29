import type { PageLoad } from './$types';
import { lists } from '$lib/listsData';

export const load: PageLoad = () => {
  return { lists };
};
