// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import hospitals from '../../data/jobs';

const hasMatched = (filters, search, job) => {
  if(filters !== false){
    for (const [key, value] of Object.entries(filters)) {
      if(Array.isArray(job[key])){
        for (const [i, v] of Object.entries(job[key])) {
          if( typeof value[v] !== 'undefined'){
            return true;
          }
        }
        return false;
      } else if(typeof job[key] === 'string' && typeof value[job[key]] === 'undefined'){
        return false;
      }
    }
  }

  if(search !== false && JSON.stringify(job).toLowerCase().indexOf(search) === -1){
    return false;
  }

  return true
}

const isEmpty = (filters) => Object.keys(filters).length === 0 && filters.constructor === Object;

const sortBy= (hostitals, field, dir) => {
  let getVal = false
  switch(field){
    case 'location':   getVal = (a) => a.items[0].city; break;
    case 'department': getVal = (a) => a.items[0].department.join(','); break;
    case 'role':       getVal = (a) => a.job_title; break;
    case 'experience': getVal = (a) => a.items[0].experience; break;
    default:           getVal = (a) => a.name; break;
  }

  try {
    return getVal ? hostitals.sort((a, b) => {
      return dir === 'desc' ? getVal(a) < getVal(b) ? 1 : -1 : getVal(a) > getVal(b) ? 1 : -1
    }) : [];
  } catch (error) {
    return [];
  }
}

export default async (req, res) => {
  if (req.method === 'POST') {
    let filters = req.body.selected;
    let search = req.body.search.trim();
    search = search.length > 0 ? search : false;
    let sortby = req.body.sortby;

    // @todo: implement filters and search
    let jobsCount = 0;
    let jobsList = []

    jobsList = hospitals.map(hospital => {
      const jobs = hospital.items.filter(job => hasMatched((isEmpty(filters) ? false : filters), search, job))
      jobsCount += jobs.length;
      return {
        ...hospital,
        items: jobs
      }
    }).filter(hospital => hospital.items.length > 0);

    if(!isEmpty(sortby)){
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
  } else {
    return res.status(404).json({ error: { message: 'Not a valid request!'} })
  }
}
