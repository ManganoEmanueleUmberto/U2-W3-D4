const URLbasic = "https://api.pexels.com/v1/search?query=";

const isLoading = (bool) => {
  const loader = document.querySelector(".spinner-border");
  if (bool) {
    loader.classList.remove("d-none");
  } else if ((bool = false)) {
    loader.classList.add("d-none");
  }
};

const fetchGeneral = (URL) => {
  fetch(URL, {
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
    .then((images) => {
      if (document.querySelector(".spinner-border")) {
        isLoading(true);
      }

      const row = document.querySelector("#img-container");
      row.innerHTML = "";
      images.photos.forEach((img) => {
        const { alt, id } = img;
        const imgURL = img.src.medium;
        const col = document.createElement("div");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");
        card.innerHTML = `
        <img src="${imgURL}" class="bd-placeholder-img card-img-top" style=" height: 200px; object-fit: cover;"  />
                <div class="card-body ">
                  <h5 class="card-title mb-5">${alt}</h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary hide">Hide</button>
                    </div>
                    <small class="text-muted">${id}</small>
                  </div>
                </div>
              </div>
            </div>
        
        `;
        card.addEventListener("click", () => {
          window.location.href = "./details.html?id=" + id;
        });
        row.appendChild(col);
        col.appendChild(card);
      });

      const hideBTN = document.querySelectorAll(".hide");
      hideBTN.forEach((btn) => {
        btn.addEventListener("click", () => {
          btn.closest(".col").remove();
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const primaryBTN = document.querySelector("#primary-images");
const LoadPrimaryImages = () => {
  URLprimaryImages = "https://api.pexels.com/v1/search?query=dog";
  fetchGeneral(URLprimaryImages);
};

const secondaryBTN = document.querySelector("#secondary-images");
const LoadSecondaryImages = () => {
  URLsecondaryImages = "https://api.pexels.com/v1/search?query=cars";
  fetchGeneral(URLsecondaryImages);
};

const form = document.querySelector("form");

const handleSubmit = (event) => {
  event.preventDefault();
  const searchBar = document.querySelector("#search-bar");
  const URLcustom = URLbasic + searchBar.value;
  fetchGeneral(URLcustom);
};

form.addEventListener("submit", handleSubmit);

window.addEventListener("DOMContentLoaded", () => {
  firstURL = "https://api.pexels.com/v1/search?query=cat";
  fetchGeneral(firstURL);
});
