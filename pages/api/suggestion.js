export default async function handler(req, res) {
  let keyword = req.query.keyword
  const list = []
  for(let i = 0; i < 10; i++) {
    list.push(keyword + i)
  }
  res.status(200).json({ list })
}
