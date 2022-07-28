export default async function handler(req, res) {
  const data = Array.from(new Array(10).keys())
  res.status(200).json(data)
}