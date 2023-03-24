const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', async (_req, res) => {
    const scores = await DB.getHighScores();
    res.send(scores);
  });
  
  // SubmitScore
  apiRouter.post('/score', async (req, res) => {
    DB.addScore(req.body);
    scores = await DB.getHighScores();
    res.send(scores);
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
function updateScores(newScore, scores) {

    let minutes = newScore.time.substring(0,2);
    let seconds = newScore.time.substring(5,3);
    console.log("current min:" + minutes);
    console.log("current sec:" + seconds);

  let found = false;
  for (const [i, prevScore] of scores.entries()) {
        let compare = timeComparison(newScore, prevScore, minutes, seconds);
      if (compare) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

  function timeComparison(newScore, prevScore, minute, second){

    let prevMin = prevScore.time.substring(0,2);
    let prevSec = prevScore.time.substring(5,3);

    if(newScore.score > prevScore.score){
        return true;
    }
    else if(newScore.score == prevScore.score){
        if(+minute <= +prevMin){
            if(+second < +prevSec){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }

  }