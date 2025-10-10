import { useContext } from "react"
import "./TeamCard.scss"
import { AppDataContext } from "../../context/data"
import type { TeamData } from "../../utils/getRankList";
import handleImageError from "../../utils/handleImageError";

export default function TeamCard({ teamId, problems, passCount, time, ranking }:  TeamData) {
	const {config,team,organization} = useContext(AppDataContext)

	// 组织或学校的logo的URL
	const orgLogoURL =
		organization[team[teamId].organization]?.logoURL ??
		`/data/badge/${team[teamId].organization}${config.photo?.organization?.suffix??".jpg"}`

	return (
		<div className="team-card">
			<div className="ranking">{ranking??"*"}</div>
			<div className="org-logo">
				<img src={orgLogoURL} onError={handleImageError} />
			</div>
			<div className="center">
				<div className="team-info">
					<div className="org-name">{team[teamId].organization}</div>
					<div className="team-name">{team[teamId].name}</div>
				</div>
				<div className="states">
					{problems.map((problemData, index) => {
						let state = null
						if (problemData.tries) {
							state = problemData.firstBlood?"AC-first":(problemData.frozen ? "PD" : (problemData.passed ? "AC" : "WA"))
						}
						return (
							<ProblemState
								id={index}
								key={index}
								state={state}
								tries={problemData.tries}
								time={Math.floor(problemData.time / 60)}
							/>
						)
					})}
				</div>
			</div>
			<div className="solved-number">{passCount}</div>
			<div className="total-time">{Math.floor(time / 60)}</div>
		</div>
	)
}

function ProblemState({ state, id, tries, time }: { state: string|null; id: number; tries: number; time: number }) {
	const {config} = useContext(AppDataContext)
	return (
		<div className="problem-state" data-state={state}>
			{state ? `${tries} - ${time}` : config.problem.tag[id]}
		</div>
	)
}