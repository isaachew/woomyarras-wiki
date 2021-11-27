let mockups=[]
let roottank
let tanks=new Set()
let tankpaths={}
function allinpath(root,callback,prefix=[]){
    callback(root,prefix)
    for(let i of mockups[root].upgrades){
        allinpath(i.index,callback,[...prefix,root])
    }
}


fetch("https://womy-aras.herokuapp.com/mockups.json").then(a=>a.json()).then(a=>{
    mockups=a

    roottank=mockups.findIndex(a=>a.name=="Basic")
    allinpath(roottank,(a,b)=>{
        tankpaths[a]??={paths:[],upgradesfrom:new Set}
        tankpaths[a].paths.push(b)
        if(b.length)tankpaths[a].upgradesfrom.add(b[b.length-1])
    })
    load(roottank)
})

function load(id){
    document.getElementById("name").textContent=mockups[id].name
    document.getElementById("upgradesto").textContent=""
    for(var upg of mockups[id].upgrades){
        let divw=document.createElement("div")
        divw.textContent=mockups[upg.index].name
        divw.className="tank"
        divw.addEventListener("click",(ind=>a=>load(ind))(upg.index))

        document.getElementById("upgradesto").append(divw)
    }

    document.getElementById("upgradesfrom").textContent=""
    if(tankpaths[id].upgradesfrom){
            for(var branch of tankpaths[id].upgradesfrom){
            let divw=document.createElement("div")
            divw.textContent=mockups[branch].name
            divw.className="tank"
            divw.addEventListener("click",(ind=>a=>load(ind))(branch))

            document.getElementById("upgradesfrom").append(divw)
        }
    }

    let stats=document.getElementById("stats")
    stats.innerHTML=""
    for(let stat in mockups[id].body){
        let el=document.createElement("div")
        el.textContent=stat+": "+mockups[id].body[stat]
        stats.append(el)
    }
}

document.getElementById("entityid").addEventListener("input",e=>{
    load(+e.target.value)
})
