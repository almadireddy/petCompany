import React from 'react';
import { Table } from 'antd';

function QueryTable(props) {
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
        <Table dataSource={ds} columns={c} />
    );
}

export default QueryTable;