const parentDiv = document.querySelector("#parentDiv");
const loadingSpinner = document.getElementById('loadingSpinner');
let allPosts = [];
async function fetchPosts() {
  loadingSpinner.style.display = 'block';
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    allPosts = data.posts;
     displayPosts(allPosts);

    
  } catch (error) {
    parentDiv.innerHTML = `("There was a problem with the fetch operation:", ${error})`;
  }
}

fetchPosts();


function displayPosts(allPosts){
  parentDiv.innerHTML = '';
  allPosts.forEach((post) => {
    const cardDiv = document.createElement("div");

    cardDiv.innerHTML = `
        <!-- card -->
      <div class="border border-sky-400 rounded-3xl p-6 grid grid-cols-12 gap-4">
        <div class="col-span-3 grid">
          <div class='mx-auto'>
          <div class="${post.isActive ? 'avatar online' : 'avatar offline'}">
            <div class="w-24 rounded-full">
              <img src="${post.image}" alt="${post.title}" />
            </div>
          </div>

          </div>
        </div>
        <div class="col-span-9 space-y-4">
          <p class='font-bold text-gray-500'># ${post.category} <span class='font-bold ml-7 text-black'>Author: ${post.author.name}</span></p>
          <h3 class='font-bold text-3xl'>${post.title}</h3>
          <p>${post.description}</p>
          <div>
            <div class="flex items-center justify-between border-t-2 pt-2 border-dashed">
              <div class="space-x-5 ">
                <i class="fa-regular fa-comment"></i>
                <span>${post.comment_count}</span>
                <i class="fa-regular fa-eye"></i>
                <span>${post.view_count}</span>
                <i class="fa-regular fa-clock"></i>
                <span>${post.posted_time} hours ago</span>
              </div>
              <div onclick='getId("${post.title}", ${post.view_count})' class="bg-blue-300 rounded-full size-10 flex items-center justify-center hover:bg-red-300 cursor-pointer">
                <i class="fa-regular fa-envelope"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    parentDiv.appendChild(cardDiv);
  });
}


function searchByCategory() {
  const category = document.getElementById('categorySearch').value.toLowerCase();
  const filteredPosts = allPosts.filter(post => post.category.toLowerCase() === category);
  
  if (filteredPosts.length > 0) {
    displayPosts(filteredPosts);
  } else {
    parentDiv.innerHTML = `<p>No posts found for this ${category} category.</p>`;
  }
}





async function retrievePosts() {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    
    const latestPosts = data;

    renderPostCards(latestPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function renderPostCards(latestPosts) {
  const contentWrapper = document.getElementById('contentWrapper');
  contentWrapper.innerHTML = ''; // Clear any existing content

  latestPosts.forEach(item => {
    const cardTemplate = `
      <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${item.cover_image}" alt="${item.title}" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${item.title}</h2>
          <p>${item.description}</p>
          <div class="flex items-center space-x-4">
            <img src="${item.profile_image}" alt="${item.author.name}" class="w-12 h-12 rounded-full">
            <div class="text-left">
              <h4>name : ${item.author.name ? `${item.author.name}` : "unknown"}</h4>
              ${item.author.designation ? `<p>designation :  ${item.author.designation}</p>` : "designation : unknown"}
              ${item.author.posted_date ? `<p>Posted on: ${item.author.posted_date}</p>` : "Posted on: unknown"}
            </div>
          </div>
          <div class="card-actions mt-4">
            <button class="btn btn-primary">Read More</button>
          </div>
        </div>
      </div>
    `;
    contentWrapper.innerHTML += cardTemplate; // Append each post card to the container
  });
}

retrievePosts();










let count = 0;

function getId(title, view) {
  const parentDiv = document.getElementById('titleparent');
  const cardDiv = document.createElement('div');

  count++;

  const theCount = document.getElementById('theCount');
  theCount.innerHTML = count;

  cardDiv.innerHTML = `
  <div class="p-6 bg-white rounded-3xl w-11/12 mx-auto flex gap-5">
          <h1>${title}</h1>
          <div class="flex gap-3 items-center">
            <i class="fa-regular fa-eye"></i>
            <span>${view}</span>
          </div>
        </div>
  `
  parentDiv.appendChild(cardDiv);
}
