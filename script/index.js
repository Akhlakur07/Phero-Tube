function loadCatagories() {
  // fetch
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // then promise(res)>> convert to json
    .then((res) => res.json())
    // then promise(data)>> displayCatagories
    .then((data) => displayCatagories(data.categories));
}

function displayCatagories(categories) {
  // get the container
  const categoryContainer = document.getElementById("catagory-container");
  // Loop through the Array of objects
  for (let i of categories) {
    // Create Element
    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `
        <button id="btn-${i.category_id}" onclick="catagoryVideos(${i.category_id})" class="btn text-lg text-gray-600 hover:bg-red-600 hover:text-white">${i.category}</button>`;
    // Append the Element
    categoryContainer.appendChild(categoryDiv);
  }
}

let actCheck = document.getElementById("btn-all");

function loadVideos() {
  // get the video id from the url
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => {
      const act = document.getElementById("btn-all");
      actCheck.classList.remove("active");
      act.classList.add("active");
      actCheck = act;
      displayVideos(data.videos);
    });
}

function catagoryVideos(id) {
  url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const act = document.getElementById(`btn-${id}`);
      actCheck.classList.remove("active");
      act.classList.add("active");
      actCheck = act;
      displayVideos(data.category)
    });
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    console.log("No videos found");
    videoContainer.innerHTML = `
    <div class="grid place-items-center col-span-4 gap-5 py-16">
      <img src="./assets/icon.png" alt="">
      <p class="text-4xl font-bold">Oops!! Sorry, There is no content here</p>
    </div>
    `;
    return;
  }
  for (let video of videos) {
    let verified = "";
    if (video.authors[0].verified) {
      verified = document.createElement("div");
      verified.innerHTML = `<img class="size-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="verified" />`;
    } else {
      verified = document.createElement("div");
      verified.innerHTML = ``;
    }

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
      <figure>
        <img
          class="w-full h-60 object-cover"
          src="${video.thumbnail}"
          alt="thumnail"
        />
      </figure>
      <div class="card-body">
        <div class="flex gap-3">
        <div class="avatar">
  <div class="size-10 rounded-full">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
        <div class="grid gap-1">
          <h2 class="card-title font-bold text-xl">${video.title}</h2> 
        <p class="flex gap-1">${video.authors[0].profile_name} ${verified.innerHTML}</p> 
        <p>${video.others.views} views</p>
        </div>
        </div>
      </div>
    </div>`;
    videoContainer.appendChild(videoCard);
  }
};

loadCatagories();
