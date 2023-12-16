import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import axios from "../instance/axios";

export default function Card({ data, onButtonClick }) {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const userId = user;
  const handleClick = (id) => {
    try {
      axios.patch("/delete/" + userId, { id }).then((res) => {
        onButtonClick();
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {data.length !== 0 ? (
        data?.map((value, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between w-1/2 h-20 px-10 mt-4 bg-slate-400 rounded"
            >
              <div className="flex w-2/6">
                <p>{`${index + 1} -`}</p>
                <h3>{value.name}</h3>
              </div>
              <div className="flex justify-between w-4/6">
                <div className="w-4/6 mt-1">
                  <p>{value.email}</p>
                </div>
                <div className="flex justify-between w-3/6">
                  <button
                    onClick={() =>
                      navigate("/edit-user", { state: { data: value } })
                    }
                    className="bg-green-400 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleClick(value._id)}
                    className="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center my-72 text-5xl font-bold">
          <h1>ADD NEW USER</h1>
        </div>
      )}
    </>
  );
}
