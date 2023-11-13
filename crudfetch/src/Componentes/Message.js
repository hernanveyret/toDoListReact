import React from  "react";

const Message = ({msg,bgColor}) => {
  let style = {
    padding:"1rem",
    marginBottom:"1rem",
    textAlign:"center",
    color:"white",
    fontWeight:"bold",
    backgroundColor: bgColor
  }
  return (
    <div style={style}>
      <p>{msg}</p>
    </div>
  )
}
export default Message;