import { useRef } from 'react'

export default function UploadImage({ name, changer, deleter }){
  const ref = useRef(null)
  return(<>
    <label> {name}
      <input type="file" accept="image/*" ref={ref} onChange={changer}/>
    </label>
    <div onClick={()=>{ deleter(); ref.current.value='' }}>X</div>
  </>)

}
