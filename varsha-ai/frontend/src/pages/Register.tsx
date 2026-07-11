import {
useState
}
from "react";


import {
api
}
from "../api/axios";


import {
Link,
useNavigate
}
from "react-router-dom";



export default function Register(){


const navigate =
useNavigate();



const [form,setForm]=
useState({

name:"",
email:"",
password:""

});



async function submit(){


await api.post(
"/auth/register",
form
);


navigate("/");


}



return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-green-400
to-blue-500
">


<div className="
bg-white
p-8
rounded-xl
shadow-xl
w-96
">


<h1 className="
text-3xl
font-bold
text-center
mb-6
">

Create Account

</h1>



<input

className="
w-full
border
p-3
rounded
mb-3
"

placeholder="Full Name"


onChange={
e=>

setForm({

...form,

name:e.target.value

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

placeholder="Email"


onChange={
e=>

setForm({

...form,

email:e.target.value

})

}

/>



<input

className="
w-full
border
p-3
rounded
mb-5
"

type="password"

placeholder="Password"


onChange={
e=>

setForm({

...form,

password:e.target.value

})

}

/>



<button

className="
w-full
bg-green-600
text-white
py-3
rounded
hover:bg-green-700
"

onClick={submit}

>

Register

</button>



<p className="
text-center
mt-5
">


Already have account?


<Link
className="text-blue-600 ml-2"
to="/"
>

Login

</Link>


</p>



</div>


</div>

)


}