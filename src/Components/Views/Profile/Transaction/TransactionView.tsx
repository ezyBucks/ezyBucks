import * as React from 'react';
import { ContainerDiv } from '../../../Common/Styles';
import { Select, Spin, InputNumber, Button, Popconfirm } from 'antd';
import { UserSelect, DEFAULT_AMOUNT } from './TransactionContainer';

/**
 * Props needed for the Select component
 */
interface TransactionViewProps {
    fetchingUsers: boolean;
    fetchUsers: (text?: string) => Promise<void>;
    handleUserChange: (value: string) => void;
    handleAmountChange: (value: number | undefined) => void;
    handleSend: () => void;
    handleClick: () => string;
    sending: boolean;
    users: UserSelect[];
    value: string | string[];
}

const formatter = (value: string | number | undefined) =>
    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const parser = (value: string | undefined) =>
    parseInt(value ? value.replace(/\$\s?|(,*)/g, '') : '', 10);

const selectFilter = (inputValue: string, option: any) => {
    return (
        option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >=
        0
    );
};

const TransactionView: React.SFC<TransactionViewProps> = props => {
    return (
        <ContainerDiv
            style={{
                marginTop: '30px'
            }}
        >
            <div style={{ width: '400px', paddingBottom: '15px' }}>
                <h3>Transfer</h3>
                <Select
                    allowClear={true}
                    notFoundContent={
                        props.fetchingUsers && <Spin size={'small'} />
                    }
                    placeholder={'Select users to transfer to'}
                    mode={'multiple'}
                    style={{ width: '70%' }}
                    onSearch={props.fetchUsers}
                    onChange={props.handleUserChange}
                    filterOption={selectFilter}
                    value={props.value[0]}
                >
                    {props.users.map(u => (
                        <Select.Option key={u.value} value={u.value}>
                            {u.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div style={{ paddingBottom: '15px' }}>
                <h3>Amount of ezyBucks to send</h3>
                <InputNumber
                    defaultValue={1}
                    formatter={formatter}
                    parser={parser}
                    min={DEFAULT_AMOUNT}
                    onChange={props.handleAmountChange}
                />
            </div>
            <div>
                <Popconfirm
                    title={props.handleClick()}
                    onConfirm={props.handleSend}
                >
                    <Button loading={props.sending}>Send!</Button>
                </Popconfirm>
            </div>
        </ContainerDiv>
    );
};

export default TransactionView;
