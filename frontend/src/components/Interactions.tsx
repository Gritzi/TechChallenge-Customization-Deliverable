import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {Button, Modal, Content, FormGroup, ComboBox, InlineNotification, MultiSelect} from 'carbon-components-react';
import axios from 'axios';

export const Interactions = () => {

    const [data, setData] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [selectedAilment, setselectedAilment] = useState<string | undefined>(undefined);
    const [targetInterestItem, setTargetInterestItem] = useState<any>(undefined);

    useEffect(() => {
      axios.get("http://0.0.0.0:8080/data").then(res => setData(res.data));
      
    }, [])

    const getAilments = () => {
      const ailments = data.map(item => item.verhindernde_krankheiten).flat();
      const unique = ailments.filter((v, i, a) => a.indexOf(v) === i).filter(e => e !== "");
      return unique;
    }

    const checkInteractions = () => {

      const warnings = [];

      selectedItems.forEach(item => {
        if(item?.verhindernde_krankheiten?.includes(selectedAilment)) {
          if(selectedAilment?.toLowerCase().includes("pregnan")){
            warnings.push(`Drug ${item.name} reports possible interaction if you are pregnant`)
          } else {
            warnings.push(`Drug ${item.name} reports possible interaction if you suffer from ${selectedAilment}`)
          }
        }

        if(item?.wechselwirkungen_mit?.includes(targetInterestItem?.id)) {
          warnings.push(`Drug ${targetInterestItem.name} reports possible interaction with ${item.name}`)
        }
      })

      if (targetInterestItem?.verhindernde_krankheiten?.includes(selectedAilment)) {
        if(selectedAilment?.toLowerCase().includes("pregnan")){
          warnings.push(`Drug ${targetInterestItem.name} reports possible interaction if you are pregnant`)
        } else {
          warnings.push(`Drug ${targetInterestItem.name} reports possible interaction if you suffer from ${selectedAilment}`)
        }
        
      }

      return warnings.map(text => <InlineNotification kind='warning-alt' title={text} hideCloseButton/>);
    }

    const content = (
      <div className="bx--grid" style={{height: '100%'}}>
        <div className="bx--row" style={{justifyContent: 'center'}}>

          <h2 style={{ margin: '0 0 30px' }}>Search for Interactions</h2>
        </div>
        <div className="bx--row" style={{justifyContent: 'center'}}>
            <FormGroup legendText="" style={{width: '80%'}}>
              <div style={{marginBottom: '2rem'}}>
              <MultiSelect
                id="id1"
                onChange={items => setSelectedItems(items.selectedItems)}
                items={data}
                itemToString={(item) => (item ? item.name : '')}
                titleText="I'm currently taking..."
                light
                
              />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <ComboBox
                  onChange={si => setselectedAilment(si.selectedItem)}
                  id="carbon-combobox"
                  items={getAilments()}
                  placeholder="Filter..."
                  titleText="I suffer from this ailment..."
                  light
                  
                />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <ComboBox
                  onChange={si => setTargetInterestItem(si.selectedItem)}
                  id="carbon-combobox"
                  items={data.filter(item => {
                    return !selectedItems.map(sitem => sitem.id).includes(item.id);
                  })}
                  itemToString={(item) => (item ? item.name : '')}
                  placeholder="Filter..."
                  titleText="I am interested in the following medication..."
                  light
                  
                />
              </div>
              
            {
              checkInteractions()
            }
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