import axios from "axios";

export async function  sendEmail(data) {
    const res = await axios
    .post("/api/email", {
      data,
    })
    if(res.status == 200)
    {
        return true
    }

    return false;


}


export async function  sendEmailFinance(data) {
  const res = await axios
  .post("/api/email/finance", {
    data,
  })
  if(res.status == 200)
  {
      return true
  }

  return false;


}