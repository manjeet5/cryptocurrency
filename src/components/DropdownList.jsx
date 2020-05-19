import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getDropdownListDetails } from "../selectors/selectors";
import { addCurrencyToTable } from "../actions/actionCreators";

const { SubMenu } = Menu;
const mapDispatchToProps = (dispatch) => {
  return {
    add: addCurrencyToTable(dispatch),
  };
};
const DropDownList = (props) => {
  const { dropdown, add, tableListIds } = props;

  const renderMenuItems = (list) => {
    return list.map((currency) => {
      return <Menu.Item key={currency.id}>{currency.name}</Menu.Item>;
    });
  };
  const renderSubMenus = (category) => {
    return (
      <SubMenu key={category} trigger={["click"]} title={category}>
        {renderMenuItems(dropdown[category])}
      </SubMenu>
    );
  };
  const menu = (
    <Menu onClick={(event) => add(event.key)}>
      {Object.keys(dropdown).map((category) => renderSubMenus(category))}
    </Menu>
  );
  return (
    <div className="drop-down-button">
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="bottomLeft"
        disabled={tableListIds.length >= 10}
      >
        <Button type="primary">
          CryptoPrice <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default connect(
  getDropdownListDetails,
  mapDispatchToProps
)(DropDownList);
