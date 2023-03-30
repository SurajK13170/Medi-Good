let cont=document.getElementById("all-prod")
const apiUrl="https://6422c107001cb9fc202eeb33.mockapi.io/api/v1/products"

async function fetching(){
    try{
    let res= await fetch(`${apiUrl}`)
    let data= await res.json()
    console.log(data)
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
        // let imgCard=document.createElement("div")

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

        btn.addEventListener("click",()=>{
            location("Login.html")

        })


        div.append(image,name,category,price,btn)
        // imgCard.append(image)
        cont.append(div)
    });
}
DisplayData()