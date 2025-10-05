import "./App.css"
import Board from "./components/Ranking/Board/Board"
import TeamCard from "./components/Ranking/TeamCard/TeamCard"
import { getDataFromUrl } from "./utils/readSource.js"
import getRankList from "./utils/getRankList.js"

console.log(getRankList(await getDataFromUrl("/data/source.json"), false))

function App() {
	return (
		<>
			<Board />
		</>
	)
}

export default App
