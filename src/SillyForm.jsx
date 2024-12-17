import {useReducer, useRef} from 'react'

const initialState0 = {
  name: "",
  age: "",
  height:"",
  sex:""
}

const initialState1 = {
  name:   {value:"",kind:"text"},
  age:    {value:"",kind:"number"},
  height: {value:"",kind:"text"},
  sex:    {value:"",kind:"text"}
}

const initialState2 = {
  name:   {value:"",kind:"text"},
  age:    {value:"",kind:"number"},
  height: {value:"",kind:"text"},
  sex:    {value:"",kind:"text"},
  DOB:    {value:"",kind:"date"},
  pfp:    {value:"",kind:"file"}
}




function reducer(state, action) {
  switch (action.type){
    case "updateField":
      return {...state, [action.field]:action.value};

    case "updating":
      return {...state, [action.field]:{...state[action.field], value:action.value} }

    case "delete":
      return {...state, [action.field]:{...state[action.field], value:""}}

    case "initialState":
      return initialState;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function Sillyform(){

  const pfpRef = useRef(null)

  const initialState = {
    name:   { kind:"text"   ,value:"" },
    age:    { kind:"number" ,value:"" },
    height: { kind:"text"   ,value:"" },
    sex:    { kind:"text"   ,value:"" },
    DOB:    { kind:"date"   ,value:"" },
    pfp:    { kind:"file"   ,value:"", reference:pfpRef }
  }
  const [state, dispatch] = useReducer(reducer, initialState)


  //function handleImageChange(event){
  //  const file = event.target.files[0];
  //  if (file){
  //    const imgUrl = URL.createObjectURL(file)
  //    setState(imgUrl)
  //  }
  //} 

  function handleImageChange(event, p){
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader();
      //const reader = new FileReader();


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
  }


  return (<form onSubmit={handleSubmit}>
    {
      Object.keys(initialState).map((property, i)=>(
        <div key={i}>
        <label >
          { property }
          {
            state[property].kind === "file"
            ?  <input type={state[property].kind} accept="image/*" ref={pfpRef} onChange={(e)=>handleImageChange(e,property)}/>
            :  <input type={state[property].kind} value={state[property].value} onChange={(e)=> dispatch({type:"updating", field:property, value:e.target.value})} />
          }
        </label>
        <div onClick={()=>{ dispatch({type:"delete", field:property}); if ( 'reference' in state[property] ) state[property].reference.current.value='' }}>X</div>
          </div>
        )
      )
    }


  <button> Ok! </button>

    {state.pfp.value && <img src={state.pfp.value} />}

  </form>)



}



  //<label>
  //  Name:
  //  <input
  //    type="text"
  //    value={state.name}
  //    onChange={(e)=> dispatch({type:"updateField", field:"name", value:e.target.value})}
  //  />
  //</label>
  //
  //<label>
  //  Age:
  //  <input
  //    type="number"
  //    value={state.age}
  //    onChange={(e)=> dispatch({type:"updateField", field:"age", value:e.target.value})}
  //  />
  //</label>
  //
  //<label>
  //  Height:
  //  <input
  //    type="text"
  //    value={state.height}
  //    onChange={(e)=> dispatch({type:"updateField", field:"height", value:e.target.value})}
  //  />
  //</label>
  //
  //<label>
  //  Sex:
  //  <input 
  //    type="text"
  //    value={state.sex}
  //    onChange={(e)=> dispatch({type:"updateField", field:"sex", value:e.target.value})}
  //  />
  //</label>
