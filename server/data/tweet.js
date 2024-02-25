
let tweets = [
  {
    id: 1,
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: '2021-05-09T04:20:57.000Z',
    name: 'Sophia',
    username: 'sophia',
    url: 'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg',
  },
  {
    id: 2,
    text: '지혜짱',
    createdAt: '2021-05-09T04:20:57.000Z',
    name: 'Jihye',
    username: 'jihye',
  }
]

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username == username);
}

export async function getById(id) {
  return tweets.find((tweet) => tweet.id == id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  return tweets = [tweet, ...tweets];
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id == id);
  if (tweet) {
    tweet.text = text
  }
  return tweet;
}

export async function remove(id) {
  tweets.filter((tweet) => tweet.id != id);
}