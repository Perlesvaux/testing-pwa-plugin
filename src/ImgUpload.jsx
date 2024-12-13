import { useState } from 'react'

export default function ImgUpload(){
  const [state, setState] = useState(null)
  
  //function handleImageChange(event){
  //  const file = event.target.files[0];
  //  if (file){
  //    const imgUrl = URL.createObjectURL(file)
  //    setState(imgUrl)
  //  }
  //} 
  
  function handleImageChange(event){
    const files = event.target.files;
    if (files){
      console.log(files)
      const imgUrl =  Array.from(files).map((file)=> URL.createObjectURL(file))
      setState(imgUrl)
    }
  } 


  return (<> 
    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
    <br />

    {
      state &&
      state.map((img, i)=> 
        <img 
          key={i} 
          src={img} 
          alt="Uploaded img" 
          style={{maxWidth:"300px", marginTop:"20px"}} 
          onLoad={()=> URL.revokeObjectURL(state)} /> 
      )
    }
  </>)

  //return (<> 
  //  <input type="file" accept="image/*" multiple onChange={handleImageChange} />
  //  <br />
  //  <img 
  //    src={state}
  //    alt="uploaded image"
  //    style={{maxWidth:"300px", marginTop:"20px"}}
  //    onLoad={()=> URL.revokeObjectURL(state)}
  //
  //  />
  //</>)

}
