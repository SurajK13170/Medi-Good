let cont=document.getElementById("all-prod")
const apiUrl="https://6422c107001cb9fc202eeb33.mockapi.io/api/v1/products"

let user = JSON.parse(localStorage.getItem("auth"))

// let cart=document.getElementsByClassName("cart")
// cart.addEventListener('click', function(e){
//   window.location.href="cart.html"
// })
   

if(user){
  let btn = document.querySelector(".rigth")
  btn.firstElementChild.nextElementSibling.textContent = "Signout"
  btn.firstElementChild.nextElementSibling.href = "javascript:localStorage.removeItem('auth'); location.reload()"
  btn.firstElementChild.remove()
  btn.prepend(user.name)
  localStorage.setItem("userName",user.name)
}

async function fetching(){
    try{
    let res= await fetch(`${apiUrl}`)
    let data= await res.json()
    // console.log(data)
    DisplayData(data)
    }
    catch(error){
      console.log(error)
    }
    
}
fetching()

function DisplayData(data){
    cont.innerHTML=""
    data.forEach(e => {
        let div=document.createElement("div")
        let imgCard=document.createElement("div")

        let name=document.createElement("h4")
        let Description=document.createElement("p")
        let price=document.createElement("p")
        let category=document.createElement("p")
        let image=document.createElement("img")
        let btn=document.createElement("button")

        image.src=e.image;
        name.textContent=e.name;
        Description.textContent="Desc.:-"+e.Description;
        price.textContent="Price:-Rs."+e.price;
        category.textContent="Category:-"+e.category
        btn.innerText="Buy Now"



        imgCard.append(image)
        div.append(imgCard,name,category,price)
        div.innerHTML += "<center><a href='product.html'>" + btn.outerHTML + "</a></center>"
        cont.append(div)
    });
}

let signform=document.getElementById("signForm")
let logform=document.getElementById("logForm")
let logbtn=document.getElementById("loggBTN")
let subbtn=document.getElementById("subbtn")

let userApi="https://6422c107001cb9fc202eeb33.mockapi.io/api/v1/User"

// SingnUp

signform.addEventListener('submit', function(e){
      e.preventDefault()
      fetch(`${userApi}`,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(Object.fromEntries((new FormData(signform)).entries()))
      })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem("auth", user.id)
        signform.reset()
      })
})
// login-----

logform.addEventListener("submit", function(e){
  e.preventDefault()
  let form = new FormData(logform)
  console.log(form)
  
  fetch(`${userApi}?email=`+form.get("email"))
  .then(res => res.json())
  .then((res) => {
    console.log(res)
    let user = res.find(({password}) => password == form.get("password"))
    if(user){
      localStorage.setItem("auth", JSON.stringify(user))
      console.log(user.email)
      
      if(user.email=="surajkumar643151@gmail.com"){
       window.location.href="./admin.html"
      }
      else{
      location.reload()
      }
      
    }
    else{
      alert("Wrong Email or Password!")
    }
  })
})


