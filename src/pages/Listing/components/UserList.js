import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton, Modal, Descriptions } from 'antd';
import { axios_instance } from '@/utils';

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);

        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        .then((res) => res.json())
        .then((body) => {
            setData([...data, ...body.results]);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const showModal = (user) => {
        setCurrentUser(user);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Modal
                title="User Detail"
                open={modalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Avatar" span={1} rowspan={2} ><Avatar src={currentUser?.picture?.large} /></Descriptions.Item>  
                    <Descriptions.Item label="Name">{currentUser?.name?.first} {currentUser?.name?.last}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{currentUser?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{currentUser?.email}</Descriptions.Item>
                    <Descriptions.Item label="Nationality">{currentUser?.nat}</Descriptions.Item>
                </Descriptions>
            </Modal>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a onClick={() => showModal(item)}>{item.name.last}</a>}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    );
}

export default UserList