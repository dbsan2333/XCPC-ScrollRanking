/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Board.scss"
import TeamCard from "./TeamCard"
import type { TeamData } from "../../utils/getRankData"
import { useEffect, useState, useContext } from "react"
import { useImmer } from "use-immer"
import { AppDataContext } from "../../context/data"

export interface RankDataElement extends TeamData {
	focus: {
		on: boolean
		problemId: number | null
	}
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
	const { appConfig } = useContext(AppDataContext)

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
				focus: {
					on: false,
					problemId: null,
				},
			}
		})
	)

	const [current, setCurrent] = useState<{
		teamId: string | null
		problemId: number | null
	}>({
		teamId: null,
		problemId: null,
	})

	useEffect(() => {
		// 测试用
		// 开始滚榜
		begin()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (current.teamId != null) {
			setRankData((draft) => {
				draft.forEach((teamData) => {
					if (teamData.teamId == current.teamId) {
						teamData.focus = {
							on: teamData.teamId === current.teamId,
							problemId: current.problemId,
						}
					}
				})
			})
		}
	}, [current, setRankData])
	/**
	 * 开始滚榜
	 */
	function begin() {
		setCurrent({
			teamId: teamDatas[teamDatas.length - 1].teamId,
			problemId: 0, // TEST
		})
	}

	return (
		<>
			<div
				className="board"
				style={{ height: appConfig.style.teamCardHeight * teamDatas.length }}>
				{rankData.map((teamData) => {
					return <TeamCard {...teamData} key={teamData.teamId} />
				})}
			</div>

			{/* 测试用 */}
			<div style={{ position: "fixed", right: 10, top: 5 }}>
				<button>下一步</button>
			</div>
		</>
	)
}
