import React,{useState} from 'react'


export default function TextForm(props) {
  const [text, setText]=useState(''); 

  const handleUpClick=()=>{
    //console.log("Uppercase was clicked"+ text);
    let newText=text.toUpperCase();
    setText(newText)
    props.showAlert("Converted to uppercase!","success");
  }
  
  const handlelowClick=()=>{
    //console.log("Uppercase was clicked"+ text);
    let newText=text.toLowerCase();
    setText(newText)
    props.showAlert("Converted to lowercase!","success");
  }

  const handleCopy=()=>{
    //console.log("Uppercase was clicked"+ text);
    var text= document.getElementById("exampleFormControlTextarea1");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Message copied!","success");
  }
   
  const handleExtraSpaces=()=>{
    let newText= text.split(/[ ]+/);
    setText(newText.join(" "))
    props.showAlert("Removed Extra spaces!","success");
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById('toggle')
    if (toogle.textContent === "Speak") {
        toogle.innerHTML = "Stop"
        props.showAlert("Started Speaking!","success")
    }
    else {
        toogle.innerHTML = "Speak"
        if (toogle.innerHTML === "Speak"){
            window.speechSynthesis.cancel()
            props.showAlert("Stoped Speaking!","success")
        }
    }
}

  const handleOnChange=(event)=>{
     // console.log("On Change");
      setText(event.target.value);
  }
  return (
    <>
    <div className="container" style={{color:props.mode===`dark`?`white`:`#042743`}}>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor:props.mode===`light`?`white`:`grey`}} id="exampleFormControlTextarea1" rows="8"></textarea>
            </div> 
            <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
            <button className="btn btn-primary mx-2" onClick={handlelowClick}>Convert to Lowercase</button>
            <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy Text</button>
            <button className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Clear Extra Spaces</button>
            <button type="submit" onClick={speak} className="btn btn-primary mx-2" id="toggle">Speak</button>
    </div>
    <div className="container my-3 " style={{color:props.mode===`dark`?`white`:`#042743`}}>
       <h1>Your text summary</h1>
       <p>{text.length>0?text.split(" ").length:0} words and {text.length} characters</p>
       <p>{0.008*text.split(" ").length} minutes read </p>
       <h2>Preview</h2>
       <p>{text.length>0?text:"Enter something in textbox to preview it here"}</p>
    </div>
    </>
  )
}
