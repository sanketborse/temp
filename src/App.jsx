import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [range, setRange] = useState(6)
  const [addNumbers, setAddNumbers] = useState(false)
  const [addSymbols, setAddSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const passReference = useRef(null)
  const [strength, setStrength] = useState("Weak"); 
  const [Regenerate, setRegenerate] = useState()


  

  const generatedPassword = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(addNumbers) str += "0123456789" 
    if(addSymbols) str += "~!@#$%^&*()?|"

    for (let w = 0; w < range; w++) {
      let word = "";
      let wordLength = Math.floor(Math.random() * 10 );
      if(wordLength<5) wordLength = 5; // Random word length

      for (let i = 0; i < wordLength; i++) {
          let index = Math.floor(Math.random() * str.length + 1);
          word += str.charAt(index);
      }

      pass += word + (w < range - 1 ? " " : ""); // Add space between words
  }
 
      setPassword(pass)
    
  },[range,addNumbers,addSymbols,setPassword])

  const copyTOClipboard = useCallback(()=>{
    passReference.current.select()
    window.navigator.clipboard.writeText(password)

  },[password])

  const checkStrength = (password,range) => {
    let score = 0;

    if (/[A-Z]/.test(password)) score++; 
    if (/[0-9]/.test(password)) score++; 
    if (/[\W]/.test(password)) score++; 
    
    if(score <= 2 && range < 8){
      setStrength("Weak")}
    else if(score <= 2 && 8 <= range && range <= 12){
      setStrength("Medium")}
    else{
        setStrength("Strong")}
    
  
  
};

  
  useEffect(() => {
    checkStrength(password,range);
  }, [password,range]);
  
  useEffect(() => {
      generatedPassword()
  }, [range,addNumbers,addSymbols,Regenerate]);



return (
    <div className='back'>
      
<div className="title">
  <h1> CipherGen </h1>
</div>




<div className="fields">
  <textarea rows="4" cols="50" 
 className="passInput" type="text" placeholder="Password" value={password} readOnly ref={passReference} />

  <div id='strength' className={`strength ${strength.toLowerCase()}`}>
  Password Strength: <strong>{strength}</strong>
</div>
</div>

<div className="features">
 <label className="rangeLabel">Range: {range}</label>
<input className="rangeInput" type="range" min={6} max={20} value={range} onChange={(e) => setRange(e.target.value)}/>

<div className="checkboxGroup">
  <div className="addNum">
      <input type="checkbox" id="addNumbers" onChange={()=>{setAddNumbers((prev)=>!prev)} } />
      <label htmlFor="addNumbers">Add Numbers</label>
  </div>

<div className="addChar">
      <input type="checkbox" id="addCharacters" onChange={()=>{setAddSymbols((prev)=>!prev)} } />
      <label htmlFor="addCharacters">Add Symbols</label>
    </div>
  </div>
</div>

<div className='buttons'>
  <button className='end-buttons' onClick={copyTOClipboard}>Copy</button>
  <button className='end-buttons' onClick={setRegenerate}>New</button>
</div>
  
    
 </div>
  )
}

export default App
