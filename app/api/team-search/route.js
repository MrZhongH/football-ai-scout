export async function GET(request){


const {
searchParams
}=new URL(request.url);


const q =
searchParams.get("q");


const res =
await fetch(
`https://v3.football.api-sports.io/teams?search=${encodeURIComponent(q)}`,
{

headers:{

"x-apisports-key":
process.env.FOOTBALL_API_KEY

}

}
);



const data =
await res.json();



return Response.json({

query:q,

api:data

});


}
