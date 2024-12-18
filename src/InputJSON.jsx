import { useRef } from 'react'

export default function InputJSON({ name, changer }){
  const ref = useRef(null)
  return(<>
    <label> {name}
      <input type="file" accept="application/json" ref={ref} onChange={changer}/>
    </label>
    <div onClick={()=>{ ref.current.value='' }}>X</div>
  </>)

}

