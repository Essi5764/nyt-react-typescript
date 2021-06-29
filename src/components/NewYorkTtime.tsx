import React, {Component} from 'react'



type nytState= {
    searchTerm: string,
    startDate: string,
    endDate:string,
    pageNumber: number,
    articles: nytArticles[]
        
    
}
interface nytArticles{
    headline: {main:string,}
    web_url: string,
    keywords: Array<{value:string}>,
    multimedia: Array<{
        url:string
    }> 
};

type  AcceptedProps= {
}

class NewYorkTtimes extends Component<AcceptedProps,nytState>{
    constructor(props:AcceptedProps){
        super(props)
        this.state = {
            searchTerm:'',
            startDate:'',
            endDate: '',
            pageNumber: 0,
            articles: []
        }
        this.fetchNytResults = this.fetchNytResults.bind(this)
        this.searchTermUpdate = this.searchTermUpdate.bind(this)
        this.startDateUpdate = this.startDateUpdate.bind(this)
        this.endDateUpdate = this.endDateUpdate.bind(this)
        this.previousPageNumber = this.previousPageNumber.bind(this)
        this.nextPageNumber = this.nextPageNumber.bind(this)
    }

    searchTermUpdate(e:{target:{value:string}}){
        this.setState({
            searchTerm: e.target.value
        })
    }
    startDateUpdate(e:{target:{value:string}}){
        this.setState({
            startDate: e.target.value
        })
    }
    endDateUpdate(e:{target:{value:string}}){
        this.setState({
            endDate: e.target.value
        })
    }

    fetchNytResults(){
        let baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
        let apiKey = 'Qdju36n5IGisjXPHEB8xif9ftQ8iBJtl'
        let url = `${baseURL}?api-key=${apiKey}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`
        
        if(this.state.startDate !== ''){
            url += `&begin_date=${this.state.startDate}` 
        }
        if(this.state.endDate !== ''){
            url += `&end_date=${this.state.endDate}` 
        }
        console.log(url);
        

        fetch(url)
        .then (res => res.json())
        .then (result =>{
            let results = result.response.docs
            this.setState({
                articles:results                
            }, () =>{console.log(this.state.articles)})
            }).catch(err => console.log (err))
    }

    nextPageNumber(){

        this.setState({
            pageNumber: this.state.pageNumber + 1
        },this.fetchNytResults)
    }

    previousPageNumber(){
        this.setState({
            pageNumber: this.state.pageNumber - 1
        },this.fetchNytResults)
    }
    

render(){
    return(
        <div>
            <h1>Welcome to New York Times Article Search</h1>
            <div>
                <form>
                    <input type="date" pattern="[0-9]{8}" value= {this.state.startDate} onChange={(event) =>this.startDateUpdate(event)}/>
                    <input type="date"  pattern="[0-9]{8}" value= {this.state.endDate} onChange={(event) =>this.endDateUpdate(event)}/>
                    <input type="text"  required value= {this.state.searchTerm} onChange={(event) =>this.searchTermUpdate(event)}/>
                    <button className="submit"onClick={e=>{e.preventDefault(); this.fetchNytResults()}}>Submit search</button>
                </form>
            </div>

        </div>
    )
}
}



export default NewYorkTtimes;