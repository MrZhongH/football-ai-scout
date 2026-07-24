// 比赛重要程度排序模块

export function rankMatches(matches){
 return matches
 .sort((a,b)=>b.score-a.score)
 .slice(0,5);
}
