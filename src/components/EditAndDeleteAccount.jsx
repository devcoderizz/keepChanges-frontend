import { useEffect, useState } from "react";
import useAuth from "../utils/IsAuthenticated";
import handleError from "../utils/ErrorHandler";
import { BsBank2 } from "react-icons/bs";
import { Button, Modal, Popconfirm, Input, Form } from "antd";
import toast from "react-hot-toast";

const EditAndDeleteAccount = () => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
    const [isUpdateShow, setIsUpdateShow] = useState(false);
    const [accountFormData, setAccountFormData] = useState(null);
    const localData = JSON.parse(localStorage.getItem("UserData"));
    const [allAccount, setAllAccount] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccountFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const showModalUpdate = (data) => {
        setAccountFormData(data);
        setIsUpdateShow(true);
    };

    const handleCancelUpdate = () => {
        setIsUpdateShow(false);
    };

    useEffect(() => {
        const Accounts = async () => {
            if (!isAccessTokenValid()) {
                await fetchAccess();
            }

            try {
                const res = await fetch(
                    `${APIBASEURL}/accounts/account/user_${localData.id}`,
                    {
                        method: "GET",
                        headers: {},
                    }
                );
                const data = await res.json();

                setAllAccount(data);
                if (res.status !== 200) {
                    handleError(res.status);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        };
        Accounts();
    }, [APIBASEURL]);

    const handleAccountDelete = async () => {
        if (!isAccessTokenValid()) {
            await fetchAccess();
        }
        const accessToken = localStorage.getItem("accessToken");

        try {
            const res = await fetch(
                `${APIBASEURL}/accounts/account_${accountFormData.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.status != 200) {
                handleError(res.status);
                return;
            } else {
                toast.success("Account Deleted");
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAccountEdit = async (e) => {
        e.preventDefault();
        if (!isAccessTokenValid()) {
            await fetchAccess();
        }
        const accessToken = localStorage.getItem("accessToken");

        try {
            const res = await fetch(
                `${APIBASEURL}/accounts/account_${accountFormData.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(accountFormData),
                }
            );

            if (res.status != 200) {
                handleError(res.status);
                return;
            } else {
                toast.success("Account Edited");
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center border-t-2 pt-2 mr-2 w-full h-full">
            <h1 className="font-semibold mb-2 text-center text-gray-700">
                Bank Accounts
            </h1>
            <ul className="flex flex-col gap-2 text-sm text-blue-500 font-semibold capitalize ml-5">
                {allAccount.map((accounts) => (
                    <li
                        className="flex items-center gap-2 cursor-pointer border-t-[2px] border-blue-400 py-1 border-opacity-50 hover:text-red-400"
                        key={accounts.id}
                        value={accounts.id}
                        onClick={() => showModalUpdate(accounts)}
                    >
                        <BsBank2 className="text-green-600 text-[15px]" />
                        {accounts.bankName}&emsp;...{accounts.accountNumber.slice(-4)}
                    </li>
                ))}
            </ul>

            <Modal
                title="Edit Account Details"
                open={isUpdateShow}
                onCancel={handleCancelUpdate}
                footer={null}
                centered
                className="rounded-md shadow-lg"
            >
                <Form layout="vertical">
                    <Form.Item label="Account Number">
                        <Input
                            name="accountNumber"
                            type="number"
                            value={accountFormData?.accountNumber || ""}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded-md"
                        />
                    </Form.Item>
                    <Form.Item label="IFSC">
                        <Input
                            name="ifsc"
                            type="text"
                            value={accountFormData?.ifsc || ''}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded-md"
                        />
                    </Form.Item>
                    <Form.Item label="Branch Name">
                        <Input
                            name="branch"
                            type="text"
                            value={accountFormData?.branch || ''}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded-md"
                        />
                    </Form.Item>
                    <Form.Item label="Bank Name">
                        <Input
                            name="bankName"
                            type="text"
                            value={accountFormData?.bankName || ''}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded-md"
                        />
                    </Form.Item>
                    <Form.Item label="Holder’s Name">
                        <Input
                            name="holderName"
                            type="text"
                            value={accountFormData?.holderName || ''}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded-md"
                        />
                    </Form.Item>
                    <div className="flex justify-end gap-3">
                        <Button
                            onClick={handleAccountEdit}
                            type="primary"
                            className="px-3 py-1 text-white rounded-lg bg-blue-500 hover:bg-blue-400"
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Delete the account"
                            description="Are you sure to delete this account?"
                            onConfirm={handleAccountDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default EditAndDeleteAccount;
