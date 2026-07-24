export async function GET(request) {

  const { searchParams } = new URL(request.url)

  const query = searchParams.get("q")

  if (!query) {
    return Response.json({
      error:"请输入球队或联赛"
    })
  }


  const response = await fetch(
    `https://v3.football.api-sports.io/teams?search=${query}`,
    {
      headers:{
        "x-apisports-key":
        process.env.FOOTBALL_API_KEY
      }
    }
  )


  const data = await response.json()


  return Response.json(data)

}
