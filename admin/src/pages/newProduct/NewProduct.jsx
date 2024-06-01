import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { GrToast } from "react-icons/gr";

export default function NewProduct() {
  const [inputs, setInputs] = useState({ inStock: true, color: "red" });
  const [file, setFile] = useState("");
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch("product");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = async (e) => {
    setCat(Array(e.target.value.split(",")));

    setInputs((prev) => {
      return { ...prev, [e.target.name]: Array(e.target.value.split(",")) };
    });
  };

  const handleClick = (e) => {
    console.log(inputs);

    e.preventDefault();
    try{addProduct(inputs,dispatch);
    
   }
    catch(error){

    }
    // const fileName = new Date().getTime() + file.name;
    // const storage = getStorage(app);
    // const storageRef = ref(storage, fileName);

  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image URL</label>
          <input
            type="link"
            id="file"
            name="img"
            value={inputs["img"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Mango..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Description..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="Fruit, Vegetable"
            value={cat.join(",")}
            name="categories"
            onChange={(e) => handleCat(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <select name="color" onChange={handleChange}>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {/* <Link to="/success"> */}
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
}
