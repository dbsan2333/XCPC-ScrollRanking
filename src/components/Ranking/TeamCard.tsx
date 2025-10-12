import { useContext, useEffect, useRef } from "react"
import "./TeamCard.scss"
import { AppDataContext } from "../../context/data"
import handleImageError from "../../utils/handleImageError"
import type { RankDataElement } from "./Board"

export default function TeamCard({
	teamId,
	problems,
	passCount,
	time,
	officialRanking,
	ranking,
	focus,
}: RankDataElement) {
	const { config, team, organization, appConfig } = useContext(AppDataContext)
	const teamCardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (focus.on && teamCardRef.current) {
			teamCardRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			})
		}
	}, [focus, teamId])

	// 组织或学校的logo的URL
	const orgLogoURL =
		organization[team[teamId].organization]?.logoURL ??
		`/data/badge/${team[teamId].organization}${config.photo?.organization?.suffix ?? ".jpg"}`

	return (
		<div
			className="team-card-wrap"
			style={{ top: (ranking - 1) * appConfig.style.teamCardHeight }}>
			<div ref={teamCardRef} className="team-card" data-focus={focus.on}>
				<div className="ranking">{officialRanking ?? "*"}</div>
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
								state = problemData.firstBlood
									? "AC-first"
									: problemData.frozen
									? "PD"
									: problemData.passed
									? "AC"
									: "WA"
							}
							return (
								<ProblemState
									id={index}
									key={index}
									state={state}
									tries={problemData.tries}
									time={Math.floor(problemData.time / 60)}
									isFocused={index === focus.problemId}
								/>
							)
						})}
					</div>
				</div>
				<div className="solved-number">{passCount}</div>
				<div className="total-time">{Math.floor(time / 60)}</div>
			</div>
		</div>
	)
}

function ProblemState({
	state,
	id,
	tries,
	time,
	isFocused,
}: {
	state: string | null
	id: number
	tries: number
	time: number
	isFocused: boolean
}) {
	const { config } = useContext(AppDataContext)
	return (
		<div className="problem-state" data-state={state} data-focused={isFocused}>
			{state ? `${tries} - ${time}` : config.problem.tag[id]}
		</div>
	)
}
