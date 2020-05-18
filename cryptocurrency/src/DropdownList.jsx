import React from "react";
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const DropDownList = ({list}) => {
    const renderMenuItem = (cryptoCurrency) => {
        const {id, name} = cryptoCurrency;
        return (
            <Menu.Item key={id}>{name}</Menu.Item>
        );
    }
    //dispatch function should remove id from list and add list to table
    const menu = (
        <Menu onClick={(event)=>console.log(event.key,  "DISPATCH ADD_CURRENCY_TO_TABLE")}>
            {list.data.map(cryptoCurrency => renderMenuItem(cryptoCurrency))}
        </Menu>
      );
    return (
        <div className="drop-down-button">
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                <Button  type="primary" >CryptoPrice <DownOutlined /></Button>
            </Dropdown>
        </div>
    )
}

export default DropDownList;    