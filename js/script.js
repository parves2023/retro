async function fetchPosts() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const parentDiv = document.querySelector(".col-span-4"); // Assuming this is the container

    data.posts.forEach((post) => {
      const cardDiv = document.createElement("div");

      cardDiv.innerHTML = `
          <!-- card -->
        <div class="border border-sky-400 rounded-3xl p-6 grid grid-cols-12 gap-4">
          <div class="col-span-3 grid">
            <div class='mx-auto'>
            <div class="avatar online">
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
              <div class="flex items-center justify-between">
                <div class="space-x-5">
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
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchPosts();
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
