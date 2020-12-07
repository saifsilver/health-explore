export const hasMatched = (filters, search, job) => {
    if(search !== false && JSON.stringify(job).toLowerCase().indexOf(search) === -1){
      return false;
    }

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

    return true
}

export const sortBy= (hostitals, field, dir) => {
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

export const isEmpty = (filters) => Object.keys(filters).length === 0 && filters.constructor === Object;

export const sanitzeJobFilterInput = (input) => {
  let {selected, search, sortby} = input || {}

  return {
      filters : ( selected && !isEmpty(selected) ? selected : false ),
      search  : ( search && search.trim().length > 0 ? search.trim().toLowerCase() : false ),
      sortby  : ( sortby && !isEmpty(sortby) ? sortby : false ),
  }
}