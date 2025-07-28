import React,{useEffect,useState} from 'react'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
    const[articles,setArticles]=useState([]);
    const[loading,setLoading]=useState(true);
    const[page,setPage]=useState(1);
    const[totalResults,setTotalResults]=useState(0);
    const[error,setError]=useState(null);

  const capitalizeFirstLetter=(str)=> {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
      
    
    const updateNews=async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        try {
            let response = await fetch(url);
            props.setProgress(30);
            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error ${response.status}: ${errorData.message || response.statusText}`);
                setLoading(false);
                props.setProgress(100);
                return;
            }
            let parsedData = await response.json();
            props.setProgress(70);
            console.log(parsedData);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);
            setError(null);
            props.setProgress(100);
        } catch (err) {
            setError(`Fetch error: ${err.message}`);
            setLoading(false);
            props.setProgress(100);
        }
    }

    useEffect(()=>{
      document.title=`${capitalizeFirstLetter(props.category)} - NewsTour`;
      updateNews();
  },[])
    
   const fetchMoreData =async() => {
    //this.setState(prevState=>({page: page+1}),async()=>{
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    try {
        let response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            setError(`Error ${response.status}: ${errorData.message || response.statusText}`);
            setLoading(false);
            return;
        }
        let parsedData = await response.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setError(null);
    } catch (err) {
        setError(`Fetch error: ${err.message}`);
        setLoading(false);
    }
};
      

    /*const handleNextClick=async()=>{
        console.log("Next");
         if(!(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=79b59a236d8b4833bf1468dd026e9432&page=${this.state.page+1}&pageSize=${props.pageSize}`;
            this.setState({loading: true});
            let data=await fetch(url);
            let parsedData=await data.json()
            //this.setState({loading: false});
            console.log(parsedData);
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading: false
            })
    } 
   //this.setState({page: this.state.page+1});
   setPage(page+1);
   updateNews();
}
   const handlePreviousClick=async()=>{
        console.log("Prev");
         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=79b59a236d8b4833bf1468dd026e9432&page=${this.state.page-1}&pageSize=${props.pageSize}`;
        this.setState({loading: true});
        let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
        }) 
       //this.setState({page: this.state.page-1})
       setPage(page-1);
       updateNews();
    }*/
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "100px 0px"}}>NewsTour - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {loading && <Spinner/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={loading ? <Spinner/> : null}
        >
        <div className="container">
          <div className="row">
              {articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title!==null?element.title.slice(0,45):""} description={element.description!==null?element.description.slice(0,90):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
              </div>
              })}

          </div>
        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>*/}
      </div>
    )
  }



News.defaultProps={
        country: 'in',
        pagesize: 8,
        category:'general'
    }
News.propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

export default News
