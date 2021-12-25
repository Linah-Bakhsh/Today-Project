var category;

let weather = {
  
    apiKey: "240d4193038f427d8e54291c188bfe7c",
    fetchWeather: function (city) {
    fetch(
        "https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&city="
        + city
        + "&key="
        + this.apiKey
    ).then((res) => {
        if (!res.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return res.json();
      })
      .then(data => obj = data)
        .then(() => this.displayWeather(obj))
    },    
  displayWeather: function (data) {
    console.log(data)
    const name =data.data[0].city_name
    const icon= data.data[0].weather.icon
    const description=  data.data[0].weather.description
    const temp=data.data[0].temp
    const humidity=data.data[0].rh
    const speed=data.data[0].wind_spd
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://www.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = speed + "km/h wind speed";
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector("#contentVisi").style.backgroundImage =
      " url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    };

    document.querySelector(".search-weather button").addEventListener("click", function () {
    weather.search();
    });

    document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
        weather.search();
        }
    });

    
// Object for news 
    let news={
    

      // NewsAPI request
      fetchnews: function(page,category){
        fetch("https://newsapi.org/v2/top-headlines?pageSize=6&page="+page+"&country=sa&category="+category+"&api"
      +"Key=60fdd6588e4747efb7a39a94cbcbeeaa").then((res) => {
        if (!res.ok) {
          alert("No news found.");
          throw new Error("No news found.");
        }
        return res.json();
      })
      .then(data => obj = data)
      // call maping function to deiplay the JISON information  
      .then(data  => this.mapping(data,category))

      //  API function request for user's search
    },fetchnews_search: function(Keywords){
      fetch("https://newsapi.org/v2/top-headlines?q="+Keywords
    +"&apiKey=60fdd6588e4747efb7a39a94cbcbeeaa").then((res) => {
      if (!res.ok) {
        alert("No news found.");
        throw new Error("No news found.");
      }
      return res.json();
    })
    .then(data => obj = data)
    .then(data  => this.mapping(data,Keywords))
  }
    // mapping function for desplay the news 
      ,mapping: function (news,title) {
        var string =title;
        var string2 = title
        string2 = string2.substring(1);

        console.log(news.articles);
        document.getElementById('title').innerHTML = 
        '<h1 class="text-danger display-5 title p3 mt-4 "> _____ <span class="animate__animated animate__fadeInLeft animate__slow"> <span class="text-dark">❝ </span>'+
        string.charAt(0).toUpperCase()+'<span class="text-dark">'+string2+' ❞</span></span>    _________ </h1> ';
        document.getElementById('news').innerHTML = news.articles.map(article => 
          `
          <div class="mt-5 animate__animated animate__fadeInUp animate__slow">
          <div class="row no-gutters py-2 px-5" >
        <div class="col-md-6 " >
          <div class=" overlaySeg col-12 border">
          <div class="row justify-content-center "  id="contentVisi">
          <img src="${article.urlToImage}" class="card-img " id="contentVisi" alt="...">
          </div>
        </div>
        
        </div>
        <div class="col-md-6 border-bottom border-4">
          <div class="card-body ">
            <h5 class="card-title p2 h3" >${article.title}</h5>
            <p class="card-text">
            ${article.description}
            </p>
            <a href="${article.url}" >
            <button class="btn btn-dark">show more</button>
            </a>
         
          </div>
          <div class="card-footer">
          <small class="text-muted">${article.publishedAt}</small>
          </div>
        </div>
        
      </div>
      
      </div>
          
          `
          ).join('')
      },
    
      
    };

    document.querySelector(".search-news button").addEventListener("click", function () {
      news.fetchnews_search(document.querySelector(".bar-news").value);
      });
  
      document
      .querySelector(".bar-news")
      .addEventListener("keyup", function (event) {
          if (event.key == "Enter") {
            news.search();
          }
      });

      // click pagination function 
      $('ul.pagination > li >a').click(function (e) {
        e.preventDefault();
        var page = $(this).text();
        $('ul.pagination > li > a').removeClass(' bg-danger border-danger').addClass('bg-dark');
        $(this).addClass('active bg-danger border-danger').removeClass(' bg-dark');
        

        news.fetchnews(page,category);
        console.log(category);
        window.scrollTo(0, 400);
        
        $('.pagination ').click();
    });

    // click category function 
    $('ul.navbar-nav > li > a').click(function (e) {
      e.preventDefault();
      var getItem = $(this).text();
      $('ul.navbar-nav > li > a').removeClass(' active bg-danger text-light');
      $(this).addClass(' active bg-danger text-light');
    // set the page one actaive 
    $('ul.pagination > li > a').removeClass(' bg-danger border-danger').addClass('bg-dark');
    $('#page1').addClass(' bg-danger border-danger ').removeClass(' bg-dark');
    category=getItem.replace(/\s/g, '');
      news.fetchnews("1",category);
      
      $('.navbar-toggler').click();
  });

    weather.fetchWeather("Jeddah");
    //news.weather="General"
    news.fetchnews("1","General");

      
      
      
      