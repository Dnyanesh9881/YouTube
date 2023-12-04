  
  
  const allTopMenu=document.getElementById("top-menu-all");

  for(let i=0;i<20;i++){
    let menu=document.createElement("div");
    menu.setAttribute('class', 'top-menu');
    menu.innerText='Item';
    allTopMenu.appendChild(menu);
  }
  
  const API_KEY="AIzaSyCb4vk6UmGDrE-EPcK31Rczlh5uGYEGMh4";
  
  const BASE_URL="https://www.googleapis.com/youtube/v3";

  const CONTENT_DETAILS = "contentDetails"; // length of video
  const STATS = "statistics"; // like count, comment count
  const videoContainer=document.getElementById("rigth-container")

  window.addEventListener("load", (event) => {
    // event.preventDefault();
    console.log(fetchVideos("", 20));
  let videoDiv=document.createElement('div');
  videoDiv.innerHTML=``

  });

  // search API
  async function fetchVideos(searchQuery, maxResults){
    const response=await fetch(
        BASE_URL+
        "/search"+`?key=${API_KEY}`+
        "&part=snippet"+`&q=${searchQuery}`+
        `&maxResults=${maxResults}`);
        const data=await response.json();
        return data.Items;

  }
  