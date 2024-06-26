async function fetchCFUserSubmissionHistory(username) {
  const response = await fetch(
    `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10`);
  //console.log(response);
  const res = await response.json();
  //console.log("res for :", username, " : ", res.result);
  if(res.status=='OK')
    return res.result;
}


async function fetchCFUserProfileInfo(username) {
  const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`);
  const res = await response.json();
  if(res.status=='OK')
    return res.result[0];
}

async function fetchCFUserProblemCount(username)
{
  const response = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
  const res = await response.json();
  const problems_solved = [
    {range:'1-500', count:0},
    {range:'501-1000', count:0},
    {range:'1001-1500', count:0},
    {range:'1501-2000', count:0},
    {range:'2001-2500', count:0},
    {range:'2501-3000', count:0},
    {range:'3001-3500', count:0},
    {range:'3501-4000', count:0},
  ]
  if(res.status == 'OK')
  {
    for(const submission of res.result)
    {
      if(submission.verdict=='OK' && submission.problem.rating)
      {
        problems_solved[Math.floor((submission.problem.rating-1)/500)].count += 1;
      }
    }
  }
  return problems_solved;
}

async function fetchContestDetails() {
  const response = await fetch(
    `https://codeforces.com/api/contest.list`);
  const res = await response.json();
  if(res.status=='OK')
    return res.result;
}

//fetchCFUserProfileInfo('technomaniac');
//fetchCFUserSubmissionHistory('technomaniac');
module.exports = {fetchCFUserSubmissionHistory, fetchCFUserProfileInfo, fetchCFUserProblemCount, fetchContestDetails}