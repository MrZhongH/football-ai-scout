export async function GET(){

return Response.json({
status:"Auto data refresh ready",
tasks:[
"update fixtures",
"update standings",
"update team data",
"update injuries"
]
})

}
