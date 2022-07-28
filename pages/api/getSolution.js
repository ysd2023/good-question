// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const solutionList = []

  for(let item of 'qwertyuiop') {
      let solution = {
          resolver: {
            nickName: '汝名范建',
            avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.YNolRAsrIUBlJ5yYtZYGagHaEz?w=274&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7'
          },
          solution: {
            content: '这是万中无一的解决方案，信我，保你长生，永垂不朽，你先这样，在那样，最后这样，就可以了',
            comment: 30,
            favor: 10,
            opposition: 10
          },
          citeSolution: {
            resolverName: '梅挫',
            content: '这条建议绝对无人能敌！'
          }
      }
      solution.rid = Date.now() + item
      solutionList.push(solution)
  }
  res.status(200).json({ solutionList })
}
