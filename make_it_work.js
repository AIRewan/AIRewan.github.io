var data
let keys
const picked_Q=[]
let champ
let miss_counter = 0

$.getJSON("source\\data.json", function(result){
        data=result
        keys= Object.keys(data)
    })

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

$(window).on('load',function(){                            // on load asks a quote
    const pick= randomInt(0,keys.length-1)
    champ = keys[pick]
    giveQuote(champ)
    $(".icon").css("background-image",'url("source/question.jpg")');
})

$(window).on('load',function(){
    $("input").on("keydown",(function(event){
        $( "input.guess" ).autocomplete({
            source: keys
        });

         if (event.which == 13) {
          $(".sub").trigger("click")
        }
    }))
})    

$(window).on('load',function(){
    $(".sub").on( "click", function(e){
        e.preventDefault()
        player_guess = $("input.guess").val()
        let match= checkIfValid(player_guess)
        nextRound(match)
     }) 
})

$(document).ready(function(){
    $(".restart").on( "click", function(e){
        location.reload()
     }) 
})

//---------------------------------------------------------------------------------------------------------------------------------   
function randomInt(min, max) {                                      //gives a random integer min and max are also included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function giveQuote(champ){                                          //gives a random quote from a champion that is not already given
    let quotes= data[champ].quote
    let pick = randomInt(0,quotes.length-1)
    while (picked_Q.includes(pick)){
        pick = randomInt(0,quotes.length-1)
    }    
    let picked_quote=quotes[pick]
    picked_Q.push(pick)

    const para = document.createElement("p");                       //creates a p element for the quote within the div of quotes
    const text = document.createTextNode('"'+picked_quote+'"')
    para.appendChild(text);
    const element = document.getElementById("quote")
    element.appendChild(para)
}

function nextRound(match){
    if(match=="miss" && miss_counter%2==0 && miss_counter<6){  //2-4-6
        
        giveQuote(champ)
    }
    else if(match=="miss" && miss_counter>=6){
        
        giveTitle()
    }
    else if(match=="match"){
        giveSolution(data[champ])
    }
}

function checkIfValid(pc){
    let keys_lw=[]
    keys.forEach((e) => keys_lw.push(e.toLowerCase()))
    let match = ""
    if (keys_lw.includes(pc.toLowerCase())){
        match = fillTable(pc)
        return match
    }
    else{
        $("input.guess").val("")
        $("input.guess").attr('placeholder','Pls give a real character name from LoL...')
        return match
    }
}

function fillTable(pc){
    if(pc.includes(" ")){
        let sep= pc.split(" ")
        let pc1= sep[0][0].toUpperCase()+sep[0].substring(1)  //T  ahm   K  ench
        let pc2= sep[1][0].toUpperCase()+sep[1].substring(1)
        pc= pc1+" "+pc2
    }
    else if(pc.includes("'")){
        let sep= pc.split("'")
        let pc1= sep[0][0].toUpperCase()+sep[0].substring(1)  //R  ek '  S  ai
        let pc2= sep[1][0].toUpperCase()+sep[1].substring(1)
        pc= pc1+"'"+pc2
    }
    else{
        pc= pc[0].toUpperCase()+pc.substring(1).toLowerCase().replace("'","\'")
    }
    
    pc_table = data[pc] //pc
    og_table = data[champ] //champ 

    let table = document.getElementById("table_of_miss");
    let row = table.insertRow(0)
       // Picture;Female;2011;Piltover;Human;Marksman;Bottom;Ranged;Mana;Title
    let sex = row.insertCell()
    let specie = row.insertCell()
    let type = row.insertCell()
    let position = row.insertCell()
    let mana = row.insertCell()
    let range = row.insertCell()
    let home = row.insertCell()
    let release = row.insertCell()

    for (let key in og_table)
    {   
        
        switch(key){
            case "sex":
                sex.innerText=pc_table[key]
                if(og_table[key]==pc_table[key]){
                    sex.style.backgroundColor = "green"
                }
                else{
                    sex.style.backgroundColor = "red"
                }
                break;
            case "specie":
                let all_spec=pc_table[key].split(', ')
                specie.innerText=pc_table[key]
                if(og_table[key]==pc_table[key]){
                    specie.style.backgroundColor = "green"
                }
                else if(all_spec.some((i)=>  og_table[key].includes(i))){
                    specie.style.backgroundColor = "orange"
                }
                else{
                    specie.style.backgroundColor = "red"
                }
                break;
            case "type":
                type.innerText=pc_table[key]
                if(og_table[key]==pc_table[key]){
                    type.style.backgroundColor = "green"
                }
                else{
                    type.style.backgroundColor = "red"
                }
                break;
            case "position":
                let all_poz=pc_table[key].split(', ')
                position.innerText=pc_table[key]
                if(og_table[key]==pc_table[key]){
                    position.style.backgroundColor = "green"
                }
                else if(all_poz.some((i)=>  og_table[key].includes(i))){
                    position.style.backgroundColor = "orange"
                }
                else{
                    position.style.backgroundColor = "red"
                }
                break;
            case "mana":
                mana.innerText=pc_table[key]
                if(og_table[key]==pc_table[key]){
                    mana.style.backgroundColor = "green"
                }
                else{
                    mana.style.backgroundColor = "red"
                }
                break;
            case "range":
                range.innerText=pc_table[key]
                if(og_table[key]==pc_table[key]){
                    range.style.backgroundColor = "green"
                }
                else{
                    range.style.backgroundColor = "red"
                }
                break;
            case "home":
                let all_home=pc_table[key].split(', ')
                home.innerText=pc_table[key]
                if(og_table[key]==pc_table[key]){
                    home.style.backgroundColor = "green"
                }
                else if(all_home.some((i)=>  og_table[key].includes(i))){
                    home.style.backgroundColor = "orange"
                }
                else{
                    home.style.backgroundColor = "red"
                }
                break;
            case "release":
                

                if(og_table[key]==pc_table[key]){
                    release.innerText=pc_table[key]
                    release.style.backgroundColor = "green"
                }
                else if(og_table[key]>pc_table[key]){
                    release.innerText=pc_table[key]+ "  \u2B9D"
                    release.style.backgroundColor = "red"
                }
                else{
                    release.innerText=pc_table[key]+ "  \u2B9F"
                    release.style.backgroundColor = "red" 
                }
        } 
    }
    if(pc==champ){
        return "match"
    }
    else{
        miss_counter++;
        return "miss";
    }
}

function giveSolution(og_table){
    const reset = document.getElementById("reset")
    reset.style.display ="flex"
    const resetButton = document.getElementById("restart")
    resetButton.style.visibility="visible"

    const id = document.getElementById("champname")
    if(id != null){
        const para = document.getElementById("champname")                      
        para.innerText = (champ+", "+og_table["title"])
    }
    else{
        const name = document.getElementById("solution")
        const para = document.createElement("p")                      
        const text = document.createTextNode(champ+", "+og_table["title"])
        para.appendChild(text)
        name.appendChild(para)
    }
        $(".icon").css("background-image",'url("'+og_table["picture"]+'")')
        $(".icon").css("background-position", og_table["picture_position"])
        $(".icon").css("border", "2px solid green")
           
}

function giveTitle(){
    const name = document.getElementById("solution")
    const para = document.createElement("p")
    para.setAttribute("id","champname")                      
    const text = document.createTextNode("(champion), "+data[champ]["title"])
    para.appendChild(text)
    name.appendChild(para)
}
