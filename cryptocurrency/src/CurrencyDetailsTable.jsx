import React from "react";
import { Table, Button } from 'antd';

const CurrencyDetailsTable = ({list}) => {
    const list1 = Object.keys(list.data).map((currency) => {
        console.log(list.data[currency]);
        return Object.keys(list.data[currency]).reduce((data, key) => {
            if(key === "quote") {
                data.price = list.data[currency].quote.USD.price;
            } else {
                data[key] = list.data[currency][key];
            }
            return data;
        }, {})

    })
    console.log("list1", list1);
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
            <Button onClick={(event) => console.log(record)}>Delete</Button>
          ),
        },
      ];
      
      return <Table columns={columns} dataSource={list1} pagination={{ hideOnSinglePage: true}}/>;
}

export default CurrencyDetailsTable;