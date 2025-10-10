import type { SourceConfig, SourceRun } from "../interface/source";

export interface TeamData {
  teamId: string,
  problems:
  {
    passed: boolean;
    time: number;
    tries: number;
    frozen: boolean;
  }[];
  time: number;
  passCount: number;
}
export default function getRankList({ config, run }: { config: SourceConfig, run: SourceRun[] }, frozen: boolean = true) {
  const frozenMoment = config.contest.endTime - config.contest.startTime - config.judge.frozenTime //比赛开始后多少秒封榜

  const teams: { [teamId: string]: TeamData } = {}
  run.sort((a, b) => a.timestamp - b.timestamp)

  run.forEach((record) => {
    let t = teams[record.teamId]
    if (t === undefined) {
      t = {
        teamId: record.teamId,
        problems: new Array(config.problem.quantity).fill({}),
        time: 0,
        passCount: 0,
      }
    }

    if (Object.keys(t.problems[record.problemId]).length === 0) {
      t.problems[record.problemId] = {
        passed: false,
        time: 0,
        tries: 0,
        frozen: false,
      }
    }
    // 如果该题已经AC，不再考虑
    if (t.problems[record.problemId].passed === false) {
      if (record.status === config.judge.stateString.CE) {
        // 如果该题CE，就当无视发生
        return
      }

      if (frozen == true && record.timestamp >= frozenMoment) {
        // 如果开启统计封榜且该提交时间在封榜时间段内，则该题被frozen
        t.problems[record.problemId].frozen = true
      }
      if (record.status === config.judge.stateString.AC) {
        // 如果该题AC
        t.problems[record.problemId].passed = true
        if (frozen == false || record.timestamp < frozenMoment) {
          // 如果统计封榜后的或还未封榜，更新该队时间和过题数
          t.passCount++
          t.time +=
            record.timestamp +
            config.judge.penaltyTime * t.problems[record.problemId].tries
        }
      }
      t.problems[record.problemId].time = record.timestamp
      t.problems[record.problemId].tries++
    }

    teams[record.teamId] = t
  })

  // 对象转数组，并按排名排序
  const result = []
  for (const teamId in teams) {
    result.push(teams[teamId])
  }
  result.sort((a, b) => {
    if (a.passCount !== b.passCount) {
      return b.passCount - a.passCount
    } else {
      return a.time - b.time
    }
  })

  return result
}
