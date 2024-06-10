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

const fetchDailyCodingChallenge = async () => {
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
  return responseData.data.activeDailyCodingChallengeQuestion.question;
};

const fetchUserProfileInfo = async (username) => {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: USER_PROFILE_INFORMATION_QUERY,
      variables: {
        username: username,
        limit: 5,
      },
    }),
  };
  const response = await fetch(LEETCODE_API_ENDPOINT, init);
  const responseData = await response.json();
  return responseData.data;
};

const fetchProblemDetails = async (titleSlug) => {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: PROBLEM_DETAILS,
      variables: {
        titleSlug: titleSlug,
      },
    }),
  };
  const response = await fetch(LEETCODE_API_ENDPOINT, init);
  const responseData = await response.json();
  responseData.data.question.stats = JSON.parse(
    responseData.data.question.stats
  );
  return responseData.data.question;
};

//fetchUserProfileInfo("mrgamer2801");
//fetchDailyCodingChallenge();
//fetchProblemDetails('replace-words');

module.exports = {
  fetchDailyCodingChallenge,
  fetchProblemDetails,
  fetchUserProfileInfo,
};