import bg from './assets/bg2.jpg';
import Layout from "./layout/Layout.jsx";

function App() {
  return(
    <div 
    className='backdrop-blur'
    style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
      <Layout />
    </div>
  )
}

export default App
