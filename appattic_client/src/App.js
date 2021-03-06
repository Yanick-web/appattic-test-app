import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import MyForm from './Form';
import axios from 'axios';
import {useState, useRef, useEffect} from 'react';


const defaultUrl = "https://images.unsplash.com/photo-1515966306809-37aaff37a72f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI4fHxkYXJrfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60";

const textSize = (str) =>{
  let len = str.length;
  if(len > 0 && len < 50){
    return 60;
  }else{
  return 40;
  }
}
function App() {
const [text, setText] = useState("Your quote");
const [coloredText, setColoredText] = useState("Your quote");
// const [submitted, setSubmitted] = useState(false);
const paraRef = useRef();
const imageRef = useRef();
const [color, setColor] = useState({
    hue: 120,
    brightness: 10,
    saturation: 10,
    alpha:1
});

const handleSubmit = (e)=>{
  e.preventDefault();
axios.get('/api')
.then(res => {
  setColoredText(text);
  imageRef.current.src = res.data.url;
  paraRef.current.style.color = `hsla(${Math.floor(color.hue)}, ${Math.floor(color.saturation*100)}%, ${Math.floor(color.brightness*100)}%, ${color.alpha})`;
})
.catch(err => {
  console.error(err);
});


};

useEffect(()=>{

axios.get('/api')
.then((res) =>{
  setColoredText(text);
  imageRef.current.src = res.data.url;
  paraRef.current.style.color = `hsla(${Math.floor(color.hue)}, ${Math.floor(color.saturation*100)}%, ${Math.floor(res.dabrightness*100)}%, ${color.alpha})`;
})
.catch((err) =>{
  console.error(err);
})


}, []);


  return (
    <AppProvider i18n={enTranslations}>
      <MyForm 
      text={text} 
      setText={setText}
      color={color} 
      setColor={setColor}
      handleSubmit={handleSubmit}

      />
      <div className="image-holder">
            <img alt="" src={defaultUrl} ref={imageRef}/>
            <p ref={paraRef} style={{fontSize: `${textSize(coloredText)}px`}}>{coloredText}</p>
      </div>
    
    </AppProvider>
  );
}

export default App;
