import React, { Component } from 'react';
import EditableLink from './EditableLink';
import DraggableList from 'react-draggable-list';
import '../assets/admin.css';

export default class Test extends Component {
  state = {
    links: {
      1559446354279: {
        title: 'Some sds',
        animation: 'none',
        redirect: 'https://http://url',
        created: '2019-06-02 09:02:34',
        shown: true,
        thumbnail: ''
      },
      '1559446352381': {
        title: 'Some ds',
        animation: 'none',
        redirect: 'https://http://url',
        created: '2019-06-02 09:02:32',
        shown: true,
        thumbnail: ''
      },
      '1559446350318': {
        title: 'Some title',
        animation: 'none',
        redirect: 'https://http://url',
        created: '2019-06-02 09:02:30',
        shown: true,
        thumbnail: ''
      },
      '1558708029426': {
        animation: 'none',
        created: '2019-05-24 19:57:09',
        redirect: 'https://https://github.com/patheticGeek/instagram-api-server',
        shown: true,
        thumbnail: '',
        title: 'Instagram API Server'
      },
      '1558707701810': {
        animation: 'swing',
        created: '2019-05-24 19:51:41',
        redirect: 'https://https://github.com/patheticGeek/linkefy',
        shown: true,
        thumbnail: '',
        title: 'Linkefy code(Github)'
      }
    },
    list: [
      { name: 'Mercury' },
      { name: 'Venus' },
      { name: 'Earth', subtitle: true },
      { name: 'Mars' },
      { name: 'Jupiter' },
      { name: 'Saturn', subtitle: true },
      { name: 'Uranus', subtitle: true },
      { name: 'Neptune' }
    ]
  };

  _onListChange(newList) {
    let links = {};
    newList.forEach(({ key, link }) => (links[key] = link));
    this.setState(links);
  }

  render() {
    let list = [];
    Object.entries(this.state.links).forEach(([key, link]) => list.push({ key, link }));
    return (
      <div>
        <DraggableList
          itemKey="key"
          template={PlanetItem}
          list={list}
          onMoveEnd={newList => this._onListChange(newList)}
        />
      </div>
    );
  }
}

class PlanetItem extends React.Component {
  render() {
    const { item, itemSelected, dragHandleProps } = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div
        className={dragged ? 'card dragged' : 'card'}
        style={{
          transform: `scale(${scale})`,
          boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
        }}
      >
        <div className="dragHandle" {...dragHandleProps} />
        <div className="card-body">fef</div>
      </div>
    );
  }
}
