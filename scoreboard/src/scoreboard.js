const { readScoreboard, updateScoreboard, strToInteger } = require("./utils");
const { app } = require("./index");

app.post("/api/v1/scoreboard/:username/:scoreStr", (req, res) => {
  const { username, scoreStr } = req.params;

  // Check that score is a valid integer
  const score = strToInteger(scoreStr);
  if (!score) return res.status(401).json({msg: "'score' is not a valid integer."});

  const scoreboardEntry = {
    username,
    score: score
  }
  
  const currentData = readScoreboard();

  const oldEntryIndex = currentData.entries.findIndex((entry) => entry.username == username);
  const oldEntry = currentData.entries[oldEntryIndex];

  if (oldEntry) {
    if (oldEntry.score < scoreboardEntry.score) {
      currentData.entries[oldEntryIndex].score = scoreboardEntry.score;
    }
  }else {
    currentData.entries.push(scoreboardEntry);
  }

  updateScoreboard(currentData);

  res.status(201).json({msg: "Success!"});
});


app.get("/api/v1/scoreboard/:from/:to", (req, res) => {

  function sendInvalidRange() {
    res.status(400).json({msg: "Invalid range"});
  }

  const from = strToInteger(req.params.from);
  const to = strToInteger(req.params.to);


  if (!(typeof from == "number" && typeof to == "number")) return sendInvalidRange();

  const difference = to - from;
  if (difference < 0 || difference > 10) return sendInvalidRange();



  const scoreboard = readScoreboard();

  const resultEntries = scoreboard.entries.sort((a, b) => b.score - a.score).slice(from, to);

  res.status(200).json({msg: "Success", entries: resultEntries});
});