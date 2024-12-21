import {useReducer, useState} from 'react'
import Input from './Input.jsx'

const initialState = {
  friends: { value:[], kind:"list" },
}

const parts = { name:{value:'', kind:'text'}, age:{value:'', kind:'number'} }

function reducer (state, action){

  switch (action.type) {
    case "addToList":
      return { ...state, [action.field]:{...state[action.field], value:[...state[action.field].value, action.value]}}

    case "removeFromList":
      return { ...state, [action.field]:{...state[action.field], value:[...state[action.field].value].filter((elem, indx) => indx!==action.value)   }} 

    case "updateEntryFromList":
    {
      const updated = [ ...state[action.field].value ]
      updated[action.index][action.part].value = action.value 
      console.log(updated)
      return {...state, [action.field]:{...state[action.field], value:updated }}
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
  
}

export default function InputList(){

  const [state, dispatch] = useReducer(reducer, initialState)
  //const [state, setState] = useState({ friends:[]  }) // {name:"carlos", age:20}, {name:"alf", age:32}

  const [ current, setCurrent ] = useState ( parts )


  function getInput(e){
    setCurrent({...current, [e.target.name]:{...current[e.target.name], value:e.target.value}})
  }

  return (<>
    <label >
      name
      <input type={current.name.kind} name="name" value={current.name.value} onChange={getInput} />
    </label>


    <label >
      age
      <input type={current.age.kind} name="age" value={current.age.value} onChange={getInput} />
    </label>

    <div onClick={()=>{dispatch( { type:"addToList", field:"friends", value: current} ) ; setCurrent(parts) }}> ok </div>

    
    {state.friends.value.map((elem, i)=>
      <div key={i}>
        <input type="text"  value={elem.name.value} onChange={(e)=>
            {
                dispatch({ type:"updateEntryFromList", field: "friends", part:"name", index:i, value:e.target.value })
            }
          } />
        <input type="number" value={elem.age.value} onChange={(e)=>
            {
              dispatch({ type:"updateEntryFromList", field: "friends", part:"age", index:i, value:e.target.value })
            }
          } />
        <div onClick={()=>{dispatch({type:"removeFromList", field:"friends", value:i})}}>X</div>
      </div>)}



    
  </>)
}

