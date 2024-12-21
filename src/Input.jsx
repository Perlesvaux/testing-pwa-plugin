export default function Input({ name, type, value, changer, deleter }){

  return (<>
    <label >
      { name }
      <input type={type} value={value} onChange={changer} />
    </label>
    { deleter && <div onClick={deleter}>X</div> }
  </>)
}
