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

const fetchLCDailyCodingChallenge = async () => {
  const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
  };

  try {
      const response = await fetch(LEETCODE_API_ENDPOINT, init);

      if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText} (status: ${response.status})`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON, got ${contentType}: ${text}`);
      }

      const responseData = await response.json();
      responseData.data.activeDailyCodingChallengeQuestion.question.stats = JSON.parse(
          responseData.data.activeDailyCodingChallengeQuestion.question.stats
      );
      return responseData.data.activeDailyCodingChallengeQuestion.question;
  } catch (error) {
      console.error('Error fetching daily coding challenge:', error);
      throw error; 
  }
};

const fetchLCUserProfileInfo = async (username) => {
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

  try {
      const response = await fetch(LEETCODE_API_ENDPOINT, init);

      if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText} (status: ${response.status})`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON, got ${contentType}: ${text}`);
      }

      const responseData = await response.json();
      return responseData.data;
  } catch (error) {
      console.error(`Error fetching user profile info for ${username}:`, error);
      throw error; 
  }
};

const fetchLCProblemDetails = async (titleSlug) => {
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

  try {
      const response = await fetch(LEETCODE_API_ENDPOINT, init);

      if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText} (status: ${response.status})`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON, got ${contentType}: ${text}`);
      }

      const responseData = await response.json();
      responseData.data.question.stats = JSON.parse(responseData.data.question.stats);
      return responseData.data.question;
  } catch (error) {
      console.error(`Error fetching problem details for ${titleSlug}:`, error);
      throw error;
  }
};

//fetchUserProfileInfo("mrgamer2801");
//fetchDailyCodingChallenge();
//fetchProblemDetails('replace-words');

module.exports = {
  fetchLCDailyCodingChallenge,
  fetchLCProblemDetails,
  fetchLCUserProfileInfo,
};