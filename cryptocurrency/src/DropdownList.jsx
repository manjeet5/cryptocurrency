import React from "react";
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {getDropdownListDetails} from "./selectors/selectors";
import {addCurrencyToTable} from "./actions/actionCreators";
const DropDownList = ({dropdownList, add}) => {
    const renderMenuItem = (cryptoCurrency) => {
        const {id, name} = cryptoCurrency;
        return (
            <Menu.Item key={id}>{name}</Menu.Item>
        );
    }
    //dispatch function should remove id from list and add list to table
    const menu = (
        <Menu onClick={(event)=>add(event.key)}>
            {dropdownList.map(cryptoCurrency => renderMenuItem(cryptoCurrency))}
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

export default connect(getDropdownListDetails, {add: addCurrencyToTable})(DropDownList);    