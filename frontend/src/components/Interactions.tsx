import React, {useState} from 'react';
import cx from 'classnames';
import {Button, Modal, Content, FormGroup, ComboBox} from 'carbon-components-react';

export const Interactions = ({ useResponsiveOffset = true }) => {
    const [open, setOpen] = useState(false);

    const items = [{
      text: 'Aspirin'
    }, {
      text: 'Ibuprofen'
    }];

    const ailments = [
      {
        text: 'Pregnancy'
      }
    ]

    const content = (
      <div className="bx--grid" style={{height: '100%'}}>
        <div className="bx--row" style={{justifyContent: 'center'}}>

          <h2 style={{ margin: '0 0 30px' }}>Search for Interactions</h2>
        </div>
        <div className="bx--row" style={{justifyContent: 'center'}}>
            <FormGroup legendText="" style={{width: '80%'}}>
              <div style={{marginBottom: '2rem'}}>
                <ComboBox
                  onChange={() => {}}
                  id="carbon-combobox"
                  items={items}
                  itemToString={(item) => (item ? item.text : '')}
                  placeholder="Filter..."
                  titleText="I'm currently taking..."
                  light
                  
                />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <ComboBox
                  onChange={() => {}}
                  id="carbon-combobox"
                  items={ailments}
                  itemToString={(item) => (item ? item.text : '')}
                  placeholder="Filter..."
                  titleText="I suffer from this ailment..."
                  light
                  
                />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <ComboBox
                  onChange={() => {}}
                  id="carbon-combobox"
                  items={items}
                  itemToString={(item) => (item ? item.text : '')}
                  placeholder="Filter..."
                  titleText="I am interested in the following medication..."
                  light
                  
                />
              </div>
              <Button type="submit" className="some-class">
                Show Interactions...
            </Button>
          </FormGroup>
          
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