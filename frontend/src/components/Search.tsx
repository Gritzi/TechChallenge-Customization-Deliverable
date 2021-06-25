import React, {useState} from 'react';
import cx from 'classnames';
import {Button, Modal, Content, Search as CSearch} from 'carbon-components-react';

export const Search = ({ useResponsiveOffset = true }) => {
    const [open, setOpen] = useState(false);
    const content = (
      <div className="bx--grid" style={{height: '100%'}}>
        <div className="bx--row">
          <div style={{width: '100%', height: '100%'}}>
            <h2 style={{ margin: '0 0 30px' }}>Search for PIL</h2>
            <CSearch labelText='' light placeholder="Drug name..." size="xl" id="search-1" />
          
          </div>
        </div>
      </div>
    );
    const style = {
      height: '100%',
      margin: 0,
      width: '100%',
    };
    return (
      <Content id="main-content" style={style}>
        {content}
      </Content>
    );
  };