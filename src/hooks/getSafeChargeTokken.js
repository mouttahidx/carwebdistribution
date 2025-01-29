import axios from "axios";



export async function  getSafeChargeTokken(data) {
       try {
        const res = await axios
        .post("/api/safe-charge", {
          data
        })
        if(res.status == 200)
        {
            return res.data.data
        }
      
        return false;
       } catch (error) {
        console.warn(error)
       }
   
 


}