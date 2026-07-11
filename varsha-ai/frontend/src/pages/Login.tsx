import {
    useState
}
    from "react";
import { Link } from "react-router-dom";

import {
    api
}
    from "../api/axios";

import {
    useAuth
}
    from "../context/AuthContext";

import {
    useNavigate
}
    from "react-router-dom";


export default function Login() {


    const { login } = useAuth();

    const navigate = useNavigate();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");



    async function submit() {

        const res =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );


        login(res.data);


try{

await api.get("/profile");


navigate("/dashboard");

}

catch{

navigate("/profile/setup");

}

    }



return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400">


<div className="bg-white rounded-xl shadow-xl p-8 w-96">


<h1 className="text-3xl font-bold text-center">
🌧 VarshaAI
</h1>


<p className="text-center text-gray-500 mb-6">
Monsoon Safety Assistant
</p>


<input
className="w-full border p-3 rounded mb-3"
placeholder="use: test@email.com"

onChange={
e=>setEmail(e.target.value)
}

/>



<input
className="w-full border p-3 rounded mb-5"
placeholder="use: Password"
type="password"

onChange={
e=>setPassword(e.target.value)
}

/>



<button

className="
bg-blue-600
text-white
w-full
py-3
rounded
hover:bg-blue-700
"

onClick={submit}

>

Login

</button>



<p className="text-center mt-5">

Don't have an account?


<a
className="text-blue-600 ml-2"
href="/register"
>

Register

</a>


</p>


</div>


</div>

)


}