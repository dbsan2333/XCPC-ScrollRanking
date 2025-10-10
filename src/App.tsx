import "./App.css"
import Board from "./components/Ranking/Board"
import { getDataFromUrl } from "./utils/readSource"
import getRankList from "./utils/getRankList"
import {AppDataContext } from "./context/data"

const { config,organization, team, run } = await getDataFromUrl("/data/source.json")
function App() {
	const rankData = getRankList({ config, run }, true)
	return (
		<>
      <AppDataContext value={{ config, organization, team }}>
        <Board rankData={rankData} />
      </AppDataContext>
		</>
	)
}

export default App
