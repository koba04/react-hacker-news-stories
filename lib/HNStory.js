import React from 'react';

const style = {
  story: {
    display: 'flex',
    flexBasis: 900
  },
  rank: {
    fontSize: '2em',
    flexBasis: 50,
    textAlign: 'center',
    padding: 5
  },
  title: {
    fontSize: '1.2em',
    alignSelf: 'center',
    flexBasis: 550,
  },
  info: {
    margin: 5,
    alignSelf: 'center'
  },
  infoItem: {
    margin: '0 5px'
  }
}

class HNStory extends React.Component {
  static get propTypes() {
    return {
      story: React.PropTypes.object.isRequired
    }
  }
  render() {
    const {rank, url, title, by, kids} = this.props.story;
    const commentCount = kids ? kids.length : 0;
    return (
      <div style={style.story}>
        <div style={style.rank}>{rank}</div>
        <div style={style.title}>
          {title}
        </div>
        <div style={style.info}>
          <span style={style.infoItem}>by {by}</span>
          <span style={style.infoItem}>{commentCount}comments</span>
          <span style={style.infoItem}><a href={url} target="_blank">link</a></span>
        </div>
      </div>
    );
  }
}

export default HNStory;
