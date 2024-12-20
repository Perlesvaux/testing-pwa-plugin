import {useReducer, useState} from 'react'

const initialState = {
  friends: { value:[], kind:"list" },
}

function reducer (state, action){

  switch (action.type) {
    case "addToList":
      return { ...state, [action.field]:{...state[action.field], value:[...state[action.field].value, action.value]}}

    case "removeFromList":
      return { ...state, [action.field]:{...state[action.field], value:[...state[action.field].value].filter((elem, indx) => indx!==action.value)   }} 

    case "updateEntryFromList":
    {
        const updated = [ ...state[action.field].value ]
        updated[action.index][action.part] = action.value 
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

  const [ current, setCurrent ] = useState ( {
    name:'', age:''
  } )


  function getInput(e){
    setCurrent({...current, [e.target.name]:e.target.value})
  }

  return (<>
    <label >
      name
      <input type="text" name="name" value={current.name} onChange={getInput} />
    </label>


    <label >
      age
      <input type="number" name="age" value={current.age} onChange={getInput} />
    </label>

    <div onClick={()=>{dispatch( { type:"addToList", field:"friends", value: current} ) ; setCurrent({ name:'', age:'' }) }}> ok </div>

    
    {state.friends.value.map((elem, i)=>
      <div key={i}>
        <input type="text"  value={elem.name} onChange={(e)=>
        {
            dispatch({ type:"updateEntryFromList", field: "friends", part:"name", index:i, value:e.target.value })
            //const updated = [...state.friends]
            //updated[i].name = e.target.value
            //console.log(updated)
            //setState({friends:updated})
        }
          } />
        <input type="number" value={elem.age} onChange={(e)=>
        {
            dispatch({ type:"updateEntryFromList", field: "friends", part:"age", index:i, value:e.target.value })
            //const updated = [...state.friends]
            //updated[i].age = e.target.value
            //console.log(updated)
            //setState({friends:updated})
        }
          } />
        <div onClick={()=>{dispatch({type:"removeFromList", field:"friends", value:i})}}>X</div>
      </div>)}



    
  </>)
}

