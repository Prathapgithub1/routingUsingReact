import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {Component} from 'react'

import {async} from 'rxjs'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogDate()
  }

  getBlogDate = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: updatedData, isLoading: false})
  }

  render() {
    const {isLoading} = this.state
    const {blogsData} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" height={50} width={50} color="#00BFFF" />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
