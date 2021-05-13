import React, {Component} from 'react';
import './Joke.css';

class Joke extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        // classList: DOMTokenList(2)
        // 0: "fas"
        // 1: "fa-arrow-up"
        if (evt.target.classList[1] === "fa-arrow-up") {
            this.props.handleVote(this.props.id, 1);
        } else {
            this.props.handleVote(this.props.id, -1);
        }
    }

    getStyles() {
        // 15,12,9,6,3,0
        const {votes} = this.props;
        if (votes >= 15) {
            return {color: "#4caf50", emoji: "em em-rolling_on_the_floor_laughing"};
        } else if (votes >= 12) {
            return {color: "#8bc34a", emoji: "em em-laughing"};
        } else if (votes >= 9) {
            return {color: "#cddc39", emoji: "em em-smiley"};
        } else if (votes >= 6) {
            return {color: "#ffeb3b", emoji: "em em-slightly_smiling_face"};
        } else if (votes >= 3) {
            return {color: "#ffc107", emoji: "em em-neutral_face"};
        } else if (votes >= 0) {
            return {color: "#ff9800", emoji: "em em-confused"};
        } else {
            return {color: "#f44336", emoji: "em em-angry"};
        }
    }

    render() {
        let voteStyle = this.getStyles();
        let voteBorder = {borderColor: voteStyle.color};
        let voteEmoji = voteStyle.emoji;

        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.handleClick}></i>
                    <span className="Joke-votes" style={voteBorder}>{this.props.votes}</span>
                    <i className="fas fa-arrow-down" onClick={this.handleClick}></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
                <div className="Joke-smiley">
                    <i className={voteEmoji} aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                </div>
            </div>
        )
    }
}

export default Joke;