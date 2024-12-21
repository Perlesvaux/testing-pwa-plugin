import {useReducer} from 'react'
import Input from './Input.jsx'
import InputImage from './InputImage.jsx'

const initialState = {
  friends: { value:[], kind:"list" },
}

const parts = { name:{value:'', kind:'text'}, age:{value:'', kind:'number'}, photo:{value:'', kind:'image'} }

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

  function handleImageChange(event, p){
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = ()=> execute({type:"create", field:p, value:reader.result}) 
      console.log(':v', p, file, file.name)
    }
  }

  
  function imageChanger(event, property, part, i){
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = ()=> dispatch({ type:"updateEntryFromList", field: property, part:part, index:i, value:reader.result }) 
                                       
      console.log(':v', property, file.name, part, i )
    }
  }

  function renderInputField(kind, property){
    switch (kind) {
      case "image":
        return <InputImage 
                  name={property} 
                  changer={(e)=>handleImageChange(e,property)} 
                  deleter={()=> execute({type:"erase", field:property}) }
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

  function renderResults(kind, property){
    switch (kind) {
      case "image":
        return <InputImage 
                  name={property} 
                  changer={(e)=>handleImageChange(e,property)} 
                  deleter={()=> execute({type:"erase", field:property}) }
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

  return (<>
    {
      Object.keys(initialState).map((property, i)=>

        (<div key={i}>

          {
            Object.keys(parts).map((part, ind)=>
              (<label key={ind}> { renderInputField(current[part].kind, part) } </label>)
            )
          }

          <div onClick={()=>{dispatch({ type:"addToList", field:property, value: current}) ; execute({type:"reset"}) }}> ok </div>


          {
            state[property].value.map((elem, i)=>
            <div key={i}>
              <input type={elem.name.kind}  value={elem.name.value} onChange={(e)=> dispatch({ type:"updateEntryFromList", field: property, part:"name", index:i, value:e.target.value })} />
              <input type={elem.age.kind} value={elem.age.value} onChange={(e)=> dispatch({ type:"updateEntryFromList", field: property, part:"age", index:i, value:e.target.value })} />
              <input type="file" accept="image/*" onChange={(e)=>imageChanger(e, property, "photo", i)}/>
              {elem.photo.value && <img src={elem.photo.value} />}
              <div onClick={()=>{dispatch({type:"removeFromList", field:property, value:i})}}>X</div>
            </div>)
          }

        </div>)
      )}












    



    
  </>)
}


    //{state.pfp.value && <img src={state.pfp.value} />}
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
//
//
//
    //{state.friends.value.map((elem, i)=>
    //  <div key={i}>
    //
    //
    //    <input type="text"  value={elem.name.value} onChange={(e)=>
    //        {
    //            dispatch({ type:"updateEntryFromList", field: "friends", part:"name", index:i, value:e.target.value })
    //        }
    //      } />
    //    <input type="number" value={elem.age.value} onChange={(e)=>
    //        {
    //          dispatch({ type:"updateEntryFromList", field: "friends", part:"age", index:i, value:e.target.value })
    //        }
    //      } />
    //    <div onClick={()=>{dispatch({type:"removeFromList", field:"friends", value:i})}}>X</div>
    //  </div>)}
