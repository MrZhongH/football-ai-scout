export async function GET(){

const today =
new Date().toISOString().split("T")[0];


const res = await fetch(
`https://v3.football.api-sports.io/fixtures?date=${today}`,
{
headers:{
"x-apisports-key":
process.env.FOOTBALL_API_KEY
}
}
);


const data = await res.json();


return Response.json(data);

}
