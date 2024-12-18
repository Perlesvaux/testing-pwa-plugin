export default function Input({ name, kind, variable, changer, deleter }){

  return (<>
    <label >
      { name }
      <input type={kind} value={variable} onChange={changer} />
    </label>
    <div onClick={deleter}>X</div>
  </>)
}
