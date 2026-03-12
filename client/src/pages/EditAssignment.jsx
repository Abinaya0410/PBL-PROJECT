// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function EditAssignment() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [assignment, setAssignment] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");

//   useEffect(() => {
//     fetchAssignment();
//   }, []);

//   const fetchAssignment = async () => {

//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `http://localhost:5000/api/assignments/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     const data = await res.json();

//     setAssignment(data);
//     setTitle(data.title);
//     setDescription(data.description);
//     setDueDate(data.dueDate?.substring(0,10));
//   };

//   const updateAssignment = async (e) => {

//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     await fetch(
//       `http://localhost:5000/api/assignments/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type":"application/json",
//           Authorization:`Bearer ${token}`
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           dueDate
//         })
//       }
//     );

//     navigate(-1);
//   };

//   if(!assignment){
//     return <div className="text-white p-10">Loading...</div>
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-10">

//       <h1 className="text-3xl mb-8 text-yellow-400">
//         Edit Assignment
//       </h1>

//       <form
//         onSubmit={updateAssignment}
//         className="max-w-xl space-y-6"
//       >

//         <input
//           value={title}
//           onChange={(e)=>setTitle(e.target.value)}
//           className="w-full p-3 bg-slate-800 rounded"
//         />

//         <textarea
//           value={description}
//           onChange={(e)=>setDescription(e.target.value)}
//           className="w-full p-3 bg-slate-800 rounded"
//         />

//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e)=>setDueDate(e.target.value)}
//           className="w-full p-3 bg-slate-800 rounded"
//         />

//         <button
//           className="bg-yellow-500 px-6 py-3 rounded"
//         >
//           Update Assignment
//         </button>

//       </form>

//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function EditAssignment() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title,setTitle] = useState("");
//   const [description,setDescription] = useState("");
//   const [dueDate,setDueDate] = useState("");
//   const [pdf,setPdf] = useState(null);

//   useEffect(()=>{
//     fetchAssignment();
//   },[]);

//   const fetchAssignment = async ()=>{

//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `http://localhost:5000/api/assignments/${id}`,
//       {
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       }
//     );

//     const data = await res.json();

//     setTitle(data.title);
//     setDescription(data.description);
//     setDueDate(data.dueDate?.substring(0,10));
//   };

//   const updateAssignment = async (e)=>{

//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     const formData = new FormData();

//     formData.append("title",title);
//     formData.append("description",description);
//     formData.append("dueDate",dueDate);

//     if(pdf){
//       formData.append("pdf",pdf);
//     }

//     await fetch(
//       `http://localhost:5000/api/assignments/${id}`,
//       {
//         method:"PUT",
//         headers:{
//           Authorization:`Bearer ${token}`
//         },
//         body:formData
//       }
//     );

//     navigate(-1);
//   };

//   return(

//     <div className="min-h-screen bg-slate-950 text-white p-10">

//       <h1 className="text-3xl mb-8 text-yellow-400">
//         Edit Assignment
//       </h1>

//       <form
//         onSubmit={updateAssignment}
//         className="max-w-xl space-y-6"
//       >

//         <input
//           value={title}
//           onChange={(e)=>setTitle(e.target.value)}
//           className="w-full p-3 bg-slate-800 rounded"
//         />

//         <textarea
//           value={description}
//           onChange={(e)=>setDescription(e.target.value)}
//           className="w-full p-3 bg-slate-800 rounded"
//         />

//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e)=>setDueDate(e.target.value)}
//           className="w-full p-3 bg-slate-800 rounded"
//         />

//         <div>
//           <p className="text-gray-400 mb-2">
//             Replace PDF (optional)
//           </p>

//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={(e)=>setPdf(e.target.files[0])}
//           />
//         </div>

//         <button
//           className="bg-yellow-500 px-6 py-3 rounded"
//         >
//           Update Assignment
//         </button>

//       </form>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditAssignment() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [dueDate,setDueDate] = useState("");
  const [pdf,setPdf] = useState(null);

  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  useEffect(()=>{
    fetchAssignment();
  },[]);

  const fetchAssignment = async ()=>{

    try{

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/assignments/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setTitle(data.title);
      setDescription(data.description);
      setDueDate(data.dueDate?.substring(0,10));

    }catch(err){
      console.log(err);
    }

  };

  const updateAssignment = async (e)=>{

    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try{

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title",title);
      formData.append("description",description);
      formData.append("dueDate",dueDate);

      if(pdf){
        formData.append("pdf",pdf);
      }

      const res = await fetch(
        `http://localhost:5000/api/assignments/${id}`,
        {
          method:"PUT",
          headers:{
            Authorization:`Bearer ${token}`
          },
          body:formData
        }
      );

      if(!res.ok){
        throw new Error("Failed to update assignment");
      }

      setMessage("Assignment updated successfully");

      setTimeout(()=>{
        navigate(-1);
      },1200);

    }catch(err){

      setError(err.message);

    }finally{

      setLoading(false);

    }

  };

  return(

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-10">

      <div className="w-full max-w-2xl bg-slate-900 border border-yellow-500/30 p-8 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Edit Assignment
        </h1>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-6 bg-green-600/20 border border-green-500 text-green-300 p-3 rounded-lg">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 bg-red-600/20 border border-red-500 text-red-300 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={updateAssignment} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block mb-2 text-white font-semibold">
              Assignment Title
            </label>

            <input
              type="text"
              placeholder="Enter assignment title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full bg-slate-800 text-white placeholder-gray-400 p-3 rounded-lg border border-slate-700 focus:border-yellow-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 text-white font-semibold">
              Description
            </label>

            <textarea
              placeholder="Enter assignment description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              rows="4"
              className="w-full bg-slate-800 text-white placeholder-gray-400 p-3 rounded-lg border border-slate-700 focus:border-yellow-500 outline-none"
            />
          </div>

          {/* DUE DATE */}
          <div>
            <label className="block mb-2 text-white font-semibold">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e)=>setDueDate(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:border-yellow-500 outline-none"
            />
          </div>

          {/* PDF REPLACE */}
          <div>
            <label className="block mb-2 text-white font-semibold">
              Replace Assignment PDF (optional)
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e)=>setPdf(e.target.files[0])}
              className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold p-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Assignment"}
          </button>

        </form>

      </div>

    </div>
  );
}