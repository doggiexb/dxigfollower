const username = ""; // String username
const userId = null; // Number userId

async function fetchFollowers(count = 21, max_id = null, userId = null) {
  const url = new URL(`https://www.instagram.com/api/v1/friendships/${userId}/followers/`);
  url.searchParams.set('count', count);
  if (max_id) {
    url.searchParams.set('max_id', max_id);
  }

  const response = await fetch(url.toString(), {
    "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-prefers-color-scheme": "dark",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
    "sec-ch-ua-full-version-list": "\"Not)A;Brand\";v=\"99.0.0.0\", \"Microsoft Edge\";v=\"127.0.2651.105\", \"Chromium\";v=\"127.0.6533.120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"10.0.0\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-asbd-id": "129477",
    "x-csrftoken": "4nQ3FhF9zUu3KNXgiHB5GaSqyNBiPVkY",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR1S2-DeLp5tMU4tCWtgBYinivZsaGMw4_YstQDBz05ZoruW",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": `https://www.instagram.com/${username}/followers/`,
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
  });

  const data = await response.json();
  return data;
}

async function fetchFollowing(count = 21, max_id = null) {
const url = new URL(`https://www.instagram.com/api/v1/friendships/${userId}/followers/`);
  url.searchParams.set('count', count);
  if (max_id) {
    url.searchParams.set('max_id', max_id);
  }
    
fetch(url.toString(), {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-prefers-color-scheme": "dark",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
    "sec-ch-ua-full-version-list": "\"Not)A;Brand\";v=\"99.0.0.0\", \"Microsoft Edge\";v=\"127.0.2651.105\", \"Chromium\";v=\"127.0.6533.120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"10.0.0\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-asbd-id": "129477",
    "x-csrftoken": "4nQ3FhF9zUu3KNXgiHB5GaSqyNBiPVkY",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR1S2-DeLp5tMU4tCWtgBYinivZsaGMw4_YstQDBz05ZolAN",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": `https://www.instagram.com/${username}/following/`,
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});

  const data = await response.json();
  return data;
}

async function fetchAllFollowers() {
  let followers = [];
  let maxId = null;

  do {
    const data = await fetchFollowers(21, maxId);
    followers = followers.concat(data.users);
    maxId = data.next_max_id;
  } while (maxId);

  console.log(followers);
}

async function fetchAllFollowing() {
  let following = [];
  let maxId = null;

  do {
    const data = await fetchFollowing(21, maxId);
    following = following.concat(data.users);
    maxId = data.next_max_id;
  } while (maxId);

  console.log(followers);
}

async function compareFollows() {
  const followers = await fetchAllFollowers();
  const following = await fetchAllFollowing();

  const followerSet = new Set(followers.map(user => user.username));
  const followingSet = new Set(following.map(user => user.username));
  
  const notFollowedBack = followingSet.difference(followerSet);

  console.log("Users who follow you but you don't follow back:", notFollowedBack);
}
