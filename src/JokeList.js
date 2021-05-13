import React, {Component} from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends Component{
    static defaultProps = {
        numJokesToFetch: 10
    }
    constructor(props){
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: true
        }
        this.seenJokes = new Set(this.state.jokes.map(j => j.id));
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    async componentDidMount() {
        if (this.state.jokes.length === 0){
            this.getJokes();
        } else {
            this.setState({loading: false}); 
        }
    }

    async getJokes() {
        try{
            let jokes = [];

            while (jokes.length < this.props.numJokesToFetch) {
                let res = await axios.get(`https://icanhazdadjoke.com`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                let newId = res.data.id;
                if (!this.seenJokes.has(newId)) {
                    jokes.push({joke: res.data.joke, votes: 0, id: newId});
                    this.seenJokes.add(newId);    
                } 
            }
            this.setState(st => (
                {
                    loading: false,
                    jokes: [
                        ...st.jokes,
                        ...jokes
                    ]
                }
            ), 
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            );
        } catch(err){
            alert(err);
            this.setState({loading: false});
        }
    }

    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j => {
                return j.id === id ? {...j, votes: j.votes + delta} : j;
            })
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }

    handleClick() {
        this.setState({loading: true}, this.getJokes);
    }

    render(){
        if (this.state.loading) {
            return (
                <div className="JokeList-loader">
                    <i className="fas fa-laugh fa-8x fa-spin"></i>
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            );
        }
        let jokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes 
                    </h1>
                    <img 
                        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                        alt="sidebar laughing emoji"
                    />
                    <button className="JokeList-getmore" onClick={this.handleClick}>Fetch Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(j => (
                        <Joke 
                            text={j.joke} 
                            key={j.id}
                            id={j.id}
                            votes={j.votes}
                            handleVote={this.handleVote}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeList;