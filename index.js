const weatherfield = document.querySelector(".weather1");
const locationfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const emojifield = document.querySelector(".weather3 img");
const conditionfield = document.querySelector(".weather3 span");
const searchfield = document.querySelector(".searchfeild");
const form = document.querySelector("form");

let target = "chittorgarh";

fetchdata = async(target)=>{
    try {const url = `https://api.weatherapi.com/v1/current.json?key=86c9b9690dc5464285f132653232709&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const {
        current:{temp_c, condition:{icon, text}},
        location:{name, localtime}
    } = data;

    updatedom(temp_c, name, localtime, icon, text);
        
    } catch (error) {
        alert("location not found")
    }
  
};

function updatedom (temprature, city, date, icon, condition) {
    weatherfield.innerText = temprature
    locationfield.innerText = city
    const exacttime = date.split(" ")[1];
    const exactdate = date.split(" ")[0];

    const exactday = getdayfullname(new Date(date).getDay());
  
    datefield.innerText = `${exacttime} - ${exactday} ${exactdate}`;

    emojifield.src = icon;
    conditionfield.innerText = condition;
};


fetchdata(target);

function getdayfullname (num){
    switch (num) {
        case 0:
            
            return "Sunday";
    
        case 1:
            
            return "Monday";
    
        case 2:
            
            return "Tuesday";
    
        case 3:
            
            return "Wednesday";
    
        case 4:
            
            return "Thursday";
    
        case 5:
            
            return "Friday";
    
        case 6:
            
            return "Saturday";
    
        default:

            return "unknown-day" ;
    }
};

const search = (e)=>{
    e.preventDefault();
    target = searchfield.value;

    fetchdata(target);

};
form.addEventListener("submit", search);
