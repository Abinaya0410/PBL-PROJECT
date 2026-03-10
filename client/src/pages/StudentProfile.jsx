
import { useState, useEffect } from "react";

export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    collegeName: "",
    degree: "",
    department: "",
    year: "",
    interest: "",
    phone: "",
    country: "",
    state: "",
    city: ""
  });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("studentProfile"));

//     setProfile({
//       name: localStorage.getItem("name") || "",
//       email: localStorage.getItem("email") || "",
//       collegeName: saved?.collegeName || "",
//       degree: saved?.degree || "",
//       department: saved?.department || "",
//       year: saved?.year || "",
//       interest: saved?.interest || "",
//       phone: saved?.phone || "",
//       country: saved?.country || "",
//       state: saved?.state || "",
//       city: saved?.city || ""
//     });
//   }, []);
useEffect(() => {
  const savedProfile = JSON.parse(localStorage.getItem("studentProfile"));

  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email") || "";

  if (savedProfile) {
    setProfile({
      name: name,
      email: email,
      ...savedProfile
    });
  } else {
    setProfile({
      name,
      email,
      collegeName: "",
      degree: "",
      department: "",
      year: "",
      interest: "",
      phone: "",
      country: "",
      state: "",
      city: ""
    });
  }
}, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = () => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-indigo-400">
        My Profile
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl border max-w-5xl">
        <div className="grid grid-cols-2 gap-6">

          {Object.keys(profile).map((key) => (
            <div key={key}>
              <label className="text-sm text-gray-400 capitalize">
                {key}
              </label>
              <input
                name={key}
                value={profile[key]}
                disabled={key === "email" || !editMode}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-slate-800"
              />
            </div>
          ))}

        </div>

        <div className="mt-8">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-indigo-600 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={saveProfile}
              className="px-6 py-2 bg-emerald-600 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
