import {useState} from 'react'

export default function InputList(){

  const [state, setState] = useState({ friends:[]  }) // {name:"carlos", age:20}, {name:"alf", age:32}

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

    <div onClick={()=>{setState( { friends:[...state.friends, current] } ) ; setCurrent({ name:'', age:'' }) }}> ok </div>

    
    {state.friends.map((elem, i)=>
      <div key={i}>
        <input type="text"  value={elem.name} onChange={(e)=>
        {
            const updated = [...state.friends]
            updated[i].name = e.target.value
            console.log(updated)
            setState({friends:updated})
        }
          } />
        <input type="number" value={elem.age} onChange={(e)=>
        {
            const updated = [...state.friends]
            updated[i].age = e.target.value
            console.log(updated)
            setState({friends:updated})
        }
          } />
        <div onClick={()=>{setState({ friends:state.friends.filter((elem, ii)=> ii!==i   )  })}}>X</div>
      </div>)}



    
  </>)
}

