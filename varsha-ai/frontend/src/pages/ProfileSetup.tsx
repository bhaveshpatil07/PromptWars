import {
    useEffect,
    useState
} from "react";

import toast from "react-hot-toast";
import {
    api
} from "../api/axios";


import {
    useNavigate
}
    from "react-router-dom";


export default function ProfileSetup() {

    const [detectingLocation, setDetectingLocation] =
        useState(false);
    const navigate =
        useNavigate();
    const [saving, setSaving]
        =
        useState(false);


    const [form, setForm] =
        useState({

            location: "",
            familyMembers: 1,
            children: 0,
            elderly: 0,
            homeType: "Apartment"

        });



    async function submit() {

        setSaving(true);

        try {


            await api.put(
                "/profile",
                form
            );


            toast.success(
                "Profile saved successfully"
            );


            navigate("/dashboard");


        }

        catch (error: any) {


            toast.error(
                error.response?.data?.message ||
                "Unable to save profile"
            );


        }

        finally {

            setSaving(false);

        }

    }

    useEffect(() => {

        detectLocation();

    }, []);
    async function detectLocation() {

        if (!navigator.geolocation) {

            toast.error(
                "Your browser does not support location access"
            );

            setDetectingLocation(false);

            return;

        }



        navigator.geolocation.getCurrentPosition(

            async (position) => {


                try {


                    const {

                        latitude,

                        longitude

                    } = position.coords;



                    const response =
                        await fetch(

                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`

                        );



                    if (!response.ok) {

                        throw new Error(
                            "Location service unavailable"
                        );

                    }



                    const data =
                        await response.json();



                    const city =

                        data.address.city ||

                        data.address.town ||

                        data.address.village;



                    if (!city) {

                        throw new Error(
                            "Unable to identify city"
                        );

                    }



                    setForm(prev => ({

                        ...prev,

                        location: city

                    }));



                    toast.success(
                        `Location detected: ${city}`
                    );



                }

                catch (error: any) {


                    toast.error(
                        error.message ||
                        "Unable to detect location"
                    );


                }



                finally {

                    setDetectingLocation(false);

                }



            },


            () => {


                toast.error(
                    "Location permission denied. Please allow access or enter manually."
                );


                setDetectingLocation(false);


            }

        );


    }

    return (

        <div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-cyan-500
to-blue-600
">


            <div className="
bg-white
p-8
rounded-xl
shadow-xl
w-96
">


                <h1 className="
text-2xl
font-bold
mb-5
text-center
">

                    Setup Your Safety Profile

                </h1>



                <input

                    className="
w-full
border
p-3
rounded
mb-3
disabled:bg-gray-200
"

                    disabled={detectingLocation}


                    value={form.location}


                    placeholder={
                        detectingLocation
                            ?
                            "Detecting your location..."
                            :
                            "Enter city"
                    }


                    onChange={
                        e =>

                            setForm({

                                ...form,

                                location: e.target.value

                            })

                    }

                />



                <input

                    className="
w-full
border
p-3
rounded
mb-3
"

                    type="number"

                    placeholder="Family members"


                    onChange={
                        e =>

                            setForm({

                                ...form,

                                familyMembers:
                                    Number(e.target.value)

                            })

                    }

                />



                <input

                    className="
w-full
border
p-3
rounded
mb-3
"

                    type="number"

                    placeholder="Children"


                    onChange={
                        e =>

                            setForm({

                                ...form,

                                children:
                                    Number(e.target.value)

                            })

                    }

                />



                <input

                    className="
w-full
border
p-3
rounded
mb-3
"

                    type="number"

                    placeholder="Elderly members"


                    onChange={
                        e =>

                            setForm({

                                ...form,

                                elderly:
                                    Number(e.target.value)

                            })

                    }

                />



                <select

                    className="
w-full
border
p-3
rounded
mb-5
"

                    onChange={
                        e =>

                            setForm({

                                ...form,

                                homeType: e.target.value

                            })

                    }

                >


                    <option>
                        Apartment
                    </option>


                    <option>
                        Independent House
                    </option>


                    <option>
                        Slum Area
                    </option>


                    <option>
                        Village House
                    </option>


                </select>



                <button

disabled={
saving ||
detectingLocation ||
!form.location
}

className="
w-full
bg-blue-600
text-white
py-3
rounded
disabled:bg-gray-400
"
onClick={submit}
>

{
saving
?
"Saving..."
:
"Save Profile"
}

</button>


            </div>


        </div>

    )

}