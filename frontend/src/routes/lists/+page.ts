import type { PageLoad } from './$types';
import { lists } from '$lib/data/listsData';

export const load: PageLoad = () => {
  return { lists };
};
