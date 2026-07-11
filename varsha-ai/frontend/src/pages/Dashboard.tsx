import {
    useEffect,
    useState
}
    from "react";
import {
    useNavigate
}
    from "react-router-dom";


import {
    api
}
    from "../api/axios";


import {
    useAuth
}
    from "../context/AuthContext";



export default function Dashboard() {

    const { user } = useAuth();
    const [hasProfile, setHasProfile] = useState(true);


    const [plan, setPlan] =
        useState<any>(null);


    const [loading, setLoading] =
        useState(true);


    const {
        logout
    } = useAuth();


    const navigate =
        useNavigate();



    function handleLogout() {

        logout();

        navigate("/");

    }
    useEffect(() => {

        loadPlan();

    }, []);



    async function loadPlan() {


        try {


            const response =
                await api.get(
                    "/dashboard"
                );


            setPlan(
                response.data.plan
            );


            setPlan(
                response.data.plan
            );


        }
        finally {

            setLoading(false);

        }


    }



    if (loading) {

        return <h2>Generating safety plan...</h2>

    }



    return (

        <div className="min-h-screen bg-slate-100 p-6">

            <div className="flex justify-between">
                <h1 className="text-4xl font-bold mb-2">
                    🌧 Welcome {user?.name}
                </h1>
                <div className="flex gap-2">
                    <button

                        className="
    bg-gray-700
    text-white
    px-4
    py-2
    rounded
    "

                        onClick={() =>
                            navigate("/profile/setup")
                        }

                    >

                        Update Profile

                    </button>
                    <button

                        className="
        bg-red-500
        text-white
        px-4
        py-2
        rounded
        "

                        onClick={handleLogout}

                    >

                        Logout

                    </button>
                </div>
            </div>


            <p className="text-gray-600 mb-8">
                Your personalized monsoon preparedness plan
            </p>



            <div className="grid md:grid-cols-3 gap-6">


                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="font-bold text-xl">
                        Risk Level
                    </h2>

                    <p className="text-3xl mt-3 text-red-600">
                        {plan?.riskLevel}
                    </p>

                </div>



                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="font-bold text-xl">
                        Emergency Kit
                    </h2>


                    <ul className="mt-3 list-disc ml-5">

                        {
                            plan?.emergencyKit?.map(
                                (item: string) => (

                                    <li key={item}>
                                        {item}
                                    </li>

                                )
                            )
                        }

                    </ul>

                </div>



                <div className="bg-white rounded-xl shadow p-6">


                    <h2 className="font-bold text-xl">
                        Travel Advice
                    </h2>


                    <p className="mt-3">
                        {plan?.travelAdvice}
                    </p>


                </div>


            </div>



            <div className="mt-6 bg-white rounded-xl shadow p-6">


                <h2 className="text-2xl font-bold mb-4">
                    Preparation Steps
                </h2>


                <ul className="space-y-2">

                    {
                        plan?.preparationSteps?.map(
                            (step: string) => (

                                <li
                                    key={step}
                                    className="
bg-blue-50
p-3
rounded
"
                                >
                                    ✅ {step}
                                </li>

                            )
                        )

                    }

                </ul>


            </div>


        </div>

    )

}