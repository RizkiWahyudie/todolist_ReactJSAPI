import { Component } from 'react';
import './App.css';
import './Tailwind.css'
import axios from 'axios';
// IMPORT TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: 'fixed min-h-screen w-full hidden transition duration-500 ease-in-out hover:-translate-y-5',
      dataApi: [],
      dataPost: {
        id: 0,
        title: "",
        desc: "",
        date: "",
      },
      putStatus: false
    }
    this.onClick = this.onClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.getData = this.getData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.postData = this.postData.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.clearData = this.clearData.bind(this);
  }
  componentDidMount() {
    // AXIOS
    this.getData();
  }
  // API METHOD
  getData() {
    axios.get('https://my-json-server.typicode.com/RizkiWahyudie/json-todolist/posts').then(json => {
      this.setState({
        dataApi: json.data,
        putStatus: false
      })
    });
  }
  deleteData(e) {
    // console.log(e.target.value)
    fetch(`https://my-json-server.typicode.com/RizkiWahyudie/json-todolist/posts/${e.target.value}`, {
      method: "DELETE"
    })
      .then(json => this.getData());
    // TOASTIFY
    toast.error('Data has been deleted!', {
      icon: "🐳",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });
  }
  postData(e) {
    let newDataPost = { ...this.state.dataPost };
    if (this.state.putStatus === false) {
      newDataPost['id'] = new Date().getTime();
    }
    newDataPost[e.target.name] = e.target.value;
    this.setState({
      dataPost: newDataPost
    }, () => console.log(this.state.dataPost));
  }
  submitPost() {
    if (this.state.putStatus === false) {
      axios.post(`https://my-json-server.typicode.com/RizkiWahyudie/json-todolist/posts`, this.state.dataPost)
        .then(() => {
          this.getData();
          this.clearData();
        });
      toast.success('Post data successful!', {
        icon: "👏🏻",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      let newDataPost = { ...this.state.dataPost };
      newDataPost['id'] = "";
      newDataPost['title'] = "";
      newDataPost['desc'] = "";
      newDataPost['date'] = "";
      this.setState((state, props) => {
        return {
          create: 'fixed min-h-screen w-full hidden transition duration-500 ease-in-out hover:-translate-y-5',
          dataPost: newDataPost
        };
      });
    } else {
      axios.put(`https://my-json-server.typicode.com/RizkiWahyudie/json-todolist/posts/${this.state.dataPost.id}`, this.state.dataPost)
        .then(() => {
          this.getData();
          this.clearData();
        });
      toast.info('Data has been update!', {
        icon: "⏱️",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
  }
  clearData() {
    let newDataPost = { ...this.state.dataPost };
    newDataPost['id'] = "";
    newDataPost['title'] = "";
    newDataPost['desc'] = "";
    newDataPost['date'] = "";
    this.setState((state, props) => {
      return {
        create: 'fixed min-h-screen w-full hidden transition duration-500 ease-in-out hover:-translate-y-5',
        dataPost: newDataPost
      };
    });
  }
  putData = (e) => {
    axios.get(`https://my-json-server.typicode.com/RizkiWahyudie/json-todolist/posts/${e.target.value}`)
      .then(json => {
        this.setState((state, props) => {
          return {
            create: 'fixed min-h-screen w-full transition duration-500 ease-in-out hover:-translate-y-5',
            dataPost: json.data,
            putStatus: true
          };
        })
      });
  }
  // API CLOSE
  onClick() {
    this.setState({ create: 'fixed min-h-screen w-full transition duration-500 ease-in-out hover:-translate-y-5' })
  }
  onBack() {
    this.setState({ create: 'fixed min-h-screen w-full hidden transition duration-500 ease-in-out hover:-translate-y-5' })
  }

  render() {
    return (
      <div className='relative font-sans bg-neutral-50 min-h-screen'>
        <ToastContainer />
        {/* BUTTON POP UP */}
        <div onClick={this.onClick} className='fixed bottom-8 right-8 bg-sky-500 transition duration-500 hover:scale-110 text-white text-3xl px-3 pb-3 pt-2 rounded-full cursor-pointer'>
          <i className="uil uil-plus"></i>
        </div>
        {/* POP UP */}
        <div className={this.state.create}>
          <div className='absolute bg-black/50 min-h-screen w-full' onClick={this.onBack}></div>
          <div className='absolute -bottom-5 bg-white w-full p-8 pb-24 lg:pb-10 rounded-t-xl'>
            <div>
              <span className='text-xl font-semibold'>What is your main focus today?</span>
              <label className="block mt-4">
                <span className="block text-sm text-slate-700 font-semibold">Title</span>
                <input onChange={this.postData} value={this.state.dataPost.title} required name='title' type="text" placeholder='Whats your title?'
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
              </label>
              <label className="block my-4">
                <span className="block text-sm text-slate-700 font-semibold">Description</span>
                <input onChange={this.postData} value={this.state.dataPost.desc} required name='desc' type="text" placeholder='Enter your description'
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
              </label>
              <label className="block">
                <span className="block text-sm text-slate-700 font-semibold">Pick a date</span>
                <input onChange={this.postData} value={this.state.dataPost.date} required type="date" name='date'
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
              </label>
              <div className='mt-4 flex'>
                <button onClick={this.onBack} className='w-full px-8 py-2 rounded-lg text-white bg-black mr-2'>Cancel</button>
                <button onClick={this.submitPost} type='submit' className='w-full bg-sky-500 text-white px-8 py-2 rounded-lg hover:bg-sky-600 focus:ring focus:ring-sky-300 ml-2'>Submit</button>
              </div>
            </div>
          </div>
        </div>
        {/* NAVBAR */}
        <div className='flex justify-between items-center px-4 lg:px-20 py-5 shadow-sm bg-white'>
          <div>
            <h1 className='text-lg lg:text-xl font-semibold text-sky-500'>Tailwind React</h1>
          </div>
          <div>
            <span className='text-lg lg:text-xl font-semibold text-slate-700'>Todo - App</span>
          </div>
        </div>
        {/* Content */}
        <div className='p-4 lg:px-20'>
          <h3>Hallo there!</h3>
          <span className='italic text-slate-400'>Click the button below to add new activity.</span>
        </div>
        <div className='p-4 pb-28 lg:px-20 lg:pb-20'>
          <h3 className='font-semibold text-sky-600 lg:text-xl'>Current Main Focus</h3>
          <div className='text-justify bg-white shadow rounded-lg px-4 py-3 mt-5'>
            <h2 className='text-xl font-semibold mb-1'>Hallo! I'm Rizki Wahyudie</h2>
            <span className='text-sm'>Student at UPI EDUN. Thanks for the visit my website, enjoy!</span>
            <div className='mt-5 mb-2'>
              <p className='italic text-xs text-slate-500'>Created <span>2022-04-04</span></p>
            </div>
          </div>
          {this.state.dataApi.map((value, index) => {
            return (
              <div key={index}>
                <div className='text-justify bg-white shadow rounded-lg px-4 py-3 mt-5'>
                  <h2 className='text-xl font-semibold mb-1'>{value.title}</h2>
                  <span className='text-sm'>{value.desc}</span>
                  <div className='flex items-center justify-between mt-3'>
                    <div><p className='italic text-xs text-slate-500'>Created <span>{value.date}</span></p></div>
                    <div className='flex'>
                      <button onClick={this.putData} value={value.id} className='bg-sky-500 hover:bg-sky-600 focus:ring focus:ring-sky-300 px-2 py-1 rounded-lg text-white text-xl mr-2 uil uil-edit'></button>
                      <button onClick={this.deleteData} value={value.id} className='bg-pink-500 hover:bg-pink-600 focus:ring focus:ring-pink-300 px-2 py-1 rounded-lg text-white text-xl uil uil-trash'></button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
