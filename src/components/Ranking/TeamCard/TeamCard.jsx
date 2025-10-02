import "./TeamCard.scss"
function ProblemState({ state, id, data }) {
	return (
		<div className="problem-state" state={state}>
			<span>{id}</span>
		</div>
	)
}

export default function TeamCard() {
	return (
		<div className="team-card">
			<div className="ranking">4</div>
			<div className="org-logo">
				<img src="/src/assets/img/logo_demo.png" />
			</div>
			<div className="center">
				<div className="team-info">
					<div className="org-name">郑州航空工业学院</div>
					<div className="team-name">
						咕咕嘎嘎咕咕嘎咕咕嘎咕咕嘎咕咕嘎咕咕嘎咕咕嘎咕咕嘎 咕咕嘎 咕咕嘎 咕咕嘎
						咕咕嘎
					</div>
				</div>
				<div className="states">
					<ProblemState id="A" />
					<ProblemState id="B" state="AC" />
					<ProblemState id="C" state="AC" />
					<ProblemState id="D" state="AC-first" />
					<ProblemState id="E" />
					<ProblemState id="F" state="WA" />
					<ProblemState id="G" state="PD" />
					<ProblemState id="H" />
					<ProblemState id="I" />
					<ProblemState id="J" />
					<ProblemState id="K" />
				</div>
			</div>
			<div className="solved-number">3</div>
			<div className="total-time">1341</div>
		</div>
	)
}
