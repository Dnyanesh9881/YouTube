const left=document.querySelector('.left-container');
  const sideBtn=document.querySelector('.side-btn');

  sideBtn.addEventListener('click', ()=>{
      
   
  })
  
  const allTopMenu=document.getElementById("top-menu-all");

  for(let i=0;i<20;i++){
    let menu=document.createElement("div");
    menu.setAttribute('class', 'top-menu');
    menu.innerText='Item';
    allTopMenu.appendChild(menu);
  }
  
  
  const API_KEY="AIzaSyCb4vk6UmGDrE-EPcK31Rczlh5uGYEGMh4";
  // const API_KEY = "AIzaSyADArfs20ud1ndYyu8amgO4JTpiRWPg1qk";
  const BASE_URL = "https://www.googleapis.com/youtube/v3";
//   const video_http="https://www.googleapis.com/youtube/v3/videos?"
// const channel_http="https://www.googleapis.com/youtube/v3/channels?"
  const CONTENT_DETAILS = "contentDetails"; // length of video
  const STATS = "statistics"; // like count, comment count
  const videoContainer=document.querySelector(".video-container")
  let apiCallCounter = 0; // Counter to track API calls

  // window.addEventListener("load", (event) => {
  //   // event.preventDefault();
  //   console.log(fetchVideos("", 20));
  // let videoDiv=document.createElement('div');
  // videoDiv.innerHTML=``

  // });

  // search API
// let searchQuery="";
  

//  fetch(BASE_URL + new URLSearchParams({
//   key:API_KEY,
//   part: 'snippet',
//   chart:'mostPopular',
//   maxResults:50,
//   regionCode:'IN',
// })).then(res => res.json())
// .then(data =>{
//   data.items.forEach(item=>{
//     getchannelIcon(item);
//   })
// }).catch(err=>{
//   console.log(err);
// });
// const getchannelIcon=(video_data)=>{
//   fetch(channel_http+new URLSearchParams({
//     key:API_KEY,
//     part:'snippet',
//     id:video_data.snippet.channelId
//   })).then(res=>res.json())
//   .then(data=>{
//     video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
//     makeVideoCard(video_data);
//   })
// }
const  makeVideoCard= (data)=>{
  videoContainer.innerHTML+=`
  <div class="video" >
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.snippet.thumbnails.default.url}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
            </div>
           </div>`
}    
             
  
// async function fetchVideos(searchQuery, maxResults){
//       const response=await fetch(
//           BASE_URL+
//           "/search"+`?key=${API_KEY}`+
//           "&part=snippet"+`&q=${searchQuery}`+
//           `&maxResults=${maxResults}`);
//           const data=await response.json();
//         apiCallCounter++; // Increment the counter
//   console.log(`API Call #${apiCallCounter}:`, data);
// if (searchQuery!==""){
//   data.items.forEach(element => {
//     searchResults(element)
//   });
// }else{
//   data.items.forEach(item=>{
//    makeVideoCard(item)
//   });
// }              
//     }


  window.addEventListener("load", () => {
    // event.preventDefault();
    // console.log(fetchVideos("",30));
  let videoDiv=document.createElement('div');
  videoDiv.innerHTML=``
  fetchVideos("",21);
  });



  let searchBtn=document.querySelector('.search-btn');
  let searchInput=document.getElementById("search-input");
   let searchVideoContainer=document.querySelector('.search_video_container');
  searchBtn.addEventListener('click', ()=>{
    if(searchInput.value!==""){
          videoContainer.classList.add("hide");
searchVideoContainer.classList.remove("hide");
        fetchVideos(searchInput.value, 20);
        searchInput.value="";
    }
  
  })

  let home=document.querySelector(".home");

  home.addEventListener('click', ()=>{
    videoContainer.classList.remove('hide');
    searchVideoContainer.innerHTML="";
    
searchVideoContainer.classList.add("hide");

  })

  const searchResults=(data)=>{
    searchVideoContainer.innerHTML+=`
    <div class="search_video">
    <img src="${data.snippet.thumbnails.high.url}" class="search_thumbnail" alt="">
    <div class="search_content">
        <h4 class="search_title">${data.snippet.title}</h4>
        
        <div class="search_info">
            <img src="${data.snippet.thumbnails.default.url}" class="search_channel_icon" alt="">
            <p class="search_channel_name">${data.snippet.channelTitle}</p>
        </div>
    </div>
</div>`
  }