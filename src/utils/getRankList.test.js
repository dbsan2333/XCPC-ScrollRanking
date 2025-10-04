import { readFileSync } from "fs"

const run = JSON.parse(readFileSync("D:\\Website\\project\\XCPC-ScrollRanking\\public\\data\\run.json").toString())
const config = JSON.parse(readFileSync("D:\\Website\\project\\XCPC-ScrollRanking\\public\\data\\config.json").toString())
const { start_time: startTime, end_time: endTime, frozen_time: frozenTime, penalty: penaltyTime } = config
const stateStrings = {
  AC: "ACCEPTED",
  WA: "WRONG_ANSWER"
}

run.sort((a, b) => a.timestamp - b.timestamp)

console.log({ startTime, endTime, frozenTime, penaltyTime });
console.log(run[0])

const teams = {}

run.forEach(record => {
  let t = teams[record.team_id]
  if (t === undefined) {
    t = {
      teamId: record.team_id,
      passCount: 0,
      time: 0,
      problems: []
    }
  }
  if (t.problems[record.problem_id] === undefined) {
    t.problems[record.problem_id] = {
      passed: false,
      time: 0,
      try: 0
    }
  }
  if (t.problems[record.problem_id].passed === false) {
    if (record.status === stateStrings.AC) {
      t.problems[record.problem_id].passed = true
      t.problems[record.problem_id].time = record.timestamp
      t.passCount++
      t.time += record.timestamp + penaltyTime * t.problems[record.problem_id].try
    }
    t.problems[record.problem_id].try++
  }

  teams[record.team_id] = t
});

console.log(teams);

