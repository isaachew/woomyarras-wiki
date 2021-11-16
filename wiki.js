let mockups=[]
fetch("https://womy-aras.herokuapp.com/mockups.json").then(a=>a.json()).then(a=>{
    mockups=a

    let roottank=mockups.findIndex(a=>a.name=="Basic")
    allinpath(roottank,(a,b)=>{
        paths[a]??=[]
        paths[a].push(b)
    })

})
tanks=new Set()
paths={}
function allinpath(root,callback,prefix=[]){
    for(let i of mockups[root].upgrades){
        let nprefix=[...prefix,i]
        callback(i.index,nprefix)
        allinpath(i.index,callback,nprefix)
    }
}
