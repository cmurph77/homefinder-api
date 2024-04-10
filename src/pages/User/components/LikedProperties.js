import { Button, Divider, Table, message } from 'antd';
import { useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { axios_instance } from '@/utils';
import './LikedProperties.scss'

const formatRent = (rent) => {
    const parts = rent.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

const LikedProperties = (props) => {
    const [data_liked_properties, setData] = useState([])
    const [reload, setReload] = useState(0)
    const user_id = useSelector(state => state.user.userId)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios_instance.get(`/get-liked-properties/${user_id}`)
            let data = res.data
            data.map((record) => { 
                record.key = record.identifier 
                record['rent per month'] = '€ '+ formatRent(record['rent per month'])
                record['property-type'].bath = parseInt(record['property-type'].bath.match(/\d+/g)[0], 10) 
                record['property-type'].bed = parseInt(record['property-type'].bed.match(/\d+/g)[0], 10) 
            })
            const defaultSelectedRowKeys = data.map(record => record.key)
            setSelectedRowKeys(defaultSelectedRowKeys)
            setData(data)
        }
        fetchData()
    }, [reload, user_id])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const toggleSelection = (record, selected) => {
        const key = record.key;
        const newSelectedRowKeys = selected
          ? [...selectedRowKeys, key]
          : selectedRowKeys.filter(k => k !== key);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        columnTitle: 'Liked',
        selectedRowKeys,
        onChange: onSelectChange,
        renderCell: (checked, record, index, originNode) => {
            const handleClick = () => toggleSelection(record, !checked);
            return checked ? (
                <HeartFilled style={{ color: 'red', cursor: 'pointer' }} onClick={handleClick} />
            ) : (
                <HeartOutlined style={{ color: 'red', cursor: 'pointer' }} onClick={handleClick} />
            );
        },
    };

    const submitInfo = () => {

        console.log("Liked Properties", selectedRowKeys)
        axios_instance.post('/user/update-liked-properties/', {
            user_id: user_id,
            property_ids: selectedRowKeys
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setTimeout(() => {
                setReload(reload + 1)
            }, 1000);
            message.success('Liked Properties Updated');
        }).catch(err => {
            console.log(err)
            message.error('Failed to update Liked Properties');
        })
    }

    const columns = [
        {
            title: 'Rent',
            dataIndex: 'rent per month',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    
    return (
        <div className='liked-container'>
            <h3 className='liked-title'>Liked Properties</h3>
            <Divider />
            <Table 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data_liked_properties}
                pagination={{
                    pageSize: 20,
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                }}
                expandable={{
                    expandedRowRender: (record) => (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                            }}
                        >
                            <span
                                style={{
                                    margin: 0,
                                }}
                            >
                                <span style={{fontWeight: '600' }} >Bed: </span>{record['property-type'].bed}
                            </span>
                            <span
                                style={{
                                    marginLeft: '20px',
                                }}
                            >
                                <span style={{fontWeight: '600' }} >Bath: </span>{record['property-type'].bath}
                            </span>
                            <span
                                style={{
                                    marginLeft: '20px',
                                }}
                            >
                                <span style={{fontWeight: '600' }} >Link: </span> <a href={`http://localhost:3000/listing/${record.key}`}>{`${record.key}`}</a>  
                            </span>
                        </div>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
            />
            <Button type='primary' onClick={submitInfo}>Save</Button>
        </div>
    )
}

export default LikedProperties