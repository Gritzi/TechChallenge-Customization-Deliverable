import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cx from 'classnames';
import {Button, Modal, Content, FormGroup, ComboBox, InlineNotification, MultiSelect, SideNavItems} from 'carbon-components-react';
import axios from 'axios';

export interface InteractionsProps {
  userData?: {};
}


function intersect(a: any[], b: any[]) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter(x => setB.has(x)));
  return Array.from(intersection);
}

const checkIntersects = (item: any, conditions: string[]) => {

  const warnings = [];

  const intersects1 = intersect(item?.verhindernde_krankheiten, conditions);

  if(intersects1) {
    for (const ints1 of intersects1) {
      if(ints1.toLowerCase().includes("pregnan")){
        warnings.push(`Drug ${item.name} reports possible interaction if you are pregnant`)
      } else {
        warnings.push(`Drug ${item.name} reports possible interaction if you suffer from ${ints1}`)
      }
    }
  }

  return warnings;
}

export const Interactions: React.FC<InteractionsProps> = ({userData = {}}) => {

    console.log(userData)

    const [data, setData] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [selectedAilments, setselectedAilments] = useState<string[]>([]);
    const [targetInterestItem, setTargetInterestItem] = useState<any>(undefined);
    const [key, setKey] = useState(0);

    useEffect(() => {
      axios.get("http://0.0.0.0:8080/data").then(res => setData(res.data));   
    }, [])


    const initialSelectedItems = useMemo(() => {
        setKey(key + 1);
        if(data) {
          const initial = data.filter(entry => userData?.drugs?.includes(entry.id));
          setSelectedItems(initial);
          return initial;
        } else {
          return []
        }
    }, [data, userData?.drugs?.length]);

    const initialSelectedConditions = useMemo(() => {
      setKey(key + 1);
      if(data) {
        const initial = userData?.conditions;
        setselectedAilments(initial);
        return initial;
      } else {
        return []
      }
    }, [data, userData?.conditions?.length]);

    const setUserData = (drugs: string[], conditions: string[]) => {
    
      axios.post("http://localhost:8080/updateData", {
          drugs,
          conditions
      }, {withCredentials: true}).then(() => {}).catch((err => {
        console.log(err);
      }));
    }
    
    const saveEntries = () => {
      const items = selectedItems.map(item => item.id);
      setUserData(items, selectedAilments)
    }

    const getAilments = () => {
      const ailments = data.map(item => item.verhindernde_krankheiten).flat();
      const unique = ailments.filter((v, i, a) => a.indexOf(v) === i).filter(e => e !== "");
      return unique;
    }

    const checkInteractions = () => {

      let warnings: any[] = [];

      selectedItems.forEach(item => {

        const warns = checkIntersects(item, selectedAilments);

        warnings = [...warnings, ...warns];

        if(item?.wechselwirkungen_mit?.includes(targetInterestItem?.id)) {
          warnings.push(`Drug ${targetInterestItem.name} reports possible interaction with ${item.name}`)
        }
      })

      const otherwarns = checkIntersects(targetInterestItem, selectedAilments);

      warnings = [...warnings, ...otherwarns];

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
                {
                  <MultiSelect
                  id="id1"
                  label="Drugs"
                  onChange={items => setSelectedItems(items.selectedItems)}
                  items={data}
                  itemToString={(item) => (item ? item.name : '')}
                  titleText="I'm currently taking..."
                  light
                  initialSelectedItems={initialSelectedItems}
                  compareItems={(i1, i2) => i1.name?.localeCompare(i2.name)}
                  key={key + 1}
                />
                }
              </div>
              <div style={{marginBottom: '2rem'}}>
                <MultiSelect
                  onChange={si => setselectedAilments(si.selectedItems)}
                  id="carbon-combobox"
                  items={getAilments()}
                  itemToString={(item) => (item ? item: '')}
                  titleText="My conditions are..."
                  light
                  initialSelectedItems={initialSelectedConditions}
                  compareItems={(i1, i2) => i1?.localeCompare(i2)}
                  key={key + 2}
                  label="Conditions"
                />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <ComboBox
                  onChange={si => setTargetInterestItem(si.selectedItem)}
                  id="carbon-combobox"
                  items={data}
                  itemToString={(item) => (item ? item.name : '')}
                  placeholder="Filter..."
                  titleText="I am interested in the following medication..."
                  light
                  
                />
              </div>

              <Button onClick={() => {saveEntries()}} disabled={!userData}>
                Save...
              </Button>
              
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