import './App.css';
import PostCreate from './postCreate';
import PostList from './PostList';

function App() {
  return (
    <div className="container">
      <h1>Create post</h1>
      <PostCreate />
      <PostList />
    </div>
  );
}

export default App;
