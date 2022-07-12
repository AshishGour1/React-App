import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Role() {
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [roleId, setRoleId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();
  const role = {
    name: username,
    age: age,
    email: email,
    contact: contact,
  };
  const apiHeaderapiCall = {
    headers: {
      "Access-Control-Allow-Origin": "*",

      "Content-Type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  useEffect(() => {
    loadRoles();
  });
  const loadRoles = async () => {
    const result = await axios.get(
      "https://api-ashish-dotnet.azurewebsites.net/api/Roles/GetAll",
      apiHeaderapiCall
    );
    setRoles(result.data.data);
  };

  //Delete Role

  const deleteRole = async (id: any) => {
    const result = await axios.delete(
      `https://api-ashish-dotnet.azurewebsites.net/api/Roles/ ${id}`,
      apiHeaderapiCall
    );
    setRoles(result.data.data);
  };
  function deleteConformation(id: any) {
    Swal.fire({
      title: "Are you sure you want to delete?",
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRole(id);
        loadRoles();
      }
    });
  }
  //Add Role

  const postRole = async () => {
    const result = axios
      .post("https://api-ashish-dotnet.azurewebsites.net/api/Roles/", role, apiHeaderapiCall)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    loadRoles();
  };
  function success() {
    if (
      username.length === 0 ||
      age.length === 0 ||
      contact.length === 0 ||
      email.length === 0
    ) {
      Swal.fire({
        title: "Username, age, contact and email should not be empty!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      handleClose();
      postRole();
      loadRoles();
      setUsername("");
      setAge("");
      setContact("");
      setEmail("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Role added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
   // Edit Role

  function prefill(role: any) {
    handleShowEdit();
    setUsername(role.name);
    setAge(role.age);
    setContact(role.contact);
    setEmail(role.email);
  }
  const EditRole = async (id: any) => {
    console.log("id : ", roleId);
    const role = {
      id: roleId,
      name: username,
      age: age,
      email: email,
      contact: contact,
    };
    if (
      username.length === 0 ||
      age.length === 0 ||
      contact.length === 0 ||
      email.length === 0
    ) {
      Swal.fire({
        title: "Username, age, contact and email should not be empty!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      const result = await axios.put(
        `https://api-ashish-dotnet.azurewebsites.net/api/Roles/ ${id}`,
        role,
        apiHeaderapiCall
      );
      console.log(result.data);
      setUsername("");
      setAge("");
      setContact("");
      setEmail("");
      loadRoles();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Role Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      handleCloseEdit();
    }
  };
  function setId(e: any) {
    const id = e.currentTarget.getAttribute("data-rowid");
    console.log(id);
    setRoleId(id);
  }
  useEffect(() => {
    loadRoles();
  }, []);
  return (
    <>
      <TopNavbar />
      <div className="container">
        <Button
          variant="primary"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth");
            window.location.reload();
          }}
          style={{ float: "right", margin: "15px" }}
        >
          Logout
        </Button>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ float: "right", margin: "15px" }}
        >
          Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: any, id: any) => (
              <tr key={role.id} data-rowid={role.id} onClick={setId}>
                <td>{role.name}</td>
                <td>{role.age}</td>
                <td>{role.email}</td>

                <td>{role.contact}</td>
                <td>
                  <Button
                    variant="danger m-2"
                    onClick={() => deleteConformation(role.id)}
                  >
                    Delete{" "}
                  </Button>
                  <Button variant="primary  m-2" onClick={() => prefill(role)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Add</h3>
                <div className="form-group mt-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Age</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter age"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Contact</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter contact number"
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={success}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={edit}
          onHide={handleCloseEdit}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Edit</h3>
                <div className="form-group mt-3">
                  <label>Name</label>
                  <input
                    type="text"
                    value={username}
                    className="form-control mt-1"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Age</label>
                  <input
                    type="text"
                    value={age}
                    className="form-control mt-1"
                    placeholder="Enter age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Contact</label>
                  <input
                    type="text"
                    value={contact}
                    className="form-control mt-1"
                    placeholder="Enter contact number"
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={EditRole}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default Role;
