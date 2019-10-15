import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function Header(probs) {
  return (
    <>
      <header>This is a header</header>
      <Profile name={probs.name} />
    </>
  );
}

function Profile(probs) {
  return (
    <>
      <p>Profile {probs.name} </p>
    </>
  );
}

function Feed(props) {
  return (
    <>
      <p>Feed</p>
      <AddPostForm />
      <section id="feed">
        {props.posts.map(item => {
          return <Post key={item._id} message={item.message} author={item.author} likes={item.likes} comments={item.comments} />;
        })}
      </section>
    </>
  );
}

function AddPostForm() {
  return (
    <>
      <p>Addpostform</p>
    </>
  );
}
function Post(props) {
  const updateCount = () => {
    setCount(count + 1);
  };

  const [count, setCount] = useState(0);

  return (
    <article>
      <h2>{props.author}</h2>
      <h3>{props.message}</h3>
      <p> {props.likes} likes</p>
      <button onClick={updateCount}>Like</button>

      <AddCommentForm />
      {props.comments.map(item => {
        return <Comment author={item.author} comments={item.comment} />;
      })}
    </article>
  );
}
function AddCommentForm() {
  return (
    <>
      <p>Addcommentform</p>
    </>
  );
}
function Comment(props) {
  return (
    <>
      <h3>{props.author}:says</h3>
      <p>{props.comments}</p>
    </>
  );
}
function Footer(probs) {
  return (
    <>
      <footer>Footer {probs.name}</footer>
    </>
  );
}

function App() {
  const name = "Sarah"; //pass to profile
  // const posts = [<Post />]; //pass this to feed
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const baseURL = "https://frontend19-ccb8.restdb.io/rest/";
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d88747dfd86cb75861e25ff",
      "cache-control": "no-cache"
    };
    fetch(baseURL + "posts?fetchchildren=true", {
      method: "get",
      headers: headers
    })
      .then(e => e.json())
      .then(e => setPosts(e));
  }, []);

  function addPost() {
    const copy = posts.concat({
      message: "very strange",
      author: "everybody"
    });
    setPosts(copy);
  }

  return (
    <div className="App">
      <button onClick={addPost}>Add post</button>
      <Header name={name} />
      <Feed posts={posts} />
      <Footer name={name} />
    </div>
  );
}

export default App;
