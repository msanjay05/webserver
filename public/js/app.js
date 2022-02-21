console.log("client side java script");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
msg1=document.getElementById('msg1')
msg2=document.getElementById('msg2')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msg1.style.color=''
  msg1.innerHTML='loading....'
  fetch("http://localhost:3000/weather?address="+search.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
        //   return console.log(data.error);
            msg1.innerHTML=data.error;
            msg1.style.color='red'
            msg2.innerHTML='';
            return
        }
        msg1.innerHTML=data.forecast;
        msg2.innerHTML=data.location;
      });
    }
  );
});
