let input = document.querySelector("textarea");
const sendBtn = document.querySelector("#send-btn");
let chatbox = document.querySelector(".chatbox");
// let outgoingLi = document.createElement("li");
// let para = document.createElement("p");
let messages;
let API_KEY = "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";

// Create New Li In Chat
const createNewLi = (message, className) =>{
    const NewLi = document.createElement('li');
    NewLi.classList.add('chat', className);    
    let liContent  = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">Smart_toy</span><p>${message}</p>`;
    NewLi.innerHTML = liContent;
    return NewLi;
}

//get information about message send by user from API
let getResponse = (incomingLi) => {
  let url = "https://api.openai.com/v1/chat/completions";
    let info = incomingLi.querySelector('p');

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: messages }],
    }),
  }

  //send POST request to API, get response
  fetch(url,request)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    info.textContent = data.choices[0].message.content;
  })
  .catch((error) =>{
    console.log(error);
  })
}



let setTextToChat = () => {
  messages = input.value.trim();

// Append user mesage to the chat box
  chatbox.appendChild(createNewLi(messages,'outgoing'));
  chatbox.scrollTo(0,chatbox.scrollHeight);

  setTimeout(() => {
    const incomingLi = createNewLi("Thinking...", 'incoming')
    chatbox.appendChild(incomingLi);
    chatbox.scrollTo(0,chatbox.scrollHeight);
    getResponse(incomingLi);
  },500);
  input.value='';
};

sendBtn.addEventListener("click", setTextToChat);

        // getResponse() trial data---
// setTimeout(() => {
        //   let incomingLi = document.createElement("li");
        //   let para = document.createElement("p");
        //   //  para.textContent = "Thinking...";

        //   //  setTimeout(() =>{
        //   para.textContent = messageData;
        //   //  },1500)
        //   // para.textContent = data.choices[0].message.content;
        //   incomingLi.classList.add("chat", "incoming");
        //   incomingLi.appendChild(para);
        //   chatbox.appendChild(incomingLi);
        //   console.log("thinking...");
        //   // getResponse();
        // }, 0);


        // API data fetch trial---- 
//   async function apiData() {
//     await fetch(url, request)
//       .then((response) => response.json()) // Convert to JSON
//       .then((data) => {
//         let messageData = data.choices[0].message.content;
//         // .catch((error) => console.log(error))
//         // para.textContent = data[0].choices[0].message[0].content;
//        return messageData;
        
//       });
//   }
//   apiData();
// };



        // setTextToChat trial data---
//   para.textContent = messages.trim();
//   outgoingLi.classList.add("chat", "outgoing");
//   outgoingLi.appendChild(para);
//   chatbox.appendChild(outgoingLi);
// outgoingLi.innerHTML = <p>message.trim()</p>;

//   setTimeout(() =>{
//       let incomingLi = document.createElement('li');
//       let para = document.createElement('p');
//       para.textContent = "Thinking...";
//       // para.textContent = data[0].choices[0].message[0].content;
//       incomingLi.appendChild(para);
//       incomingLi.classList.add("chat", "incoming");
//       chatbox.appendChild(incomingLi);
//       console.log("thinking...");
//       getResponse();
//   },500)

//   getResponse();