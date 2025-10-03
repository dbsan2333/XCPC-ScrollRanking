import "./Board.scss"
import TeamCard from "../TeamCard/TeamCard"
export default function Board() {
	return (
		<div className="board">
			<TeamCard />
			<TeamCard />
			<TeamCard />
		</div>
	)
}
