const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 5000;
const imageArray = [
"https://images.unsplash.com/photo-1431440869543-efaf3388c585?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGFya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1516410529446-2c777cb7366d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGFya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1505635552518-3448ff116af3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1506794778225-cbf6c8df4c5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1483356256511-b48749959172?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1479267658415-ff274a213280?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1478826160983-e6db8c7d537a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1533643593349-9106c11eb986?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1508197149814-0cc02e8b7f74?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1530090382228-7195e08d7a75?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1544411047-c491e34a24e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTB8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1477936432016-8172ed08637e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODd8fGRhcmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1490596541415-5afadbfbbf02?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAyfHxkYXJrfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1499551660540-eaf0697882f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHxkYXJrfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
];


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('tiny'));


if(process.env.NODE_ENV === "production"){
	app.use(express.static('appattic_client/build'));

	// app.get('*', (req, res)=>{
	// 	res.sendFile(path.resolve(__dirname, 'appattic_client','build', 'index.html'));
	// });
}



app.get('/api', (req, res) => {
	let index = Math.floor(Math.random()*imageArray.length);
	let url = imageArray[index];
    res.json({url});
});

app.listen(port , (err) => {
    if(err) console.error(err);
    console.log(`Server running on ${port}`);
})
