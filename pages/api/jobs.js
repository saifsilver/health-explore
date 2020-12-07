// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import hospitals from '../../data/jobs';
import { hasMatched, sortBy, sanitzeJobFilterInput, isEmpty } from '../../models/job';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // @todo: implement filters and search
  /* Sanitize Input */
  let { filters, search, sortby } = sanitzeJobFilterInput(req.body);

  /* Filter and Search Jobs */
  let jobsCount = 0;
  let jobsList = []
  jobsList = hospitals.map(hospital => {
    const jobs = hospital.items.filter(job => hasMatched(filters, search, job))
    jobsCount += jobs.length;
    return {
      ...hospital,
      items: jobs
    }
  }).filter(hospital => hospital.items.length > 0);

  /* Sort Jobs */
  if(sortby !== false){
    for (const [field, dir] of Object.entries(sortby)) {
      jobsList = [...sortBy(jobsList, field, dir)]
    }
  }

  // @todo: implement automated tests


  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve)=>setTimeout(resolve, 1000 * Math.random()));

  return res.status(200).json({jobsList, jobsCount});
}
