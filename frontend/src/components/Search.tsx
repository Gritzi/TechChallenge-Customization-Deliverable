import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {Button, Modal, Content, Search as CSearch, ComboBox} from 'carbon-components-react';
import axios from "axios";
import { api_base_address } from '../util/backend_adress';

export const Search = ({ useResponsiveOffset = true }) => {

    const [data, setData] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(undefined);

    useEffect(() => {
      axios.get( "http://127.0.0.1:8080/data").then(res => setData(res.data));
      
    }, [])

    const onChange = (item: any) => {
      setSelectedItem(item.selectedItem);
    }

    const content = (
      <div className="bx--grid" style={{height: '100%'}}>
        <div className="bx--row">
          <div style={{width: '100%', height: '100%'}}>
            <h2 style={{ margin: '0 0 30px' }}>Search for PIL</h2>
            <ComboBox
              onChange={onChange}
              id="carbon-combobox"
              items={data}
              itemToString={(item) => (item ? item.name : '')}
              placeholder="Drug name..."
              light
            />
            <Button href={selectedItem?.link_zu_pdf ?? ''} disabled={!selectedItem} style={{float: 'left', marginTop: "2rem"}}>
              Download PIL
            </Button>
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