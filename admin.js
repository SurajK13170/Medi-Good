console.log("Hello world");
localStorage.setItem("adminName","Sunil Thakur")
let AdminName=localStorage.getItem("adminName")||"Admin";
let greetadmin=document.getElementById("header");
greetadmin.innerText="Hello "+AdminName;
let check=true;
let updataId=null;
let bntSection=document.getElementById("buttonDiv");

let formheader=document.getElementById("AddandEdit");
formheader.innerText="Add More Product"
let mainSection=document.querySelector("tbody");
let globalData=[];
let pNum=1;
let Category="";
async function fetchdata() {
    try {
        let data = await fetch(`https://6422c107001cb9fc202eeb33.mockapi.io/api/v1/products/?category=${Category}`)
        data = await data.json();
        
        let totalBtn=Math.ceil(data.length/10);
        bntSection.innerHTML=null;
       if(totalBtn>1){ for(let i=1;i<=totalBtn;i++){
            bntSection.append(createBtn(i))
        }
    }
        globalData=[];
        for(let i=(pNum-1)*10;i<10*pNum;i++){
            globalData.push(data[i]);
        }
        dataAppending(globalData);
    }
    catch (arr) {
        console.log("error");
    }
}
fetchdata();

function dataAppending(data) {
    mainSection.innerHTML = null;
    data.forEach((e,i) => {
        mainSection.append(createRow(e,i));
    })
}

function createRow(data, i) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let tdA = document.createElement("td"); 
    let btnE = document.createElement("button");
    let btnD = document.createElement("button");
     
    let img = document.createElement("img");
    img.src = data.image;
    img.alt = "Image";
    img.style.maxHeight = "80px";
    td2.append(img);
    tdA.append(btnE,btnD)
    btnE.style.color = "green"
    btnD.style.color = "red"

    td1.innerText = i+1;
    td3.innerText = data.name;
    td4.innerText = data.category;
    td5.innerText = data.quantity;
    td6.innerText = data.price;
    btnE.innerText = "Edit";
    btnD.innerText = "Delete";



    btnE.addEventListener("click",()=>{
        formheader.style.color="white"
        formheader.style.background="red"
        formheader.innerText="Update The Data"
        document.getElementById("name").style.display="none";
        document.getElementById("Priority").style.display="none";
        document.getElementById("imageUrl").style.display="none";
        document.getElementById("description").style.display="none";
        updataId=data.id;
        console.log(updataId)
        check=false;
       
    })
    btnD.addEventListener("click",()=>{
        deleteData(data.id)
        alert("Item Deleted Succesfully");
    })
    
    tr.append(td1, td2, td3, td4,td5,td6, tdA);
    return tr;

}

async function deleteData(id){
      try{
          await fetch(`https://6422c107001cb9fc202eeb33.mockapi.io/api/v1/products/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            }
          })
          console.log("Deleted")
          fetchdata()
      }
      catch(err){
      console.log(err)
      }
}

// function for sort the data by quantity
let sortByqua=document.getElementById("sortByqua");

sortByqua.addEventListener("change",()=>{
    let newData=globalData;
    if(sortByqua.value=="ltoh")newData.sort((a,b)=>a.price-b.price);
    else newData.sort((a,b)=>b.price-a.price);

dataAppending(newData)
})

//function for filter by Category
let categoryInp=document.getElementById("Category");

categoryInp.addEventListener("change",()=>{
    pNum=1;
    Category=categoryInp.value;
    fetchdata();
})

function createBtn(i){
    let btn=document.createElement("button");
    btn.innerText=i;
   
    btn.addEventListener("click",()=>{
        pNum=i;
        fetchdata()
    })
    return btn;
}
let formdata=document.getElementById("formdata");
formdata.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(ckeck)addData();
    else updataData(updataId);
    console.log("Hello")
});

async function addData(){
    try{
        let obj={
            name:document.getElementById("name").value,
            category:document.getElementById("Priority").value,
            image:document.getElementById("imageUrl").value,
            price:document.getElementById("IPrice").value,
            quantity:document.getElementById("Quantity").value,
            Description:document.getElementById("description").value,
        }
        console.log(obj)
        await fetch(`https://6422c107001cb9fc202eeb33.mockapi.io/api/v1/products`,{
          method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body:JSON.stringify(obj)
        })
        console.log("Data Added")
        fetchdata()
    }
    catch(err){
    console.log(err)
    }
}
async function updataData(id){
    try{
        let obj={
            price:document.getElementById("IPrice").value,
            quantity:document.getElementById("Quantity").value,
        }
        console.log(obj)
        await fetch(`https://6422c107001cb9fc202eeb33.mockapi.io/api/v1/products/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)

        })
        console.log("Data Added")
        fetchdata()
    }
    catch(err){
    console.log(err)
    }
}
