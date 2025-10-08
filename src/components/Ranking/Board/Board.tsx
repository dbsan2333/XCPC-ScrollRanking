import "./Board.scss"
import TeamCard from "../TeamCard/TeamCard"
export default function Board({ config, team, rankData }) {
	console.log(config, team, rankData)
	return (
		<div className="board">
			{rankData.map((teamData, index) => {
				return <TeamCard {...teamData} key={teamData.teamId} ranking={index + 1} />
			})}
		</div>
	)
}
