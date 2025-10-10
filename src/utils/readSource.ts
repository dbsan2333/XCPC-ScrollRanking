/* eslint-disable prefer-const */
/**
 * 读取文本格式的source.json的内容，并返回必要参数对象{config, team, run}
 */
import type { Source, SourceConfig, SourceOrganization, SourceTeam, SourceRun } from "../interface/source";

/**
 * 从文件获取数据
 */
export function getDataFromFile(file: File) {
  return parseData(JSON.parse(file.toString()))
}

/**
 * 从url获取数据
 */
export async function getDataFromUrl(url: string) {
  const response = await fetch(url).then((res) => res.json())
  return parseData(response)
}

function parseData(data: Source) {
  const { config, organization = {}, team, run }: { config: SourceConfig, organization?: SourceOrganization, team: SourceTeam, run: SourceRun[] } = data

  // 补全缺省值
  config.problem.quantity = config.problem.quantity || Object.keys(team).length

  return { config, organization, team, run }
}
