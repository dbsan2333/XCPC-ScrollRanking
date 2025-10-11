/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Board.scss"
import TeamCard from "./TeamCard"
import type { TeamData } from "../../utils/getRankList"
import { useEffect, useState } from "react"
import { useImmer } from "use-immer"

export interface RankDataElement extends TeamData {
	focus: string | boolean
}
type RankData = RankDataElement[]

type RankListNode = {
	nextTeamId: string | null
	prevTeamId: string | null
}
interface RankList {
	[teamId: string]: RankListNode
}

/**
 * 排行榜链表转数组
 */
// function rankDataToList(rankList: RankList, headTeamId: string): RankData {
// 	const rankData: RankData = []
// 	let currentTeamId: string | null = headTeamId
// 	while (currentTeamId !== null) {
// 		const teamData = rankList[currentTeamId] as RankListNode
// 		rankData.push(teamData)
// 		currentTeamId = teamData.nextTeamId
// 	}
// 	return rankData
// }
export default function Board({ teamDatas }: { teamDatas: TeamData[] }) {
	// 创建链表RankList，用于滚榜时快速调整排名
	const rankList: RankList = {}
	teamDatas.forEach((teamData, index) => {
		const prevTeamId = index > 0 ? teamDatas[index - 1].teamId : null
		const nextTeamId = index < teamDatas.length - 1 ? teamDatas[index + 1].teamId : null
		rankList[teamData.teamId] = {
			prevTeamId,
			nextTeamId,
		}
	})

	const [rankData, setRankData] = useImmer<RankData>(
		teamDatas.map((teamData) => {
			return {
				...teamData,
				focus: false,
			}
		})
	)

	const [currentTeamId, setCurrentTeamId] = useState<string>("")

	useEffect(() => {
		begin()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (currentTeamId != "") {
			setRankData((draft) => {
				draft.forEach((teamData) => {
					if (teamData.teamId == currentTeamId) {
						teamData.focus = true
					}
				})
			})
		}
	}, [currentTeamId, setRankData])
	/**
	 * 开始滚榜
	 */
	function begin() {
		setCurrentTeamId(teamDatas[teamDatas.length - 1].teamId)
	}

	return (
		<>
			{/* 测试用 */}
			<div style={{ position: "fixed", right: "10px" }}>
				<button>下一步</button>
			</div>

			<div className="board">
				{rankData.map((teamData) => {
					return <TeamCard {...teamData} key={teamData.teamId} />
				})}
			</div>
		</>
	)
}
