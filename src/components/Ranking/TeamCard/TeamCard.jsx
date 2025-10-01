import "./TeamCard.scss"

export function ProblemState({ state }) {
	return (
		<div className="problem-state" state={state}>
			<span>4 - 234</span>
		</div>
	)
}

export default function TeamCard() {
	return (
		<div className="team-card">
			<div className="ranking">4</div>
			<div className="org-logo"></div>
			<div className="center">
				<div className="org-name">郑州航空航天大学</div>
				<div className="team-name"></div>
				<div className="states">
					<ProblemState />
					<ProblemState state="AC-first" />
					<ProblemState state="AC" />
					<ProblemState state="WA" />
					<ProblemState state="PD" />
				</div>
				<div className="solved-num">3</div>
				<div className="total-time">1341</div>
			</div>
		</div>
	)
}
