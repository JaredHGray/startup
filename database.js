const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('startup').collection('scores');
const userCollection = client.db('startup').collection('user');

/*functions for scores*/
function addScore(score) {
    scoreCollection.insertOne(score);
  }

  function getHighScores() {
    const query = {score: {$gt: 0}};
    const options = {
      sort: {score: -1, minutes: 1, seconds: 1},
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
  }

/*functions for user info*/
function getUser(userName) {
  return userCollection.findOne({ userName: userName });
}

function getUserByToken(token){
  return userCollection.findOne({ token: token });
}

async function createUser(userName, password) {
  console.log("in database createUser");

  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);
  console.log("createUser: past hash");
  const user = {
    userName: userName,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}
  
module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
};