import "./App.css"
import Board from "./components/Ranking/Board/Board"
import { getDataFromUrl } from "./utils/readSource"
import getRankList from "./utils/getRankList"
import { ConfigContext, TeamContext } from "./context/data"

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
