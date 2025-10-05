export default function getRankList({ config, run }, frozen = true) {
	const frozenMoment = config.contest.endTime - config.contest.startTime - config.judge.frozenTime //比赛开始后多少秒封榜

	const teams = {}
	run.sort((a, b) => a.timestamp - b.timestamp)
	run.forEach((record) => {
		let t = teams[record.teamId]
		if (t === undefined) {
			t = {
				teamId: record.teamId,
				problems: {},
				time: 0,
				passCount: 0,
			}
		}
		if (t.problems[record.teamId] === undefined) {
			t.problems[record.problemId] = {
				passed: false,
				time: 0,
				try: 0,
				frozen: false,
			}
		}
		// 如果该题已经AC，不再考虑
		if (t.problems[record.problemId].passed === false) {
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
						config.judge.penaltyTime * t.problems[record.problemId].try
				}
			}
			t.problems[record.problemId].time = record.timestamp
			t.problems[record.problemId].try++
		}

		teams[record.teamId] = t
	})

	// 对象转数组，并按排名排序
	const result = []
	for (let teamId in teams) {
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
