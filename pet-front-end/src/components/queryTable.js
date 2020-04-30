import React from 'react';
import { Table } from 'antd';

function QueryTable(props) {
    //console.log(props.table)
    const ds = props.table.map((row, i) => {
        return {
            ...row, key: i+1
        };
    });
    const c = [];
    for (const key in props.table[0]) {
        //console.log(key);
        c.push({
            title: key,
            dataIndex: key
        })
    }
    return (
        <Table dataSource={ds} columns={c} default
        pagination={{ showLessItems: true, position: ["bottomCenter"], showQuickJumper: false, pageSize: (props.pageSize ? 5 : 10),pageSizeOptions: ['5', '10', '20'] }} />
    );
}

export default QueryTable;