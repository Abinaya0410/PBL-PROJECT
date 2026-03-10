
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser } from "../services/authService";

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       await registerUser({ name, email, password, role });
//       alert("Registration successful");
//       navigate("/"); // redirect to login page
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Create Account
//         </h2>

//         <form className="space-y-4" onSubmit={handleRegister}>
//           <div>
//             <label className="text-sm">Name</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded mt-1"
//               placeholder="Enter name"
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm">Email</label>
//             <input
//               type="email"
//               className="w-full border p-2 rounded mt-1"
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm">Password</label>
//             <input
//               type="password"
//               className="w-full border p-2 rounded mt-1"
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm">Role</label>
//             <select
//               className="w-full border p-2 rounded mt-1"
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="student">Student</option>
//               <option value="teacher">Teacher</option>
//             </select>
//           </div>

//           <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
//             Register
//           </button>
//         </form>

//         <p className="text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 font-semibold">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password, role });

      // ⭐ SAVE NAME + EMAIL LOCALLY
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="text-sm">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Role</label>
            <select
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
