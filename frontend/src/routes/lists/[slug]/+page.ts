import type { PageLoad } from './$types';
import { lists } from '$lib/data/listsData';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
  const list = lists.find((l) => l.slug === params.slug);

  if (!list) {
    throw error(404, 'List not found');
  }

  return { list };
};
