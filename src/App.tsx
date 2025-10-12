import "./App.css"
import Board from "./components/Ranking/Board"
import { getDataFromUrl } from "./utils/readSource"
import getRankData from "./utils/getRankData"
import { AppDataContext } from "./context/data"

const { config, organization, team, run } = await getDataFromUrl("/data/source.json")
function App() {
	const rankData = getRankData({ config, team, run }, true)

	// 程序运行需要的配置
	const appConfig = {
		style: {
			teamCardHeight: 110,
		},
	}

	return (
		<>
			<AppDataContext value={{ config, organization, team, appConfig }}>
				<Board teamDatas={rankData} />
			</AppDataContext>
		</>
	)
}

export default App
