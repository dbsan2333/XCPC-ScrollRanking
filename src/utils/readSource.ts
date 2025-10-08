/**
 * 读取文本格式的source.json的内容，并返回必要参数对象{config, team, run}
 */

/**
 * 从文件获取数据
 * @param {File} file
 */
export function getDataFromFile(file) {
  return parseData(JSON.parse(file.contents.toString()))
}

/**
 * 从url获取数据
 * @param {string} url
 */
export async function getDataFromUrl(url) {
  let response = await fetch(url).then((res) => res.json())
  return parseData(response)
}

function parseData(data) {
  const { config, team, run } = data
  return { config, team, run }
}
