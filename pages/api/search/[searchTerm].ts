import type { NextApiRequest, NextApiResponse } from 'next'

import { searchPostsQuery } from '../../../utils/utils/queries';
import { client } from '../../../utils/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { searchTerm } = req.query;

    const videosQuery = searchPostsQuery(searchTerm)

    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);

  }
}
