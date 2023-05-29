const { readScoreboard, updateScoreboard } = require("./utils");
const { app } = require("./index");

app.post("/api/v1/scoreboard/:username/:scoreStr", (req, res) => {
  const { username, scoreStr } = req.params;

  // Check that score is a valid integer
  if (!/[0-9]+/.test(scoreStr)) return res.status(401).json({msg: "'score' is not a valid integer."});

  const scoreboardEntry = {
    username,
    score: +scoreStr
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