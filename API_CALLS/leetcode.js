const { useHistory } = require("react-router-dom/cjs/react-router-dom.min");

// Just some constants
const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
    activeDailyCodingChallengeQuestion {
        question {
            title
            titleSlug
            difficulty
            stats 
        }
    }
}`;

const USER_PROFILE_INFORMATION_QUERY = `
  query getUserProfile($username: String!, $limit: Int!) {
      matchedUser(username: $username) {
          username
          profile {
              realName
              ranking
          }
            submitStats {
            acSubmissionNum {
                difficulty
                count
                submissions
            }
        }
      }
      recentAcSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        lang
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
        badge {
            name
        }
    }
  }`;

const PROBLEM_DETAILS = `query selectProblem($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        title
        titleSlug
        difficulty
        topicTags {
            name
        }
        stats
    }
}`;

// We can pass the JSON response as an object to our createTodoistTask later.
const fetchDailyCodingChallenge = async () => {
  console.log(`Fetching daily coding challenge from LeetCode API.`);

  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
  };

  const response = await fetch(LEETCODE_API_ENDPOINT, init);
  const responseData = await response.json();
  responseData.data.activeDailyCodingChallengeQuestion.question.stats =
    JSON.parse(
      responseData.data.activeDailyCodingChallengeQuestion.question.stats
    );

  console.log(responseData.data.activeDailyCodingChallengeQuestion.question);
};

//fetchDailyCodingChallenge();

const fetchUserProfileInfo = async (username) => {
  //console.log(`Fetching user profile information from LeetCode API.`);

  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: USER_PROFILE_INFORMATION_QUERY,
      variables: {
        username: username, //username required
        limit: 5, //only for submission
      },
    }),
  };

  const response = await fetch(LEETCODE_API_ENDPOINT, init);
  const responseData = await response.json();

  console.log("LC API", responseData.data);
  return responseData.data;
  //console.log(responseData.data.matchedUser.submitStats);
};

const fetchProblemDetails = async (options) => {
  console.log(`Fetching user profile information from LeetCode API.`);

  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: PROBLEM_DETAILS,
      variables: {
        titleSlug: options.titleSlug,
      },
    }),
  };

  const response = await fetch(LEETCODE_API_ENDPOINT, init);
  const responseData = await response.json();
  responseData.data.question.stats = JSON.parse(
    responseData.data.question.stats
  );

  console.log(responseData.data.question);
  //console.log(responseData.data.matchedUser.submitStats);
};

//fetchUserProfileInfo("mrgamer2801");
//fetchDailyCodingChallenge();
//fetchProblemDetails({titleSlug: 'replace-words'});

module.exports = {
  fetchDailyCodingChallenge,
  fetchProblemDetails,
  fetchUserProfileInfo,
};