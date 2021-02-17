import React, { useRef, memo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import './style.scss';

const List = ({ title, data, addData, updateData, removeData }) => {
    const inputRef = useRef(null);
    
    const onBlur = (id, event) => {
        let dataCopy = [...data];
        let { value } = event.target;

        value ? updateData(id, value, title) : removeData(id, title);
    };

    const addNewData = () => {
        addData(inputRef.current.value, title);
        inputRef.current.value = '';
    };

    return <div className='flex horizontal-center column'>
        <h2>{title}</h2>

        <Scrollbars style={{ height: '70vh' }}>
            <div className='flex content column'>
                {
                    !data.length ? null :
                        data.map(({ id, value }, index) => {
                            return <div className='item flex' key={id}>
                                <span className='item-count'>{index + 1}.</span>
                                <input
                                    type='text'
                                    onBlur={(event) => onBlur(id, event)}
                                    defaultValue={value}
                                />
                                <button className='delete-item' onClick={(event) => removeData(id, title)}>-</button>
                            </div>
                        })
                }
            </div>
        </Scrollbars>
        <div className='add-new-item'>
            <input type='text' ref={inputRef} placeholder={`new ${title}`} />
            <button onClick={addNewData}>+</button>
        </div>
    </div>
};

export default memo(List);