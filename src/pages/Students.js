import React, { useState } from "react";

const Students = () => {
  const [open, setOpen] = useState(true);
  //Form values
  const [values, setValues] = useState({
    name: "",
    age: "",
    address: "",
    mobile: "",
    email: "",
    sex: "",
    guardianName: "",
    place: "",
  });
  //Errors
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    address: "",
    mobile: "",
    email: "",
    guardianName: "",
    place: "",
  });
  const [formValues, setFormValues] = useState([]);
  const [flag, setFlag] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "name":
        if (value.length <= 4) {
          // we will set the error state

          setErrors({
            ...errors,
            name: "Username atleast have 5 letters",
          });
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value.length)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        }
        break;

      case "age":
        if (value.length > 5) {
          setErrors({
            ...errors,
            age: "age Should not be less than 5 years",
          });
        }
        break;

      case "address":
        if (value.length < 1) {
          setErrors({
            ...errors,
            address: "field is required",
          });
        }

        break;

      case "mobile":
        if (value.length < 1) {
          setErrors({
            ...errors,
            mobile: "field is required",
          });
        }
        break;

      case "guardianName":
        if (value.length < 1) {
          setErrors({
            ...errors,
            guardianName: "field is required",
          });
        }
        break;

      case "place":
        if (value.length < 1) {
          setErrors({
            ...errors,
            place: "field is required",
          });
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    validate(e, name, val);
    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (e) => {
    if (values.name) e.preventDefault();
    setFormValues([...formValues, values]);
    e.target.reset();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    formValues[editIndex] = values;

    setFormValues([...formValues]);
    setOpen(false);
  };

  const deleteData = (id) => {
    formValues.splice(id, 1);
    setFormValues(() => {
      formValues.splice(id, 1);
      return [...formValues];
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFlag(true);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title d-flex justify-content-around">
              Student Details
              <button
                className="btn btn-primary ml-auto"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                  setFlag(false);
                }}
              >
                + Add Student
              </button>
            </h3>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Name</th>
                  <th>Age </th>
                  <th>Address</th>
                  <th>Phone No</th>
                  <th>Email</th>
                  <th>Sex</th>
                  <th>Guardian Name</th>
                  <th>Place</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formValues.length > 0 &&
                  formValues.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.address}</td>
                        <td>{item.mobile}</td>
                        <td>{item.email}</td>
                        <td>{item.sex}</td>
                        <td>{item.guardianName}</td>
                        <td>{item.place}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleEdit(index)}
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => deleteData(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={`${open}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {flag ? (
                <form onSubmit={(e) => handleEditSubmit(e, values.email)}>
                  {/* <p ></p> */}
                  <div class="row">
                    <div class="col-lg-6 mb-3">
                      <label class="form-label">Name Edit</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        class="form-control"
                        autocomplete="off"
                        value={values.name}
                      />
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Age</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter age"
                        name="age"
                        class="form-control"
                        autocomplete="off"
                        value={values.age}
                      />
                    </div>
                    <div class="col-lg-12 mb-3">
                      <label class="form-label">Address</label>
                      <textarea
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter address"
                        name="address"
                        class="form-control"
                        rows="2"
                        value={values.address}
                      ></textarea>
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Phone</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter phone no."
                        name="mobile"
                        class="form-control"
                        autocomplete="off"
                        value={values.mobile}
                      />
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Email</label>
                      <input
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={values.email}
                        class="form-control"
                        autocomplete="off"
                      />
                    </div>
                    <div class="col-lg-12  mb-3">
                      <label class="form-label">Sex</label>
                      <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <div class="form-check form-check-inline mb-0 me-4">
                          <input
                            onChange={handleChange}
                            class="form-check-input"
                            type="radio"
                            name="sex"
                            checked={values.sex === "female"}
                            value="female"
                          />
                          <label class="form-check-label" for="femaleGender">
                            Female
                          </label>
                        </div>

                        <div class="form-check form-check-inline mb-0 me-4">
                          <input
                            onChange={handleChange}
                            class="form-check-input"
                            type="radio"
                            name="sex"
                            checked={values.sex === "male"}
                            value="male"
                          />
                          <label class="form-check-label">Male</label>
                        </div>

                        <div class="form-check form-check-inline mb-0">
                          <input
                            onChange={handleChange}
                            class="form-check-input"
                            type="radio"
                            name="sex"
                            checked={values.sex === "other"}
                            value="other"
                          />
                          <label class="form-check-label">Other</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Guardian Name</label>
                      <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Enter name"
                        name="guardianName"
                        class="form-control"
                        autocomplete="off"
                        value={values.guardianName}
                      />
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Place</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter place"
                        name="place"
                        class="form-control"
                        autocomplete="off"
                        value={values.place}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-lg-6 mb-3">
                      <label class="form-label">Name</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                      {errors && <span>{errors.name}</span>}
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Age</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter age"
                        name="age"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                      {errors && <span>{errors.age}</span>}
                    </div>
                    <div class="col-lg-12 mb-3">
                      <label class="form-label">Address</label>
                      <textarea
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter address"
                        name="address"
                        class="form-control"
                        rows="2"
                        required
                      ></textarea>
                      {errors && <span>{errors.address}</span>}
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Phone</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter phone no."
                        name="mobile"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                      {errors && <span>{errors.mobile}</span>}
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Email</label>
                      <input
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                      {errors && <span>{errors.email}</span>}
                    </div>
                    <div class="col-lg-12  mb-3">
                      <label class="form-label">Sex</label>
                      <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <div class="form-check form-check-inline mb-0 me-4">
                          <input
                            onChange={handleChange}
                            class="form-check-input"
                            type="radio"
                            name="sex"
                            value="female"
                          />

                          <label class="form-check-label" for="femaleGender">
                            Female
                          </label>
                        </div>

                        <div class="form-check form-check-inline mb-0 me-4">
                          <input
                            onChange={handleChange}
                            class="form-check-input"
                            type="radio"
                            name="sex"
                            value="male"
                          />
                          <label class="form-check-label">Male</label>
                        </div>

                        <div class="form-check form-check-inline mb-0">
                          <input
                            onChange={handleChange}
                            class="form-check-input"
                            type="radio"
                            name="sex"
                            value="other"
                          />
                          <label class="form-check-label">Other</label>
                        </div>
                        {errors && <span>{errors.sex}</span>}
                      </div>
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Guardian Name</label>
                      <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Enter name"
                        name="guardianName"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                      {errors && <span>{errors.guardianName}</span>}
                    </div>
                    <div class="col-lg-6  mb-3">
                      <label class="form-label">Place</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter place"
                        name="place"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                      {errors && (
                        <span className="invalid-feedback">{errors.place}</span>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
