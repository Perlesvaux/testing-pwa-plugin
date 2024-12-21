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

function subReducer (state, action){

  switch(action.type){
    case "create":
      return { ...state, [action.field]:{...state[action.field], value:action.value} }

    case "erase":
      return { ...state, [action.field]:{...state[action.field], value:''} }

    case "reset":
    return parts

    default:
      throw new Error(`Unknown action: ${action.type}`);

  }

}

export default function InputList(){

  const [state, dispatch] = useReducer(reducer, initialState)
  const [current, execute] = useReducer(subReducer, parts)
  //const [state, setState] = useState({ friends:[]  }) // {name:"carlos", age:20}, {name:"alf", age:32}

  //const [ current, setCurrent ] = useState ( parts )
  //
  //
  //function getInput(e){
  //  setCurrent({...current, [e.target.name]:{...current[e.target.name], value:e.target.value}})
  //}
  function renderInputField(kind, property){
    switch (kind) {
      case "image":
        return <InputImage 
                  name={property} 
                  changer={(e)=>handleImageChange(e,property)} 
                  deleter={()=> dispatch({type:"delete", field:property}) }
                />

      default:
        return  <Input 
                  name={property} 
                  type={kind} 
                  value={current[property].value} 
                  changer={ (e)=>execute({type:"create", field:property, value:e.target.value}) } 
                  deleter={ ()=>execute({type:"erase", field:property}) } 
                />
    }
  }

        //(
        //  <Input key={i}
        //    name={property} 
        //    type={state[property].kind} 
        //    value={state[property].value} 
        //    changer={ getInput } 
        //    deleter={()=>setCurrent(parts)} 
        //  />
        //))
  return (<>

    {
      Object.keys(initialState).map((property, i)=>

        (<div key={i}>
          {
            Object.keys(parts).map((part, ind)=>

              (<label key={ind}> { renderInputField(current[part].kind, part) } </label>
                

                //<div> {part} {ind} {property} {i} {parts[part].kind}</div>

                //<Input key={ind}
                //  name={part} 
                //  type={current[part].kind} 
                //  value={current[part].value} 
                //  changer={ (e)=>execute({type:"create", field:part, value:e.target.value}) } 
                //  deleter={ ()=>execute({type:"erase", field:part}) } 
                ///>


              )

            )
          }

        <div onClick={()=>{dispatch({ type:"addToList", field:"friends", value: current}) ; execute({type:"reset"}) }}> ok </div>

        </div>)
      )

    }












    
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

    //<div onClick={()=>{dispatch( { type:"addToList", field:"friends", value: current} ) ; execute({type:"reset"}) }}> ok </div>
    //<label >
    //  name
    //  <input type={current.name.kind} name="name" value={current.name.value} onChange={getInput} />
    //</label>
    //
    //
    //<label >
    //  age
    //  <input type={current.age.kind} name="age" value={current.age.value} onChange={getInput} />
    //</label>
