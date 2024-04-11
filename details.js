const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URLimage = "https://api.pexels.com/v1/photos/" + id;

const isLoading = (bool) => {
  const loader = document.querySelector(".spinner-border");
  if (bool) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

fetch(URLimage, {
  headers: {
    Authorization: "PtBngZXlQHc8OFQeDYe2iVPr3FbiXSZ9KhfGntcukDS0RGTheGajt82u",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Fetch error");
    }
  })
  .then((image) => {
    isLoading(true);
    const row = document.querySelector("#image-container");
    row.innerHTML = "";
    const { photographer, photographer_url } = image;
    const imgURL = image.src.large;
    const img = document.createElement("div");
    img.classList.add("d-flex", "flex-column", "align-items-center", "mt-5");
    img.innerHTML = `
      <img src="${imgURL}"/>
      <p class="mt-3"><strong>Photographer:</strong> ${photographer}   </p>
      <p><strong>Photographer personal page:</strong><a href="${photographer_url}"> ${photographer_url}</a>   </p>
        
      
      `;
    row.appendChild(img);
  })
  .catch((err) => {
    console.log(err);
  });
