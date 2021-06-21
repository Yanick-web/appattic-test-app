import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import MyForm from './Form';
import Axios from 'axios';
import {useState, useRef} from 'react';


const defaultUrl = "https://images.unsplash.com/photo-1621715363767-45e51c41c6f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1944&q=80";

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
Axios.post("http://localhost:5000/api/post", {text, color})
.then(res => {
  setColoredText(res.data.data.text);
  imageRef.current.src = res.data.url;
  paraRef.current.style.color = `hsla(${Math.floor(res.data.data.color.hue)}, ${Math.floor(res.data.data.color.saturation*100)}%, ${Math.floor(res.data.data.color.brightness*100)}%, ${res.data.data.color.alpha})`;
})
.catch(err => {
  console.error(err);
});
};



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