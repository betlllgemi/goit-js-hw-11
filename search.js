import{f as d}from"./assets/pixabay-api-IgTkkQsa.js";import{S as y,i as r}from"./assets/vendor-5ObWk2rO.js";function p(s){const a=document.querySelector(".gallery");a.innerHTML="";const e=s.map(({webformatURL:o,largeImageURL:n,tags:l,likes:c,views:m,comments:g,downloads:u})=>`
    <li class="gallery-item">
  <a class="gallery-link" href="${n}">
    <img class="gallery-image" src="${o}" alt="${l}" />
  </a>
  <div class="info">
    <div class="info-item"><b>Likes</b> <span>${c}</span></div>
    <div class="info-item"><b>Views</b> <span>${m}</span></div>
    <div class="info-item"><b>Comments</b> <span>${g}</span></div>
    <div class="info-item"><b>Downloads</b> <span>${u}</span></div>
  </div>
</li>
  `).join("");a.insertAdjacentHTML("beforeend",e)}const t=document.querySelector("#search-form"),f=document.querySelector(".gallery"),i=document.querySelector("#loader");let h=new y(".gallery a",{captionsData:"alt",captionDelay:250});t.addEventListener("submit",s=>{s.preventDefault();const a=s.target.elements.query.value.trim();if(a===""){r.warning({message:"Lütfen bir arama terimi girin!",position:"topRight"});return}f.innerHTML="",i.style.display="block",d(a).then(e=>{if(i.style.display="none",e.hits.length===0){r.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FFF",icon:"fa-solid fa-circle-xmark",iconColor:"#FFF",maxWidth:"432px",class:"custom-toast"});return}p(e.hits),h.refresh(),t.reset()}).catch(e=>{i.style.display="none",console.error("Bir hata oluştu:",e),r.error({message:"Ağ hatası veya sunucu hatası oluştu!",position:"topRight"})})});
//# sourceMappingURL=search.js.map
