import axios from "axios";
import "./kjk.css";
import { useEffect, useState } from "react";

function EmployeeCrud() {
  const [_id, setId] = useState("");
  const [username, setuserName] = useState("");
  const [fathername, setfatherName] = useState("");
  const [mothername, setmotherName] = useState("");
  const [phonenumber, setphonenumber] = useState("");

  const url = "https://sam-backend.onrender.com"

  const [Details, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(`${url}/user/getAll`);
    setUsers(result.data.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post(`${url}/user/create`, {
        username: username,
        fathername: fathername,
        mothername: mothername,
        phonenumber: phonenumber,
      });
      alert("User Registation Successfully");
      setId("");
      setuserName("");
      setfatherName("");
      setmotherName("");
      setphonenumber("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }
  async function editEmployee(Details) {
    setuserName(Details.username);
    setfatherName(Details.fathername);
    setmotherName(Details.mothername);
    setphonenumber(Details.phonenumber);
    setId(Details._id);
  }

  async function DeleteEmployee(_id) {
    await axios.delete(`${url}/user/delete/` + _id);
    alert("Employee deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        `${url}/user/update/` +
          Details.find((u) => u._id === _id)._id || _id,
        {
          _id: _id,
          username: username,
          fathername: fathername,
          mothername: mothername,
          phonenumber: phonenumber,
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setuserName("");
      setfatherName("");
      setmotherName("");
      setphonenumber("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Personal Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="_id"
              hidden
              value={_id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Person Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={username}
              onChange={(event) => {
                setuserName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Father Name</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={fathername}
              onChange={(event) => {
                setfatherName(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Mothername</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={mothername}
              onChange={(event) => {
                setmotherName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Phonenumber</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              maxLength="10"
              value={phonenumber}
              onChange={(event) => {
                setphonenumber(event.target.value);
              }}
            />
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>


      <div className="table-responsive">        
        <table>
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">User Name</th>
              <th scope="col">Father Name</th>
              <th scope="col">Mother Name</th>
              <th scope="col">phonenumber</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          {Details.map(function fn(Details) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{Details._id} </th>
                  <td>{Details.username}</td>
                  <td>{Details.fathername}</td>
                  <td>{Details.mothername}</td>
                  <td>{Details.phonenumber}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => editEmployee(Details)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => DeleteEmployee(Details._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default EmployeeCrud;
