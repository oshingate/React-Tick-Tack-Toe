import React, { Component } from 'react';
import Header from './Header';
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNextX: true,
      winner: null,
      history: Array(9).fill(null),
      isDraw: false,
      moves: 0,
    };
  }

  //handle click

  handleClick = (event, i) => {
    // if (this.state.moves > 8) {
    //   this.setState((prevState) => {
    //     return {
    //       ...prevState,
    //       isDraw: true,
    //     };
    //   });
    // }
    if (!this.state.winner && !this.state.isDraw) {
      this.setState((prevState) => {
        let currentUser = prevState.isNextX ? 'X' : 'O';
        let history = [...prevState.squares];
        prevState.squares[i] = currentUser;
        let winner = this.calculateWinner(prevState.squares);

        if (winner) {
          return {
            isNextX: !prevState.isNextX,
            squares: prevState.squares,
            winner: winner,
            history: history,
          };
        } else {
          console.log('moves', prevState.moves + 1);
          if (prevState.moves > 7) {
            return {
              isNextX: !prevState.isNextX,
              squares: prevState.squares,
              history: history,
              isDraw: true,
            };
          } else {
            return {
              isNextX: !prevState.isNextX,
              squares: prevState.squares,
              history: history,
              moves: prevState.moves + 1,
            };
          }
        }
      });
    }
  };

  //winner

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //reset

  reset = (e) => {
    this.setState({
      squares: Array(9).fill(null),
      isNextX: true,
      winner: null,
      history: Array(9).fill(null),
      isDraw: false,
      moves: 0,
    });
  };

  //previous step

  prevStep = (event) => {
    if (!this.state.winner) {
      this.setState((prevState) => {
        let history = [...prevState.squares];

        return {
          isNextX: !prevState.isNextX,
          squares: prevState.history,

          history: history,
        };
      });
    }
  };

  render() {
    console.log(this.state.squares);
    return (
      <>
        <Header />

        <section className='squares-sec'>
          {this.state.winner ? (
            <h1>{this.state.winner} :- is the winner</h1>
          ) : (
            <h1>
              Next turn is of :-{' '}
              <span>{this.state.isNextX ? ' X ' : ' O '}</span>
            </h1>
          )}

          <div className='squares-div'>
            {this.state.squares.map((square, i) => {
              return (
                <Square
                  data={square}
                  index={i}
                  key={i}
                  handleClick={this.handleClick}
                />
              );
            })}
          </div>
          <div className='btn-div'>
            {' '}
            <button onClick={this.prevStep} className='btn-pri'>
              Previous Step
            </button>
            <button onClick={this.reset} className='btn btn-pri'>
              Restart
            </button>
          </div>
        </section>

        {this.state.winner ? (
          <section className='winner-sec'>
            <div>
              <h4>the winner is :- {this.state.winner}</h4>
              <button onClick={this.reset} className='btn btn-pri'>
                Restart
              </button>
            </div>
          </section>
        ) : (
          ''
        )}
        {this.state.isDraw ? (
          <section className='winner-sec'>
            <div>
              <h4>Match is Draw</h4>
              <button onClick={this.reset} className='btn btn-pri'>
                Restart
              </button>
            </div>
          </section>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default Board;
