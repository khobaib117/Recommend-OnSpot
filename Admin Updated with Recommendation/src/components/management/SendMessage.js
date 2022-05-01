import React, { useState } from "react";
import './SendMessage.css'
import axios from 'axios'
import loading from '../../assets/loading.gif'
import { baseUrl } from "../constants/BaseUrl";

const SendMessage = () => {
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const res = await axios.post(`${baseUrl}/api/v1/nurses/sendmessages`, { data: message });
      console.log(res)
      if (res.status === 200) {
        setSubmitting(false);
        return alert(res.data.data)
      }
      setSubmitting(false);
      return alert("fail")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitToLatestFile = async () => {
    try {
      setSubmitting(true)
      const res = await axios.post(`${baseUrl}/api/v1/nurses/sendmessages/latest`, { data: message });
      console.log(res)
      if (res.status === 200) {
        setSubmitting(false);
        return alert(res.data.data)
      }
      setSubmitting(false);
      return alert("fail")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="message-main">
      {!submitting ?
        <div>
          <div className="main-form">
            <p>Enter Message</p>
            <div>
              <textarea className="text-area" onChange={(e) => setMessage(e.target.value)}
                rows="5" cols="60" name="description">

              </textarea>
            </div>
            <div className="button-div">
              <button className="button" onClick={handleSubmit}>SEND TO All MEMBERS</button>
              <button className="button" onClick={handleSubmitToLatestFile}>SEND TO LATEST IMPORTED FILE</button>
            </div>
          </div>
        </div>
        :
        <div className="spinner">
          <img src={loading} alt="loading" />
        </div>
      }
    </div>
  )

};

export default SendMessage;
