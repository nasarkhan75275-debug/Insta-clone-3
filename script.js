function showSignup(){document.getElementById('loginPage').classList.add('hidden');document.getElementById('signupPage').classList.remove('hidden')}
function showLogin(){document.getElementById('signupPage').classList.add('hidden');document.getElementById('loginPage').classList.remove('hidden')}

function signup(){
  let u=document.getElementById('signUser').value.trim();
  let p=document.getElementById('signPass').value.trim();
  if(!u||!p){document.getElementById('signError').innerText="Username & password required";return}
  localStorage.setItem('alnasar_user_'+u,p);
  localStorage.setItem('alnasar_current',u);
  startApp(u);
}
function login(){
  let u=document.getElementById('loginUser').value.trim();
  let p=document.getElementById('loginPass').value.trim();
  let saved=localStorage.getItem('alnasar_user_'+u);
  if(saved && saved===p){localStorage.setItem('alnasar_current',u);startApp(u);}
  else{document.getElementById('loginError').innerText="Wrong username or password (first signup)";}
}
function startApp(user){
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('signupPage').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('profileName').innerText=user;
  loadPosts();
}
function logout(){localStorage.removeItem('alnasar_current');location.reload();}
function openTab(tab){
  document.getElementById('homeSection').classList.add('hidden');
  document.getElementById('searchSection').classList.add('hidden');
  document.getElementById('reelsSection').classList.add('hidden');
  document.getElementById('profileSection').classList.add('hidden');
  document.querySelectorAll('.bottom-nav i').forEach(i=>i.classList.remove('active'));
  if(tab==='home'){document.getElementById('homeSection').classList.remove('hidden');document.getElementById('nav-home').classList.add('active');}
  if(tab==='search'){document.getElementById('searchSection').classList.remove('hidden');document.getElementById('nav-search').classList.add('active');}
  if(tab==='reels'){document.getElementById('reelsSection').classList.remove('hidden');document.getElementById('nav-reels').classList.add('active');}
  if(tab==='profile'){document.getElementById('profileSection').classList.remove('hidden');document.getElementById('nav-profile').classList.add('active');}
}
function createPost(){
  let url=prompt("Image ka link dalo (picsum.photos try karo) ya khali chhodo toh demo image lagega:");
  if(url===null)return;
  if(!url)url="https://picsum.photos/600/600?random="+Math.floor(Math.random()*100);
  let posts=JSON.parse(localStorage.getItem('alnasar_posts')||"[]");
  let user=localStorage.getItem('alnasar_current');
  posts.unshift({user:user,img:url,likes:0});
  localStorage.setItem('alnasar_posts',JSON.stringify(posts));
  loadPosts(); openTab('home');
}
function loadPosts(){
  let feed=document.getElementById('feed');
  let posts=JSON.parse(localStorage.getItem('alnasar_posts')||"[]");
  if(posts.length===0){feed.innerHTML='<div class="empty"><i class="fa-regular fa-images"></i><p>Welcome to AL NASAR<br>No posts yet. Tap + to create</p></div>';return;}
  feed.innerHTML="";
  posts.forEach((p,i)=>{
    feed.innerHTML+=`<div class="post"><div class="post-head"><img src="https://i.pravatar.cc/100?img=${i+2}"><b>${p.user}</b><i class="fa-solid fa-ellipsis"></i></div><img class="post-img" src="${p.img}"><div class="icons"><i class="fa-regular fa-heart" onclick="this.classList.toggle('fa-solid');this.classList.toggle('fa-regular');this.classList.toggle('liked')"></i><i class="fa-regular fa-comment"></i><i class="fa-regular fa-paper-plane"></i><i class="fa-regular fa-bookmark save"></i></div><div class="likes">${p.likes} likes</div><div class="caption"><b>${p.user}</b> My post on AL NASAR App</div></div>`;
  });
}
// Auto login if already logged
let cur=localStorage.getItem('alnasar_current');
if(cur){startApp(cur);}
