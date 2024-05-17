const { useHistory } = require("react-router-dom/cjs/react-router-dom.min");

// Just some constants
const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
    activeDailyCodingChallengeQuestion {
        date
        link
        question {
            questionId
            questionFrontendId
            boundTopicId
            title
            titleSlug
            content
            translatedTitle
            translatedContent
            isPaidOnly
            difficulty
            likes
            dislikes
            isLiked
            similarQuestions
            exampleTestcases
            contributors {
                username
                profileUrl
                avatarUrl
            }
            topicTags {
                name
                slug
                translatedName
            }
            companyTagStats
            codeSnippets {
                lang
                langSlug
                code
            }
            stats
            hints
            solution {
                id
                canSeeDetail
                paidOnly
                hasVideoSolution
                paidOnlyVideo
            }
            status
            sampleTestCase
            metaData
            judgerAvailable
            judgeType
            mysqlSchemas
            enableRunCode
            enableTestMode
            enableDebugger
            envInfo
            libraryUrl
            adminUrl
            challengeQuestion {
                id
                date
                incompleteChallengeCount
                streakCount
                type
            }
            note
        }
    }
}`

  const USER_PROFILE_INFORMATION_QUERY = `
  query getUserProfile($username: String!, $limit: Int!) {
      allQuestionsCount {
          difficulty
          count
      }
      matchedUser(username: $username) {
          username
          githubUrl
          twitterUrl
          linkedinUrl
          contributions {
              points
              questionCount
              testcaseCount
          }
          profile {
              realName
              userAvatar
              birthday
              ranking
              reputation
              websites
              countryName
              company
              school
              skillTags
              aboutMe
              starRating
          }
          badges {
              id
              displayName
              icon
              creationDate
          }
          upcomingBadges {
              name
              icon
          }
          activeBadge {
              id
              displayName
              icon
              creationDate
          }
          submitStats {
              totalSubmissionNum {
                  difficulty
                  count
                  submissions
              }
              acSubmissionNum {
                  difficulty
                  count
                  submissions
              }
          }
          submissionCalendar
      }
      recentSubmissionList(username: $username, limit: $limit) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
      }
  }`;
  
  const USER_CONTEST_HISTORY_QUERY = `
    query getUserContestRanking ($username: String!) {
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
            name
        }
    }
}`;


// We can pass the JSON response as an object to our createTodoistTask later.
const fetchDailyCodingChallenge = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, init);
    const responseData = await response.json(); 
    console.log(responseData.data.activeDailyCodingChallengeQuestion); 
}

//fetchDailyCodingChallenge();

const fetchUserProfileInfo = async (options) => {
    console.log(`Fetching user profile information from LeetCode API.`)

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            query: USER_PROFILE_INFORMATION_QUERY,
            variables: {
                username: options.username, //username required
                limit: options.limit, //only for submission
              }
         }),
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, init);
    const responseData = await response.json(); 
    console.log(responseData.data);
    //console.log(responseData.data.matchedUser.submitStats); 
}

//fetchUserProfileInfo({username:"mrgamer2801", limit:2});

const fetchUserContestHistory = async (options) => {
    console.log(`Fetching user contest history from LeetCode API.`)

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            query: USER_CONTEST_HISTORY_QUERY,
            variables: {
                username: options.username, //username required
                limit: options.limit
              }
         }),
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, init);
    const responseData = await response.json(); 
    console.log(responseData.data);
    //console.log(responseData.data.matchedUser.submitStats); 
}

fetchUserContestHistory({username:"mrgamer2801", limit:2});