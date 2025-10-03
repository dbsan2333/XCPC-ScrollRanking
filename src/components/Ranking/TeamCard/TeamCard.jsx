import "./TeamCard.scss"
function ProblemState({ state, id, data }) {
	return (
		<div className="problem-state" state={state}>
			{state ? `${data.count} - ${data.time}` : id}
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
					<ProblemState
						id="B"
						state="AC"
						data={{
							count: 1,
							time: 56,
						}}
					/>
					<ProblemState
						id="C"
						state="AC"
						data={{
							count: 2,
							time: 234,
						}}
					/>
					<ProblemState
						id="D"
						state="AC-first"
						data={{
							count: 1,
							time: 9,
						}}
					/>
					<ProblemState id="E" />
					<ProblemState
						id="F"
						state="WA"
						data={{
							count: 15,
							time: 299,
						}}
					/>
					<ProblemState
						id="G"
						state="PD"
						data={{
							count: 2,
							time: 107,
						}}
					/>
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
