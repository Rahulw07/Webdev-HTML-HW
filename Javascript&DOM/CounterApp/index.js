const countValue = document.getElementById('counter');
function increment(){
    //get the value from UI
    let value = parseInt(countValue.innerText);
    //update
    value +=1;
    //set the value on UI
    countValue.innerText = value;

    
}
function decreament(){
    //get the value from UI
    let value = parseInt(countValue.innerText);
    //update
    value -=1;
    //set the value on UI
    countValue.innerText = value;

    
}
