window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-discription');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span');

    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/6405711663fc4e90d3f4b2519e7ec690/${lat},${long}`;

            fetch(api)
            .then(response => {
                  return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;

                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone.replace(/_/g, " ");
                //FORMULA FOR CELCIUS
                 let celsius = (temperature - 32) * (5 / 9);
                //SetIcon
                setIcons(icon, document.querySelector('.icon'));

                //Change Temperature to Celcius
                
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    };
                })
            });
        });          
        

    } 

    function setIcons (icon, iconID) {
        const skycons = new Skycons ({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});