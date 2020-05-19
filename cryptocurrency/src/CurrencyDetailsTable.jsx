import React from "react";
import { Table, Button } from 'antd';
import {connect} from "react-redux";
import {removeCurrencyFromTable} from "./actions/actionCreators";
import {getTableListDetails} from "./selectors/selectors";

const mapDispatchToProps = (dispatch) => {
    return ({
        delete: removeCurrencyFromTable(dispatch)
    })
}
const CurrencyDetailsTable = (props) => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Symbol',
          dataIndex: 'symbol',
          key: 'symbol'
        },
        {
          title: 'CMC Rank',
          dataIndex: 'cmc_rank',
          key: 'cmc_rank',
          sorter: {
            compare: (a, b) => a.cmc_rank - b.cmc_rank,
          }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: {
              compare: (a, b) => a.price - b.price,
            }
          },
       
        {
          title: 'Action',
          key: 'action',
          render: (record) => (
            <Button onClick={() => props.delete(record.id)} disabled={props.tableList.length < 2}>Delete</Button>
          ),
        },
      ];
      
      return <Table columns={columns} dataSource={props.tableList} pagination={{ hideOnSinglePage: true}}/>;
}

export default connect(getTableListDetails, mapDispatchToProps)(CurrencyDetailsTable);