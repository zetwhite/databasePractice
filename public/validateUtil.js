
function checkCustomerForm(){
    let c1 = document.getElementById("c1").value; 
    let c2 = document.getElementById("c2").value; 
    let c3 = document.getElementById("c3").value; 
    let c4 = document.getElementById("c4").value;
    console.log(c4); 
    console.log(c1, c2, c3, c4); 
    if(!(c1 || c2 || c3 || c4)){
        //alert("you have to fill at least one field!"); 
        return true; 
    }
    return true; 
}

function checkProductForm(){
    let p1 = document.getElementById("p1").value; 
    let p2 = document.getElementById("p2").value; 
    let p3 = document.getElementById("p3").value; 

    console.log(p1, p2, p3); 
    if(!(p1 || p2 || p3)){
        //alert("you have to fill at least one field!"); 
        return true; 
    }
    return true; 
}

function checkTransForm(){
    let t1 = document.getElementById("t1").value; 
    let t2 = document.getElementById("t2").value; 
    let t3 = document.getElementById("t3").value; 
    let t4 = document.getElementById("t4").value; 
    let t5 = document.getElementById("t5").value; 

    console.log(p1, p2, p3); 
    if(!(t1 || t2 || t3 || t4 || t5)){
        //alert("you have to fill at least one field!"); 
        return true; 
    }
    return true; 
}