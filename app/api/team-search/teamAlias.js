export async function translateTeamName(input){


try{


const res = await fetch(

"https://open.bigmodel.cn/api/paas/v4/chat/completions",

{

method:"POST",


headers:{


"Content-Type":"application/json",


"Authorization":
`Bearer ${process.env.OPENAI_API_KEY}`


},



body:JSON.stringify({


model:"glm-4-flash",


messages:[


{


role:"system",


content:
`
你是全球足球球队名称识别专家。

任务：
把用户输入转换成API-Football可以搜索的官方英文球队名称。

规则：
1. 只返回英文球队名
2. 不要解释
3. 不要返回JSON
4. 不确定时返回原输入


例子：

皇马 = Real Madrid

红魔 = Manchester United

蓝军 = Chelsea

枪手 = Arsenal

药厂 = Bayer Leverkusen

全北 = Jeonbuk Motors

大巴黎 = Paris Saint-Germain

利雅得胜利 = Al Nassr

`


},


{


role:"user",

content:input


}


],


temperature:0.1


})


}

);



const data =
await res.json();



return (

data
?.choices?.[0]
?.message
?.content
?.trim()

|| input

);



}catch(error){


console.log(
"Zhipu AI error:",
error
);


return input;


}


}
