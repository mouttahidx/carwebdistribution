import axios from "axios";

export function addUserVehicle (vehicule,update,signOut,setLoading,selected,data) {
    setLoading(true);
    axios
      .post(
        process.env.NEXT_PUBLIC_WEBSITE_URL + "wp-json/wc/v3/user/vehicle/",
        {
          user_id: data.user.id,
          vehicle_id: vehicule.term_id,
        },
        {
          headers: { Authorization: `Bearer ${data.user.token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          update([
            ...selected,
            {
              id: vehicule.term_id,
              name: vehicule.name,
              year: vehicule.year,
              make: vehicule.make,
              model: vehicule.model,
              subModel: vehicule.subModel,
              slug: vehicule.slug,
            },
          ]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.code === "jwt_auth_invalid_token") {
          signOut();
        }
      });
};

export const deleteUserVehicle = (id,setLoading,setSelected,update,signOut,data,selected) => {
  setLoading(true);

  axios
    .post(
      process.env.NEXT_PUBLIC_WEBSITE_URL +
        "wp-json/wc/v3/user/vehicle/delete",
      {
        user_id: data.user.id,
        vehicle_id: id,
      },
      {
        headers: { Authorization: `Bearer ${data.user.token}` },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        setSelected((curr) => curr.filter((x) => x.id !== id));

        update(selected.filter((x) => x.id !== id));
        toast.success("Véhicule retiré ! ", {
          position: "bottom-left",
          theme: "dark",
          autoClose: 2500,
        });
      }
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      if (error?.response?.data?.code === "jwt_auth_invalid_token") {
        signOut();
      }
    });
};