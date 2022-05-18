import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";

const EditCategForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [checkedState, setCheckedState] = useState("");

  const name = useInput("");
  const description = useInput("");

  const [category, setCategory] = useState({ name: "", description: "" });
  const [categoryFamilies, setCategoryFamilies] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/category/${id}`)
      .then((res) => {
        setCategory(res.data);
        return axios.get("/api/categoryFamily/getAll");
      })
      .then(({ data }) => {
        setCategoryFamilies(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/category/${id}`, category)
      .then(() => navigate("/admin/categories"));
  };

  return (
    <div className="container singleProductDiv">
      <h1 className="text-center product-name ">EDITAR CATEGORIA</h1>
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <form
          className="col-lg-7"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={category.name}
              name="name"
              className="productInput"
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </div>
          <div>
            <div style={{ marginBottom: "5px" }}>Category Family:</div>
            {categoryFamilies.map((family) => {
              console.log(`family es`, family);
              return (
                <div>
                  <input
                    type="radio"
                    name={family.name}
                    value={family.id}
                    checked={
                      // category.categoryFamily?
                      category.categoryfamilyId === family.id
                      // : false
                    }
                    id={family.name}
                    disabled
                    // checked={checkedState[category.id]}
                    // onChange={handleOnChangeCheck}
                  />
                  <label style={{ marginLeft: "6px" }}>{family.name}</label>
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="description">Descripción:</label>
            <textarea
              type="text"
              value={category.description}
              placeholder="Description"
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />
          </div>

          <div>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginRight: "0px" }}
              >
                Editar categoría
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategForm;
