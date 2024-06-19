function codeforcesDataHandler(updatedUser){
    const codeforces = {
        username: updatedUser.handle,
        rating: updatedUser.rating,
        rank: updatedUser.rank,
      };
    return codeforces;
}

module.exports = {codeforcesDataHandler}