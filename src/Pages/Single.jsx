import React, { useEffect, useState } from "react";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../Components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const Single = () => {
  const navigate = useNavigate();
  const [post, setpost] = useState({});
  const id = useParams().id;

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-app-node-mysql-backend-production.up.railway.app/api/posts/${id}`);
        setpost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async () => {
    try {
      await axios.delete(`https://blog-app-node-mysql-backend-production.up.railway.app/api/posts/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
