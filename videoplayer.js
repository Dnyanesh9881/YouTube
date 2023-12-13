function onPlayerReady(event) {
    event.target.playVideo();
  }
  
  const videoId = localStorage.getItem('video_id');
const channelId=localStorage.getItem('channel_id');
const title=localStorage.getItem('title');

const videoTitle=document.querySelector('.title');

videoTitle.innerText=title;
  // Check if the value is not null or undefined before using it
  if (videoId) {
    //  console.log(videoId);
    //  console.log(channelId);
  } else {
      console.error('Video ID is missing in local storage.');
  }
  const API_KEY="AIzaSyCb4vk6UmGDrE-EPcK31Rczlh5uGYEGMh4";
  // const API_KEY = "AIzaSyADArfs20ud1ndYyu8amgO4JTpiRWPg1qk";
  const BASE_URL = "https://www.googleapis.com/youtube/v3";
  window.addEventListener("load", () => {
    // now here i need to render my video logic
    if (YT) {
      new YT.Player("video_player", {
        height: "500",
        width: "1000",
        videoId,
        events: {
          onReady: onPlayerReady,
        },
      });
    }
getComments(videoId);
fetchVideoStats(videoId);
 fetchChannelLogo(channelId,fetchChannelSubsscribers(channelId));


  });

async function fetchChannelLogo(channelId, subscribe_data) {
  try {
    const response = await fetch(
      BASE_URL +
        "/channels" +
        `?key=${API_KEY}` +
        "&part=snippet" +
        `&id=${channelId}`
    );
    const data = await response.json();
    // console.log(data);
    let s_data=await subscribe_data;
    data.items.forEach(ele=>{
channelInfoAdd(ele,s_data);
    })
  } catch (err) {
    console.log(err);
  }
}
async function fetchChannelSubsscribers(channelId) {
  try {
    const response = await fetch(
      BASE_URL +
        "/channels" +
        "?part=statistics" +
        `&id=${channelId}`+
        "&fields=items/statistics/subscriberCount"+
        `&key=${API_KEY}`
    );
    const data = await response.json();
    
    return data.items[0];
  } catch (err) {
    console.log(err);
  }
}


async function fetchVideoStats(videoId) {
    const response = await fetch(
      BASE_URL +
        "/videos" +
        `?key=${API_KEY}` +
        `&part=statistics` +
        `&id=${videoId}`
    );
    const data = await response.json();
    // console.log(data);
    data.items.forEach(ele=>{
      videoStatistics(ele);
    })
   
   
    // console.log(data);
  }
  
  async function getComments(videoId) {
    const response = await fetch(
      BASE_URL +
        "/commentThreads" +
        `?key=${API_KEY}` +
        `&videoId=${videoId}` +
        `&maxResults=25&part=snippet`
    );
    const data = await response.json();
    // console.log(data);
    data.items.forEach(ele=>{ 
      addComment(ele);
    });
   
  }
  const commentContainer=document.querySelector('.comment_container');
  const addComment=(commentData)=>{
commentContainer.innerHTML+=`
<div class="comment">
<img src="${commentData.snippet.topLevelComment.snippet.authorProfileImageUrl}" alt="" class="person_pic">
<div class="comment_info">
    <p class="person_name">${commentData.snippet.topLevelComment.snippet.authorDisplayName} <span> ${commentData.snippet.topLevelComment.snippet.publishedAt} </span></p>
    <p class="persons_comment">${commentData.snippet.topLevelComment.snippet.textOriginal}</p>
    <div class="comment_buttons">
        <button class="comment_like"><span class="material-symbols-outlined">
            thumb_up
            </span> ${commentData.snippet.topLevelComment.snippet.likeCount}</button>
        <button class="comment_dislike"><span class="material-symbols-outlined">
            thumb_down
            </span></button>
        <button class="comment_reply">REPLY ${commentData.snippet.totalReplyCount}</button>
    </div>
</div>
</div>
`
  }
  
  const statData=document.querySelector(".data_stat");
  const videoStatistics=(data)=>{
statData.innerHTML=`
<div class="views_date">
    <p class="views">${data.statistics.viewCount} views</p>
</div>
<div class="all-btn">
    <div class="like_dislike">
        <button class="like"><span class="material-symbols-outlined">
            thumb_up
            </span> ${data.statistics.likeCount}</button>
        <button class="dislike"><span class="material-symbols-outlined">
            thumb_down
            </span></button>
    </div>
    <button class="share"><span class="material-symbols-outlined">
        share
        </span> share</button>
    <button class="save"> save</button>
    <button class="other">...</button>
</div>`
  }

let channel=document.querySelector(".channel-info");
  const channelInfoAdd=(data, subscribe_data)=>{
channel.innerHTML=`
<img src="${data.snippet.thumbnails.high.url}" class="channel-icon" alt="" />
          <div class="channel-all">
            <div class="channel-name-btn">
                <div class="channel-name-follower">
                    <p class="channel-name">${data.snippet.title}</p>
                    <p class="followers">${subscribe_data.statistics.subscriberCount}</p>
                  </div>
                  <button class="subscribe-btn">SUBSCRIBES</button>
            </div>
            <p class="description">${data.snippet.description}</p>
          </div>`
  }

  localStorage.clear();