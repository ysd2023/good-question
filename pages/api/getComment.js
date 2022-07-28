export default async function handler(req, res) {
  const commentList = []

  for(let item of 'qwertyuiop') {
      let comment = {
          commentor: {
            nickName: '汝名范建',
            avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.YNolRAsrIUBlJ5yYtZYGagHaEz?w=274&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7'
          },
          content: '宁说的对！' + item,
          replayTarget: '范闲'
      }
      comment.cid = Date.now() + item
      commentList.push(comment)
  }
  res.status(200).json({ commentList })
}
