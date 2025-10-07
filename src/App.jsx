import "./App.css"
import Board from "./components/Ranking/Board/Board"
import TeamCard from "./components/Ranking/TeamCard/TeamCard"
import { getDataFromUrl } from "./utils/readSource.js"
import getRankList from "./utils/getRankList.js"
import { ConfigContext, TeamContext } from "./context/data.js"

const { config, team, run } = await getDataFromUrl("/data/source.json")
function App() {
	const rankData = getRankList({ config, team, run }, true)
	return (
		<>
			<ConfigContext value={config}>
				<TeamContext value={team}>
					<Board rankData={rankData} />
				</TeamContext>
			</ConfigContext>
		</>
	)
}

export default App
