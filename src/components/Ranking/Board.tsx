import type { SourceConfig, SourceTeam } from "../../interface/source"
import "./Board.scss"
import TeamCard from "./TeamCard"
import type { TeamData } from "../../utils/getRankList";
export default function Board({ config, team, rankData }: {config?:SourceConfig, team?:SourceTeam,rankData:TeamData[]}) {
	console.log(config, team, rankData)
	return (
		<div className="board">
			{rankData.map((teamData) => {
				return <TeamCard {...teamData} key={teamData.teamId} />
			})}
		</div>
	)
}
