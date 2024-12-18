import { useRef } from 'react'

export default function InputJSON({ name, changer, deleter }){
  const ref = useRef(null)
  return(<>
    <label> {name}
      <input type="file" accept="application/json" ref={ref} onChange={changer}/>
    </label>
    <div onClick={()=>{ deleter(); ref.current.value='' }}>X</div>
  </>)

}

