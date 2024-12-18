import {useReducer} from 'react'
import InputImage from './InputImage.jsx'
import Input from './Input.jsx'
import InputJSON from './InputJSON.jsx'


const initialState = {
  name:   {value:"",kind:"text"},
  age:    {value:"",kind:"number"},
  height: {value:"",kind:"text"},
  sex:    {value:"",kind:"text"},
  DOB:    {value:"",kind:"date"},
  pfp:    {value:"",kind:"image"}
}


function reducer(state, action) {
  switch (action.type){
    case "updateField":
      return {...state, [action.field]:action.value};

    case "updating":
      return {...state, [action.field]:{...state[action.field], value:action.value} }

    case "delete":
      return {...state, [action.field]:{...state[action.field], value:""}}

    case "clone":
      return action.dump

    case "initialState":
      return initialState;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function Sillyform(){

  const [state, dispatch] = useReducer(reducer, initialState)

  function handleImageChange(event, p){
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = ()=> dispatch({type:"updating", field:p, value:reader.result}) 
      console.log(':v', p, file, file.name)
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log('Form submitted!',   
    Object.fromEntries(Object.entries(state).map(([key, {value}]) => [key, value] ))
    //Object.entries(state).map(([key, {value}])=> [key, value])
    //Object.entries(state).map(([key, {value}])=>[key, value])
    )
    downloadJSON()
  }


  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `CV - ${state.name.value}.json`;
    link.click();
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if ('name' in json ) {
            dispatch({ type:"clone", dump:json });
          } else {
            alert('Invalid JSON format!');
          }
        } catch (error) {
          alert('Error reading JSON file!', error);
        }
      };
      reader.readAsText(file);
    }
  }



  return (<form onSubmit={handleSubmit}>
    <InputJSON name={"Load from file"} changer={handleFileUpload}  />
    {
      Object.keys(initialState).map((property, i)=>(
        <div key={i}>
          {
            state[property].kind === "image"
            ? <InputImage 
                name={property} 
                changer={(e)=>handleImageChange(e,property)} 
                deleter={()=> dispatch({type:"delete", field:property}) }
              />
            : <Input 
                name={property} 
                type={state[property].kind} 
                value={state[property].value} 
                changer={(e)=> dispatch({type:"updating", field:property, value:e.target.value})} 
                deleter={()=>dispatch({type:"delete", field:property})} 
              />
          }
          </div>
        )
      )
    }

  <button> Ok! </button>

    {state.pfp.value && <img src={state.pfp.value} />}

  </form>)
}
